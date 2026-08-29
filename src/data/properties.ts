import { Property } from '../types';

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85';
export const SHOWCASE_IMAGE = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80';

export const DEFAULT_AGENT = {
  name: 'Enownfor Manyi-Oben',
  role: '',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  phone: '677499722',
  whatsapp: '674121117',
  email: 'info@easyhousecameroon.com',
};

export const PROPERTIES: Property[] = [
  {
    id: 'kribi-coastal-sanctuary',
    title: 'Kribi Oceanfront Pavilion',
    address: 'Route des Chutes de la Lobé\nKribi, Cameroon',
    price: 1250, // 750,000 FCFA / month
    location: 'Cameroon/Sud/Kribi',
    country: 'Cameroon',
    region: 'Sud',
    city: 'Kribi',
    sizeM2: 320,
    sqft: 3445,
    floors: 1,
    beds: 3,
    baths: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    type: 'Rent',
    category: 'Eco Retreat',
    description: 'Spectacular beachfront villa for rent on the Gulf of Guinea near the Lobé Waterfalls in Kribi. Crafted with sustainable hardwoods, volcanic stone walls, and vast ocean-facing decks overlooking private white sands.',
    features: [
      'Direct private white-sand beach access',
      'Solar-powered backup energy system',
      'Wrap-around hardwood deck with sunset ocean views',
      'Outdoor rainfall showers and private garden',
      'Full security and serene quiet surroundings'
    ],
    yearBuilt: 2024,
    isNew: true,
    featured: true,
    agent: DEFAULT_AGENT
  },
  {
    id: 'buea-mountain-villa',
    title: 'Mount Fako Panoramic Residence',
    address: 'Clerks Quarters, Mountain View\nBuea, Cameroon',
    price: 750, // 450,000 FCFA / month
    location: 'Cameroon/South West/Buea',
    country: 'Cameroon',
    region: 'South West',
    city: 'Buea',
    sizeM2: 260,
    sqft: 2800,
    floors: 2,
    beds: 4,
    baths: 3,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    type: 'Rent',
    category: 'Villa',
    description: 'Modern residential villa available for lease in Buea with breathtaking views of Mount Cameroon. Crisp fresh air, secure gated compound, standby generator, and spacious landscaped yard.',
    features: [
      'Panoramic Mount Cameroon views',
      'Gated secure perimeter with guard house',
      'Standby generator & borehole water reserve',
      'Spacious open-concept living & dining',
      'Covered parking for 3 vehicles'
    ],
    yearBuilt: 2024,
    isNew: true,
    featured: false,
    agent: DEFAULT_AGENT
  },
  {
    id: 'limbe-seaside-duplex',
    title: 'Limbe Seaside Executive Duplex',
    address: 'Down Beach Road, Botanic District\nLimbe, Cameroon',
    price: 916, // 550,000 FCFA / month
    location: 'Cameroon/South West/Limbe',
    country: 'Cameroon',
    region: 'South West',
    city: 'Limbe',
    sizeM2: 290,
    sqft: 3120,
    floors: 2,
    beds: 4,
    baths: 4,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
    ],
    type: 'Rent',
    category: 'Duplex',
    description: 'Executive modern duplex situated minutes from Limbe seaside with coastal breezes and contemporary interior styling. Furnished kitchen, en-suite bedrooms, and rooftop relaxation terrace.',
    features: [
      'Coastal sea breeze and rooftop terrace',
      'All bedrooms en-suite with modern baths',
      'Secured gated estate with perimeter lighting',
      'Modern open kitchen with granite countertops',
      'High-speed internet ready'
    ],
    yearBuilt: 2023,
    isNew: false,
    featured: false,
    agent: DEFAULT_AGENT
  },
  {
    id: 'bastos-modern-sanctuary',
    title: 'Villa Bastos Modern House',
    address: 'Avenue des Ambassades, Bastos\nYaoundé, Cameroon',
    price: 1583, // 950,000 FCFA / month
    location: 'Cameroon/Centre/Yaoundé',
    country: 'Cameroon',
    region: 'Centre',
    city: 'Yaoundé',
    sizeM2: 420,
    sqft: 4520,
    floors: 2,
    beds: 5,
    baths: 5,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
    ],
    type: 'Rent',
    category: 'Modern House',
    description: 'An architectural residence available for executive lease in Bastos, Yaoundé. Features cantilevered balconies, 24/7 security guard post, solar backup system, and lush landscaped garden.',
    features: [
      '24/7 Security guard post & perimeter wall',
      'Automated solar backup & inverter array',
      'Spacious modern kitchen with high-end appliances',
      'Private plunge pool and landscaped garden',
      'Dedicated domestic staff quarters'
    ],
    yearBuilt: 2024,
    isNew: true,
    featured: false,
    agent: DEFAULT_AGENT
  },
  {
    id: 'bonapriso-waterfront-residence',
    title: 'Bonapriso Executive Residence',
    address: 'Rue Njo-Njo, Bonapriso\nDouala, Cameroon',
    price: 1416, // 850,000 FCFA / month
    location: 'Cameroon/Littoral/Douala',
    country: 'Cameroon',
    region: 'Littoral',
    city: 'Douala',
    sizeM2: 350,
    sqft: 3760,
    floors: 2,
    beds: 4,
    baths: 4,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    type: 'Rent',
    category: 'Apartment',
    description: 'A contemporary luxury residence for long-term rental in prestigious Bonapriso, Douala. Acoustic windows, automatic power backup, smart access, and refined urban comfort.',
    features: [
      'Automatic transfer power generator',
      'Acoustic double-glazed windows',
      'Rooftop lounge terrace',
      'High-security biometric access',
      'Private interior courtyard'
    ],
    yearBuilt: 2024,
    isNew: true,
    featured: false,
    agent: DEFAULT_AGENT
  },
  {
    id: 'buea-molyko-apartment',
    title: 'Molyko Modern 2-Bedroom Apartment',
    address: 'Molyko Residential Area\nBuea, Cameroon',
    price: 416, // 250,000 FCFA / month
    location: 'Cameroon/South West/Buea',
    country: 'Cameroon',
    region: 'South West',
    city: 'Buea',
    sizeM2: 120,
    sqft: 1290,
    floors: 1,
    beds: 2,
    baths: 2,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    type: 'Rent',
    category: 'Apartment',
    description: 'Clean, secure, and modern 2-bedroom rental apartment in central Molyko, Buea. Tiled floors, fitted kitchen cabinets, continuous water supply, and easy road access.',
    features: [
      'Continuous 24/7 water supply & private reserve',
      'Fitted kitchen cabinets & spacious balcony',
      'Secure fenced compound with day & night guard',
      'Easy access to main transport and amenities'
    ],
    yearBuilt: 2023,
    isNew: false,
    featured: false,
    agent: DEFAULT_AGENT
  },
  {
    id: 'douala-bonamoussadi-studio',
    title: 'Bonamoussadi Furnished Studio',
    address: 'Carrefour Market, Bonamoussadi\nDouala, Cameroon',
    price: 250, // 150,000 FCFA / month
    location: 'Cameroon/Littoral/Douala',
    country: 'Cameroon',
    region: 'Littoral',
    city: 'Douala',
    sizeM2: 65,
    sqft: 700,
    floors: 1,
    beds: 1,
    baths: 1,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
    ],
    type: 'Rent',
    category: 'Studio',
    description: 'Furnished cozy studio apartment in Bonamoussadi, Douala. Air conditioned, fully equipped kitchenette, fiber internet, and secure parking.',
    features: [
      'Fully air-conditioned living space',
      'Equipped kitchenette and refrigerator',
      'Water reservoir and power inverter backup',
      'Secure access with 24/7 security concierge'
    ],
    yearBuilt: 2024,
    isNew: true,
    featured: false,
    agent: DEFAULT_AGENT
  },
  {
    id: 'molyko-student-studio',
    title: 'Molyko Self-Contained Student Room',
    address: 'Checkpoint Avenue, Molyko\nBuea, Cameroon',
    price: 75, // 45,000 FCFA / month
    location: 'Cameroon/South West/Buea',
    country: 'Cameroon',
    region: 'South West',
    city: 'Buea',
    sizeM2: 28,
    sqft: 300,
    floors: 1,
    beds: 1,
    baths: 1,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    type: 'Rent',
    category: 'Single Room',
    description: 'Affordable self-contained studio room in central Molyko, Buea. Includes private bathroom, dedicated prepaid electricity meter, constant borehole water, and gated student security.',
    features: [
      'Private en-suite tiled bathroom',
      'Prepaid Eneo electricity sub-meter',
      'Continuous borehole water system',
      'Gated secure student residence compound',
      'Walking distance to University of Buea main campus'
    ],
    yearBuilt: 2024,
    isNew: true,
    featured: false,
    agent: DEFAULT_AGENT
  },
  {
    id: 'buea-town-one-bedroom',
    title: 'Buea Town Modern 1-Bedroom Apartment',
    address: 'Clerks Quarters Road, Buea Town\nBuea, Cameroon',
    price: 142, // 85,000 FCFA / month
    location: 'Cameroon/South West/Buea',
    country: 'Cameroon',
    region: 'South West',
    city: 'Buea',
    sizeM2: 52,
    sqft: 560,
    floors: 1,
    beds: 1,
    baths: 1,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
    ],
    type: 'Rent',
    category: 'Studio',
    description: 'Freshly painted 1-bedroom flat with living room and fitted kitchen in cool Buea Town. Secure neighborhood with quiet mountain ambiance and reliable utilities.',
    features: [
      'Separate bedroom and cozy living lounge',
      'Fitted kitchen sink with storage cabinets',
      'Constant Camwater with backup overhead tank',
      'Secured perimeter fence with steel gate'
    ],
    yearBuilt: 2023,
    isNew: false,
    featured: false,
    agent: DEFAULT_AGENT
  },
  {
    id: 'bonanjo-penthouse-tower',
    title: 'Bonanjo Grand Executive Penthouse',
    address: 'Boulevard de la Liberté, Bonanjo\nDouala, Cameroon',
    price: 2333, // 1,400,000 FCFA / month
    location: 'Cameroon/Littoral/Douala',
    country: 'Cameroon',
    region: 'Littoral',
    city: 'Douala',
    sizeM2: 520,
    sqft: 5600,
    floors: 3,
    beds: 5,
    baths: 5,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    type: 'Rent',
    category: 'Penthouse',
    description: 'High-luxury executive penthouse overlooking the Wouri River in Bonanjo diplomatic business quarter. Private elevator access, wrap-around sunset terrace, smart home automation, and dual backup diesel generator.',
    features: [
      'Panoramic Wouri River & Port skyline views',
      'Direct private biometric keycard elevator',
      'Dual 250kVA automatic diesel backup generators',
      'Dedicated underground parking for 4 vehicles',
      '24/7 Diplomatic-grade security concierge'
    ],
    yearBuilt: 2024,
    isNew: true,
    featured: true,
    agent: DEFAULT_AGENT
  }
];

export const PROPERTY_TYPES = [
  'All Types',
  'Apartment',
  'Single Room',
  'Studio',
  'Modern House',
  'Duplex',
  'Villa',
  'Penthouse',
  'Commercial'
];

export const PRICE_RANGES_XAF = [
  'All prices',
  'Under 50,000 FCFA',
  '50,000 – 100,000 FCFA',
  '100,000 – 200,000 FCFA',
  '200,000 – 350,000 FCFA',
  '350,000 – 500,000 FCFA',
  '500,000 – 750,000 FCFA',
  '750,000 – 1,000,000 FCFA',
  'Above 1,000,000 FCFA'
];

export const PRICE_RANGES = PRICE_RANGES_XAF;

export const COUNTRIES = PROPERTY_TYPES; // Kept for backward compatibility if imported

export const SIZE_RANGES = [
  'All sizes (m²)',
  'Under 100 m²',
  '100 – 200 m²',
  '200 – 350 m²',
  '350+ m²'
];
