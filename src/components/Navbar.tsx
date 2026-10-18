import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight, Phone, Shield } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData.ts';

interface NavbarProps {
  onOpenStrategyModal: () => void;
  onOpenPrivacyModal: () => void;
  isReducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStrategyModal,
  onOpenPrivacyModal,
  isReducedMotion,
  onToggleReducedMotion,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1"
            aria-label="Nexora Ads Studio Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <span className="font-heading font-extrabold text-white text-lg tracking-wider">N</span>
            </div>
            <div>
              <div className="font-heading font-extrabold text-white text-base tracking-wider flex items-center gap-1.5">
                <span>NEXORA</span>
                <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase bg-sky-950/60 border border-sky-800/60 px-1.5 py-0.5 rounded">
                  STUDIO
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans tracking-wide">
                AI CREATIVE AGENCY
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded px-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onToggleReducedMotion}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                isReducedMotion
                  ? 'bg-sky-950/80 text-sky-400 border-sky-800'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Toggle Reduced Motion"
              aria-label="Toggle Reduced Motion"
            >
              {isReducedMotion ? 'Motion: Off' : 'Motion: Smooth'}
            </button>

            <button
              onClick={onOpenStrategyModal}
              className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <span>Book Strategy Call</span>
            </button>

            <a
              href="#contact"
              className="px-4 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 rounded-xl transition-all shadow-md shadow-sky-500/20 flex items-center gap-1.5 group"
            >
              <span>Get Proposal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900 px-3 py-2 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStrategyModal();
                }}
                className="w-full py-2.5 text-center text-sm font-medium text-white bg-slate-900 border border-slate-700 rounded-xl"
              >
                Book Strategy Call
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-950 bg-sky-400 rounded-xl"
              >
                Get Proposal
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
