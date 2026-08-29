import React from 'react';
import {
  ShieldCheck,
  Compass,
  CheckCircle2,
  MapPin,
  Home,
  ChevronRight,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { AppPage } from '../types';
import dpImage from '../assets/images/dp.webp';
import logoImg from '../assets/images/logo.webp';

interface AboutPageProps {
  onNavigate: (page: AppPage) => void;
  onBookCallClick?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pb-24 font-sans text-zinc-950">
      
      {/* 1. Header & Manager Spotlight */}
      <section className="bg-white border-b border-zinc-200/70 pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 font-medium mb-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-zinc-300" />
            <span className="text-zinc-950 font-semibold">About Easy House Cameroon</span>
          </nav>

          {/* Main Statement (Centralized) */}
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
              Your Comfort, Our Priority
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-3xl">
              Easy House Cameroon is a Real Estate Company Based in Buea, Cameroon and operational in Douala, Limbe & Yaoundé with the goal of bridging the gap between property owners (Landlords, Landladies) and Potential Clients in need of their Properties to Rent or Buy.
            </p>
          </div>

          {/* Manager Spotlight Card (Centralized with dp.webp) */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 sm:p-10 max-w-3xl mx-auto shadow-xs text-center flex flex-col items-center">
            <div className="relative mb-5">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg bg-zinc-200 mx-auto">
                <img
                  src={dpImage}
                  alt="Enownfor Manyi-Oben — Manager, Easy House Cameroon"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-0 right-1 bg-emerald-600 text-white p-2 rounded-full shadow-md border-2 border-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/90 text-zinc-800 text-xs font-bold uppercase tracking-wider mb-2.5">
              <span>Manager — Easy House Cameroon</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 mb-1">
              Enownfor Manyi-Oben
            </h2>

            <div className="text-xs sm:text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              Leadership & Property Management
            </div>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-6">
              Dedicated to modernizing property management and leasing in Cameroon. Spearheading our hands-on operations across Buea, Douala, Limbe, and Yaoundé to ensure smooth landlord partnerships, verified residential listings, and reliable client satisfaction.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium text-zinc-700">
              <a
                href="https://wa.me/237674121117"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Direct Contact: 674121117</span>
              </a>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-zinc-700 border border-zinc-200 shadow-2xs">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>Based in Buea · Operational Nationwide</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Company Biography & Founding Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <Compass className="w-3.5 h-3.5 text-zinc-900" />
              <span>Our Founding Story</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950">
              Built on Architectural Rigor, Legal Precision, and Uncompromised Discretion
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
              <p>
                Easy House Cameroon was founded with the mission of bridging the gap between property owners (Landlords, Landladies) and potential clients looking for quality residences and commercial properties to rent or buy.
              </p>
              <p>
                Operating across Buea, Douala, Limbe, and Yaoundé, we provide tailored property management, verified listings, and attentive client support to ensure a transparent and reliable experience.
              </p>
              <p>
                Every property in our portfolio is physically inspected and authenticated to guarantee comfort, security, and clear terms for tenants and owners alike.
              </p>
            </div>

            {/* Core Values Checklist */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-medium text-zinc-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Verified Structural & Electrical Integrity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full Title Deed & Zoning Authenticity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24/7 Dedicated Concierge & Rapid Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent FCFA Monthly & Annual Leases</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('properties')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
              >
                <span>Explore the Verified Rental Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-sm sm:max-w-md bg-zinc-50 border border-zinc-200/90 rounded-3xl p-10 sm:p-14 flex flex-col items-center justify-center text-center shadow-xs">
              <img
                src={logoImg}
                alt="Easy House Cameroon Logo"
                className="h-32 sm:h-44 w-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. 3-Step Advisory & Acquisition Methodology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold mb-2 border border-zinc-200">
            <Compass className="w-3.5 h-3.5 text-zinc-900" />
            <span>Advisory & Tenancy Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950">
            See What We Offer & How It Works
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            Virtual walkthroughs, off-market allocations, and verified legal security — everything you need to acquire with complete certainty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-zinc-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 mb-2 block">
                Step 01 · Discovery
              </span>
              <h3 className="text-lg font-bold text-zinc-950 mb-3">
                Rental Selection & Curation
              </h3>
              <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed mb-6">
                Certified local partner agents curate verified luxury rental properties matching strict structural, aesthetic, and living criteria. Includes 4K 3D interactive walkthroughs and private viewing appointments.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-zinc-700 font-medium border-t border-zinc-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Prime verified rental estates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>4K 3D virtual walkthroughs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Flexible executive lease terms</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-zinc-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 mb-2 block">
                Step 02 · Agreement
              </span>
              <h3 className="text-lg font-bold text-zinc-950 mb-3">
                Lease & Tenancy Verification
              </h3>
              <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed mb-6">
                Complete property authenticity audit, standard residential lease contract preparation, and secure monthly rent payment processing in FCFA (XAF).
              </p>
            </div>
            <ul className="space-y-2 text-xs text-zinc-700 font-medium border-t border-zinc-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>42-Point property inspection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Transparent legal lease contracts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Fixed monthly pricing in FCFA</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-zinc-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 mb-2 block">
                Step 03 · Move-In
              </span>
              <h3 className="text-lg font-bold text-zinc-950 mb-3">
                Executive Move-In & Concierge
              </h3>
              <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed mb-6">
                Personalized check-in coordination, key handover, furnished amenities inspection, and dedicated tenant support throughout your tenancy.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-zinc-700 font-medium border-t border-zinc-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Key handover inspection protocol</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>24/7 dedicated property concierge</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Direct lease renewal assistance</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
};

