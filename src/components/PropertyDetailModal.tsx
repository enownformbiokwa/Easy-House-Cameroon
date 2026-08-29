import React, { useState } from 'react';
import { Property } from '../types';
import { X, Maximize2, Layers, Bed, Bath, MapPin, Calendar, Check, Send, PhoneCall, Calculator } from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onBookTour: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onBookTour,
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanYears, setLoanYears] = useState(30);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');

  if (!property) return null;

  const galleryList = Array.from(
    new Set([
      property.image,
      ...(Array.isArray(property.gallery) ? property.gallery : []),
    ].filter((img): img is string => Boolean(img && typeof img === 'string')))
  );

  // Calculate monthly mortgage payment
  const loanAmount = property.price * (1 - downPaymentPct / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanYears * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div
        id="property-detail-modal"
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>{property.location}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 sm:px-8 space-y-6">
          
          {/* Main Gallery Carousel */}
          <div>
            <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-xl overflow-hidden bg-zinc-100 mb-3 shadow-xs">
              <img
                src={galleryList[activeImgIndex] || property.image}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            {galleryList.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {galleryList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImgIndex === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Price and Key Specs Row */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-zinc-100">
            <div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950">
                {property.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                Built in {property.yearBuilt} · Verified Exclusive Listing
              </p>
            </div>

            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
                ${property.price.toLocaleString()}
              </span>
              <p className="text-[11px] text-zinc-400">
                ~${Math.round(property.price / property.sizeM2).toLocaleString()} / m²
              </p>
            </div>
          </div>

          {/* Spec Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
            <div className="flex items-center gap-2.5">
              <Maximize2 className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Area</p>
                <p className="text-sm font-semibold text-zinc-900">{property.sizeM2} m²</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Floors</p>
                <p className="text-sm font-semibold text-zinc-900">{property.floors} Levels</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Bed className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Bedrooms</p>
                <p className="text-sm font-semibold text-zinc-900">{property.beds} Beds</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Bath className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Bathrooms</p>
                <p className="text-sm font-semibold text-zinc-900">{property.baths} Baths</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-2">
              About This Residence
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              {property.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">
              Architectural Highlights & Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700 bg-zinc-50 px-3 py-2 rounded-lg">
                  <Check className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Mortgage Calculator Box */}
          <div className="p-5 bg-zinc-50 rounded-xl border border-zinc-200/70">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-zinc-700" />
                <h3 className="text-sm font-semibold text-zinc-900">
                  Estimated Monthly Mortgage
                </h3>
              </div>
              <span className="text-lg font-bold text-zinc-950 font-mono">
                ${Math.round(monthlyPayment).toLocaleString()} / mo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[11px] text-zinc-500 block mb-1">
                  Down Payment ({downPaymentPct}%): ${((property.price * downPaymentPct) / 100).toLocaleString()}
                </label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] text-zinc-500 block mb-1">
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min="2.5"
                  max="8.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] text-zinc-500 block mb-1">
                  Term: {loanYears} Years
                </label>
                <select
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full h-8 px-2 bg-white border border-zinc-200 rounded text-xs"
                >
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Direct Agent Contact / Inquiry Form */}
          <div className="bg-zinc-900 text-white p-5 sm:p-6 rounded-xl">
            {inquirySent ? (
              <div className="text-center py-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold">Consultation Request Received</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  A Horizon Estate senior real estate advisor for {property.city} will contact you within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-3">
                <h4 className="text-sm font-semibold tracking-wide">
                  Request a Private Viewing & Floor Plans
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="h-10 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="h-10 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-white"
                  />
                  <input
                    type="tel"
                    required
                    maxLength={9}
                    placeholder="Phone (e.g. 677499722)"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                    className="h-10 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-white font-mono"
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-white text-zinc-950 font-semibold text-xs rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-600 hover:text-black cursor-pointer"
          >
            Close
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onBookTour(property);
              }}
              className="px-5 py-2.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-zinc-800 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book In-Person Tour</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
