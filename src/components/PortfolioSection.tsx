import React, { useState } from 'react';
import { CONCEPT_PROJECTS } from '../data/agencyData.ts';
import { PortfolioProject } from '../types.ts';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  X,
  Play,
  Layers,
  Info,
  CheckCircle2,
  Tag,
  Smartphone,
  Square,
  Maximize2,
} from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'stills' | 'motion'>('all');
  const [inspectedProject, setInspectedProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = CONCEPT_PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'video') return proj.aspectRatio.includes('9:16');
    if (activeFilter === 'stills') return proj.aspectRatio.includes('1:1') || proj.deliverableType.includes('Stills');
    if (activeFilter === 'motion') return proj.deliverableType.includes('3D') || proj.deliverableType.includes('Macro');
    return true;
  });

  return (
    <section id="work" className="py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-3">
              CREATIVE ARCHIVE & SPECULATIVE LAB
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
              Concept Ad Studies
            </h2>
            <p className="text-slate-600 mt-2 max-w-xl text-base">
              Explore how we translate high-converting direct-response hooks into polished AI visual campaigns across verticals.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            {[
              { id: 'all', label: 'All Projects (6)' },
              { id: 'video', label: '9:16 Social Ads' },
              { id: 'stills', label: 'Product Stills' },
              { id: 'motion', label: '3D & Kinetic' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Transparency Banner */}
        <div className="mb-10 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start sm:items-center gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-semibold">Honest Agency Disclosure:</strong> All 6 projects showcased below are
            in-house speculative concept demonstrations designed to exhibit our multimodal generative AI capabilities,
            visual fidelity, and direct-response storyboarding. We do not fabricate third-party client testimonials or
            unverified ROAS metrics.
          </p>
        </div>

        {/* 6 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Visual Header Mockup Card */}
                <div
                  className="relative h-64 p-6 flex flex-col justify-between overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradientTheme.accent} 0%, #0f172a 100%)`,
                  }}
                >
                  {/* Subtle Geometric Wireframe Grid Overlay */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md bg-black/50 text-white backdrop-blur-md border border-white/20">
                      {project.aspectRatio}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-amber-400/90 text-slate-950 font-bold uppercase">
                      Concept
                    </span>
                  </div>

                  {/* Center Visual Art Card representation */}
                  <div className="relative z-10 text-center my-auto py-2">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono mb-2">
                      {project.clientCategory}
                    </div>
                    <div className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight drop-shadow-md">
                      "{project.hookHeadline}"
                    </div>
                  </div>

                  {/* Bottom Format Indicators */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-white/80">
                    <span className="font-mono text-[11px]">{project.deliverableType}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <span className="text-[11px]">AI Generated Asset</span>
                    </div>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{project.clientCategory}</span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
                    {project.synopsis}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Target Channels:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Inspect Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setInspectedProject(project)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Deconstruct Creative Blueprint</span>
                  <Maximize2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      {inspectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <button
              onClick={() => setInspectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Speculative disclaimer badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                Speculative Concept Study
              </span>
              <span className="text-xs font-mono text-slate-500">
                {inspectedProject.aspectRatio}
              </span>
            </div>

            <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mb-2">
              {inspectedProject.title}
            </h3>

            <div className="text-sm font-medium text-indigo-600 mb-6">
              Vertical: {inspectedProject.clientCategory} | Format: {inspectedProject.deliverableType}
            </div>

            {/* Hook Headline Showcase Card */}
            <div
              className="p-6 rounded-2xl mb-6 text-white"
              style={{
                background: `linear-gradient(135deg, ${inspectedProject.gradientTheme.accent} 0%, #090d16 100%)`,
              }}
            >
              <div className="text-xs font-mono uppercase tracking-widest text-sky-300 mb-2">
                Core 3-Second Scroll Hook
              </div>
              <div className="text-xl sm:text-2xl font-heading font-bold mb-3">
                "{inspectedProject.hookHeadline}"
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {inspectedProject.synopsis}
              </p>
            </div>

            {/* Visual Concept & Staging */}
            <div className="mb-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-heading font-bold text-slate-700 uppercase tracking-wider mb-2">
                Generative Visual Direction & Lighting Staging
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {inspectedProject.visualConcept}
              </p>
            </div>

            {/* Creative Strategy & Psychology */}
            <div className="mb-6">
              <h4 className="text-xs font-heading font-bold text-slate-700 uppercase tracking-wider mb-3">
                Direct-Response Testing Angles
              </h4>
              <div className="space-y-2.5">
                {inspectedProject.creativeStrategy.map((strat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{strat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Copy Sample breakdown */}
            <div className="mb-8 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
              <h4 className="text-xs font-heading font-bold text-indigo-900 uppercase tracking-wider mb-3">
                Companion Direct-Response Ad Copy Breakdown
              </h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-slate-900">Hook Sentence: </span>
                  <span className="text-slate-700">"{inspectedProject.adCopySample.hook}"</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Value Proposition Body: </span>
                  <span className="text-slate-700">{inspectedProject.adCopySample.body}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Primary CTA: </span>
                  <span className="text-indigo-700 font-bold">"{inspectedProject.adCopySample.cta}"</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-mono">
                Asset Code: {inspectedProject.id.toUpperCase()}
              </span>
              <button
                onClick={() => setInspectedProject(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
