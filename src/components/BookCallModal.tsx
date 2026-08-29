import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Calendar,
  Clock,
  Phone,
  User,
  Mail,
  ShieldCheck,
  MapPin,
  Building2,
  DollarSign,
  Coins,
  AlertCircle,
  MessageCircle,
  FileText,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Property } from '../types';
import { formatCurrency } from '../utils/currency';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  mode?: 'tour' | 'acquisition' | 'general';
  onNavigateToTerms?: () => void;
}

const BUDGET_OPTIONS = [
  'Under 50,000 FCFA',
  '50,000 – 100,000 FCFA',
  '100,000 – 200,000 FCFA',
  '200,000 – 350,000 FCFA',
  '350,000 – 500,000 FCFA',
  '500,000 – 750,000 FCFA',
  '750,000 – 1,000,000 FCFA',
  'Above 1,000,000 FCFA',
];

const CITIES = ['Buea', 'Douala', 'Limbe', 'Yaoundé', 'Kribi', 'Other / Surrounding'];

export const BookCallModal: React.FC<BookCallModalProps> = ({
  isOpen,
  onClose,
  property = null,
  mode = 'tour',
  onNavigateToTerms,
}) => {
  // Default date: tomorrow
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [submitted, setSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: property?.city || 'Buea',
    interest: property ? property.category : 'Apartment',
    budget: property ? `${formatCurrency(property.price, 'XAF')}/mo` : BUDGET_OPTIONS[1],
    preferredDate: getTomorrowDate(),
    timeSlot: 'Morning (09:00 - 12:00)',
    notes: '',
  });

  // Re-sync when property changes
  useEffect(() => {
    if (property) {
      setFormData((prev) => ({
        ...prev,
        city: property.city || prev.city,
        interest: property.category || prev.interest,
        budget: `${formatCurrency(property.price, 'XAF')}/mo`,
      }));
    }
  }, [property]);

  if (!isOpen) return null;

  const generateWhatsAppMessage = () => {
    const isAcquisition = mode === 'acquisition';
    const title = isAcquisition
      ? 'Property Acquisition & Advisory Consultation'
      : 'Property Tour & Inspection Session';

    let msg = `Hello Easy House Cameroon / Enownfor Manyi-Oben,\n\n`;
    msg += `I would like to book a *${title}*:\n`;
    msg += `• *Name:* ${formData.name || 'Client'}\n`;
    msg += `• *Phone/WhatsApp:* ${formData.phone}\n`;
    if (formData.email) msg += `• *Email:* ${formData.email}\n`;
    msg += `• *City:* ${formData.city}\n`;
    if (property) {
      msg += `• *Selected Property:* ${property.title} (${property.location}) - ${formatCurrency(property.price, 'XAF')}/mo\n`;
    } else {
      msg += `• *Property Type:* ${formData.interest}\n`;
    }
    msg += `• *Target Budget / Pricing:* ${formData.budget}\n`;
    msg += `• *Preferred Date:* ${formData.preferredDate} (${formData.timeSlot})\n`;
    if (formData.notes) msg += `• *Additional Notes:* ${formData.notes}\n`;
    msg += `\n*Terms Accepted:* Yes, I agree to the service fee of 15,000 FRS per session (covers 2-3 options, zero commissions, negotiation support, no refunds).`;

    return encodeURIComponent(msg);
  };

  const whatsAppUrl = `https://wa.me/237674121117?text=${generateWhatsAppMessage()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    setSubmitted(true);
  };

  const handleOpenWhatsAppDirectly = () => {
    if (!agreedToTerms) {
      setTermsError(true);
      return;
    }
    window.open(`https://wa.me/237674121117?text=${generateWhatsAppMessage()}`, '_blank');
    setSubmitted(true);
  };

  const isAcquisition = mode === 'acquisition';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div
        id="book-call-modal"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[92vh] overflow-y-auto border border-zinc-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Confirmation Screen */
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider border border-emerald-200">
                Request Recorded
              </span>
              <h3 className="text-2xl font-bold text-zinc-950">
                {isAcquisition ? 'Acquisition Request Received' : 'Tour Session Requested!'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-zinc-950">{formData.name}</strong>. Our lead consultant{' '}
                <strong className="text-zinc-950">Enownfor Manyi-Oben</strong> will coordinate your viewing session for{' '}
                <span className="font-semibold text-zinc-900">{formData.preferredDate}</span> ({formData.timeSlot}).
              </p>
            </div>

            {/* Summary Details Box */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between items-center text-zinc-600 pb-2 border-b border-zinc-200">
                <span className="font-medium">Destination City:</span>
                <span className="font-bold text-zinc-900">{formData.city}</span>
              </div>
              {property && (
                <div className="flex justify-between items-center text-zinc-600 pb-2 border-b border-zinc-200">
                  <span className="font-medium">Property:</span>
                  <span className="font-bold text-zinc-900 truncate max-w-[200px]">{property.title}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-zinc-600 pb-2 border-b border-zinc-200">
                <span className="font-medium">Target Budget / Pricing:</span>
                <span className="font-bold text-emerald-700">{formData.budget}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600 pb-2 border-b border-zinc-200">
                <span className="font-medium">Service Terms:</span>
                <span className="font-bold text-emerald-700">15,000 FRS (2–3 options checked)</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600">
                <span className="font-medium">No Extra Commission:</span>
                <span className="font-bold text-zinc-900">Included Negotiation Support</span>
              </div>
            </div>

            {/* Primary Action: Direct WhatsApp Chat */}
            <div className="pt-2 space-y-2.5 max-w-md mx-auto">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp (+237 674121117)</span>
              </a>

              <a
                href="tel:+237677499722"
                className="w-full py-3 px-6 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-zinc-700" />
                <span>Call Directly: +237 677499722</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="text-xs text-zinc-500 hover:text-zinc-900 underline font-medium cursor-pointer"
              >
                Close and return to browsing
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isAcquisition ? 'Property Acquisition & Advisory' : 'Schedule a Property Tour'}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                {isAcquisition ? 'Request Acquisition Consultation' : 'Book Your Property Tour Session'}
              </h3>
              
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Connect directly with lead consultant <strong className="text-zinc-800">Enownfor Manyi-Oben</strong> for authenticated viewings across Buea, Douala, Limbe & Yaoundé.
              </p>
            </div>

            {/* If a property is selected, show prefilled card */}
            {property && (
              <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center gap-3">
                <img
                  src={property.image}
                  alt={property.title}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white shadow-2xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-zinc-950 truncate">{property.title}</div>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>{property.city}, Cameroon</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-700 mt-0.5">
                    {formatCurrency(property.price, 'XAF')}/mo
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              {/* Full Name */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Your Full Name *</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Roland Ndive"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-9 pl-9 pr-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 focus:bg-white text-xs"
                  />
                </div>
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-zinc-700 font-semibold">Phone / WhatsApp *</label>
                    <span className="text-[10px] text-zinc-400 font-mono">{formData.phone.length}/9 digits</span>
                  </div>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 677499722"
                      value={formData.phone}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
                        setFormData({ ...formData, phone: digits });
                      }}
                      className="w-full h-9 pl-9 pr-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 focus:bg-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-9 pl-9 pr-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 focus:bg-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* City & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">City / Region *</label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-9 pl-9 pr-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 focus:bg-white cursor-pointer text-xs"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">Property Interest</label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full h-9 pl-9 pr-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 focus:bg-white cursor-pointer text-xs"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Single Room">Single Room</option>
                      <option value="Studio">Studio</option>
                      <option value="Modern House">Modern House</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Villa">Luxury Villa</option>
                      <option value="Commercial">Commercial / Office</option>
                      <option value="Land">Land / Property Acquisition</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Target Monthly Pricing / Budget */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-zinc-700 font-semibold">
                    Target Monthly Pricing / Budget *
                  </label>
                  <span className="text-[10px] text-zinc-400 font-medium">FCFA per month</span>
                </div>
                <div className="relative">
                  <Coins className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full h-9 pl-9 pr-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 focus:bg-white cursor-pointer text-xs font-medium text-zinc-900"
                  >
                    {property && (
                      <option value={`${formatCurrency(property.price, 'XAF')}/mo`}>
                        {formatCurrency(property.price, 'XAF')}/mo (Current Property Listing)
                      </option>
                    )}
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">Preferred Date *</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full h-9 pl-9 pr-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 focus:bg-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">Time Slot</label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full h-9 pl-9 pr-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 focus:bg-white text-xs"
                    >
                      <option>Morning (09:00 - 12:00)</option>
                      <option>Afternoon (12:00 - 16:00)</option>
                      <option>Evening (16:00 - 19:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Explicit Core Terms & Conditions Notice Box */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2 text-zinc-900">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-950">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>Easy House Cameroon — Service Terms:</span>
                </div>

                <ul className="space-y-1.5 text-[11px] text-zinc-800 font-medium pl-1">
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">•</span>
                    <span><strong>15,000 FRS Service Fee</strong> valid for a session.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>We check out <strong>2 to 3 different options</strong> per session.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">•</span>
                    <span><strong>No commissions or extra charges</strong> of any sort.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">•</span>
                    <span><strong>We assist our clients with the negotiation process</strong> with property owners.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">•</span>
                    <span><strong>No refunds.</strong></span>
                  </li>
                </ul>
              </div>

              {/* Required Terms & Conditions Agreement Checkbox */}
              <div className={`p-3 rounded-xl border transition-all ${
                termsError && !agreedToTerms
                  ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-200'
                  : 'bg-zinc-50/80 border-zinc-200'
              }`}>
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (e.target.checked) setTermsError(false);
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 cursor-pointer shrink-0"
                  />
                  <span className="text-[11px] text-zinc-800 leading-snug font-medium">
                    I have read and agree to the{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateToTerms) {
                          onClose();
                          onNavigateToTerms();
                        }
                      }}
                      className="text-zinc-950 font-bold underline hover:text-amber-700 inline"
                    >
                      Terms and Conditions
                    </button>{' '}
                    (15,000 FRS per session for 2–3 options, zero commissions, negotiation support, no refunds). *
                  </span>
                </label>

                {termsError && !agreedToTerms && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Please check the box to agree to the Terms & Conditions before submitting.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className={`w-full py-3.5 px-6 rounded-full text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    agreedToTerms
                      ? 'bg-zinc-950 hover:bg-zinc-800 active:scale-98'
                      : 'bg-zinc-800 hover:bg-zinc-900 opacity-95'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Confirm & Request Tour Session</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenWhatsAppDirectly}
                  className="w-full py-2.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Booking (+237 674121117)</span>
                </button>
              </div>

              <p className="text-[10px] text-zinc-400 text-center flex items-center justify-center gap-1 pt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Official Easy House Cameroon consultation • Buea, Douala, Limbe & Yaoundé</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
