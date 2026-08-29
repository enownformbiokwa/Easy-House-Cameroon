export interface LegalSection {
  id: string;
  title: string;
  content: string[];
}

export interface CoreTermItem {
  icon: string;
  title: string;
  description: string;
}

export const CORE_SERVICE_TERMS: CoreTermItem[] = [
  {
    icon: 'DollarSign',
    title: 'Service Fee: 15,000 FRS / Session',
    description: 'We charge a flat fee of 15,000 FRS (FCFA) for our real estate advisory and inspection services, valid for a single organized session.'
  },
  {
    icon: 'Eye',
    title: '2 to 3 Options Per Session',
    description: 'Each scheduled session includes curated physical or virtual walkthrough inspections of 2 to 3 different property options matching your criteria.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Zero Commission or Extra Charges',
    description: 'No commissions, hidden fees, or extra agency markups of any sort are added to your rental or purchase transaction.'
  },
  {
    icon: 'Handshake',
    title: 'Comprehensive Negotiation Assistance',
    description: 'We actively assist our clients through the entire negotiation process with landlords and property owners to secure favorable lease terms.'
  },
  {
    icon: 'AlertCircle',
    title: 'No Refunds Policy',
    description: 'All service session fees are strictly non-refundable once the consultation or scheduled inspection session has been organized or commenced.'
  }
];

export const PRIVACY_POLICY_SECTIONS: LegalSection[] = [
  {
    id: 'intro',
    title: '1. Introduction & Overview',
    content: [
      'Easy House Cameroon ("we," "our," or "us") is dedicated to protecting your personal privacy. This Privacy Policy outlines how we collect, store, handle, and safeguard your information when you interact with our real estate platform, consult with our property specialists, or engage our rental and property acquisition services across Buea, Douala, Limbe, Yaoundé, and greater Cameroon.',
      'By using the Easy House Cameroon website or communicating with our consultants, you acknowledge the terms and practices described in this Privacy Policy.'
    ]
  },
  {
    id: 'information-collected',
    title: '2. Information We Collect',
    content: [
      'Personal Identification & Contact Data: When you submit rental inquiries, schedule property inspection visits, request consultation calls, or interact via WhatsApp or phone, we may collect your name, phone number, email address, current city of residence, and preferred housing specifications.',
      'Property & Listing Details (For Landlords & Property Owners): When listing a property with Easy House Cameroon, we collect landlord contact details, title documentation copies, physical property addresses, photos, utility infrastructure data, and agreed rental pricing.',
      'Usage & Technical Data: Standard device interaction logs, browser type, and anonymous access timestamps to maintain platform security, optimize mobile browsing, and prevent abusive bot traffic.'
    ]
  },
  {
    id: 'how-we-use-information',
    title: '3. How We Use Your Information',
    content: [
      'Direct Property Matching & Inquiries: Facilitating direct appointments with our lead consultant Enownfor Manyi-Oben, arranging on-site property walkthroughs, and matching prospective tenants with vetted landlords.',
      'Service Delivery & Tour Logistics: Coordinating physical tours, communicating check-in logistics, preparing standard Cameroon tenancy agreements, and providing relocation advice.',
      'Platform Integrity & Fraud Prevention: Verifying listing accuracy, protecting legitimate tenants against fraudulent or duplicated rental listings, and ensuring genuine landlord representation.',
      'Client Support & Inquiries: Responding swiftly to phone calls, WhatsApp messages, and rental applications.'
    ]
  },
  {
    id: 'data-sharing',
    title: '4. Information Sharing & Third Parties',
    content: [
      'We do NOT sell, rent, or trade your personal contact information to third-party advertisers or telemarketing companies.',
      'Vetted Landlords & Property Owners: Only when an inspection is booked or tenancy agreement drafted is necessary contact information shared between the confirmed prospective tenant and the verified landlord.',
      'Legal & Regulatory Compliance: We may disclose personal data if strictly required by the Laws of the Republic of Cameroon or in response to valid legal processes to protect tenant safety and property rights.'
    ]
  },
  {
    id: 'data-security',
    title: '5. Security & Protection Standards',
    content: [
      'We implement robust industry-standard technical measures, including SSL/TLS encryption for web traffic, password hashing for administrative portals, and restricted access protocols for customer records.',
      'While we employ stringent safeguards, no electronic transmission over the internet is completely infallible; we recommend taking precautions when sharing sensitive financial documents over public communication channels.'
    ]
  },
  {
    id: 'retention-rights',
    title: '6. Your Rights & Data Retention',
    content: [
      'You have the right to request access to any personal information we hold about you, request corrections to outdated details, or ask for the deletion of your inquiry records once your housing search is completed.',
      'To exercise any of these privacy rights, please reach out directly to our privacy officer or consultant Enownfor Manyi-Oben via email at enownformbiokwa@gmail.com or WhatsApp at +237 674121117.'
    ]
  },
  {
    id: 'cookies-local-storage',
    title: '7. Cookies, Local Storage & Session Tracking',
    content: [
      'Easy House Cameroon uses standard browser cookies and local client storage (localStorage / sessionStorage) to deliver essential security, optimize page responsiveness, and remember user preferences across sessions.',
      '• Strictly Necessary & Security Tokens: Storing authenticated administrative session credentials (JWT tokens), rate-limiting counters, and CSRF protection tokens to prevent unauthorized system modification or malicious bot activities.',
      '• User Preferences & Saved Properties: Preserving your bookmarked property favorites, custom budget search filters, and preferred FCFA currency formatting on your local browser device.',
      '• Anonymous Diagnostics: Recording anonymous loading performance benchmarks to optimize high-resolution architectural image deliveries across Cameroon telecommunication networks (MTN, Orange, Camtel).',
      'You can update or revoke your cookie choices at any time via the "Cookie Preferences" trigger in the website footer or within your browser settings.'
    ]
  },
  {
    id: 'policy-updates',
    title: '8. Updates to This Policy',
    content: [
      'We may periodically update this Privacy Policy to reflect modifications in our services, local real estate regulations in Cameroon, or enhanced security practices. The latest revision date will always be prominently displayed at the top of this document.'
    ]
  }
];

