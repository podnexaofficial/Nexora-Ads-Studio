import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/agencyData.ts';
import { PricingPlan } from '../types.ts';
import {
  Check,
  Sparkles,
  ArrowRight,
  Sliders,
  Calculator,
  HelpCircle,
  Clock,
  RotateCcw,
} from 'lucide-react';

interface PricingSectionProps {
  onSelectPlanForContact: (planName: string, estimatedBudget: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlanForContact }) => {
  // Custom Quote Estimator State
  const [customVideos, setCustomVideos] = useState(16);
  const [customStills, setCustomStills] = useState(8);
  const [includeMediaBuying, setIncludeMediaBuying] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Meta', 'TikTok']);

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  // Calculate dynamic custom quote
  const baseRate = 800; // base studio overhead
  const videoCost = customVideos * 160;
  const stillsCost = customStills * 90;
  const platformSurcharge = (selectedPlatforms.length - 1) * 250;
  const mediaBuyingCost = includeMediaBuying ? 1400 : 0;
  const totalCustomEstimate = baseRate + videoCost + stillsCost + platformSurcharge + mediaBuyingCost;

  const handleSelectPackage = (plan: PricingPlan) => {
    onSelectPlanForContact(plan.name, `$${plan.price.toLocaleString()} / month`);
    const elem = document.getElementById('contact');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyCustomQuote = () => {
    const budgetCategory =
      totalCustomEstimate < 3000
        ? '$2,000 - $3,500 / month'
        : totalCustomEstimate < 6000
        ? '$3,500 - $6,000 / month'
        : '$6,000 - $10,000+ / month';

    onSelectPlanForContact(
      `Custom Tier (${customVideos} videos, ${customStills} stills on ${selectedPlatforms.join(', ')})`,
      budgetCategory
    );
    const elem = document.getElementById('contact');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            TRANSPARENT VALUE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-4">
            Predictable Retainers. No Hidden Surprises.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            All plans include full commercial copyright ownership, dedicated Slack communication, and human senior art direction. Switch or pause anytime with 14-day notice.
          </p>
        </div>

        {/* 3 Core Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.badge === 'Most Popular';
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  isPopular
                    ? 'bg-slate-950 text-white shadow-2xl ring-2 ring-indigo-500 lg:-translate-y-2'
                    : 'bg-slate-50/70 text-slate-900 border border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 text-white text-xs font-bold tracking-wide uppercase shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-2xl font-heading font-bold ${isPopular ? 'text-white' : 'text-slate-900'}`}>
                      {plan.name}
                    </h3>
                    {plan.badge && !isPopular && (
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className={`text-sm mb-6 ${isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>

                  {/* Price display */}
                  <div className="mb-6 pb-6 border-b border-slate-700/50">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">
                        ${plan.price.toLocaleString()}
                      </span>
                      <span className={`text-sm ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                        / month
                      </span>
                    </div>
                    <div className={`text-xs mt-1.5 font-medium ${isPopular ? 'text-sky-300' : 'text-indigo-600'}`}>
                      {plan.idealFor}
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-3 mb-8">
                    <div className={`text-xs font-semibold uppercase tracking-wider ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                      Included Deliverables:
                    </div>
                    {plan.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-sky-400' : 'text-indigo-600'}`} />
                        <span className={isPopular ? 'text-slate-200' : 'text-slate-700'}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div>
                  <div className={`text-xs mb-4 flex items-center gap-1.5 ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{plan.turnaroundTime}</span>
                  </div>

                  <button
                    onClick={() => handleSelectPackage(plan)}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 group ${
                      isPopular
                        ? 'bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold'
                        : 'bg-slate-900 hover:bg-indigo-600 text-white'
                    }`}
                  >
                    <span>Select {plan.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Custom Quote Estimator */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2.5 text-xs font-mono text-sky-400 uppercase tracking-widest mb-3">
              <Calculator className="w-4 h-4" />
              <span>INTERACTIVE CUSTOM ESTIMATOR</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-2">
              Need a Custom Volume or Specialized Mix?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Adjust your desired monthly video volume, product stills, target ad networks, and media management to view an immediate estimated pricing model.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders & Checkboxes */}
              <div className="lg:col-span-7 space-y-6">
                {/* Videos Slider */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-300">Monthly AI Video Creatives:</span>
                    <span className="font-mono text-sky-400 text-base">{customVideos} Videos</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="48"
                    step="2"
                    value={customVideos}
                    onChange={(e) => setCustomVideos(parseInt(e.target.value))}
                    className="w-full accent-sky-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                    <span>4 (Pilot)</span>
                    <span>24 (Active Growth)</span>
                    <span>48 (Enterprise Volume)</span>
                  </div>
                </div>

                {/* Stills Slider */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-300">AI Product Photography Stills:</span>
                    <span className="font-mono text-indigo-400 text-base">{customStills} Stills</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="2"
                    value={customStills}
                    onChange={(e) => setCustomStills(parseInt(e.target.value))}
                    className="w-full accent-indigo-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                    <span>0</span>
                    <span>14 Staged Sets</span>
                    <span>30 Catalog Stills</span>
                  </div>
                </div>

                {/* Platform Toggles */}
                <div>
                  <div className="text-sm font-semibold text-slate-300 mb-2">
                    Target Ad Channels:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Meta (IG & FB)', 'TikTok', 'YouTube Shorts', 'Amazon Ads'].map((platform) => {
                      const active = selectedPlatforms.includes(platform);
                      return (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => togglePlatform(platform)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                            active
                              ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-semibold'
                              : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          {platform}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Paid Media Management Addon */}
                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 cursor-pointer hover:bg-slate-800 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeMediaBuying}
                    onChange={(e) => setIncludeMediaBuying(e.target.checked)}
                    className="w-4 h-4 accent-indigo-500 rounded"
                  />
                  <div className="text-xs sm:text-sm">
                    <span className="font-semibold text-white">Add Full Paid Media Buying Management</span>
                    <span className="text-slate-400 ml-1.5">(+$1,400/mo - Daily optimization, bid caps & pixel audits)</span>
                  </div>
                </label>
              </div>

              {/* Dynamic Output Box */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between text-center">
                <div>
                  <div className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-1">
                    Estimated Monthly Investment
                  </div>
                  <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white my-3">
                    ${totalCustomEstimate.toLocaleString()}
                  </div>
                  <div className="text-xs text-sky-400 font-medium mb-6">
                    Includes {customVideos} video cuts, {customStills} product stills across {selectedPlatforms.length} networks
                  </div>
                </div>

                <button
                  onClick={handleApplyCustomQuote}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-sky-500/10 flex items-center justify-center gap-2"
                >
                  <span>Apply Estimate to Proposal Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
