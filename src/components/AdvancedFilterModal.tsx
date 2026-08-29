import React from 'react';
import { X, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { FilterState } from '../types';
import { COUNTRIES, PROPERTY_TYPES, PRICE_RANGES_XAF, SIZE_RANGES } from '../data/properties';

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatches: number;
  onResetFilters: () => void;
}

export const AdvancedFilterModal: React.FC<AdvancedFilterModalProps> = ({
  isOpen,
  onClose,
  filterState,
  setFilterState,
  totalMatches,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  const tabs: Array<FilterState['tab']> = [
    'Rent',
    'Furnished',
    'Long Term',
    'Short Term',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-zinc-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-zinc-950" />
            <h3 className="text-lg sm:text-xl font-bold text-zinc-950">
              Filter Portfolio & Residences (FCFA)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="py-5 space-y-6">
          
          {/* Tab Intent */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Rental Agreement Type
            </label>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterState((prev) => ({ ...prev, tab }))}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    filterState.tab === tab
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Location & Property Type Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Destination
              </label>
              <select
                value={filterState.country}
                onChange={(e) => setFilterState((prev) => ({ ...prev, country: e.target.value }))}
                className="w-full h-11 px-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-zinc-500 cursor-pointer"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Property Category
              </label>
              <select
                value={filterState.propertyType}
                onChange={(e) => setFilterState((prev) => ({ ...prev, propertyType: e.target.value }))}
                className="w-full h-11 px-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-zinc-500 cursor-pointer"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Range & Floor Space */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Budget in FCFA
              </label>
              <select
                value={filterState.priceRange}
                onChange={(e) => setFilterState((prev) => ({ ...prev, priceRange: e.target.value }))}
                className="w-full h-11 px-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-zinc-500 cursor-pointer"
              >
                {PRICE_RANGES_XAF.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Surface Area (m²)
              </label>
              <select
                value={filterState.sizeRange}
                onChange={(e) => setFilterState((prev) => ({ ...prev, sizeRange: e.target.value }))}
                className="w-full h-11 px-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:border-zinc-500 cursor-pointer"
              >
                {SIZE_RANGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bedrooms & Bathrooms count */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Minimum Bedrooms
            </label>
            <div className="flex gap-2">
              {[null, 1, 2, 3, 4, 5, 6].map((b) => (
                <button
                  key={b ?? 'any'}
                  type="button"
                  onClick={() => setFilterState((prev) => ({ ...prev, beds: b }))}
                  className={`w-10 h-10 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    filterState.beds === b
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {b === null ? 'Any' : `${b}+`}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 px-3 py-2 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded-full transition-colors cursor-pointer shadow-xs"
            >
              Show {totalMatches} Matches
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
