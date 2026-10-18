import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Layers, Play } from 'lucide-react';
import { ThreeStudioStage } from './ThreeStudioStage.tsx';

interface HeroProps {
  onOpenStrategyModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenStrategyModal }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-600/15 to-sky-500/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm font-medium text-slate-200 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="font-semibold tracking-wide text-sky-400">AI-POWERED CREATIVE.</span>
            <span className="text-slate-400">HUMAN-LED GROWTH.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
            Ads that make people{' '}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
              stop, look,
            </span>{' '}
            and take action.
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            We partner with ambitious e-commerce brands, fast-moving startups, and growing businesses to produce high-converting AI video ads, photorealistic virtual sets, and performance creative sprints at 10x traditional speed.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={onOpenStrategyModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-300 hover:from-sky-300 hover:to-indigo-200 shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-2.5 text-base group"
            >
              <span>Book a Free Strategy Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#work"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all text-base flex items-center justify-center gap-2"
            >
              <span>Explore Our Work</span>
            </a>
          </div>

          {/* Trust & Transparency Badges */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>5–7 Day Turnarounds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Commercial IP Rights</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Human Senior Art Direction</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span>No Fabricated ROAS Claims</span>
            </div>
          </div>
        </div>

        {/* Interactive Three.js 3D Virtual Studio Stage */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Interactive 3D Virtual Stage: Real-Time Procedural Camera Engine</span>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Drag to orbit | Use bottom dock to explode & switch aspect ratios
            </span>
          </div>

          <ThreeStudioStage />
        </div>
      </div>
    </section>
  );
};
