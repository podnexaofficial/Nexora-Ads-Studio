import React, { useState, useEffect } from 'react';
import { ContactFormData } from '../types.ts';
import { SERVICES, AGENCY_CONFIG } from '../data/agencyData.ts';
import {
  Send,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Shield,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
  preselectedBudget?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedService,
  preselectedBudget,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    businessName: '',
    email: '',
    websiteOrSocial: '',
    service: SERVICES[0]?.title || 'AI Video Ads & Motion Spots',
    estimatedBudget: '$3,500 - $6,000 / month',
    projectDetails: '',
    honeypot: '', // invisible honeypot field
    formStartTime: Date.now(),
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionReference, setSubmissionReference] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState(false);

  // Sync preselected values from pricing or services
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedBudget) {
      setFormData((prev) => ({ ...prev, estimatedBudget: preselectedBudget }));
    }
  }, [preselectedBudget]);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your full name (minimum 2 characters).';
    }

    if (!formData.businessName.trim() || formData.businessName.trim().length < 2) {
      errors.businessName = 'Please enter your brand or company name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid work email address.';
    }

    if (!formData.projectDetails.trim() || formData.projectDetails.trim().length < 15) {
      errors.projectDetails = 'Please share at least 15 characters describing your product or creative goals.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmissionReference(data.referenceId || `NX-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Network error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (!submissionReference) return;
    navigator.clipboard.writeText(submissionReference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      businessName: '',
      email: '',
      websiteOrSocial: '',
      service: SERVICES[0]?.title || 'AI Video Ads & Motion Spots',
      estimatedBudget: '$3,500 - $6,000 / month',
      projectDetails: '',
      honeypot: '',
      formStartTime: Date.now(),
    });
    setFieldErrors({});
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return (
    <section id="contact" className="py-24 bg-white text-slate-900 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact & Guarantees */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-4">
                COMMENCE CREATIVE SPRINT
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-4">
                Let's Build Ads That Actually Convert.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-8">
                Share a few details about your product and campaign goals. Our strategy team will review your brand, diagnose current ad opportunities, and reply within 24 business hours.
              </p>

              {/* Verified Contact Cards */}
              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${AGENCY_CONFIG.officialEmail}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Direct Inquiries & Briefs</div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {AGENCY_CONFIG.officialEmail}
                    </div>
                  </div>
                </a>

                <a
                  href={AGENCY_CONFIG.whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">WhatsApp Onboarding Desk</div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {AGENCY_CONFIG.officialPhone}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/90">
                  <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Studio Timezones & Response Time</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {AGENCY_CONFIG.hours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & IP guarantee footer */}
            <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>NDA & Client Data Safeguard</span>
              </div>
              <p>
                All submitted briefs, product files, and campaign assets are governed by strict confidentiality. We never train public AI models on your private assets.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Form or Success Card */}
          <div className="lg:col-span-7">
            {submitSuccess ? (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mb-2">
                  Creative Brief Received!
                </h3>

                <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our strategy director will review <strong className="text-slate-900">{formData.businessName}</strong>'s brief and formulate tailored creative hooks.
                </p>

                {/* Reference ID card */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 max-w-sm mx-auto mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono uppercase text-slate-500 text-left">Tracking Reference ID</div>
                    <div className="text-base font-mono font-bold text-indigo-600">{submissionReference}</div>
                  </div>
                  <button
                    onClick={handleCopyRef}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    title="Copy Reference ID"
                    aria-label="Copy Reference ID"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* What happens next */}
                <div className="text-left bg-white p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2 mb-8 max-w-lg mx-auto">
                  <div className="font-heading font-bold text-slate-900 uppercase text-xs tracking-wider">
                    Next 24 Hours:
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-sky-500">1.</span>
                    <span>Competitor creative teardown & angle audit by our lead strategist.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-sky-500">2.</span>
                    <span>Direct email response with preliminary hook angles and scheduling options.</span>
                  </div>
                </div>

                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-slate-50/90 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-5"
                noValidate
              >
                {/* Honeypot Spam Trap (Hidden from genuine humans) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_honeypot">Website Honeypot</label>
                  <input
                    type="text"
                    id="website_honeypot"
                    name="website_honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                {submitError && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Name & Business Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-heading font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                        fieldErrors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                      Business or Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Aura Naturals Co."
                      value={formData.businessName}
                      onChange={(e) => {
                        setFormData({ ...formData, businessName: e.target.value });
                        if (fieldErrors.businessName) setFieldErrors({ ...fieldErrors, businessName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                        fieldErrors.businessName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {fieldErrors.businessName && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.businessName}</p>
                    )}
                  </div>
                </div>

                {/* Work Email & Website Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-heading font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                      Work Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@auranaturals.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                        fieldErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                      Website or Social Handle <span className="text-slate-400 normal-case font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="auranaturals.com or @auranaturals"
                      value={formData.websiteOrSocial}
                      onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Service Dropdown & Estimated Budget Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-heading font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                      Primary Service Category *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Full Creative Retainer">Full Creative Retainer (Videos + UGC + Stills)</option>
                      <option value="Custom Strategic Sprint">Custom Strategic Sprint</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                      Estimated Monthly Budget *
                    </label>
                    <select
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="$2,000 - $3,500 / month">$2,000 - $3,500 / month (Starter)</option>
                      <option value="$3,500 - $6,000 / month">$3,500 - $6,000 / month (Growth Engine)</option>
                      <option value="$6,000 - $12,000+ / month">$6,000 - $12,000+ / month (Full Partner)</option>
                      <option value="Pilot Sprint ($1,800 one-time)">Pilot Sprint ($1,800 one-time test)</option>
                      <option value="Custom Scope / Enterprise">Custom Scope / Enterprise</option>
                    </select>
                  </div>
                </div>

                {/* Project Details Textarea */}
                <div>
                  <label className="block text-xs font-heading font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                    Project Goals, Products, or Creative Challenges *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your hero product, your target customer demographic, the ad channels you want to dominate, and current bottlenecks you are facing..."
                    value={formData.projectDetails}
                    onChange={(e) => {
                      setFormData({ ...formData, projectDetails: e.target.value });
                      if (fieldErrors.projectDetails) setFieldErrors({ ...fieldErrors, projectDetails: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      fieldErrors.projectDetails ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {fieldErrors.projectDetails && (
                    <p className="text-xs text-rose-600 mt-1">{fieldErrors.projectDetails}</p>
                  )}
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Transmitting Brief to Strategy Desk...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Creative Brief for Review</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <div className="text-center text-[11px] text-slate-500 mt-2 font-medium">
                    Guaranteed response within 24 business hours • 100% confidential NDA protection
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
