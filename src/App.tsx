import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { AboutPage } from './pages/AboutPage';
import { LegalPage } from './pages/LegalPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { PropertyDetailView } from './components/PropertyDetailView';
import { SplitOptionsModal } from './components/SplitOptionsModal';
import { AgentContactModal } from './components/AgentContactModal';
import { AdvancedFilterModal } from './components/AdvancedFilterModal';
import { BookCallModal } from './components/BookCallModal';
import { CookieConsentModal } from './components/CookieConsentModal';
import { Footer } from './components/Footer';
import { PROPERTIES } from './data/properties';
import { Property, FilterState, AppPage } from './types';
import { convertPrice } from './utils/currency';
import { openWhatsAppTour } from './utils/whatsapp';
import {
  fetchServerProperties,
  createServerProperty,
  updateServerProperty,
  deleteServerProperty,
  resetServerProperties,
} from './utils/api';

const STORAGE_KEY = 'horizon_estate_properties_v2';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [propertiesList, setPropertiesList] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading properties from storage:', e);
    }
    return PROPERTIES;
  });

  // Fetch live properties from Express backend on start
  useEffect(() => {
    fetchServerProperties().then((serverProps) => {
      if (serverProps && Array.isArray(serverProps) && serverProps.length > 0) {
        setPropertiesList(serverProps);
      }
    });
  }, []);

  const [spotlightProperty, setSpotlightProperty] = useState<Property>(() => {
    return propertiesList[0] || PROPERTIES[0];
  });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Sync to local storage whenever propertiesList changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(propertiesList));
    } catch (e) {
      console.error('Error saving properties to storage:', e);
    }
  }, [propertiesList]);
  
  // Modals state
  const [bookCallModalOpen, setBookCallModalOpen] = useState(false);
  const [tourModalProperty, setTourModalProperty] = useState<Property | null>(null);
  const [tourModalMode, setTourModalMode] = useState<'tour' | 'acquisition' | 'general'>('tour');
  const [splitModalProperty, setSplitModalProperty] = useState<Property | null>(null);
  const [contactModalProperty, setContactModalProperty] = useState<Property | null>(null);
  const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  const handleOpenTourModal = (prop?: Property | null, mode: 'tour' | 'acquisition' | 'general' = 'tour') => {
    openWhatsAppTour(prop || null);
  };
  
  // Favorites
  const [favorites, setFavorites] = useState<string[]>(['bastos-modern-sanctuary', 'bonapriso-waterfront-residence']);

  // Filter State
  const [filterState, setFilterState] = useState<FilterState>({
    tab: 'Rent',
    country: 'All countries',
    propertyType: 'All Types',
    priceRange: 'All prices',
    sizeRange: 'All sizes (m²)',
    beds: null,
    baths: null,
    searchQuery: '',
  });

  // Filter properties according to state
  const filteredProperties = useMemo(() => {
    return propertiesList.filter((prop) => {
      // Tab filter
      if (filterState.tab === 'Furnished' && !prop.features.some(f => f.toLowerCase().includes('furnished'))) {
        // allow pass if default
      }

      // Country filter
      if (filterState.country !== 'All countries' && filterState.country !== 'All' && filterState.country !== 'All Destinations') {
        if (prop.country !== filterState.country && !prop.location.includes(filterState.country) && !prop.city.includes(filterState.country)) {
          return false;
        }
      }

      // Property type filter
      if (
        filterState.propertyType !== 'All Types' &&
        filterState.propertyType !== 'All' &&
        filterState.propertyType !== 'New property'
      ) {
        const typeMap: Record<string, string> = {
          'Modern Houses': 'Modern House',
          'Luxury Villas': 'Villa',
          'Towers & Penthouses': 'Tower',
          'Island Retreats': 'Retreat',
          'Alpine Lodges': 'Lodge',
          'Eco Retreats': 'Eco Retreat',
          'Houses': 'Modern House',
          'Condos': 'Tower',
        };
        const expected = typeMap[filterState.propertyType] || filterState.propertyType;
        if (prop.category !== expected && prop.type !== filterState.propertyType) {
          return false;
        }
      }

      // Price Range filter in XAF / FCFA (monthly rental tiers)
      const priceInXAF = convertPrice(prop.price, 'XAF');

      if (filterState.priceRange === 'Under 50,000 FCFA') {
        if (priceInXAF >= 50_000) return false;
      } else if (filterState.priceRange === '50,000 – 100,000 FCFA') {
        if (priceInXAF < 50_000 || priceInXAF > 100_000) return false;
      } else if (filterState.priceRange === '100,000 – 200,000 FCFA') {
        if (priceInXAF < 100_000 || priceInXAF > 200_000) return false;
      } else if (filterState.priceRange === '200,000 – 350,000 FCFA') {
        if (priceInXAF < 200_000 || priceInXAF > 350_000) return false;
      } else if (filterState.priceRange === '350,000 – 500,000 FCFA') {
        if (priceInXAF < 350_000 || priceInXAF > 500_000) return false;
      } else if (filterState.priceRange === '500,000 – 750,000 FCFA') {
        if (priceInXAF < 500_000 || priceInXAF > 750_000) return false;
      } else if (filterState.priceRange === '750,000 – 1,000,000 FCFA') {
        if (priceInXAF < 750_000 || priceInXAF > 1_000_000) return false;
      } else if (filterState.priceRange === 'Above 1,000,000 FCFA' || filterState.priceRange === '1,000,000+ FCFA' || filterState.priceRange === '4,000,000+ FCFA') {
        if (priceInXAF < 1_000_000) return false;
      } else if (filterState.priceRange === 'Under 1,500,000 FCFA') {
        if (priceInXAF >= 1_500_000) return false;
      } else if (filterState.priceRange === '1,500,000 – 2,500,000 FCFA') {
        if (priceInXAF < 1_500_000 || priceInXAF > 2_500_000) return false;
      } else if (filterState.priceRange === '2,500,000 – 4,000,000 FCFA') {
        if (priceInXAF < 2_500_000 || priceInXAF > 4_000_000) return false;
      }

      // Size Range filter
      if (filterState.sizeRange === 'Under 200 m²') {
        if (prop.sizeM2 >= 200) return false;
      } else if (filterState.sizeRange === '200 – 300 m²') {
        if (prop.sizeM2 < 200 || prop.sizeM2 > 300) return false;
      } else if (filterState.sizeRange === '300 – 400 m²') {
        if (prop.sizeM2 < 300 || prop.sizeM2 > 400) return false;
      } else if (filterState.sizeRange === '400+ m²') {
        if (prop.sizeM2 < 400) return false;
      }

      // Bedrooms
      if (filterState.beds !== null && prop.beds < filterState.beds) {
        return false;
      }

      // Bathrooms
      if (filterState.baths !== null && prop.baths < filterState.baths) {
        return false;
      }

      // Search Query keyword
      if (filterState.searchQuery.trim() !== '') {
        const query = filterState.searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesLoc = prop.location.toLowerCase().includes(query);
        const matchesDesc = prop.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesDesc) return false;
      }

      return true;
    });
  }, [propertiesList, filterState]);

  const handleResetFilters = () => {
    setFilterState({
      tab: 'Rent',
      country: 'All countries',
      propertyType: 'All Types',
      priceRange: 'All prices',
      sizeRange: 'All sizes (m²)',
      beds: null,
      baths: null,
      searchQuery: '',
    });
  };

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddProperty = (newProp: Property) => {
    setPropertiesList((prev) => [newProp, ...prev]);
    setSpotlightProperty(newProp);
    // Sync with backend API
    createServerProperty(newProp).catch((err) => {
      console.warn('Backend property add sync:', err);
    });
  };

  const handleUpdateProperty = (updatedProp: Property) => {
    setPropertiesList((prev) =>
      prev.map((p) => (p.id === updatedProp.id ? updatedProp : p))
    );
    if (spotlightProperty.id === updatedProp.id) {
      setSpotlightProperty(updatedProp);
    }
    if (selectedProperty?.id === updatedProp.id) {
      setSelectedProperty(updatedProp);
    }
    // Sync with backend API
    updateServerProperty(updatedProp).catch((err) => {
      console.warn('Backend property update sync:', err);
    });
  };

  const handleRemoveProperty = (propertyId: string) => {
    setPropertiesList((prev) => {
      const updated = prev.filter((p) => p.id !== propertyId);
      // Update spotlight if current spotlight was removed
      if (spotlightProperty.id === propertyId && updated.length > 0) {
        setSpotlightProperty(updated[0]);
      }
      return updated;
    });

    if (selectedProperty?.id === propertyId) {
      setSelectedProperty(null);
    }
    // Sync with backend API
    deleteServerProperty(propertyId).catch((err) => {
      console.warn('Backend property delete sync:', err);
    });
  };

  const handleResetProperties = () => {
    setPropertiesList(PROPERTIES);
    setSpotlightProperty(PROPERTIES[0]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
    // Sync with backend API
    resetServerProperties().catch((err) => {
      console.warn('Backend property reset sync:', err);
    });
  };

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] via-[#f7f8fa] to-[#edf4f9] text-zinc-950 flex flex-col font-sans selection:bg-zinc-950 selection:text-white">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onBookCallClick={() => handleOpenTourModal(null, 'tour')}
      />

      {/* Main Experience Body (Page Switching) */}
      <main className="flex-1">
        
        {currentPage === 'home' && (
          <HomePage
            properties={propertiesList}
            spotlightProperty={spotlightProperty}
            onSelectSpotlight={(prop) => setSpotlightProperty(prop)}
            onOpenFullDetail={(prop) => setSelectedProperty(prop)}
            onBookTour={(prop) => handleOpenTourModal(prop, 'tour')}
            onOpenSplitOptions={(prop) => setSplitModalProperty(prop)}
            onContactAgent={(prop) => setContactModalProperty(prop)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            filterState={filterState}
            setFilterState={setFilterState}
            onOpenAdvancedFilters={() => setAdvancedFilterOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'properties' && (
          <PropertiesPage
            properties={propertiesList}
            filteredProperties={filteredProperties}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onQuickSpotlight={(prop) => {
              setSpotlightProperty(prop);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookTour={(prop) => handleOpenTourModal(prop, 'tour')}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            activeSpotlightId={spotlightProperty.id}
            filterState={filterState}
            setFilterState={setFilterState}
            onOpenAdvancedFilters={() => setAdvancedFilterOpen(true)}
            onResetFilters={handleResetFilters}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onBookCallClick={() => handleOpenTourModal(null, 'tour')}
          />
        )}

        {(currentPage === 'privacy' || currentPage === 'terms') && (
          <LegalPage
            initialTab={currentPage}
            onNavigate={handleNavigate}
            onBookCallClick={() => handleOpenTourModal(null, 'tour')}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            properties={propertiesList}
            onAddProperty={handleAddProperty}
            onUpdateProperty={handleUpdateProperty}
            onRemoveProperty={handleRemoveProperty}
            onResetProperties={handleResetProperties}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onNavigate={handleNavigate}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCookieSettings={() => setCookieModalOpen(true)}
      />

      {/* Cookie & Local Data Consent Policy Modal */}
      <CookieConsentModal
        onNavigateLegal={handleNavigate}
        isOpenExternal={cookieModalOpen}
        onCloseExternal={() => setCookieModalOpen(false)}
      />

      {/* Modals & Overlays */}
      
      {/* Complete Property Inspection Deep-Dive */}
      {selectedProperty && (
        <PropertyDetailView
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={(id) => handleToggleFavorite(id)}
          onBookTour={(prop) => {
            setSelectedProperty(null);
            handleOpenTourModal(prop, 'tour');
          }}
          onNavigate={handleNavigate}
        />
      )}

      {/* Split Co-Ownership & Acquisition Options Modal */}
      <SplitOptionsModal
        property={splitModalProperty}
        isOpen={!!splitModalProperty}
        onClose={() => setSplitModalProperty(null)}
        onBookConsultation={(prop) => {
          setSplitModalProperty(null);
          handleOpenTourModal(prop, 'acquisition');
        }}
        onNavigateToTerms={() => handleNavigate('terms')}
      />

      {/* Direct Agent Contact Modal */}
      <AgentContactModal
        property={contactModalProperty}
        isOpen={!!contactModalProperty}
        onClose={() => setContactModalProperty(null)}
        onBookDirectMeeting={(prop) => {
          setContactModalProperty(null);
          handleOpenTourModal(prop, 'tour');
        }}
      />

      {/* Advanced Filter Modal */}
      <AdvancedFilterModal
        isOpen={advancedFilterOpen}
        onClose={() => setAdvancedFilterOpen(false)}
        filterState={filterState}
        setFilterState={setFilterState}
        totalMatches={filteredProperties.length}
        onResetFilters={handleResetFilters}
      />

      {/* Book a Call / Request Tour Modal */}
      <BookCallModal
        isOpen={bookCallModalOpen}
        onClose={() => setBookCallModalOpen(false)}
        property={tourModalProperty}
        mode={tourModalMode}
        onNavigateToTerms={() => handleNavigate('terms')}
      />

    </div>
  );
}
