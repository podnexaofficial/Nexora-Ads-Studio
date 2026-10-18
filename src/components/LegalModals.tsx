import React from 'react';
import { X, ShieldCheck, FileText, Lock, Cookie, Check } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData.ts';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'cookies' | null;
  onClose: () => void;
  analyticsConsent: boolean;
  onToggleAnalytics: (allowed: boolean) => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({
  type,
  onClose,
  analyticsConsent,
  onToggleAnalytics,
}) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[85vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-3">
              <Lock className="w-5 h-5" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                DATA CONFIDENTIALITY & ETHICS
              </span>
            </div>

            <h3 id="legal-modal-title" className="text-2xl font-heading font-extrabold text-slate-900 mb-4">
              Privacy Policy & AI Data Protection
            </h3>

            <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
              <p>
                At <strong>{AGENCY_CONFIG.legalName}</strong>, we respect your brand's confidentiality and intellectual property. We treat all product briefs, pre-launch photography, 3D CAD assets, and direct-response performance figures with enterprise-grade privacy safeguards.
              </p>

              <h4 className="font-heading font-bold text-slate-900 text-base">
                1. AI Model Training Safeguard
              </h4>
              <p>
                We execute all multimodal AI model interactions through enterprise API agreements that prohibit public model training. Your proprietary product designs, logo marks, and scripts are never used to train public models.
              </p>

              <h4 className="font-heading font-bold text-slate-900 text-base">
                2. Information We Collect
              </h4>
              <p>
                We only collect contact information, brand URLs, budget criteria, and creative briefs that you explicitly submit through our strategy call and proposal forms.
              </p>

              <h4 className="font-heading font-bold text-slate-900 text-base">
                3. Non-Disclosure & Data Retention
              </h4>
              <p>
                All inquiries are stored within private, secure databases. You may request complete erasure of your business briefs and uploaded product assets at any time by emailing{' '}
                <a href={`mailto:${AGENCY_CONFIG.officialEmail}`} className="text-indigo-600 underline">
                  {AGENCY_CONFIG.officialEmail}
                </a>.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Close Privacy Policy
              </button>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-3">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                CLIENT TERMS OF ENGAGEMENT
              </span>
            </div>

            <h3 id="legal-modal-title" className="text-2xl font-heading font-extrabold text-slate-900 mb-4">
              Terms of Service & Commercial Rights
            </h3>

            <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
              <h4 className="font-heading font-bold text-slate-900 text-base">
                1. 100% Commercial IP Rights Assignment
              </h4>
              <p>
                Upon settlement of monthly retainer or project sprint invoice, {AGENCY_CONFIG.legalName} transfers 100% of exclusive, perpetual, global commercial rights to all delivered final video files, static renders, scripts, and ad copy. We do not impose residual licensing fees.
              </p>

              <h4 className="font-heading font-bold text-slate-900 text-base">
                2. Transparent Portfolio Demonstration
              </h4>
              <p>
                All 6 portfolio projects currently exhibited on this site are clearly documented as speculative concept demonstrations produced in-house. For live client engagements, client work is only showcased with prior written authorization.
              </p>

              <h4 className="font-heading font-bold text-slate-900 text-base">
                3. Revision & Cancellation Terms
              </h4>
              <p>
                Monthly creative subscriptions may be paused or canceled with 14 calendar days written notice prior to the next billing cycle. Revisions are completed within the designated turnarounds outlined in each plan tier.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Accept & Close Terms
              </button>
            </div>
          </div>
        )}

        {type === 'cookies' && (
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-3">
              <Cookie className="w-5 h-5" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                PRIVACY PREFERENCES
              </span>
            </div>

            <h3 id="legal-modal-title" className="text-2xl font-heading font-extrabold text-slate-900 mb-4">
              Cookie & Analytics Controls
            </h3>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              We respect your right to privacy. We do not use third-party behavioral ad trackers or cross-site fingerprinting. You can control lightweight operational telemetry below:
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900">Essential Technical Storage</div>
                  <div className="text-xs text-slate-500">Required for 3D engine controls, form security & spam prevention.</div>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-600 px-2 py-1 rounded bg-emerald-50">
                  Always Active
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900">Anonymous Performance Metrics</div>
                  <div className="text-xs text-slate-500">Allows us to assess page loading speed and 3D WebGL render efficiency.</div>
                </div>
                <button
                  onClick={() => onToggleAnalytics(!analyticsConsent)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    analyticsConsent ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                  aria-label="Toggle anonymous performance metrics"
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      analyticsConsent ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
