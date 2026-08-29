import React, { useState } from 'react';
import { ChevronDown, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { FilterState } from '../types';
import { PROPERTY_TYPES, PRICE_RANGES_XAF, SIZE_RANGES } from '../data/properties';

interface SearchFilterProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatches?: number;
  onShowProperties?: () => void;
  onOpenAdvancedFilters?: () => void;
  onResetFilters: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  filterState,
  setFilterState,
  onShowProperties,
  onOpenAdvancedFilters,
  onResetFilters,
}) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);

  const tabs: Array<FilterState['tab']> = [
    'Rent',
    'Furnished',
    'Long Term',
    'Short Term',
  ];

  const handleAction = () => {
    if (onShowProperties) {
      onShowProperties();
    } else if (onOpenAdvancedFilters) {
      onOpenAdvancedFilters();
    }
  };

  return (
    <section className="w-full pt-6 pb-6 bg-white" id="search-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter Container Box */}
        <div
          id="search-filter-card"
          className="bg-[#f5f5f5] rounded-2xl p-4 sm:p-5 sm:px-6 shadow-xs border border-zinc-200/60"
        >
          {/* Top Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 pb-2 border-b border-zinc-200/50">
            {tabs.map((tab) => {
              const isActive = filterState.tab === tab;
              return (
                <button
                  key={tab}
                  id={`tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setFilterState((prev) => ({ ...prev, tab }))}
                  className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-lg transition-all cursor-pointer select-none ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Main Dropdown Filter Row (Property Type, Monthly Rent in thousands max 1M, Size m²) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-3.5">
            
            {/* Property Type Dropdown (Replaced Countries) */}
            <div className="relative">
              <label className="block text-[10px] uppercase font-semibold text-zinc-400 mb-1 pl-1">
                Property Type
              </label>
              <button
                id="filter-type-btn"
                onClick={() => {
                  setTypeDropdownOpen(!typeDropdownOpen);
                  setPriceDropdownOpen(false);
                  setSizeDropdownOpen(false);
                }}
                className="w-full h-11 px-3.5 bg-white border border-zinc-200/80 rounded-xl text-left flex items-center justify-between text-xs sm:text-[13px] text-zinc-800 hover:border-zinc-300 transition-colors shadow-2xs cursor-pointer"
              >
                <span className="truncate font-medium">{filterState.propertyType || 'All Types'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 stroke-[2.2] shrink-0 ml-1.5" />
              </button>

              {typeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-full bg-white rounded-xl shadow-xl border border-zinc-100 py-1.5 z-30 max-h-56 overflow-y-auto">
                  {PROPERTY_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setFilterState((prev) => ({ ...prev, propertyType: t }));
                        setTypeDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>{t}</span>
                      {filterState.propertyType === t && <Check className="w-3.5 h-3.5 text-black" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Dropdown (FCFA in thousands, max 1 million) */}
            <div className="relative">
              <label className="block text-[10px] uppercase font-semibold text-zinc-400 mb-1 pl-1">
                Monthly Rent (FCFA)
              </label>
              <button
                id="filter-price-btn"
                onClick={() => {
                  setPriceDropdownOpen(!priceDropdownOpen);
                  setTypeDropdownOpen(false);
                  setSizeDropdownOpen(false);
                }}
                className="w-full h-11 px-3.5 bg-white border border-zinc-200/80 rounded-xl text-left flex items-center justify-between text-xs sm:text-[13px] text-zinc-800 hover:border-zinc-300 transition-colors shadow-2xs cursor-pointer"
              >
                <span className="truncate font-medium">{filterState.priceRange || 'All prices'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 stroke-[2.2] shrink-0 ml-1.5" />
              </button>

              {priceDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-full bg-white rounded-xl shadow-xl border border-zinc-100 py-1.5 z-30 max-h-56 overflow-y-auto">
                  {PRICE_RANGES_XAF.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setFilterState((prev) => ({ ...prev, priceRange: p }));
                        setPriceDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>{p}</span>
                      {filterState.priceRange === p && <Check className="w-3.5 h-3.5 text-black" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Size Range Dropdown */}
            <div className="relative">
              <label className="block text-[10px] uppercase font-semibold text-zinc-400 mb-1 pl-1">
                Floor Area (m²)
              </label>
              <button
                id="filter-size-btn"
                onClick={() => {
                  setSizeDropdownOpen(!sizeDropdownOpen);
                  setTypeDropdownOpen(false);
                  setPriceDropdownOpen(false);
                }}
                className="w-full h-11 px-3.5 bg-white border border-zinc-200/80 rounded-xl text-left flex items-center justify-between text-xs sm:text-[13px] text-zinc-800 hover:border-zinc-300 transition-colors shadow-2xs cursor-pointer"
              >
                <span className="truncate font-medium">{filterState.sizeRange || 'All sizes (m²)'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 stroke-[2.2] shrink-0 ml-1.5" />
              </button>

              {sizeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-full bg-white rounded-xl shadow-xl border border-zinc-100 py-1.5 z-30 max-h-56 overflow-y-auto">
                  {SIZE_RANGES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setFilterState((prev) => ({ ...prev, sizeRange: s }));
                        setSizeDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>{s}</span>
                      {filterState.sizeRange === s && <Check className="w-3.5 h-3.5 text-black" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Extended Options Drawer */}
          {showMoreOptions && (
            <div className="mt-3 pt-3.5 border-t border-zinc-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
                  Bedrooms
                </label>
                <div className="flex gap-1.5">
                  {[null, 1, 2, 3, 4].map((b) => (
                    <button
                      key={b === null ? 'any' : b}
                      onClick={() => setFilterState((prev) => ({ ...prev, beds: b }))}
                      className={`flex-1 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                        filterState.beds === b
                          ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      {b === null ? 'Any' : `${b}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
                  Bathrooms
                </label>
                <div className="flex gap-1.5">
                  {[null, 1, 2, 3, 4].map((b) => (
                    <button
                      key={b === null ? 'any' : b}
                      onClick={() => setFilterState((prev) => ({ ...prev, baths: b }))}
                      className={`flex-1 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                        filterState.baths === b
                          ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      {b === null ? 'Any' : `${b}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
                  Keyword / Location (Buea, Douala, Limbe...)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Buea, Douala, Limbe, Yaoundé..."
                  value={filterState.searchQuery}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full h-8 px-3 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>
          )}

          {/* Bottom Action Row: + More options, Clear filters, More Properties */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            
            {/* Left: + More options */}
            <button
              id="toggle-more-options-btn"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="text-xs sm:text-[13px] font-medium text-zinc-700 hover:text-black transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              <SlidersHorizontal className="w-3 h-3 text-zinc-500" />
              <span>{showMoreOptions ? '− Less options' : '+ More options'}</span>
            </button>

            {/* Right: Clear filters + More Properties button (no count badge) */}
            <div className="flex items-center gap-4 ml-auto">
              <button
                id="clear-filters-btn"
                onClick={onResetFilters}
                className="text-xs sm:text-[13px] font-normal text-zinc-600 hover:text-black flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-zinc-400 stroke-[2]" />
                <span>Clear filters</span>
              </button>

              <button
                id="show-properties-btn"
                onClick={handleAction}
                className="px-5 py-2.5 bg-zinc-950 text-white text-xs sm:text-[13px] font-semibold tracking-tight rounded-xl hover:bg-zinc-800 transition-all cursor-pointer shadow-xs active:scale-[0.98] flex items-center gap-2"
              >
                <span>More Properties</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
