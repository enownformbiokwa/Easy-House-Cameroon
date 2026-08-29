import React, { useState } from 'react';
import { X, ShieldCheck, CalendarCheck, Clock, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { Property } from '../types';
import { formatCurrency } from '../utils/currency';

interface SplitOptionsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onBookConsultation: (property: Property) => void;
  onNavigateToTerms?: () => void;
}

export const SplitOptionsModal: React.FC<SplitOptionsModalProps> = ({
  property,
  isOpen,
  onClose,
  onBookConsultation,
  onNavigateToTerms,
}) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  if (!isOpen || !property) return null;

  const price = property.price;
  const corporateRate = Math.round(price * 1.08);
  const quarterlyRate = Math.round(price * 1.15);
  const servicedRate = Math.round(price * 1.25);

  const handleProceed = () => {
    if (!agreedToTerms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    onBookConsultation(property);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-200 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-[10px] font-bold uppercase tracking-wider mb-1">
              Property Acquisition & Lease Terms
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-950">
              Lease & Acquisition Options
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 truncate max-w-xs sm:max-w-sm">
              {property.title} · {formatCurrency(property.price, 'XAF')}/mo
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="py-4 space-y-3">
          
          {/* Option 1: 12-Month Standard Lease */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-between gap-3 hover:bg-zinc-100/70 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-900 shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-zinc-950 text-xs sm:text-sm">12-Month Annual Lease</p>
                <p className="text-[11px] text-zinc-500">Standard residential agreement with renewal option</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-xs sm:text-sm text-zinc-950">
                {formatCurrency(price, 'XAF')}
              </span>
              <span className="text-[10px] text-zinc-400 font-normal block">/ mo</span>
            </div>
          </div>

          {/* Option 2: 6-Month Corporate Lease */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-between gap-3 hover:bg-zinc-100/70 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-900 shrink-0 mt-0.5">
                <CalendarCheck className="w-4 h-4 text-zinc-700" />
              </div>
              <div>
                <p className="font-semibold text-zinc-950 text-xs sm:text-sm">6-Month Corporate Term</p>
                <p className="text-[11px] text-zinc-500">Includes bi-weekly maintenance & billing to company</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-xs sm:text-sm text-zinc-950">
                {formatCurrency(corporateRate, 'XAF')}
              </span>
              <span className="text-[10px] text-zinc-400 font-normal block">/ mo</span>
            </div>
          </div>

          {/* Option 3: 3-Month Quarterly Stay */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-between gap-3 hover:bg-zinc-100/70 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-900 shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-zinc-500" />
              </div>
              <div>
                <p className="font-semibold text-zinc-950 text-xs sm:text-sm">3-Month Executive Term</p>
                <p className="text-[11px] text-zinc-500">Short-term executive flexibility</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-xs sm:text-sm text-zinc-950">
                {formatCurrency(quarterlyRate, 'XAF')}
              </span>
              <span className="text-[10px] text-zinc-400 font-normal block">/ mo</span>
            </div>
          </div>

          {/* Option 4: Full Serviced Monthly */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-between gap-3 hover:bg-zinc-100/70 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-900 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-600" />
              </div>
              <div>
                <p className="font-semibold text-zinc-950 text-xs sm:text-sm">All-Inclusive Serviced Package</p>
                <p className="text-[11px] text-zinc-500">Includes utilities, high-speed WiFi & housekeeping</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-xs sm:text-sm text-zinc-950">
                {formatCurrency(servicedRate, 'XAF')}
              </span>
              <span className="text-[10px] text-zinc-400 font-normal block">/ mo</span>
            </div>
          </div>

        </div>

        {/* Explicit Service Terms Summary */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-zinc-900 space-y-1.5 mb-4">
          <div className="flex items-center gap-2 font-bold text-xs text-amber-950">
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>Easy House Cameroon — Acquisition & Service Terms:</span>
          </div>
          <ul className="text-[11px] text-zinc-800 space-y-1 pl-1">
            <li>• <strong>15,000 FRS Service Fee</strong> valid for a session.</li>
            <li>• Inspection of <strong>2 to 3 different options</strong> per session.</li>
            <li>• <strong>No commissions or extra charges</strong> of any sort.</li>
            <li>• <strong>Full assistance with the negotiation process</strong> with property owners.</li>
            <li>• <strong>No refunds.</strong></li>
          </ul>
        </div>

        {/* Required Agreement Checkbox */}
        <div className={`p-3 rounded-xl border mb-4 transition-all ${
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
              I agree to the{' '}
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
              (15,000 FRS per session for 2–3 options, zero extra commission, negotiation support, no refunds). *
            </span>
          </label>

          {termsError && !agreedToTerms && (
            <p className="text-[11px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please check the box to agree to the Terms & Conditions before proceeding.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleProceed}
            className="flex-1 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-semibold transition-colors cursor-pointer text-center shadow-xs"
          >
            Request Acquisition Consultation
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 border border-zinc-200 hover:border-zinc-300 text-zinc-700 rounded-full text-xs font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
