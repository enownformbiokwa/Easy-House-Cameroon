import React from 'react';
import { Property } from '../types';
import dpImage from '../assets/images/dp.webp';
import {
  Bookmark,
  ChevronRight,
  Maximize2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Check,
  MessageCircle,
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { openWhatsAppTour } from '../utils/whatsapp';

interface PropertyGridProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onQuickSpotlight?: (property: Property) => void;
  onBookTour?: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  activeSpotlightId?: string;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onSelectProperty,
  onBookTour,
  favorites,
  onToggleFavorite,
  activeSpotlightId,
}) => {
  return (
    <section className="w-full pt-6 pb-16 sm:pb-24" id="properties-catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Heading & Result stats */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 mb-1">
              Curated Portfolio · Priced in FCFA (XAF)
            </div>
            <h2
              id="new-properties-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-950"
            >
              Explore residences & estates
            </h2>
          </div>

          <div className="text-xs font-medium text-zinc-500 bg-white/80 px-3.5 py-1.5 rounded-full border border-zinc-200/80 shadow-2xs self-start sm:self-auto">
            Showing <span className="font-bold text-zinc-950">{properties.length}</span> verified properties
          </div>
        </div>

        {/* 3-Column Luxury Grid Container */}
        {properties.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white/80 backdrop-blur-md rounded-3xl border border-zinc-200/80 max-w-lg mx-auto shadow-xs">
            <Sparkles className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
            <p className="text-zinc-950 font-bold text-base">
              No properties found matching filters
            </p>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
              Please adjust your destination, budget or property type in the search bar above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((prop) => {
              const isFav = favorites.includes(prop.id);
              const isSpotlight = prop.id === activeSpotlightId;
              const displaySqft = prop.sqft || Math.round(prop.sizeM2 * 10.764);
              const addressParts = prop.address ? prop.address.split('\n') : [prop.title, `${prop.city}, ${prop.country}`];

              return (
                <div
                  key={prop.id}
                  id={`property-card-${prop.id}`}
                  onClick={() => onSelectProperty(prop)}
                  className={`group cursor-pointer bg-white/90 backdrop-blur-md rounded-[26px] p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 ${
                    isSpotlight
                      ? 'border-zinc-900 ring-2 ring-zinc-900/10 shadow-sm'
                      : 'border-zinc-200/80 hover:border-zinc-300'
                  }`}
                >
                  <div>
                    {/* Card Image Container */}
                    <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-zinc-100 mb-4 shadow-2xs">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                          For Rent
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                          {prop.category}
                        </span>
                        {prop.isNew && (
                          <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-zinc-950 text-[10px] font-bold shadow-xs">
                            New
                          </span>
                        )}
                      </div>

                      {/* Favorite Bookmark Button */}
                      <button
                        id={`fav-btn-${prop.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(prop.id, e);
                        }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${
                          isFav
                            ? 'bg-zinc-950 text-white'
                            : 'bg-white/85 backdrop-blur-md text-zinc-700 hover:text-zinc-950 hover:bg-white'
                        }`}
                        aria-label="Save property to bookmarks"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                      </button>

                      {/* Bottom Quick Bar */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                        <span className="text-[11px] font-semibold text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                          {prop.city}, {prop.country}
                        </span>

                        <span className="text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                          {prop.sizeM2} m²
                        </span>
                      </div>
                    </div>

                    {/* Address & Specs */}
                    <div className="px-1">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-zinc-950 tracking-tight group-hover:text-zinc-800 transition-colors truncate">
                            {addressParts[0]}
                          </h3>
                          <p className="text-xs font-normal text-zinc-500 truncate max-w-[200px]">
                            {addressParts[1] || `${prop.city}, ${prop.country}`}
                          </p>
                        </div>
                        
                        <div className="text-right shrink-0">
                          <div className="text-base sm:text-lg font-bold text-zinc-950 font-sans tracking-tight">
                            {formatCurrency(prop.price, 'XAF')}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-medium">
                            / month
                          </div>
                        </div>
                      </div>

                      {/* Specs Row: Beds | Baths | Sqft */}
                      <div className="flex items-center gap-2 text-xs text-zinc-600 font-normal py-3 border-y border-zinc-100/90 my-3">
                        <span className="font-semibold text-zinc-950">{prop.beds}</span> beds
                        <span className="text-zinc-300">•</span>
                        <span className="font-semibold text-zinc-950">{prop.baths}</span> baths
                        <span className="text-zinc-300">•</span>
                        <span className="font-semibold text-zinc-950">{prop.sizeM2} m²</span> ({displaySqft.toLocaleString()} sqft)
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions: Agent avatar & Inspect CTA */}
                  <div className="pt-1 px-1 flex items-center justify-between gap-2">
                    {prop.agent && (
                      <div className="flex items-center gap-2">
                        <img
                          src={dpImage}
                          alt={prop.agent.name || 'Enownfor Manyi-Oben'}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover border border-zinc-200"
                        />
                        <span className="text-xs font-medium text-zinc-600 truncate max-w-[100px]">
                          {prop.agent.name}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 ml-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onBookTour) {
                            onBookTour(prop);
                          } else {
                            openWhatsAppTour(prop);
                          }
                        }}
                        className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-full border border-emerald-300/80 hover:border-emerald-400 hover:bg-emerald-50 bg-emerald-50/60 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                        title="Book / Schedule Tour on WhatsApp"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>Tour</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProperty(prop);
                        }}
                        className="text-[11px] font-semibold text-white px-3.5 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3 h-3 text-zinc-400" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
