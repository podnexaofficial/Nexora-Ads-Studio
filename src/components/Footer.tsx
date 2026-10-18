import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData.ts';
import {
  ArrowRight,
  Mail,
  Phone,
  MessageSquare,
  Shield,
  ArrowUp,
  Sparkles,
  Layers,
} from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
  onOpenCookiesModal: () => void;
  onOpenStrategyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyModal,
  onOpenTermsModal,
  onOpenCookiesModal,
  onOpenStrategyModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      {/* Final Call to Action Section */}
      <div className="py-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-slate-950 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-6">
            TRANSFORM YOUR CREATIVE PIPELINE
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight mb-6">
            Ready to out-test, out-create, and out-scale your competition?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Stop waiting 6 weeks for standard commercial edits. Partner with NEXORA ADS STUDIO to generate high-converting creative volume in 5 to 7 days.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenStrategyModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-300 hover:from-sky-300 hover:to-indigo-200 shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-2 text-base group"
            >
              <span>Book a Free Strategy Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all text-base flex items-center justify-center gap-2"
            >
              <span>Submit a Project Brief</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation & Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center font-heading font-black text-white text-base">
                N
              </div>
              <span className="font-heading font-extrabold text-lg tracking-wider text-white">
                NEXORA ADS STUDIO
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AI-powered creative. Human-led growth. We produce high-converting social video ads, photorealistic virtual product photography, and performance campaign creative for modern brands.
            </p>

            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <div>{AGENCY_CONFIG.location}</div>
              <div>Operating Hours: {AGENCY_CONFIG.hours}</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-heading font-bold text-slate-200 uppercase tracking-wider mb-4">
              Explore Studio
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services & Scopes</a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">Concept Ad Studies</a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">Four-Step Pipeline</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">Agency Ethos & Values</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">Transparent Retainers</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Commercial FAQ</a>
              </li>
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <div className="text-xs font-heading font-bold text-slate-200 uppercase tracking-wider mb-4">
              Core Formats
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>AI Video Ads (9:16 & 1:1)</li>
              <li>AI UGC-Style Creatives</li>
              <li>Virtual Product Photography</li>
              <li>Ad Copy & Angle Testing</li>
              <li>Paid Ad Management</li>
              <li>Fatigue Prevention Sprints</li>
            </ul>
          </div>

          {/* Contact & Direct Channels */}
          <div>
            <div className="text-xs font-heading font-bold text-slate-200 uppercase tracking-wider mb-4">
              Direct Contact
            </div>
            <div className="space-y-3 text-sm text-slate-400">
              <div>
                <div className="text-[11px] text-slate-500 uppercase">Official Email</div>
                <a
                  href={`mailto:${AGENCY_CONFIG.officialEmail}`}
                  className="text-white hover:text-sky-400 transition-colors font-medium break-all"
                >
                  {AGENCY_CONFIG.officialEmail}
                </a>
              </div>

              <div>
                <div className="text-[11px] text-slate-500 uppercase">WhatsApp Desk</div>
                <a
                  href={AGENCY_CONFIG.whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400 transition-colors font-medium"
                >
                  {AGENCY_CONFIG.officialPhone}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Legal Strip */}
        <div className="pt-12 mt-12 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {AGENCY_CONFIG.legalName}. All rights reserved. 100% Commercial IP client assignment.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-slate-300 transition-colors focus:outline-none"
            >
              Privacy & Data Ethics
            </button>
            <button
              onClick={onOpenTermsModal}
              className="hover:text-slate-300 transition-colors focus:outline-none"
            >
              Terms of Engagement
            </button>
            <button
              onClick={onOpenCookiesModal}
              className="hover:text-slate-300 transition-colors focus:outline-none"
            >
              Privacy Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
