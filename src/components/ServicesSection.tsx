import React, { useState } from 'react';
import { SHOWCASE_IMAGE } from '../data/properties';
import { CheckCircle2, ArrowUpRight, ShieldCheck, Compass, FileCheck, Sparkles, Video } from 'lucide-react';

interface ServicesSectionProps {
  onGetConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onGetConsultation,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const steps = [
    {
      title: 'Rental Selection & Curation',
      shortDesc:
        'Certified local partner agents curate verified luxury rental properties matching strict structural, aesthetic, and living criteria. Includes 4K 3D interactive walkthroughs and private viewing appointments.',
      highlights: [
        'Curated shortlist of prime verified luxury rental estates',
        'Private 4K 3D virtual walkthroughs & live video inspections',
        'Flexible corporate and executive rental lease terms',
      ],
      image: SHOWCASE_IMAGE,
      tag: 'Step 01 · Discovery',
    },
    {
      title: 'Lease & Tenancy Verification',
      shortDesc:
        'Complete property authenticity audit, standard residential lease contract preparation, and secure monthly rent payment processing in FCFA (XAF).',
      highlights: [
        'Comprehensive background & property inspection audit',
        'Transparent lease agreements compliant with local tenant laws',
        'Fixed monthly pricing in FCFA (XAF) with no hidden fees',
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      tag: 'Step 02 · Tenancy Agreement',
    },
    {
      title: 'Executive Move-in & Concierge',
      shortDesc:
        'Personalized check-in coordination, key handover, furnished amenities inspection, and dedicated tenant support throughout your tenancy.',
      highlights: [
        'Full key handover and move-in inspection protocol',
        '24/7 dedicated property concierge and maintenance support',
        'Direct lease renewal and extension assistance',
      ],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      tag: 'Step 03 · Move-In',
    },
  ];

  return (
    <section className="w-full pt-8 pb-20 sm:pb-28" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 mb-1">
              End-to-End Advisory
            </div>
            <h2
              id="services-section-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-950 leading-tight"
            >
              See what we offer<br className="hidden sm:inline" /> and how it works
            </h2>
          </div>

          <div className="max-w-xs sm:max-w-sm text-xs sm:text-[13px] text-zinc-500 font-normal leading-[1.6]">
            Virtual walkthroughs, off-market allocations, and verified legal security — everything you need to acquire with complete certainty.
          </div>
        </div>

        {/* Interactive Feature Layout (Property Detail 28px Rounded Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Interactive Service Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-white/90 backdrop-blur-md rounded-[28px] border border-zinc-200/80 shadow-xs">
            <div>
              {/* Step indicator pills */}
              <div className="flex items-center gap-2 mb-6">
                {steps.map((s, idx) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveTab(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeTab === idx ? 'w-10 bg-zinc-950' : 'w-2.5 bg-zinc-200 hover:bg-zinc-300'
                    }`}
                    aria-label={`Step ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="inline-block text-[11px] font-semibold tracking-wide uppercase text-zinc-400 mb-2">
                {steps[activeTab].tag}
              </span>

              {/* Title */}
              <h3
                id="service-card-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 leading-tight mb-3"
              >
                {steps[activeTab].title}
              </h3>

              {/* Paragraph */}
              <p
                id="service-card-description"
                className="text-xs sm:text-[13px] text-zinc-600 font-normal leading-[1.65] mb-6"
              >
                {steps[activeTab].shortDesc}
              </p>

              {/* Bullet highlights */}
              <ul className="space-y-2.5 mb-8">
                {steps[activeTab].highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action button */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <button
                id="get-consultation-btn"
                onClick={onGetConsultation}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Get consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
              </button>

              <span className="text-[11px] text-zinc-400 font-medium">
                No obligation · 100% Free
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Photography Showcase */}
          <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto rounded-[28px] overflow-hidden bg-zinc-200 shadow-sm border border-zinc-200/70 group min-h-[380px]">
            <img
              id="showcase-modern-villa-img"
              src={steps[activeTab].image}
              alt="Architectural modern showcase"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Spec badge on image */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium border border-white/15">
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                <span>3D Virtual Walkthrough Available</span>
              </div>

              <span className="hidden sm:inline-flex bg-white/90 backdrop-blur-md text-zinc-950 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
                Verified Certified Listing
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
