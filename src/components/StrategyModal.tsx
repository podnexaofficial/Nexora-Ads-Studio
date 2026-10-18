import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { SERVICES, AGENCY_CONFIG } from '../data/agencyData.ts';

interface StrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StrategyModal: React.FC<StrategyModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    serviceInterest: SERVICES[0]?.title || 'AI Video Ads & Motion Spots',
    preferredDate: '',
    preferredTimeSlot: '11:00 AM - 11:30 AM EST',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [successBookingId, setSuccessBookingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name || !formData.email || !formData.businessName || !formData.preferredDate) {
      setErrorMsg('Please complete all required fields (name, email, brand, and date).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/strategy-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to reserve strategy session. Please try again.');
      }

      setSuccessBookingId(data.bookingId || `CALL-${Math.floor(10000 + Math.random() * 90000)}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred while reserving call.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessBookingId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="strategy-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {successBookingId ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs mb-3">
              Confirmed Reservation #{successBookingId}
            </div>

            <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-2">
              Strategy Session Reserved!
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
              We have booked your 30-minute creative audit for <strong className="text-slate-900">{formData.businessName}</strong>. A calendar invite has been dispatched to <strong className="text-slate-900">{formData.email}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-700 space-y-1.5 mb-6">
              <div className="font-semibold text-slate-900">Agenda for your 30-min call:</div>
              <div>• Teardown of your top 3 competitor ad angles</div>
              <div>• 5 rapid AI hook hypotheses custom-tailored to your product</div>
              <div>• Budget pacing & creative production timeline review</div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-mono font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>30-MINUTE 1-ON-1 CREATIVE AUDIT</span>
            </div>

            <h3 id="strategy-modal-title" className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mb-2">
              Book a Free Strategy Call
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
              Meet directly with a Senior Creative Director. No aggressive sales pitches—just an honest audit of your current ad assets and specific AI-driven scaling opportunities.
            </p>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jordan Lee"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jordan@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Apex Apparel"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Primary Service Focus
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="General Creative Audit">General Creative & Media Audit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Time Window (US & Global)
                  </label>
                  <select
                    value={formData.preferredTimeSlot}
                    onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="10:00 AM - 10:30 AM EST">10:00 AM EST (7:00 AM PST)</option>
                    <option value="11:30 AM - 12:00 PM EST">11:30 AM EST (8:30 AM PST)</option>
                    <option value="2:00 PM - 2:30 PM EST">2:00 PM EST (11:00 AM PST)</option>
                    <option value="4:00 PM - 4:30 PM EST">4:00 PM EST (1:00 PM PST)</option>
                    <option value="Evening / APAC Window">Evening Window (8:00 PM EST / SGT)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                  What is your biggest creative frustration right now?
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Meta CPA rising after 2 weeks, need UGC creators faster, high shoot costs..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Locking In Calendar Slot...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Free Strategy Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
