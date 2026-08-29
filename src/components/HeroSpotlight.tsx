import React from 'react';
import { ArrowRight, MapPin, Building2 } from 'lucide-react';
import bgImg from '../assets/images/bg.webp';
import { AppPage } from '../types';
import { ScrollFrameAnimation } from './ScrollFrameAnimation';

interface HeroSpotlightProps {
  onNavigate: (page: AppPage) => void;
  onBookTourClick: () => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  onNavigate,
  onBookTourClick,
}) => {
  return (
    <div className="w-full flex flex-col" id="hero-experience">
      
      {/* 1. Scroll-Scrubbed Frame Animation with fade-in on final frame */}
      <ScrollFrameAnimation
        onNavigate={onNavigate}
        onBookTourClick={onBookTourClick}
      />

      {/* 2. Visual Banner & Operational Cities Section */}
      <section className="w-full pt-8 sm:pt-12 pb-4 sm:pb-8" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          {/* Hero Visual Banner with bg.webp */}
          <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[520px] rounded-[32px] overflow-hidden shadow-xl border border-zinc-200/70 group">
            <img
              src={bgImg}
              alt="Easy House Cameroon Modern Architecture"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlay for contrast and readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-wrap gap-2 z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Residential & Commercial Rentals</span>
              </span>
            </div>

            {/* Centralized Banner Content */}
            <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 right-4 sm:right-8 flex flex-col items-center justify-center text-center gap-3.5 sm:gap-4 z-10">
              <div className="max-w-2xl mx-auto flex flex-col items-center text-white">
                <div className="inline-flex items-center justify-center gap-1.5 text-xs text-zinc-300 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Operational Cities</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Buea · Douala · Limbe · Yaoundé
                </h3>
                <p className="text-xs sm:text-sm md:text-[15px] text-zinc-200 mt-2 max-w-xl mx-auto leading-relaxed">
                  Discover authenticated properties with verified landlords, continuous water supply, and secure perimeter.
                </p>
              </div>

              <button
                onClick={() => onNavigate('properties')}
                id="banner-explore-listings-btn"
                className="mt-1 px-6 py-3 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 text-xs sm:text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer shrink-0 inline-flex items-center gap-2"
              >
                <span>Explore Listings</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
