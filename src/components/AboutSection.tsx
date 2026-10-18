import React from 'react';
import { VALUE_PROPOSITIONS, AGENCY_CONFIG } from '../data/agencyData.ts';
import { ShieldCheck, Zap, Target, Award, CheckCircle, ArrowRight } from 'lucide-react';

const propIcons: Record<string, React.ElementType> = {
  Zap,
  Target,
  ShieldCheck,
  Award,
};

interface AboutSectionProps {
  onOpenStrategyModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenStrategyModal }) => {
  return (
    <section id="about" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Story & Philosophy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6">
              OUR ETHOS & PURPOSE
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight mb-6">
              The sweet spot between high-budget commercial art and modern generative velocity.
            </h2>

            <div className="space-y-4 text-slate-300 text-base leading-relaxed mb-8">
              <p>
                For decades, commercial-grade advertising required $50,000 production crews, studio stage leases, multi-week edits, and painful delays that crippled modern direct-response feedback loops.
              </p>
              <p>
                Then generative AI arrived, flooding social feeds with uncanny, cheap, and off-brand visuals. We founded <strong className="text-white font-semibold">NEXORA ADS STUDIO</strong> to fix both extremes.
              </p>
              <p>
                By placing the most advanced multimodal AI models into the hands of battle-tested art directors and performance media strategists, we deliver prestige commercial assets at the speed modern growth marketing demands.
              </p>
            </div>

            {/* Studio Pillars Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                'Zero Fluff & Zero Fake ROAS Claims',
                'Full Commercial IP Ownership',
                'Human Art Direction on Every Pixel',
                'Direct Slack Collaboration',
              ].map((bullet) => (
                <div key={bullet} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenStrategyModal}
              className="px-6 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-sky-500/10 flex items-center gap-2"
            >
              <span>Schedule Creative Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: 4 Core Value Propositions */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
              WHY MODERN TEAMS CHOOSE NEXORA
            </div>

            {VALUE_PROPOSITIONS.map((prop, idx) => {
              const Icon = propIcons[prop.icon] || ShieldCheck;
              return (
                <div
                  key={prop.title}
                  className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-500 transition-all flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-sky-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-white mb-1.5">
                      {prop.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {prop.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
