import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown, Grid, ListFilter, RotateCcw, Home, ChevronRight } from 'lucide-react';
import { PropertyGrid } from '../components/PropertyGrid';
import { SearchFilter } from '../components/SearchFilter';
import { Property, FilterState, AppPage } from '../types';

interface PropertiesPageProps {
  properties: Property[];
  filteredProperties: Property[];
  onSelectProperty: (property: Property) => void;
  onQuickSpotlight: (property: Property) => void;
  onBookTour: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  activeSpotlightId: string;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  onOpenAdvancedFilters: () => void;
  onResetFilters: () => void;
  onNavigate: (page: AppPage) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  filteredProperties,
  onSelectProperty,
  onQuickSpotlight,
  onBookTour,
  favorites,
  onToggleFavorite,
  activeSpotlightId,
  filterState,
  setFilterState,
  onOpenAdvancedFilters,
  onResetFilters,
  onNavigate,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'size-desc'>('featured');

  // Apply sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'size-desc') return b.sizeM2 - a.sizeM2;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen pb-24">
      
      {/* Header Banner */}
      <section className="bg-white border-b border-zinc-200/70 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 font-medium mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-zinc-300" />
            <span className="text-zinc-950 font-semibold">Properties</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950">
                Available Properties for Rent
              </h1>
              <p className="text-sm text-zinc-600 mt-2 max-w-2xl leading-relaxed">
                Explore our catalog of houses, apartments, studios, and villas for rent across Buea, Douala, Limbe, and Yaoundé.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-right">
                <div className="text-xl font-bold text-zinc-950 font-mono">
                  {filteredProperties.length} / {properties.length}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                  Listings Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section (Non-sticky) */}
      <section className="bg-white border-b border-zinc-200/80 shadow-2xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <SearchFilter
            filterState={filterState}
            setFilterState={setFilterState}
            totalMatches={filteredProperties.length}
            onOpenAdvancedFilters={onOpenAdvancedFilters}
            onResetFilters={onResetFilters}
          />
        </div>
      </section>

      {/* Sorting & Filter status row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Active Filter summary */}
          <div className="flex items-center gap-2 flex-wrap text-zinc-600">
            <span className="font-semibold text-zinc-950">Showing:</span>
            <span className="px-2.5 py-1 rounded-full bg-zinc-100 font-medium text-zinc-800">
              {filterState.tab}
            </span>
            {filterState.country !== 'All countries' && filterState.country !== 'All' && (
              <span className="px-2.5 py-1 rounded-full bg-zinc-100 font-medium text-zinc-800">
                {filterState.country}
              </span>
            )}
            {filterState.propertyType !== 'All Types' && (
              <span className="px-2.5 py-1 rounded-full bg-zinc-100 font-medium text-zinc-800">
                {filterState.propertyType}
              </span>
            )}
            {filterState.priceRange !== 'All prices' && (
              <span className="px-2.5 py-1 rounded-full bg-zinc-100 font-medium text-zinc-800">
                {filterState.priceRange}
              </span>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-zinc-500 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <span>Sort by:</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 font-medium text-zinc-800 focus:outline-none focus:border-zinc-500 cursor-pointer shadow-2xs"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High (FCFA)</option>
              <option value="price-desc">Price: High to Low (FCFA)</option>
              <option value="size-desc">Largest Floor Area (m²)</option>
            </select>
          </div>

        </div>
      </section>

      {/* Property Grid Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-2">
        <PropertyGrid
          properties={sortedProperties}
          onSelectProperty={onSelectProperty}
          onQuickSpotlight={onQuickSpotlight}
          onBookTour={onBookTour}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          activeSpotlightId={activeSpotlightId}
        />
      </section>

    </div>
  );
};
