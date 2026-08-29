export interface AgentInfo {
  name: string;
  avatar: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  role?: string;
}

export type PropertyCategory = 
  | 'Apartment'
  | 'Single Room'
  | 'Studio'
  | 'Modern House'
  | 'Duplex'
  | 'Villa'
  | 'Penthouse'
  | 'Commercial'
  | 'Eco Retreat'
  | string;

export interface Property {
  id: string;
  title: string;
  address?: string;
  price: number;
  location: string;
  country: string;
  region: string;
  city: string;
  sizeM2: number;
  sqft?: number;
  floors: number;
  beds: number;
  baths: number;
  image: string;
  gallery: string[];
  type: 'Rent';
  category: PropertyCategory;
  description: string;
  features: string[];
  yearBuilt: number;
  isNew?: boolean;
  featured?: boolean;
  agent?: AgentInfo;
}

export interface FilterState {
  tab: 'Rent' | 'Furnished' | 'Long Term' | 'Short Term';
  country: string;
  propertyType: string;
  priceRange: string;
  sizeRange: string;
  beds: number | null;
  baths: number | null;
  searchQuery: string;
}

export type AppPage = 'home' | 'properties' | 'about' | 'admin' | 'privacy' | 'terms';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  actionText: string;
  image: string;
  details: string[];
}
