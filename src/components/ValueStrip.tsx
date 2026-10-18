import React from 'react';
import { Zap, Shield, Sparkles, Target, Layers, ArrowUpRight } from 'lucide-react';

export const ValueStrip: React.FC = () => {
  const pillars = [
    {
      title: 'Generative Velocity',
      desc: 'Rapid testing of hooks and concepts in days, not months. Eliminate 8-week production bottlenecks.',
      icon: Zap,
      stat: '5–7 Days',
      statLabel: 'Average First Delivery',
    },
    {
      title: 'Commercial Art Direction',
      desc: 'Never generic "AI slop". Senior art directors refine typography, lighting gradients, color-grading, and motion pacing.',
      icon: Sparkles,
      stat: '100% Human',
      statLabel: 'Executive Polish & QC',
    },
    {
      title: 'Platform-Native Engineering',
      desc: 'Engineered specifically for TikTok algorithms, Meta Reels, YouTube Shorts, and high-CTR Amazon storefronts.',
      icon: Layers,
      stat: 'Multi-Ratio',
      statLabel: '9:16, 1:1, & 16:9 Cuts',
    },
    {
      title: 'Conversion-First Psychology',
      desc: 'Every visual cue, hook transition, and psychological trigger is designed to defend watch-time and generate buyers.',
      icon: Target,
      stat: 'Direct Response',
      statLabel: 'Audience-Tested Hooks',
    },
  ];

  const targetAudiences = [
    'DTC & E-Commerce Brands',
    'Venture-Backed Startups',
    'Regional & Local Businesses',
    'High-Growth Scaleups',
  ];

  return (
    <section className="bg-white text-slate-900 py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Target Audience Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12 border-b border-slate-200">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
            BUILT FOR MODERN GROWTH TEAMS
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {targetAudiences.map((audience) => (
              <span
                key={audience}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-700"
              >
                {audience}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-300 transition-all hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/80">
                  <div className="text-base font-heading font-extrabold text-indigo-600">
                    {pillar.stat}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {pillar.statLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
