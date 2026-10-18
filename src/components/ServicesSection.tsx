import React, { useState } from 'react';
import { SERVICES } from '../data/agencyData.ts';
import { ServiceItem } from '../types.ts';
import {
  Video,
  Users,
  Camera,
  FileText,
  BarChart3,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  X,
  Clock,
  Sparkles,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Video,
  Users,
  Camera,
  FileText,
  BarChart3,
  TrendingUp,
};

interface ServicesSectionProps {
  onSelectServiceForProposal: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForProposal }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenDetail = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleCloseDetail = () => {
    setSelectedService(null);
  };

  const handleInquireFromModal = (serviceTitle: string) => {
    handleCloseDetail();
    onSelectServiceForProposal(serviceTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            CAPABILITIES & SPECIALIZATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-4">
            High-Performance Creative Systems
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminate creative exhaustion. We deploy specialized multimodal AI workflows governed by commercial art directors to deliver assets that capture attention and drive bottom-line conversions.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.iconName] || Video;
            return (
              <div
                key={service.id}
                className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/90 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Short Desc */}
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Key Deliverables bullet list */}
                  <div className="space-y-2 mb-6">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">
                    {service.turnaround}
                  </div>
                  <button
                    onClick={() => handleOpenDetail(service)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group/btn focus:outline-none"
                    aria-label={`View details for ${service.title}`}
                  >
                    <span>Scope Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-service-title"
          >
            <button
              onClick={handleCloseDetail}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-mono font-semibold mb-3">
              {selectedService.badge}
            </div>

            <h3 id="modal-service-title" className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mb-3">
              {selectedService.title}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {selectedService.shortDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-semibold uppercase mb-1">Standard Turnaround</div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-500" />
                  <span>{selectedService.turnaround}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-semibold uppercase mb-1">Primary Performance Metric</div>
                <div className="text-sm font-bold text-indigo-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>{selectedService.metricFocus}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-heading font-bold text-slate-900 uppercase tracking-wide mb-3">
                Full Deliverables Scope
              </h4>
              <ul className="space-y-2.5">
                {selectedService.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
              <div className="text-xs font-semibold text-indigo-900 uppercase mb-1">Ideal For</div>
              <p className="text-xs text-indigo-800 leading-relaxed">
                {selectedService.idealFor}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleCloseDetail}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => handleInquireFromModal(selectedService.title)}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Request Creative Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
