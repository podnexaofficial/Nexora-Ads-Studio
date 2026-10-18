import React from 'react';
import { PROCESS_STEPS } from '../data/agencyData.ts';
import { Search, Wand2, CheckSquare, LineChart, ArrowRight } from 'lucide-react';

const stepIcons = [Search, Wand2, CheckSquare, LineChart];

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-widest mb-4">
            AGILE CREATIVE PIPELINE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-4">
            Four Steps from Brief to Market-Ready Creative
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A battle-tested production rhythm that pairs computational iteration speed with stringent art direction and data-driven feedback loops.
          </p>
        </div>

        {/* 4 Steps Timeline / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {PROCESS_STEPS.map((item, index) => {
            const Icon = stepIcons[index] || Search;
            return (
              <div
                key={item.step}
                className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/90 relative flex flex-col justify-between hover:border-indigo-400 hover:shadow-lg transition-all group"
              >
                <div>
                  {/* Top Step Number & Duration */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-300 group-hover:text-indigo-600 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                      {item.duration}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all mb-4 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Key Deliverable
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {item.deliverable}
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
