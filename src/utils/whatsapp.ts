import { Property } from '../types';

export const WHATSAPP_NUMBER = '237674121117';
export const WHATSAPP_DISPLAY = '+237 674 121 117';
export const CALL_PHONE_DISPLAY = '+237 677 499 722';

/**
 * Generates a prefilled WhatsApp tour scheduling URL
 */
export const getWhatsAppTourUrl = (property?: Property | null, customNote?: string): string => {
  let message = '';
  if (property) {
    message = `Hello Easy House Cameroon,\n\nI would like to schedule an in-person property tour & inspection for:\n\n🏡 *Property:* ${property.title}\n📍 *Location:* ${property.location}, ${property.city}\n💰 *Monthly Rent:* ${property.price.toLocaleString()} FCFA\n🏷️ *Details:* ${property.category} • ${property.beds} Beds • ${property.baths} Baths • ${property.sizeM2} m²\n🆔 *Ref Code:* #${property.id}\n${customNote ? `\n📝 *Note:* ${customNote}\n` : ''}\nPlease let me know your available visiting dates and time slots. Thank you!`;
  } else {
    message = `Hello Easy House Cameroon,\n\nI would like to book and schedule a property tour session with your lead consultant Enownfor Manyi-Oben. Please share your available visiting schedule for properties in Cameroon (Buea, Douala, Limbe, Yaoundé). Thank you!`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * Opens WhatsApp tour scheduling in a new tab
 */
export const openWhatsAppTour = (property?: Property | null, customNote?: string) => {
  const url = getWhatsAppTourUrl(property, customNote);
  window.open(url, '_blank', 'noopener,noreferrer');
};
