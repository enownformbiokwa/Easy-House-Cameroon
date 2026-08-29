import React, { useState } from 'react';
import {
  MapPin,
  Building2,
  Coins,
  Maximize2,
  SlidersHorizontal,
  Search,
  ChevronDown,
  Check
} from 'lucide-react';
import { FilterState } from '../types';
import { COUNTRIES, PROPERTY_TYPES, PRICE_RANGES_XAF } from '../data/properties';

interface FloatingSearchBarProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatches: number;
  onOpenAdvancedFilters: () => void;
  onSearchClick: () => void;
}

export const FloatingSearchBar: React.FC<FloatingSearchBarProps> = ({
  filterState,
  setFilterState,
  totalMatches,
  onOpenAdvancedFilters,
  onSearchClick,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6 relative z-30">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-full p-2 sm:p-2.5 shadow-lg border border-zinc-200/80 flex flex-wrap lg:flex-nowrap items-center justify-between gap-1.5 transition-all">
        
        {/* 1. Location field */}
        <div className="relative flex-1 min-w-[140px]">
          <button
            onClick={() => toggleDropdown('location')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-zinc-50 rounded-full cursor-pointer transition-colors text-left"
          >
            <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                Destination
              </div>
              <div className="text-xs font-semibold text-zinc-900 truncate">
                {filterState.country === 'All countries' ? 'All Destinations' : filterState.country}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0 ml-auto hidden sm:block" />
          </button>

          {activeDropdown === 'location' && (
            <div className="absolute bottom-full mb-2 left-0 w-56 bg-white rounded-2xl shadow-xl border border-zinc-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-60 overflow-y-auto">
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-zinc-400">
                Select Destination
              </div>
              {COUNTRIES.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setFilterState((prev) => ({ ...prev, country: loc }));
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 flex items-center justify-between cursor-pointer"
                >
                  <span>{loc}</span>
                  {filterState.country === loc && <Check className="w-3 h-3 text-zinc-950" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:block w-px h-7 bg-zinc-100 shrink-0" />

        {/* 2. Property type field */}
        <div className="relative flex-1 min-w-[130px]">
          <button
            onClick={() => toggleDropdown('type')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-zinc-50 rounded-full cursor-pointer transition-colors text-left"
          >
            <Building2 className="w-4 h-4 text-zinc-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                Property type
              </div>
              <div className="text-xs font-semibold text-zinc-900 truncate">
                {filterState.propertyType}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0 ml-auto hidden sm:block" />
          </button>

          {activeDropdown === 'type' && (
            <div className="absolute bottom-full mb-2 left-0 w-56 bg-white rounded-2xl shadow-xl border border-zinc-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-60 overflow-y-auto">
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-zinc-400">
                Type of Property
              </div>
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setFilterState((prev) => ({ ...prev, propertyType: t }));
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 flex items-center justify-between cursor-pointer"
                >
                  <span>{t}</span>
                  {filterState.propertyType === t && <Check className="w-3 h-3 text-zinc-950" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:block w-px h-7 bg-zinc-100 shrink-0" />

        {/* 3. Price field (XAF / FCFA) */}
        <div className="relative flex-1 min-w-[140px]">
          <button
            onClick={() => toggleDropdown('price')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-zinc-50 rounded-full cursor-pointer transition-colors text-left"
          >
            <Coins className="w-4 h-4 text-zinc-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                Budget (FCFA)
              </div>
              <div className="text-xs font-semibold text-zinc-900 truncate">
                {filterState.priceRange}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0 ml-auto hidden sm:block" />
          </button>

          {activeDropdown === 'price' && (
            <div className="absolute bottom-full mb-2 left-0 w-64 bg-white rounded-2xl shadow-xl border border-zinc-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-zinc-400">
                Budget in FCFA
              </div>
              {PRICE_RANGES_XAF.map((pr) => (
                <button
                  key={pr}
                  onClick={() => {
                    setFilterState((prev) => ({ ...prev, priceRange: pr }));
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 flex items-center justify-between cursor-pointer"
                >
                  <span>{pr}</span>
                  {filterState.priceRange === pr && <Check className="w-3 h-3 text-zinc-950" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:block w-px h-7 bg-zinc-100 shrink-0" />

        {/* 4. Bedrooms field */}
        <div className="relative flex-1 min-w-[120px]">
          <button
            onClick={() => toggleDropdown('beds')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-zinc-50 rounded-full cursor-pointer transition-colors text-left"
          >
            <Maximize2 className="w-4 h-4 text-zinc-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                Bedrooms
              </div>
              <div className="text-xs font-semibold text-zinc-900">
                {filterState.beds ? `${filterState.beds}+ Beds` : 'Any Beds'}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0 ml-auto hidden sm:block" />
          </button>

          {activeDropdown === 'beds' && (
            <div className="absolute bottom-full mb-2 left-0 w-44 bg-white rounded-2xl shadow-xl border border-zinc-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-zinc-400">
                Minimum Bedrooms
              </div>
              {[null, 1, 2, 3, 4, 6].map((num) => (
                <button
                  key={num ?? 'any'}
                  onClick={() => {
                    setFilterState((prev) => ({ ...prev, beds: num }));
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 flex items-center justify-between cursor-pointer"
                >
                  <span>{num ? `${num}+ Beds` : 'Any Bedrooms'}</span>
                  {filterState.beds === num && <Check className="w-3 h-3 text-zinc-950" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. Actions: More Filters + Search Button */}
        <div className="flex items-center gap-2 ml-auto pr-1 py-1">
          <button
            onClick={onOpenAdvancedFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-zinc-200/90 hover:border-zinc-300 hover:bg-zinc-50 text-xs font-medium text-zinc-700 transition-all cursor-pointer bg-white"
            title="More filter parameters"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
            <span>More</span>
          </button>

          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white transition-all shadow-xs cursor-pointer active:scale-95"
            title="Filter and show matching properties"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">
              Search ({totalMatches})
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
