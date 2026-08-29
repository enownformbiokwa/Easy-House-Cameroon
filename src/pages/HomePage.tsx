import React from 'react';
import { ArrowRight, Sparkles, Building2, ShieldCheck, ChevronRight, Bookmark, MapPin } from 'lucide-react';
import { HeroSpotlight } from '../components/HeroSpotlight';
import { Property, FilterState, AppPage } from '../types';
import { formatCurrency } from '../utils/currency';

interface HomePageProps {
  properties: Property[];
  spotlightProperty: Property;
  onSelectSpotlight: (property: Property) => void;
  onOpenFullDetail: (property: Property) => void;
  onBookTour: (property: Property) => void;
  onOpenSplitOptions: (property: Property) => void;
  onContactAgent: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  onOpenAdvancedFilters: () => void;
  onNavigate: (page: AppPage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  properties,
  spotlightProperty,
  onSelectSpotlight,
  onOpenFullDetail,
  onBookTour,
  onOpenSplitOptions,
  onContactAgent,
  favorites,
  onToggleFavorite,
  filterState,
  setFilterState,
  onOpenAdvancedFilters,
  onNavigate,
}) => {
  // 1 featured rental: Kribi Oceanfront Pavilion
  const featuredKribi = properties.filter((p) => p.id === 'kribi-coastal-sanctuary' || p.featured).slice(0, 1);
  const featuredList = featuredKribi.length > 0 ? featuredKribi : properties.slice(0, 1);

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      
      {/* 1. Hero Section with bg.webp */}
      <HeroSpotlight
        onNavigate={onNavigate}
        onBookTourClick={() => onBookTour(spotlightProperty)}
      />

      {/* 2. Curated Listings Preview & "More Properties" Button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950">
              Verified Properties
            </h2>
            <p className="text-sm text-zinc-600 mt-2 max-w-2xl leading-relaxed">
              Discover verified rental properties authenticated with security, power backup, and transparent monthly pricing in FCFA.
            </p>
          </div>

          <button
            onClick={() => onNavigate('properties')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-xs shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>More Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1 Featured Rental Showcase Card */}
        <div className="max-w-xl mx-auto">
          {featuredList.map((prop) => {
            const isFav = favorites.includes(prop.id);
            const displaySqft = prop.sqft || Math.round(prop.sizeM2 * 10.764);

            return (
              <div
                key={prop.id}
                onClick={() => onOpenFullDetail(prop)}
                className="group bg-white rounded-3xl p-4 sm:p-5 border border-zinc-200/80 hover:border-zinc-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 mb-4">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                        {prop.category}
                      </span>
                      {prop.isNew && (
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-zinc-950 text-xs font-semibold shadow-xs">
                          New
                        </span>
                      )}
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(prop.id, e);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isFav
                          ? 'bg-zinc-950 text-white'
                          : 'bg-white/90 backdrop-blur-md text-zinc-700 hover:bg-white'
                      }`}
                      aria-label="Bookmark property"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                    </button>

                    {/* Location Pill */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-normal border border-white/20">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{prop.city}, {prop.country}</span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors line-clamp-1">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>

                {/* Specs & Pricing */}
                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs text-zinc-600 font-medium">
                    <span><strong>{prop.beds}</strong> beds</span>
                    <span>•</span>
                    <span><strong>{prop.baths}</strong> baths</span>
                    <span>•</span>
                    <span><strong>{prop.sizeM2}</strong> m²</span>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-zinc-950">
                      {formatCurrency(prop.price, 'XAF', { compact: true })}
                      <span className="text-zinc-500 text-xs font-normal">/mo</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-950 group-hover:text-zinc-800">
                  <span className="text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                    Verified Landlord
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenFullDetail(prop);
                    }}
                    className="inline-flex items-center gap-1 text-xs text-zinc-900 font-medium hover:underline"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* MORE PROPERTIES BUTTON */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate('properties')}
            id="show-more-properties-btn"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer group"
          >
            <span>More Properties</span>
            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 3. Company Philosophy Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl border border-zinc-800 text-center">
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
              Bridging the Gap Between Property Owners & Clients
            </h2>
            
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-8 max-w-3xl">
              Easy House Cameroon is a Real Estate Company Based in Buea, Cameroon and operational in Doula, Limbe & Yde with the goal of bridging the gap between property owners (Landlords, Landladies) and Potential Clients in need of their Properties to Rent or Buy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-6 mb-8 border-y border-white/10 text-xs sm:text-sm text-zinc-300 w-full">
              <div className="flex flex-col sm:items-center text-left sm:text-center gap-2 p-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center sm:mx-auto">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div><strong>Verified Listings</strong>: Direct landlord engagement & property condition checks.</div>
              </div>
              <div className="flex flex-col sm:items-center text-left sm:text-center gap-2 p-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center sm:mx-auto">
                  <Building2 className="w-4 h-4 text-amber-400" />
                </div>
                <div><strong>Prime Locations</strong>: Operational across Buea, Douala, Limbe, and Yaoundé.</div>
              </div>
              <div className="flex flex-col sm:items-center text-left sm:text-center gap-2 p-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center sm:mx-auto">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div><strong>Transparent Pricing</strong>: Clear rental rates in FCFA (XAF) with zero hidden fees.</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-zinc-950 text-xs sm:text-sm font-bold hover:bg-zinc-100 transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>About Easy House Cameroon</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>

              <button
                onClick={() => onNavigate('properties')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all border border-white/15 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Browse All Properties</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
