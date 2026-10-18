import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ValueStrip } from './components/ValueStrip.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { PortfolioSection } from './components/PortfolioSection.tsx';
import { ProcessSection } from './components/ProcessSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { StrategyModal } from './components/StrategyModal.tsx';
import { LegalModals } from './components/LegalModals.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  // States for pre-populating contact form from pricing/services selections
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [preselectedBudget, setPreselectedBudget] = useState<string>('');

  // Handle reduced motion toggle
  const handleToggleReducedMotion = () => {
    setIsReducedMotion((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
      return next;
    });
  };

  const handleSelectServiceForProposal = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
  };

  const handleSelectPlanForContact = (planName: string, estimatedBudget: string) => {
    setPreselectedService(`Retainer Tier: ${planName}`);
    setPreselectedBudget(estimatedBudget);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-600 selection:text-white ${isReducedMotion ? 'reduced-motion' : ''}`}>
      {/* Sticky Header */}
      <Navbar
        onOpenStrategyModal={() => setStrategyModalOpen(true)}
        onOpenPrivacyModal={() => setLegalModalType('privacy')}
        isReducedMotion={isReducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero with 3D Three.js Studio Experience */}
        <Hero onOpenStrategyModal={() => setStrategyModalOpen(true)} />

        {/* Value Statement Strip & Pillars */}
        <ValueStrip />

        {/* 6 Core Agency Services */}
        <ServicesSection onSelectServiceForProposal={handleSelectServiceForProposal} />

        {/* Concept Ad Portfolio (6 Studies) */}
        <PortfolioSection />

        {/* 4-Step Creative Pipeline */}
        <ProcessSection />

        {/* About & 4 Core Value Propositions */}
        <AboutSection onOpenStrategyModal={() => setStrategyModalOpen(true)} />

        {/* Retainers & Interactive Custom Quote Estimator */}
        <PricingSection onSelectPlanForContact={handleSelectPlanForContact} />

        {/* FAQ with Search & Category Accordion */}
        <FaqSection />

        {/* Lead Generation Contact Form (Full Stack API) */}
        <ContactSection
          preselectedService={preselectedService}
          preselectedBudget={preselectedBudget}
        />
      </main>

      {/* Footer with Final CTA & Navigation */}
      <Footer
        onOpenPrivacyModal={() => setLegalModalType('privacy')}
        onOpenTermsModal={() => setLegalModalType('terms')}
        onOpenCookiesModal={() => setLegalModalType('cookies')}
        onOpenStrategyModal={() => setStrategyModalOpen(true)}
      />

      {/* Strategy Call Reservation Modal */}
      <StrategyModal
        isOpen={strategyModalOpen}
        onClose={() => setStrategyModalOpen(false)}
      />

      {/* Legal & Privacy Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        analyticsConsent={analyticsConsent}
        onToggleAnalytics={setAnalyticsConsent}
      />
    </div>
  );
}
