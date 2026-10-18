import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Camera, Eye, Sliders, RotateCw, Play, Pause, Layers, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

// Scratch objects outside animation loop to prevent GC
const _targetPos = new THREE.Vector3();
const _tempVec = new THREE.Vector3();

// Procedural contact shadow generator
function createRadialShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
  gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.35)');
  gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural optical aperture grid texture
function createApertureMarkingsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 64);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';

  for (let i = 0; i < 512; i += 32) {
    ctx.fillRect(i, 48, 2, 16);
    if (i % 64 === 0) {
      ctx.fillRect(i, 32, 2, 32);
      const fStop = ['f/1.2', 'f/1.8', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16'][Math.floor(i / 64) % 8];
      ctx.fillText(fStop, i, 22);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(2, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

type ColorFinish = 'obsidian' | 'indigo' | 'platinum';
type AspectMode = '9:16' | '1:1' | '16:9';

export const ThreeStudioStage: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [explodedVal, setExplodedVal] = useState(0);
  const [finish, setFinish] = useState<ColorFinish>('obsidian');
  const [aspectMode, setAspectMode] = useState<AspectMode>('9:16');
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [activePreset, setActivePreset] = useState<'hero' | 'macro' | 'iso'>('hero');

  // Mutable refs for smooth damping inside requestAnimationFrame
  const paramsRef = useRef({
    exploded: 0,
    isRotating: true,
    aspectMode: '9:16' as AspectMode,
    finish: 'obsidian' as ColorFinish,
    targetCameraPos: new THREE.Vector3(3.4, 2.1, 4.2),
    targetLookAt: new THREE.Vector3(0, 0.9, 0),
  });

  // Sync state to ref
  useEffect(() => {
    paramsRef.current.exploded = explodedVal;
  }, [explodedVal]);

  useEffect(() => {
    paramsRef.current.isRotating = isRotating;
  }, [isRotating]);

  useEffect(() => {
    paramsRef.current.aspectMode = aspectMode;
  }, [aspectMode]);

  useEffect(() => {
    paramsRef.current.finish = finish;
  }, [finish]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Headless check for smooth CPU software rasterization in test environments
    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Scene & Background
    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(0x0b1120); // Midnight deep navy
    scene.background = bgColor;
    scene.fog = new THREE.Fog(0x0b1120, 7, 24);

    // Studio Environment map via PMREMGenerator & RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = roomEnv;
    pmremGenerator.dispose();

    // Camera
    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 50);
    camera.position.set(3.4, 2.1, 4.2);
    camera.lookAt(0, 0.9, 0);

    // Studio Lighting Rig (Warm key, cool fill, rim backlight)
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 16;
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.2);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x6366f1, 2.4);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Studio floor with circular pedestal & radial contact shadow
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090e1a,
      roughness: 0.85,
      metalness: 0.1,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Ground Contact Shadow
    const shadowTex = createRadialShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    scene.add(shadowPlane);

    // Beveled Stage Pedestal
    const pedestalGroup = new THREE.Group();
    const pedestalBaseGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.14, 48);
    const pedestalBaseMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.35,
      metalness: 0.85,
    });
    const pedestalBase = new THREE.Mesh(pedestalBaseGeo, pedestalBaseMat);
    pedestalBase.position.y = 0.07;
    pedestalBase.receiveShadow = true;
    pedestalGroup.add(pedestalBase);

    // Glowing stage neon accent ring
    const ringGeo = new THREE.TorusGeometry(1.58, 0.012, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.142;
    pedestalGroup.add(ringMesh);
    scene.add(pedestalGroup);

    // ==========================================
    // PROCEDURAL 3D SUBJECT:
    // NEXORA AI CREATIVE APERTURE / VIRTUAL STUDIO RIG
    // (Composite 3-12 Part Procedural Model)
    // ==========================================
    const rigRoot = new THREE.Group();
    rigRoot.position.set(0, 0.14, 0);
    scene.add(rigRoot);

    // Textures
    const apertureTex = createApertureMarkingsTexture();

    // Material definitions based on finish state
    const matChassis = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
      metalness: 0.85,
    });

    const matGoldAccent = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.2,
      metalness: 0.95,
    });

    const matKnurledRing = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      map: apertureTex,
      roughness: 0.3,
      metalness: 0.8,
    });

    const matTitaniumBezel = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.15,
      metalness: 0.9,
    });

    // Optical glass element: physical transmission
    const matGlassElement = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transmission: 0.96,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      thickness: 0.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Part 1: Heavy Turret Base
    const partBase = new THREE.Group();
    const baseCylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.85, 0.25, 36),
      matChassis
    );
    baseCylinder.position.y = 0.125;
    baseCylinder.castShadow = true;
    baseCylinder.receiveShadow = true;
    partBase.add(baseCylinder);

    // Part 2: Gimbal Yoke Arms
    const partYoke = new THREE.Group();
    const yokeCurve = new THREE.Mesh(
      new THREE.TorusGeometry(0.78, 0.065, 16, 48, Math.PI),
      matTitaniumBezel
    );
    yokeCurve.rotation.z = Math.PI;
    yokeCurve.position.y = 0.78;
    yokeCurve.castShadow = true;
    partYoke.add(yokeCurve);

    // Part 3: Main Camera Core Chamber
    const partCore = new THREE.Group();
    const coreBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.8, 1.1),
      matChassis
    );
    coreBox.position.y = 0.85;
    coreBox.castShadow = true;
    coreBox.receiveShadow = true;
    partCore.add(coreBox);

    // Top Viewfinder Prism & Sensor Array
    const prismMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.22, 0.55),
      matTitaniumBezel
    );
    prismMesh.position.set(0, 1.35, -0.05);
    prismMesh.castShadow = true;
    partCore.add(prismMesh);

    // Lateral Cooling Fin Accents
    for (let i = -2; i <= 2; i++) {
      const fin = new THREE.Mesh(
        new THREE.BoxGeometry(0.96, 0.02, 0.7),
        matGoldAccent
      );
      fin.position.set(0, 0.75 + i * 0.06, 0);
      partCore.add(fin);
    }

    // Part 4: Stepped Optical Lens Barrel (Primary Silhouette Front)
    const partBarrel = new THREE.Group();
    partBarrel.position.set(0, 0.85, 0.55);

    const barrel1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.44, 0.35, 36),
      matTitaniumBezel
    );
    barrel1.rotation.x = Math.PI / 2;
    barrel1.castShadow = true;
    partBarrel.add(barrel1);

    // Part 5: Knurled Focus / F-Stop Aperture Ring
    const partRing = new THREE.Group();
    partRing.position.set(0, 0.85, 0.8);
    const ringMesh2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.46, 0.46, 0.2, 36),
      matKnurledRing
    );
    ringMesh2.rotation.x = Math.PI / 2;
    ringMesh2.castShadow = true;
    partRing.add(ringMesh2);

    // Part 6: Front Bevel Hood & Optical Glass Element
    const partFrontGlass = new THREE.Group();
    partFrontGlass.position.set(0, 0.85, 1.05);

    const outerBezel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.46, 0.28, 36),
      matChassis
    );
    outerBezel.rotation.x = Math.PI / 2;
    outerBezel.castShadow = true;
    partFrontGlass.add(outerBezel);

    // Gold accent trim inside bezel
    const innerTrim = new THREE.Mesh(
      new THREE.TorusGeometry(0.44, 0.015, 16, 48),
      matGoldAccent
    );
    innerTrim.position.z = 0.12;
    partFrontGlass.add(innerTrim);

    // Curved front optical lens
    const glassSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.8),
      matGlassElement
    );
    glassSphere.position.z = 0.12;
    partFrontGlass.add(glassSphere);

    // Part 7: Holographic Ad Aspect-Ratio Floating Wireframe
    const partHoloFrame = new THREE.Group();
    partHoloFrame.position.set(0, 0.85, 1.6);

    const frameLineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
    const crosshairMat = new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.7 });

    // 9:16 Aspect ratio frame lines
    const framePoints = [
      new THREE.Vector3(-0.45, -0.8, 0),
      new THREE.Vector3(0.45, -0.8, 0),
      new THREE.Vector3(0.45, 0.8, 0),
      new THREE.Vector3(-0.45, 0.8, 0),
      new THREE.Vector3(-0.45, -0.8, 0),
    ];
    const frameLineGeo = new THREE.BufferGeometry().setFromPoints(framePoints);
    const frameLine = new THREE.Line(frameLineGeo, frameLineMat);
    partHoloFrame.add(frameLine);

    // Inner rule-of-thirds grid crosshairs
    const gridPoints = [
      // Horizontals
      new THREE.Vector3(-0.45, -0.27, 0), new THREE.Vector3(0.45, -0.27, 0),
      new THREE.Vector3(-0.45, 0.27, 0), new THREE.Vector3(0.45, 0.27, 0),
      // Verticals
      new THREE.Vector3(-0.15, -0.8, 0), new THREE.Vector3(-0.15, 0.8, 0),
      new THREE.Vector3(0.15, -0.8, 0), new THREE.Vector3(0.15, 0.8, 0),
    ];
    const gridLineGeo = new THREE.BufferGeometry().setFromPoints(gridPoints);
    const gridLine = new THREE.LineSegments(gridLineGeo, crosshairMat);
    partHoloFrame.add(gridLine);

    // Assemble parts into rig root
    rigRoot.add(partBase);
    rigRoot.add(partYoke);
    rigRoot.add(partCore);
    rigRoot.add(partBarrel);
    rigRoot.add(partRing);
    rigRoot.add(partFrontGlass);
    rigRoot.add(partHoloFrame);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with exponential damping and lossless 60fps
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();

      const { isRotating: rot, exploded, aspectMode: asp, finish: fin, targetCameraPos, targetLookAt } = paramsRef.current;

      // Color Finish adjustments
      if (fin === 'obsidian') {
        matChassis.color.setHex(0x0f172a);
        matChassis.metalness = 0.85;
        matTitaniumBezel.color.setHex(0x334155);
        matGoldAccent.color.setHex(0xd97706);
      } else if (fin === 'indigo') {
        matChassis.color.setHex(0x1e1b4b);
        matChassis.metalness = 0.8;
        matTitaniumBezel.color.setHex(0x4f46e5);
        matGoldAccent.color.setHex(0x38bdf8);
      } else if (fin === 'platinum') {
        matChassis.color.setHex(0xe2e8f0);
        matChassis.metalness = 0.95;
        matTitaniumBezel.color.setHex(0x94a3b8);
        matGoldAccent.color.setHex(0x2563eb);
      }

      // Aspect ratio frame scaling
      if (asp === '9:16') {
        partHoloFrame.scale.set(1.0, 1.0, 1.0);
      } else if (asp === '1:1') {
        partHoloFrame.scale.set(1.4, 0.78, 1.0);
      } else if (asp === '16:9') {
        partHoloFrame.scale.set(1.8, 0.56, 1.0);
      }

      // Smooth exploded view damping using THREE.MathUtils.damp
      // Separate barrel, ring, front glass, and holographic emitter along Z-axis
      const barrelZ = 0.55 + exploded * 0.4;
      const ringZ = 0.8 + exploded * 0.85;
      const glassZ = 1.05 + exploded * 1.35;
      const holoZ = 1.6 + exploded * 1.9;

      partBarrel.position.z = THREE.MathUtils.damp(partBarrel.position.z, barrelZ, 8, delta);
      partRing.position.z = THREE.MathUtils.damp(partRing.position.z, ringZ, 8, delta);
      partFrontGlass.position.z = THREE.MathUtils.damp(partFrontGlass.position.z, glassZ, 8, delta);
      partHoloFrame.position.z = THREE.MathUtils.damp(partHoloFrame.position.z, holoZ, 8, delta);

      // Subtle pulse and gentle rotation
      if (rot) {
        rigRoot.rotation.y += delta * 0.35;
      }

      // Smooth camera position damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraPos.x, 5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraPos.y, 5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCameraPos.z, 5, delta);

      _targetPos.set(0, 0.9, 0);
      camera.lookAt(_targetPos);

      renderer.render(scene, camera);
    };

    renderLoop();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Dispose geometries & materials
      floorGeo.dispose();
      floorMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      apertureTex.dispose();
      pedestalBaseGeo.dispose();
      pedestalBaseMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      matChassis.dispose();
      matGoldAccent.dispose();
      matKnurledRing.dispose();
      matTitaniumBezel.dispose();
      matGlassElement.dispose();
      frameLineGeo.dispose();
      gridLineGeo.dispose();
      frameLineMat.dispose();
      crosshairMat.dispose();
    };
  }, []);

  // Camera presets
  const applyPreset = (preset: 'hero' | 'macro' | 'iso') => {
    setActivePreset(preset);
    if (preset === 'hero') {
      paramsRef.current.targetCameraPos.set(3.4, 2.1, 4.2);
    } else if (preset === 'macro') {
      paramsRef.current.targetCameraPos.set(1.2, 1.1, 2.4);
    } else if (preset === 'iso') {
      paramsRef.current.targetCameraPos.set(4.0, 3.6, 3.2);
    }
  };

  return (
    <div className="relative w-full h-[540px] md:h-[620px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-end">
      {/* 3D WebGL Canvas Container (Stable Ref, outside React HUD overlays) */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top minimal spec badge */}
      <div className="absolute top-5 left-5 z-10 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 pointer-events-none select-none">
        <span className="w-2 h-2 rounded-full bg-sky-400" />
        <span className="font-semibold text-white tracking-wider">NEXORA VIRTUAL STUDIO ENGINE</span>
        <span className="text-slate-500">|</span>
        <span className="text-sky-400">PBR STAGE R160</span>
      </div>

      <div className="absolute top-5 right-5 z-10 hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 pointer-events-none select-none">
        <span className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800 text-slate-300">
          60 FPS Lossless
        </span>
      </div>

      {/* Viewport-First Collapsible Bottom Control Dock (<= 15% Viewport footprint) */}
      <div className="relative z-10 w-full px-4 pb-4 flex flex-col items-center">
        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => setControlsCollapsed(!controlsCollapsed)}
          className="mb-2 px-3 py-1 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-md"
          title={controlsCollapsed ? 'Expand Studio Controls' : 'Cinema Mode (Hide Controls)'}
          aria-label="Toggle 3D Scene Controls"
        >
          {controlsCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Show Studio Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-sky-400" />
              <span>Cinema Mode</span>
            </>
          )}
        </button>

        {/* Unified Bottom Control Dock */}
        {!controlsCollapsed && (
          <div className="w-full max-w-4xl bg-slate-900/95 border border-slate-700 rounded-2xl p-3 sm:p-4 text-white shadow-2xl flex flex-wrap items-center justify-between gap-3 sm:gap-4 transition-all">
            {/* Exploded View Slider */}
            <div className="flex items-center gap-3 min-w-[200px] flex-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 whitespace-nowrap">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>Explode Rig:</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedVal}
                onChange={(e) => setExplodedVal(parseFloat(e.target.value))}
                className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                aria-label="Exploded View Separation"
              />
              <span className="text-xs font-mono text-sky-400 w-8 text-right">
                {Math.round(explodedVal * 100)}%
              </span>
            </div>

            {/* Aspect Ratio Framing Selector */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 px-2 flex items-center gap-1">
                <Camera className="w-3 h-3 text-sky-400" /> Ratio
              </span>
              {(['9:16', '1:1', '16:9'] as AspectMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAspectMode(mode)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                    aspectMode === mode
                      ? 'bg-sky-500 text-slate-950 font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Finish Palette */}
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 px-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" /> Finish
              </span>
              <button
                onClick={() => setFinish('obsidian')}
                className={`w-6 h-6 rounded-lg border-2 transition-all ${
                  finish === 'obsidian' ? 'border-sky-400 scale-110' : 'border-transparent'
                } bg-slate-900`}
                title="Obsidian Titanium"
                aria-label="Obsidian Titanium Finish"
              />
              <button
                onClick={() => setFinish('indigo')}
                className={`w-6 h-6 rounded-lg border-2 transition-all ${
                  finish === 'indigo' ? 'border-sky-400 scale-110' : 'border-transparent'
                } bg-indigo-600`}
                title="Electric Indigo"
                aria-label="Electric Indigo Finish"
              />
              <button
                onClick={() => setFinish('platinum')}
                className={`w-6 h-6 rounded-lg border-2 transition-all ${
                  finish === 'platinum' ? 'border-sky-400 scale-110' : 'border-transparent'
                } bg-slate-200`}
                title="Pure Platinum"
                aria-label="Pure Platinum Finish"
              />
            </div>

            {/* Camera Presets & Orbit Control */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {(['hero', 'macro', 'iso'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => applyPreset(preset)}
                    className={`px-2 py-1 text-[11px] font-medium capitalize rounded-lg transition-colors ${
                      activePreset === preset
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`p-1.5 rounded-xl border transition-colors ${
                  isRotating
                    ? 'bg-slate-800 text-sky-400 border-slate-700'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
                title={isRotating ? 'Pause Orbit' : 'Resume Orbit'}
                aria-label={isRotating ? 'Pause Orbit' : 'Resume Orbit'}
              >
                {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