export const TERMS_AND_CONDITIONS_SECTIONS: LegalSection[] = [
  {
    id: 'core-service-terms',
    title: '1. Core Service Terms & Pricing Structure',
    content: [
      'Easy House Cameroon operates with transparent, fixed pricing and clear service deliverables for all clients:',
      '• Service Fee: We charge 15,000 FRS (15,000 FCFA) for our services valid for a session.',
      '• Options Checked: During each session, our consultants get to check out 2 to 3 different property options matching your specified criteria and budget.',
      '• Zero Commissions: No commissions or extra charges of any sort are added to your rental or purchase agreement.',
      '• Negotiation Assistance: We actively assist our clients with the negotiation process with landlords and property owners to obtain the most favorable lease terms.',
      '• No Refunds: All service fees (15,000 FRS per session) are strictly non-refundable once booked or organized.'
    ]
  },
  {
    id: 'acceptance',
    title: '2. Acceptance of Terms',
    content: [
      'Welcome to Easy House Cameroon. By accessing or using our website, services, property catalogs, scheduling a tour, or booking a property acquisition consultation, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must discontinue use of our platform and services immediately.',
      'These Terms apply to all visitors, prospective tenants, landlords, property buyers, and users who access the Easy House Cameroon platform.'
    ]
  },
  {
    id: 'services-nature',
    title: '3. Nature of Our Real Estate & Tour Services',
    content: [
      'Easy House Cameroon operates as a premier real estate brokerage and property advisory company based in Buea, Cameroon, operating actively across Douala, Limbe, Yaoundé, and surrounding regions.',
      'Our primary mission is to bridge the gap between verified property owners (landlords, landladies, developers) and prospective clients seeking quality residential, commercial, or luxury properties to rent or purchase.',
      'We facilitate property discovery, schedule physical walkthrough inspections (2 to 3 options per 15,000 FRS session), provide verified photos and specifications, and assist with tenancy negotiation and onboarding.'
    ]
  },
  {
    id: 'property-listings',
    title: '4. Property Listings & Accuracy',
    content: [
      'While Easy House Cameroon conducts rigorous due diligence and physical site inspections to ensure all published properties, rents (in FCFA / XAF), dimensions (m²), amenities, and photos are accurate and up to date, listings are subject to prior rental, lease renewal, or price adjustments by property owners.',
      'Rental rates quoted on our platform are expressed primarily in Central African CFA Franc (XAF / FCFA) per month unless explicitly specified otherwise.',
      'Prospective tenants are strongly encouraged to attend an on-site physical tour or live video inspection before executing binding lease agreements or transferring initial deposits.'
    ]
  },
  {
    id: 'tours-inspections',
    title: '5. Property Inspections & Tour Protocols',
    content: [
      'Physical or virtual property tours must be scheduled in advance with an authorized Easy House Cameroon consultant.',
      'Each tour booking is charged at the standard flat rate of 15,000 FRS per session, allowing the client to inspect 2 to 3 distinct properties. There are no commissions or extra charges of any sort.',
      'Prospective tenants and visitors agree to conduct themselves respectfully during inspections and respect the physical integrity of existing properties, communal premises, and neighboring occupants.',
      'Easy House Cameroon reserves the right to decline or reschedule inspection visits if weather, security, or owner scheduling constraints dictate.'
    ]
  },
  {
    id: 'landlord-obligations',
    title: '6. Landlord & Property Owner Obligations',
    content: [
      'Property owners who list properties through Easy House Cameroon warrant that they hold lawful legal title, power of attorney, or authorized administrative rights to lease or sell the subject property.',
      'Landlords agree to provide accurate representations of water availability, electrical meter setups (ENEO/prepaid), security measures, and required security deposit terms.',
      'Landlords agree to promptly inform Easy House Cameroon when a property is leased or taken off the market to maintain high catalog integrity.'
    ]
  },
  {
    id: 'payments-deposits',
    title: '7. Payment Safety, Tenancy Contracts & Fees',
    content: [
      'The service fee of 15,000 FRS per session is paid prior to or upon tour commencement. No additional commission is charged on top of the agreed landlord rent.',
      'All payments for agency consultation, security deposits, and advance rent must be coordinated directly through verified Easy House Cameroon channels or executed directly with landlords under a written tenancy agreement.',
      'Never send funds to unverified third parties claiming to represent Easy House Cameroon. Authorized representatives will always communicate through our official phone (+237 677499722) or official WhatsApp (+237 674121117).',
      'Tenancy contracts drafted or mediated by Easy House Cameroon conform to standard Cameroon civil and commercial tenancy guidelines.'
    ]
  },
  {
    id: 'intellectual-property',
    title: '8. Intellectual Property & Media Rights',
    content: [
      'All text, branding, logos, curated photographs, visual layouts, and digital assets on the Easy House Cameroon website are the intellectual property of Easy House Cameroon or used with express permission.',
      'Unauthorized copying, scraping, reproduction, or republication of our property listings and photography for competing commercial platforms without prior written authorization is strictly prohibited.'
    ]
  },
  {
    id: 'limitation-liability',
    title: '9. Limitation of Liability',
    content: [
      'Easy House Cameroon acts in good faith to connect reputable landlords with qualified tenants. To the maximum extent permitted by applicable law, Easy House Cameroon shall not be held liable for disputes arising directly between landlords and tenants after tenancy agreement execution, unexpected municipal utility interruptions (e.g. general grid outages), or force majeure events.',
      'We remain available at all times to mediate and assist in resolving tenant-landlord concerns in accordance with good business practice and customer care.'
    ]
  },
  {
    id: 'governing-law',
    title: '10. Governing Law & Jurisdiction',
    content: [
      'These Terms and Conditions shall be governed by, construed, and enforced in accordance with the Laws of the Republic of Cameroon.',
      'Any dispute arising from these Terms or the use of our services shall be submitted to the competent courts of jurisdiction in Buea, South West Region, Cameroon.'
    ]
  },
  {
    id: 'contact-inquiries',
    title: '11. Contact Us Regarding Legal & Terms Inquiries',
    content: [
      'If you have questions, inquiries, or clarifications regarding these Terms or our Privacy Policy, please reach out to:',
      'Easy House Cameroon • Head Office: Buea, South West Region, Cameroon',
      'Lead Consultant: Enownfor Manyi-Oben • Phone: +237 677499722 • WhatsApp: +237 674121117 • Email: enownformbiokwa@gmail.com'
    ]
  }
];
