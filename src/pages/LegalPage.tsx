import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Lock,
  Eye,
  CheckCircle,
  HelpCircle,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowLeft,
  Calendar,
  Building,
  Scale,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { AppPage } from '../types';
import { PRIVACY_POLICY_SECTIONS, TERMS_AND_CONDITIONS_SECTIONS } from '../data/legalContent';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms';
  onNavigate: (page: AppPage) => void;
  onBookCallClick?: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  initialTab = 'privacy',
  onNavigate,
  onBookCallClick,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const sections = activeTab === 'privacy' ? PRIVACY_POLICY_SECTIONS : TERMS_AND_CONDITIONS_SECTIONS;

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Home</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>Effective: August 2026</span>
          </div>
        </div>

        {/* Hero Header Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200/90 shadow-sm relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-100/40 via-amber-50/10 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-amber-600" />
              Easy House Cameroon Legal Center
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
              {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions of Service'}
            </h1>
            
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl">
              {activeTab === 'privacy'
                ? 'We are committed to transparency, ethical data handling, and keeping your personal inquiries and housing search details secure across Cameroon.'
                : 'Clear, dependable operational standards governing property listings, physical walkthrough inspections, and tenant-landlord advisory in Buea, Douala, Limbe, and Yaoundé.'}
            </p>

            {/* Quick Document Switcher Tabs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('privacy');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'privacy'
                    ? 'bg-zinc-950 text-white shadow-md'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/80'
                }`}
              >
                <Lock className="w-4 h-4 text-amber-400" />
                Privacy Policy
              </button>

              <button
                onClick={() => {
                  setActiveTab('terms');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'terms'
                    ? 'bg-zinc-950 text-white shadow-md'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/80'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-400" />
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Layout: Sidebar Table of Contents + Main Legal Content + Contact Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Table of Contents */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-3">
                <Building className="w-4 h-4 text-zinc-700" />
                Table of Contents
              </div>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer group ${
                      activeSectionId === section.id
                        ? 'bg-zinc-950 text-white font-bold'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                    }`}
                  >
                    <span className="truncate pr-2">{section.title}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      activeSectionId === section.id ? 'translate-x-0.5 text-amber-400' : 'text-zinc-300 group-hover:text-zinc-500'
                    }`} />
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Help Card */}
            <div className="bg-zinc-950 text-white rounded-3xl p-6 border border-zinc-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Have Legal Questions?</h4>
                  <p className="text-[11px] text-zinc-400">Speak directly with our team</p>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Need clarification regarding tenancy agreements, property inspections, or data confidentiality in Cameroon?
              </p>

              <div className="pt-1 space-y-2">
                <a
                  href="https://wa.me/237674121117?text=Hello%20Easy%20House%20Cameroon,%20I%20have%20a%20legal/terms%20question"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>

                <a
                  href="tel:+237677499722"
                  className="w-full py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Call: +237 677499722
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Full Formal Legal Document Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* If Terms tab, show prominent Core Operational Terms Summary Box */}
            {activeTab === 'terms' && (
              <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/60 to-white rounded-3xl p-6 sm:p-8 border border-amber-300/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-950">
                      Summary of Key Service Terms
                    </h3>
                    <p className="text-xs text-zinc-600">
                      Standard policies applicable to all property inspection tours & advisory sessions
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs space-y-1">
                    <div className="text-xs font-bold text-zinc-950 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>15,000 FRS Service Fee</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-snug">
                      We charge 15,000 FRS for our services valid for a session.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs space-y-1">
                    <div className="text-xs font-bold text-zinc-950 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>2 to 3 Different Options</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-snug">
                      We get to check out 2 to 3 different options per session.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs space-y-1">
                    <div className="text-xs font-bold text-zinc-950 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Zero Extra Commissions</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-snug">
                      No commissions or extra charges of any sort.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs space-y-1">
                    <div className="text-xs font-bold text-zinc-950 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Negotiation Assistance</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-snug">
                      We assist our clients with the negotiation process.
                    </p>
                  </div>

                  <div className="sm:col-span-2 p-3.5 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        <span>Refund Policy: No Refunds</span>
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-snug">
                        All session booking fees are strictly non-refundable once scheduled.
                      </p>
                    </div>
                    <button
                      onClick={onBookCallClick}
                      className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-semibold shrink-0 cursor-pointer shadow-xs"
                    >
                      Schedule a Tour
                    </button>
                  </div>
                </div>
              </div>
            )}

            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-xs scroll-mt-28 space-y-4 hover:border-zinc-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-3 pl-0 sm:pl-11 text-xs sm:text-[13px] text-zinc-600 leading-relaxed">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Bottom Summary Callout */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-950 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Your Comfort, Our Priority
                </h4>
                <p className="text-xs text-zinc-600">
                  Easy House Cameroon is committed to ethical real estate practices across Buea, Douala, Limbe, and Yaoundé.
                </p>
              </div>

              <button
                onClick={() => onNavigate('properties')}
                className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
              >
                Browse Properties
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
