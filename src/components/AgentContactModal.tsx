import React from 'react';
import { X, Phone, MessageCircle, ShieldCheck, FileText } from 'lucide-react';
import { Property } from '../types';
import dpImage from '../assets/images/dp.webp';

interface AgentContactModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onBookDirectMeeting: (property: Property | null) => void;
}

export const AgentContactModal: React.FC<AgentContactModalProps> = ({
  property,
  isOpen,
  onClose,
  onBookDirectMeeting,
}) => {
  if (!isOpen) return null;

  const consultant = {
    name: 'Enownfor Manyi-Oben',
    whatsapp: '674121117',
    phone: '677499722',
    avatar: dpImage,
  };

  const directWhatsAppMsg = encodeURIComponent(
    `Hello Enownfor Manyi-Oben / Easy House Cameroon,\n\nI am interested in ${property ? `viewing "${property.title}" in ${property.city}` : 'scheduling a property tour / consultation'}.\nI agree to the service terms (15,000 FRS session fee for 2-3 options, zero commissions, no refunds).`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-200 text-center">
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <img
          src={consultant.avatar}
          alt={consultant.name}
          referrerPolicy="no-referrer"
          className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white shadow-md"
        />
        
        <h3 className="text-lg font-bold text-zinc-950">{consultant.name}</h3>
        <p className="text-[11px] text-emerald-700 font-semibold uppercase tracking-wider">
          Lead Property Manager & Consultant
        </p>

        {property && (
          <div className="mt-3 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 text-left">
            <span className="text-[10px] text-zinc-400 block font-medium uppercase">Target Property:</span>
            <span className="font-semibold text-zinc-950 line-clamp-1">{property.title}</span>
          </div>
        )}

        {/* Core Terms Badge */}
        <div className="mt-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-left text-[11px] text-zinc-800 space-y-0.5">
          <div className="font-bold text-amber-950 flex items-center gap-1">
            <FileText className="w-3 h-3 text-amber-700" />
            <span>Service Terms: 15,000 FRS / Session</span>
          </div>
          <p className="text-[10px] text-zinc-600">
            Covers 2–3 options • Zero commission • Full negotiation assistance • No refunds
          </p>
        </div>

        <div className="mt-4 space-y-2 text-xs text-left">
          <a
            href={`https://wa.me/237${consultant.whatsapp}?text=${directWhatsAppMsg}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-900 transition-colors font-medium cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1">
              <div className="text-[10px] text-emerald-700 uppercase font-semibold">WhatsApp</div>
              <div className="font-bold text-emerald-950">{consultant.whatsapp}</div>
            </div>
          </a>

          <a
            href={`tel:+237${consultant.phone}`}
            className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 transition-colors"
          >
            <Phone className="w-4 h-4 text-zinc-700 shrink-0" />
            <div className="flex-1">
              <div className="text-[10px] text-zinc-500 uppercase font-semibold">Direct Call</div>
              <div className="font-bold text-zinc-950">{consultant.phone}</div>
            </div>
          </a>
        </div>

        <a
          href={`https://wa.me/237${consultant.whatsapp}?text=${directWhatsAppMsg}`}
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          className="w-full mt-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>Book Tour on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
