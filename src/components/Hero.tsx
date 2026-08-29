import React from 'react';
import { HERO_IMAGE } from '../data/properties';

interface HeroProps {
  onBookCallClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookCallClick }) => {
  return (
    <section className="w-full pt-10 sm:pt-14 pb-12 sm:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row with Display Headline & Subtext */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-8 sm:mb-10">
          
          {/* Main Headline (Left) */}
          <div className="lg:col-span-8">
            <h1
              id="hero-main-title"
              className="text-4xl sm:text-6xl md:text-[68px] lg:text-[76px] font-medium tracking-[-0.035em] text-zinc-950 leading-[1.04]"
            >
              Find a place you<br />will call home
            </h1>

            {/* Book a call button right under the headline */}
            <div className="mt-7 sm:mt-9">
              <button
                id="hero-book-call-btn"
                onClick={onBookCallClick}
                className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-black text-white text-xs sm:text-[13px] font-medium tracking-tight rounded-md hover:bg-zinc-800 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              >
                Book a call
              </button>
            </div>
          </div>

          {/* Subtext description (Right) */}
          <div className="lg:col-span-4 lg:pt-3">
            <p
              id="hero-subtext"
              className="text-xs sm:text-[13px] text-zinc-500 font-normal leading-[1.6] max-w-xs sm:max-w-sm lg:ml-auto"
            >
              With us you will find not just accommodation, but a place where your new life begins, full of cosiness and possibilities.
            </p>
          </div>
        </div>

        {/* Hero Panorama Architectural Image */}
        <div
          id="hero-image-container"
          className="relative w-full aspect-[16/9] sm:aspect-[21/10] md:aspect-[2.35/1] overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-100 shadow-xs group"
        >
          <img
            id="hero-villa-image"
            src={HERO_IMAGE}
            alt="Modern luxury architectural residence at dusk with floor to ceiling glass and sports vehicle"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
          />
          
          {/* Subtle architectural overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Quick badge on image */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 bg-black/70 backdrop-blur-md text-white px-3.5 py-1.5 rounded-md text-[11px] font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bel Air Architectural Estate · Curated Listing</span>
          </div>
        </div>

      </div>
    </section>
  );
};
