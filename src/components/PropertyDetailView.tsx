import React, { useState, useMemo } from 'react';
import { Property, AppPage } from '../types';
import logoImg from '../assets/images/logo.webp';
import dpImage from '../assets/images/dp.webp';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  X,
  ChevronRight,
  ChevronLeft,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Building2,
  Maximize2,
  DollarSign,
  SlidersHorizontal,
  Search,
  Check
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

interface PropertyDetailViewProps {
  property: Property;
  onClose: () => void;
  onBookTour: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  selectedCurrency?: string;
  onNavigate?: (page: AppPage) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onClose,
  onBookTour,
  isFavorite,
  onToggleFavorite,
  selectedCurrency = 'XAF',
  onNavigate,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [showContactDrawer, setShowContactDrawer] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleNav = (page: AppPage) => {
    onClose();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  // Address parsing
  const addressLines = property.address
    ? property.address.split('\n')
    : [property.title, `${property.city}, ${property.country}`];

  // Sqft calculation
  const displaySqft = property.sqft || Math.round(property.sizeM2 * 10.764);

  // Gallery array (Primary image first + all secondary uploaded images without duplicates)
  const gallery = useMemo(() => {
    const rawList = [
      property.image,
      ...(Array.isArray(property.gallery) ? property.gallery : []),
    ].filter((img): img is string => Boolean(img && typeof img === 'string'));
    const unique = Array.from(new Set(rawList));
    return unique.length > 0 ? unique : [property.image];
  }, [property.image, property.gallery]);

  const currentImage = gallery[activeImageIndex] || property.image || gallery[0];

  // Slideshow handlers
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  // Consultant info
  const consultant = {
    name: 'Enownfor Manyi-Oben',
    phone: '677499722',
    whatsapp: '674121117',
    avatar: dpImage,
    email: 'info@easyhousecameroon.com'
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-[#f8f5f0] via-[#f7f8fa] to-[#edf4f9] text-zinc-900 flex flex-col justify-between min-h-screen selection:bg-black selection:text-white animate-in fade-in duration-200">
      
      {/* 1. Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5 flex items-center justify-between">
        {/* Left: Brand Logo & Back Action */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Hidden on mobile view as requested */}
          <button
            onClick={onClose}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-200/80 shadow-2xs transition-all cursor-pointer"
            title="Return to listings"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to listings</span>
          </button>
          
          <img
            src={logoImg}
            alt="Easy House Cameroon Logo"
            className="h-8 sm:h-9 w-auto object-contain select-none"
          />
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600 font-normal">
          <button onClick={() => handleNav('home')} className="hover:text-zinc-950 transition-colors cursor-pointer">
            Home
          </button>
          <button onClick={() => handleNav('properties')} className="hover:text-zinc-950 transition-colors cursor-pointer text-zinc-950 font-semibold">
            Properties
          </button>
          <button onClick={() => handleNav('about')} className="hover:text-zinc-950 transition-colors cursor-pointer">
            About
          </button>
        </nav>

        {/* Right: Schedule Tour & Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hidden on mobile view as requested */}
          <button
            onClick={() => onBookTour(property)}
            className="hidden sm:inline-flex px-5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded-full transition-all shadow-xs cursor-pointer"
          >
            Schedule Tour
          </button>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-zinc-950 cursor-pointer shadow-2xs"
            aria-label="Close detail view"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Main Page Content Body */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-6 flex-1 flex flex-col justify-center">
        
        {/* Main Headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 mb-6 sm:mb-8">
          {property.title}
        </h1>

        {/* Property Showcase Stage (2 Columns: Slideshow Image + Detail Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Property Showcase Image Slideshow (approx 7 columns) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            <div className="relative w-full h-[340px] sm:h-[440px] lg:h-[480px] rounded-[28px] overflow-hidden bg-zinc-200 shadow-sm border border-zinc-200/60 group select-none">
              <img
                src={currentImage}
                alt={`${property.title} - Image ${activeImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500"
              />

              {/* Status / Category tag */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                  {property.category}
                </span>
                {property.isNew && (
                  <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-zinc-900 text-xs font-semibold shadow-xs">
                    New Listing
                  </span>
                )}
              </div>

              {/* Slideshow Next / Prev arrows (shown when more than 1 image) */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Image Counter Badge */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                    {activeImageIndex + 1} / {gallery.length}
                  </div>
                </>
              )}

              {/* Multi-angle Gallery Thumbnail Switcher */}
              {gallery.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex gap-1.5 p-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 pointer-events-auto overflow-x-auto max-w-[80%]">
                    {gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-11 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                          activeImageIndex === idx ? 'border-white scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-black/45 backdrop-blur-md text-white border border-white/20 hover:bg-black/70 transition-all pointer-events-auto cursor-pointer"
                    title="Share property"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Floating Property Spec & Contact Card */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <div className="bg-white rounded-[28px] p-6 sm:p-7 shadow-xs border border-zinc-200/80 flex flex-col justify-between h-full min-h-[460px] relative">
              
              <div>
                {/* Header: Address + Bookmark */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 leading-tight">
                      {addressLines[0]}
                    </h2>
                    {addressLines[1] && (
                      <p className="text-sm font-medium text-zinc-500 mt-0.5">
                        {addressLines[1]}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onToggleFavorite(property.id)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isFavorite
                        ? 'bg-zinc-950 border-zinc-950 text-white'
                        : 'border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-950 bg-white'
                    }`}
                    aria-label="Save property"
                  >
                    <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Specs Row: Beds | Baths | Sqft */}
                <div className="flex items-center gap-2 text-sm text-zinc-700 font-normal mt-4">
                  <span className="font-semibold text-zinc-950">{property.beds}</span> beds
                  <span className="text-zinc-300">|</span>
                  <span className="font-semibold text-zinc-950">{property.baths}</span> baths
                  <span className="text-zinc-300">|</span>
                  <span className="font-semibold text-zinc-950">{property.sizeM2} m²</span> ({displaySqft.toLocaleString()} sqft)
                </div>

                {/* Price and Lease Options */}
                <div className="flex items-center justify-between gap-2 mt-6 pt-5 border-t border-zinc-100">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-sans">
                      {formatCurrency(property.price, 'XAF')} <span className="text-sm font-medium text-zinc-500">/ mo</span>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                      Verified Monthly Lease
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSplitModal(true)}
                    className="flex items-center gap-1 text-xs font-medium text-zinc-800 hover:text-zinc-950 px-3.5 py-1.5 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Lease terms</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {/* Consultant Info Box (Enownfor Manyi-Oben - No role label) */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50/90 border border-zinc-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={consultant.avatar}
                      alt={consultant.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border border-white shadow-2xs"
                    />
                    <div>
                      <div className="text-sm font-bold text-zinc-950 leading-snug">
                        {consultant.name}
                      </div>
                      <div className="text-xs text-zinc-500 font-normal">
                        WhatsApp: {consultant.whatsapp}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowContactDrawer(true)}
                    className="px-4 py-1.5 text-xs font-medium text-zinc-800 hover:text-zinc-950 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-white bg-white transition-all cursor-pointer shadow-2xs"
                  >
                    Contact
                  </button>
                </div>

                {/* Request a Tour CTA Button */}
                <button
                  onClick={() => onBookTour(property)}
                  className="w-full py-3.5 px-6 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white transition-all cursor-pointer flex flex-col items-center justify-center shadow-sm group active:scale-[0.99]"
                >
                  <span className="text-sm font-semibold tracking-wide">
                    Request a tour
                  </span>
                  <span className="text-[11px] text-zinc-400 font-normal mt-0.5">
                    Earliest at 11:00 tomorrow
                  </span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 3. Bottom Discovery Bar */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <div className="bg-white rounded-full p-2 sm:p-2.5 shadow-md border border-zinc-200/80 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2">
          
          {/* Location field */}
          <div className="flex items-center gap-2.5 px-4 py-2 hover:bg-zinc-50 rounded-full cursor-pointer transition-colors flex-1 min-w-[140px]">
            <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                Location
              </div>
              <div className="text-xs font-semibold text-zinc-900 truncate">
                {property.city ? `${property.city}, ${property.country}` : 'Cameroon'}
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-7 bg-zinc-100" />

          {/* Property type field */}
          <div className="flex items-center gap-2.5 px-4 py-2 hover:bg-zinc-50 rounded-full cursor-pointer transition-colors flex-1 min-w-[130px]">
            <Building2 className="w-4 h-4 text-zinc-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                Property type
              </div>
              <div className="text-xs font-semibold text-zinc-900 truncate">
                {property.category}
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-7 bg-zinc-100" />

          {/* Price field */}
          <div className="flex items-center gap-2.5 px-4 py-2 hover:bg-zinc-50 rounded-full cursor-pointer transition-colors flex-1 min-w-[140px]">
            <DollarSign className="w-4 h-4 text-zinc-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                Monthly Rent
              </div>
              <div className="text-xs font-semibold text-zinc-900">
                {formatCurrency(property.price, 'XAF', { compact: true })}/mo
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-7 bg-zinc-100" />

          {/* Bedrooms field */}
          <div className="flex items-center gap-2.5 px-4 py-2 hover:bg-zinc-50 rounded-full cursor-pointer transition-colors flex-1 min-w-[120px]">
            <Maximize2 className="w-4 h-4 text-zinc-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                Bedrooms
              </div>
              <div className="text-xs font-semibold text-zinc-900">
                {property.beds} Beds
              </div>
            </div>
          </div>

          {/* Actions: Close */}
          <div className="flex items-center gap-2 ml-auto pr-1">
            <button
              onClick={onClose}
              className="flex items-center justify-center px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </footer>

      {/* Lease Terms Modal Overlay */}
      {showSplitModal && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">
                  Lease Terms & Payment Options
                </h3>
                <p className="text-xs text-zinc-500">Fixed rate in FCFA</p>
              </div>
              <button
                onClick={() => setShowSplitModal(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-zinc-950 text-sm">Annual Standard Lease (12 mo)</p>
                  <p className="text-zinc-500 mt-0.5">Best long-term monthly rate</p>
                </div>
                <div className="text-right font-mono font-bold text-sm text-zinc-950">
                  {formatCurrency(property.price, 'XAF')} / mo
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-zinc-950 text-sm">6-Month Lease Option</p>
                  <p className="text-zinc-500 mt-0.5">Flexible mid-term contract</p>
                </div>
                <div className="text-right font-mono font-bold text-sm text-zinc-950">
                  {formatCurrency(Math.round(property.price * 1.05), 'XAF')} / mo
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-zinc-950 text-sm">Quarterly Stay</p>
                  <p className="text-zinc-500 mt-0.5">Flexible 3-month rental</p>
                </div>
                <div className="text-right font-mono font-bold text-sm text-zinc-950">
                  {formatCurrency(Math.round(property.price * 1.1), 'XAF')} / mo
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSplitModal(false);
                onBookTour(property);
              }}
              className="w-full py-3 rounded-full bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Request Lease Application
            </button>
          </div>
        </div>
      )}

      {/* Direct Contact Modal (Enownfor Manyi-Oben, WhatsApp 674121117, Direct call 677499722) */}
      {showContactDrawer && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-150 text-center">
            <div className="flex justify-end">
              <button
                onClick={() => setShowContactDrawer(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <img
              src={consultant.avatar}
              alt={consultant.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white shadow-sm"
            />
            <h3 className="text-lg font-bold text-zinc-950">{consultant.name}</h3>

            <div className="mt-5 space-y-2.5 text-xs text-left">
              <a
                href={`https://wa.me/237${consultant.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-900 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <div className="flex-1">
                  <div className="text-[10px] text-emerald-700 uppercase font-semibold">WhatsApp</div>
                  <div className="font-bold text-emerald-950">{consultant.whatsapp}</div>
                </div>
              </a>

              <a
                href={`tel:+237${consultant.phone}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-zinc-700" />
                <div className="flex-1">
                  <div className="text-[10px] text-zinc-500 uppercase font-semibold">Direct Call</div>
                  <div className="font-bold text-zinc-950">{consultant.phone}</div>
                </div>
              </a>
            </div>

            <button
              onClick={() => {
                setShowContactDrawer(false);
                onBookTour(property);
              }}
              className="w-full mt-5 py-3 rounded-full bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Book Tour Meeting
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
