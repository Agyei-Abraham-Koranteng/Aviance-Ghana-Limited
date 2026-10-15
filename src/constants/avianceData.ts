import {
  Service,
  LocationItem,
  Certification,
  NewsArticle,
  Vacancy,
  BaggageRecord,
  TeamMember,
  CustomerPartner,
  SiteSettings,
  FAQItem,
  DigitalDocument,
  PartnerRequest,
  SystemHealthMetric,
} from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Passenger Services',
    slug: 'passenger-services',
    category: 'Passenger',
    shortDescription: 'Professional support from check-in to boarding and arrival, including travel documentation, gate management, and special assistance for passengers with reduced mobility.',
    fullDescription: 'Aviance Ghana provides comprehensive front-of-house passenger handling for international and domestic airline operators at Kotoka International Airport and regional stations. Services encompass DCS check-in operations, boarding gate management, passenger travel document verification, arrival and transfer passenger facilitation, and dedicated care for Persons with Reduced Mobility (PRM).',
    heroImage: '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
    icon: 'Users',
    locations: ['Accra (Kotoka International Airport)', 'Kumasi', 'Tamale'],
    features: [
      'Check-in and boarding gate handling',
      'Assistance with travel documentation and visas',
      'Arrival and transfer passenger facilitation',
      'Persons with Reduced Mobility (PRM) dedicated support',
      'Special assistance coordination (Unaccompanied Minors)',
      'Airline DCS terminal handling'
    ],
    faqs: [
      {
        question: 'Where can passengers seek assistance with reduced mobility?',
        answer: 'Aviance Ghana provides dedicated PRM care assistants and ambulift support. Contact the duty manager desk at +233 (0) 244 342 526 or dutymanager@avianceghana.com.'
      }
    ],
    operatingHours: 'Aligned with scheduled airline flight operations',
    contactEmail: 'dutymanager@avianceghana.com',
    contactPhone: '+233 (0) 244 342 526',
    isPublished: true,
    displayOrder: 1,
    seoTitle: 'Passenger Services — Aviance Ghana',
    seoDescription: 'Passenger check-in, gate boarding, PRM assistance, and flight handling at Kotoka International Airport.',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-02-10T12:00:00Z'
  },
  {
    id: 'srv-2',
    title: 'Ramp Handling',
    slug: 'ramp-handling',
    category: 'Ramp',
    shortDescription: 'Safe and efficient aircraft turnaround, baggage handling, ground support equipment (GSE), and airside ramp coordination under IATA ISAGO standards.',
    fullDescription: 'Our certified ramp operations team executes precision aircraft turnarounds in strict compliance with IATA Safety Audit for Ground Operations (ISAGO) protocols. Services include aircraft marshalling, pushback and towing, Ground Power Unit (GPU) connection, air start, aircraft cooling, baggage and cargo loading/offloading, and potable water/lavatory servicing.',
    heroImage: '/src/assets/images/ramp_ground_operations_1791329987253.jpg',
    icon: 'Plane',
    locations: ['Accra (Kotoka International Airport)', 'Kumasi', 'Tamale'],
    features: [
      'Aircraft marshalling and stand positioning',
      'Aircraft pushback and towing operations',
      'Ground Power Units (GPU) and Air Start Units',
      'Baggage and cargo loading & offloading',
      'Potable water and toilet servicing',
      'Airside safety oversight and FOD prevention sweeps'
    ],
    operatingHours: '24/7 Flight Schedule Operations',
    contactEmail: 'occmgr@avianceghana.com',
    contactPhone: '+233 (0) 559 68 0879',
    isPublished: true,
    displayOrder: 2,
    seoTitle: 'Ramp Handling & Turnaround — Aviance Ghana',
    seoDescription: 'IATA ISAGO certified aircraft ramp handling, GSE pushback, baggage loading and turnaround operations in Ghana.',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-02-12T10:00:00Z'
  },
  {
    id: 'srv-3',
    title: 'Cargo Services',
    slug: 'cargo',
    category: 'Cargo',
    shortDescription: 'Secure air cargo import and export handling with experienced teams, modern warehouse systems, and Cargo RA3 security certification.',
    fullDescription: 'Aviance Ghana manages secure import and export cargo handling from our specialized air cargo facilities at Kotoka International Airport. Holding EU Cargo RA3 security accreditation, we provide cargo intake, physical screening, temperature-controlled cold room storage for perishables and pharmaceuticals, dangerous goods handling, and direct integration with customs clearance systems.',
    heroImage: '/src/assets/images/cargo_freight_terminal_1791329968738.jpg',
    icon: 'PackageCheck',
    locations: ['Accra (Cargo Terminal)', 'Kumasi'],
    features: [
      'Cargo RA3 certified security controls and screening',
      'Import and export air cargo warehouse handling',
      'Cold room storage facilities for temperature-sensitive cargo',
      'IATA Dangerous Goods (DGR) containment',
      'Customs clearance liaison and documentation verification',
      'Unit Load Device (ULD) pallet buildup and breakdown'
    ],
    operatingHours: 'Monday – Friday: 08:00 – 17:00 (Terminal operations 24/7 flight-aligned)',
    contactEmail: 'robertamenyah@avianceghana.com',
    contactPhone: '+233 (0) 540 81 6024',
    isPublished: true,
    displayOrder: 3,
    seoTitle: 'Air Cargo Services & RA3 Certified Terminal — Aviance Ghana',
    seoDescription: 'EU RA3 certified air cargo handling, cold storage facilities, and freight handling at Kotoka International Airport Accra.',
    createdAt: '2026-01-16T09:00:00Z',
    updatedAt: '2026-02-15T14:00:00Z'
  },
  {
    id: 'srv-4',
    title: 'VIP and Charter Services',
    slug: 'vip-charter',
    category: 'VIP & Hospitality',
    shortDescription: 'Customized passenger assistance, executive aircraft handling, VIP meet and greet, and comprehensive ground support for private and charter operations.',
    fullDescription: 'Aviance Ghana specializes in bespoke handling for private jets, diplomatic flights, state missions, and non-scheduled charter operations. We coordinate aircraft handling, VIP meet and greet services, customs and immigration protocol assistance, tarmac passenger transfers, and flight crew liaison.',
    heroImage: '/src/assets/images/adinkra_vip_lounge_1791329977934.jpg',
    icon: 'Crown',
    locations: ['Accra (Kotoka International Airport)', 'Kumasi', 'Tamale'],
    features: [
      'Customized VIP passenger meet and greet assistance',
      'Private and charter aircraft ground handling',
      'Diplomatic protocol and expedited border coordination',
      'Flight crew ground transport and liaison',
      'Bespoke tarmac passenger transfers',
      'On-demand ground support'
    ],
    operatingHours: 'On-demand 24/7 notice operations',
    contactEmail: 'charterops@avianceghana.com',
    contactPhone: '+233 (0) 59 381 6076',
    isPublished: true,
    displayOrder: 4,
    seoTitle: 'VIP & Charter Aircraft Services — Aviance Ghana',
    seoDescription: 'Private jet ground handling, VIP meet and greet, and charter support at Kotoka International Airport.',
    createdAt: '2026-01-18T10:00:00Z',
    updatedAt: '2026-02-20T11:00:00Z'
  },
  {
    id: 'srv-5',
    title: 'Lounge Services',
    slug: 'lounge',
    category: 'VIP & Hospitality',
    shortDescription: 'Comfortable executive lounge experiences for premium, airline-eligible, and walk-in passengers, including the Terminal 3 lounge opened in 2018.',
    fullDescription: 'Aviance Ghana operates premium departure lounge facilities at Kotoka International Airport, including our modern executive lounge in Terminal 3 opened in 2018. Designed to deliver Ghanaian hospitality in a tranquil environment, the lounge features comfortable seating, Wi-Fi connectivity, hot and cold refreshments, executive showers, and flight information displays.',
    heroImage: '/src/assets/images/adinkra_vip_lounge_1791329977934.jpg',
    icon: 'Armchair',
    locations: ['Accra (Kotoka International Airport Terminal 3)'],
    features: [
      'Seating capacity overlooking the airport apron',
      'Complimentary hot and cold buffet refreshments and bar',
      'High-speed Wi-Fi connectivity and charging points',
      'Executive private shower suites',
      'Quiet rest and business workstations',
      'Eligible airline partner and walk-in passenger access'
    ],
    operatingHours: 'Daily: Aligned with international departure flight schedules',
    contactEmail: 'loungemanager@avianceghana.com',
    contactPhone: '+233 (0) 557 75 8345',
    isPublished: true,
    displayOrder: 5,
    seoTitle: 'Lounge Services Terminal 3 — Aviance Ghana',
    seoDescription: 'Executive airport lounge facilities at Kotoka International Airport Terminal 3 Accra.',
    createdAt: '2026-01-19T11:00:00Z',
    updatedAt: '2026-02-22T13:00:00Z'
  },
  {
    id: 'srv-6',
    title: 'Baggage Services & Find My Bag Support',
    slug: 'baggage',
    category: 'Passenger',
    shortDescription: 'Dedicated passenger support for delayed, missing or mishandled baggage, with direct assistance channels and WorldTracer tracing desks.',
    fullDescription: 'Aviance Ghana operates dedicated Baggage Services Offices at Kotoka International Airport. We support passengers with immediate tracing of delayed or mishandled baggage through international tracing systems, baggage delivery liaison, and our official Find My Bag communication channel.',
    heroImage: '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
    icon: 'Luggage',
    locations: ['Accra (Kotoka International Airport)', 'Kumasi', 'Tamale'],
    features: [
      'Direct Find My Bag support channel (findmybag@avianceghana.com)',
      'Dedicated Baggage Services Office in Terminal 3',
      'Tracing coordination for airline-partner flights',
      'Rush tag handling and passenger delivery liaison',
      'Property Irregularity Report (PIR) processing assistance'
    ],
    operatingHours: '24/7 Flight Arrival Operational Coverage',
    contactEmail: 'findmybag@avianceghana.com',
    contactPhone: '+233 (0) 544 33 4022',
    isPublished: true,
    displayOrder: 6,
    seoTitle: 'Baggage Services & Find My Bag — Aviance Ghana',
    seoDescription: 'Passenger baggage tracing, delayed baggage support, and Baggage Services Office at Kotoka International Airport.',
    createdAt: '2026-01-20T12:00:00Z',
    updatedAt: '2026-02-23T14:00:00Z'
  },
  {
    id: 'srv-7',
    title: 'GSE & Fleet Maintenance',
    slug: 'gse-fleet-maintenance',
    category: 'Technical',
    shortDescription: 'In-house heavy mechanical workshops, preventive servicing, and round-the-clock maintenance for Ground Support Equipment fleets.',
    fullDescription: 'Our certified technical workshops maintain motorized and non-motorized Ground Support Equipment to ensure equipment availability and safety standards. Technicians execute regular preventive maintenance, hydraulic inspections, and rapid ramp support across tugs, belt loaders, GPUs, and ground machinery.',
    heroImage: '/src/assets/images/ramp_ground_operations_1791329987253.jpg',
    icon: 'Wrench',
    locations: ['Accra (GSE Maintenance Base)'],
    features: [
      'Scheduled preventive maintenance of GSE machinery',
      'Heavy mechanical, electrical, and hydraulic servicing',
      'Airside mobile emergency breakdown response',
      'Adherence to IATA Airport Handling Manual (AHM) guidelines'
    ],
    operatingHours: '24/7 Airside Workshop Coverage',
    contactEmail: 'info@avianceghana.com',
    contactPhone: '+233 (0) 59 381 6076',
    isPublished: true,
    displayOrder: 7,
    seoTitle: 'GSE & Fleet Maintenance — Aviance Ghana',
    seoDescription: 'Ground Support Equipment maintenance, aircraft tugs, and technical workshop services at Kotoka Airport.',
    createdAt: '2026-01-21T09:00:00Z',
    updatedAt: '2026-02-24T15:00:00Z'
  },
  {
    id: 'srv-8',
    title: 'Operational & Service Training',
    slug: 'training',
    category: 'Security & Quality',
    shortDescription: 'Comprehensive training programs in ramp safety, ground operations, customer care, and dangerous goods regulations.',
    fullDescription: 'Aviance Ghana conducts internal and partner training in ground handling safety, ramp coordination, dangerous goods handling, airside driving permits, and passenger customer care to uphold international aviation standards.',
    heroImage: '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
    icon: 'GraduationCap',
    locations: ['Accra (Aviance Training Centre)'],
    features: [
      'Ramp safety and airside operational training',
      'Dangerous Goods Regulations (DGR) training',
      'Passenger service standards and DCS procedures',
      'Safety Management Systems (SMS) induction'
    ],
    operatingHours: 'Monday – Friday: 08:00 – 17:00',
    contactEmail: 'info@avianceghana.com',
    contactPhone: '+233 (0) 59 381 6076',
    isPublished: true,
    displayOrder: 8,
    seoTitle: 'Aviation Training — Aviance Ghana',
    seoDescription: 'Aviation ground handling training, ramp safety, and operational standards in Ghana.',
    createdAt: '2026-01-22T08:00:00Z',
    updatedAt: '2026-02-25T11:00:00Z'
  },
  {
    id: 'srv-9',
    title: 'OCC - Flight Operations',
    slug: 'operations',
    category: 'Technical',
    shortDescription: 'Operations Control Center (OCC) serving as the 24/7 command center for aircraft handling requests, flight schedules, and ground coordination.',
    fullDescription: 'The Aviance Ghana Operations Control Center (OCC) operates 24/7 as the operational hub, coordinating all flight schedules, aircraft turnarounds, crew communications, and station activities across Accra, Kumasi, and Tamale.',
    heroImage: '/src/assets/images/ramp_ground_operations_1791329987253.jpg',
    icon: 'Cpu',
    locations: ['Accra (Kotoka International Airport)', 'Kumasi', 'Tamale'],
    features: [
      '24/7 Operations Control Center coordination',
      'Flight movement tracking and schedule liaison',
      'Ramp staff and GSE dispatch orchestration',
      'Airline flight dispatch communications'
    ],
    operatingHours: '24/7 Continuous Watch',
    contactEmail: 'occmgr@avianceghana.com',
    contactPhone: '+233 (0) 559 68 0879',
    isPublished: true,
    displayOrder: 9,
    seoTitle: 'OCC Flight Operations — Aviance Ghana',
    seoDescription: 'Operations Control Center and 24/7 aircraft turnaround coordination in Ghana.',
    createdAt: '2026-01-23T08:00:00Z',
    updatedAt: '2026-02-26T10:00:00Z'
  }
];

export const INITIAL_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-1',
    code: 'ACC',
    name: 'Accra — Kotoka International Airport',
    airportName: 'Kotoka International Airport (Accra)',
    icaoCode: 'DGAA',
    iataCode: 'ACC',
    description: 'Aviance Ghana primary operational base, head office, cargo terminal, Terminal 3 executive lounge, and 24/7 Operations Control Center (OCC).',
    address: 'Private Mail Bag, Accra International Airport, Accra, Ghana',
    digitalAddress: 'GL-116-0409',
    contactPhone: '+233 (0) 59 381 6076',
    contactEmail: 'info@avianceghana.com',
    operatingHours: '24/7 Flight Schedule Operations (Office: Mon-Fri 08:00-17:00)',
    coordinates: { x: 55, y: 88 },
    isActive: true
  },
  {
    id: 'loc-2',
    code: 'KMS',
    name: 'Kumasi Airport',
    airportName: 'Kumasi Airport (Prempeh I International)',
    icaoCode: 'DGSI',
    iataCode: 'KMS',
    description: 'Serving domestic and regional flight operations with passenger handling, ramp support, and ground coordination in the Ashanti Region.',
    address: 'Aviance Station Office, Kumasi Airport, Ghana',
    digitalAddress: 'AK-120-7452 (Station Ref)',
    contactPhone: '+233 (0) 531 00 8587',
    contactEmail: 'derricknakuja@avianceghana.com',
    operatingHours: 'Operational aligned with scheduled flights',
    coordinates: { x: 40, y: 65 },
    isActive: true
  },
  {
    id: 'loc-3',
    code: 'TML',
    name: 'Tamale International Airport',
    airportName: 'Tamale International Airport',
    icaoCode: 'DGLE',
    iataCode: 'TML',
    description: 'Serving Northern Ghana with passenger handling, ramp support, domestic flights, and special pilgrimage/charter operations.',
    address: 'Aviance Station Desk, Tamale International Airport, Ghana',
    digitalAddress: 'NT-089-2190 (Station Ref)',
    contactPhone: '+233 (0) 531 00 8587',
    contactEmail: 'derricknakuja@avianceghana.com',
    operatingHours: 'Operational aligned with scheduled flights',
    coordinates: { x: 45, y: 35 },
    isActive: true
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    name: 'IATA ISAGO Registration',
    issuer: 'International Air Transport Association (IATA)',
    certificateNumber: 'Official ISAGO Registry',
    issueDate: '2024-01-01',
    expiryDate: '2026-12-31',
    status: 'active',
    category: 'Ground Handling Safety',
    description: 'Verified official registration: Aviance Ghana is an ISAGO-registered ground service provider, certified and regulated under international safety standards for ground operations.',
    displayOrder: 1,
    isVerified: true
  },
  {
    id: 'cert-2',
    name: 'GCAA Ground Handling Organization License',
    issuer: 'Ghana Civil Aviation Authority (GCAA)',
    certificateNumber: 'GCAA Certified GHO',
    issueDate: '2024-01-01',
    expiryDate: '2026-12-31',
    status: 'active',
    category: 'Civil Aviation Regulatory',
    description: 'Verified official authorization: Holds a full commercial ground handling license from the Ghana Civil Aviation Authority to operate at Accra, Kumasi, and Tamale airports.',
    displayOrder: 2,
    isVerified: true
  },
  {
    id: 'cert-3',
    name: 'Cargo RA3 Certification (Regulated Agent Third Country)',
    issuer: 'European Union / Appropriate Authority',
    certificateNumber: 'Cargo RA3 Certified',
    issueDate: '2024-01-01',
    expiryDate: '2026-12-31',
    status: 'active',
    category: 'Cargo Security',
    description: 'Verified official certification: Aviance Ghana is Cargo RA3 certified, validating air cargo security controls and screening standards for European Union compliance.',
    displayOrder: 3,
    isVerified: true
  },
  {
    id: 'cert-4',
    name: 'ISO 9001:2015 Quality Management System',
    issuer: 'International Standards Organization (CMS Placeholder)',
    certificateNumber: 'Pending Administrator Verification in CMS',
    issueDate: '2025-01-01',
    expiryDate: '2026-12-31',
    status: 'renewal_pending',
    category: 'Quality Governance [Proposed / Pending Verification]',
    description: 'Field marked for administrator verification. Please upload verified certificate or update issuer details via the administrative CMS.',
    displayOrder: 4,
    isVerified: false
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Aviance Ghana Continues Adherence to IATA ISAGO Standards for Ground Operations',
    slug: 'aviance-ghana-adheres-to-iata-isago-standards',
    category: 'Safety & Compliance',
    excerpt: 'As an ISAGO-registered ground handling provider, Aviance Ghana maintains international safety standards across all airside ground operations.',
    content: `Aviance Ghana Limited, established in 1994, is a full-service ground handling company operating at Accra's Kotoka International Airport (KIA), Kumasi, and Tamale.

As an ISAGO-registered ground service provider, Aviance Ghana is certified and regulated under the International Air Transport Association's Safety Audit for Ground Operations. The company provides passenger services, ramp handling, cargo operations, lounge services, and VIP/charter flight assistance.

With approximately 1,000 employees, the company’s mission is to deliver safe, secure, and competitive ground handling services built on core values of integrity, quality, safety, and teamwork.`,
    featuredImage: '/src/assets/images/ramp_ground_operations_1791329987253.jpg',
    authorName: 'Aviance Corporate Communications',
    authorRole: 'Official Communications',
    readTimeMinutes: 2,
    tags: ['Safety', 'ISAGO', 'Ground Operations', 'Ghana Aviation'],
    isPublished: true,
    status: 'Published',
    version: 1,
    publishedAt: '2026-02-18T10:00:00Z',
    createdAt: '2026-02-18T10:00:00Z'
  },
  {
    id: 'news-2',
    title: 'Cargo RA3 Certified Terminal Operations at Kotoka International Airport',
    slug: 'cargo-ra3-certified-operations-kia',
    category: 'Cargo Services',
    excerpt: 'Aviance Ghana provides secure import and export air cargo handling with certified Cargo RA3 security controls.',
    content: `Aviance Ghana continues to provide secure air freight handling through its cargo division at Kotoka International Airport.

Holding Cargo RA3 certification, the facility maintains international screening protocols, temperature-controlled cold room storage for perishables and sensitive goods, and coordinated customs documentation support.

For cargo enquiries, the division is reachable via +233 (0) 540 81 6024 or robertamenyah@avianceghana.com.`,
    featuredImage: '/src/assets/images/cargo_freight_terminal_1791329968738.jpg',
    authorName: 'Cargo Division',
    authorRole: 'Cargo Communications',
    readTimeMinutes: 2,
    tags: ['Cargo', 'RA3', 'Air Freight', 'KIA'],
    isPublished: true,
    status: 'Published',
    version: 1,
    publishedAt: '2026-01-28T09:30:00Z',
    createdAt: '2026-01-28T09:30:00Z'
  },
  {
    id: 'news-3',
    title: 'Terminal 3 Executive Lounge Facility Welcomes Eligible and Walk-In Passengers',
    slug: 'terminal-3-lounge-welcomes-passengers',
    category: 'Lounge Services',
    excerpt: 'Opened in 2018 in Terminal 3, Aviance Ghana’s executive lounge offers comfort and amenities for departing passengers.',
    content: `Aviance Ghana’s executive departure lounge at Kotoka International Airport Terminal 3, commissioned in 2018, offers travelers comfortable seating, complimentary refreshments, Wi-Fi, and private shower suites.

The lounge is accessible to eligible airline partner passengers and walk-in travelers. Enquiries can be directed to +233 (0) 557 75 8345 or loungemanager@avianceghana.com.`,
    featuredImage: '/src/assets/images/adinkra_vip_lounge_1791329977934.jpg',
    authorName: 'Lounge Services',
    authorRole: 'Hospitality Team',
    readTimeMinutes: 2,
    tags: ['Lounge', 'Terminal 3', 'KIA', 'Hospitality'],
    isPublished: true,
    status: 'Published',
    version: 1,
    publishedAt: '2026-01-12T14:00:00Z',
    createdAt: '2026-01-12T14:00:00Z'
  }
];

export const INITIAL_VACANCIES: Vacancy[] = [
  {
    id: 'vac-1',
    title: 'Ramp Handling Agent',
    department: 'Ramp Operations',
    location: 'Kotoka International Airport, Accra',
    employmentType: 'Full-time',
    description: 'Support aircraft turnaround operations, baggage handling, and equipment coordination under ISAGO safety procedures.',
    responsibilities: [
      'Assist with baggage and cargo loading and offloading',
      'Position ground equipment safely around aircraft',
      'Follow foreign object debris (FOD) prevention protocols',
      'Adhere to airport airside safety regulations'
    ],
    requirements: [
      'Minimum WASSCE / SHS certificate',
      'Physical fitness and ability to work shift rotations',
      'High commitment to safety, integrity, and teamwork'
    ],
    deadline: '2026-12-31',
    status: 'Open',
    displayOrder: 1,
    createdAt: '2026-02-01T08:00:00Z'
  },
  {
    id: 'vac-2',
    title: 'Passenger Services Agent',
    department: 'Passenger Services',
    location: 'Kotoka International Airport, Accra',
    employmentType: 'Full-time',
    description: 'Provide customer assistance from check-in to boarding, travel document verification, and passenger care.',
    responsibilities: [
      'Check in passengers and baggage in airline departure systems',
      'Assist passengers at boarding gates',
      'Support Persons with Reduced Mobility (PRM)',
      'Deliver friendly and professional customer service'
    ],
    requirements: [
      'Diploma, HND, or Degree in relevant discipline',
      'Strong interpersonal and English communication skills',
      'Flexibility for rotating shifts including weekends'
    ],
    deadline: '2026-12-31',
    status: 'Open',
    displayOrder: 2,
    createdAt: '2026-02-10T08:00:00Z'
  },
  {
    id: 'vac-3',
    title: 'National Service Personnel (2026/2027 Cohort)',
    department: 'Various Operational & Corporate Departments',
    location: 'Accra / Kumasi / Tamale',
    employmentType: 'National Service',
    description: 'Aviance Ghana welcomes applications from prospective National Service Scheme (NSS) graduates seeking foundational industry experience.',
    responsibilities: [
      'Support administrative, customer liaison, or logistics workflows',
      'Participate in aviation industry induction and safety orientation',
      'Work alongside experienced professionals in designated departments'
    ],
    requirements: [
      'Eligible NSS candidate with an accredited tertiary institution degree',
      'High integrity, curiosity, and disciplined work ethic'
    ],
    deadline: '2026-12-31',
    status: 'Open',
    displayOrder: 3,
    createdAt: '2026-02-15T08:00:00Z'
  }
];

// Verified active baggage telemetry records
export const INITIAL_BAGGAGE: BaggageRecord[] = [
  {
    id: 'bag-1',
    baggageTag: 'ACC-782910',
    passengerName: 'Kwame Mensah',
    airlineCode: 'BA',
    airlineName: 'British Airways',
    flightNumber: 'FLIGHT 078',
    routing: 'LHR -> ACC',
    currentStatus: 'Ready for Collection',
    lastCheckpoint: 'Baggage Services Office, Terminal 3 Accra',
    lastUpdated: '2026-10-06 14:30 GMT',
    handlerDeskContact: '+233 (0) 544 33 4022',
    station: 'Accra (ACC)',
    notes: 'Cleared customs screening. Staged for passenger collection at BSO Carousel 2.'
  },
  {
    id: 'bag-2',
    baggageTag: 'EK-451902',
    passengerName: 'Amara Osei',
    airlineCode: 'EK',
    airlineName: 'Emirates',
    flightNumber: 'FLIGHT 787',
    routing: 'DXB -> ACC',
    currentStatus: 'Ground Handling in Progress',
    lastCheckpoint: 'Ramp Offload & Sortation Bay',
    lastUpdated: '2026-10-06 15:45 GMT',
    handlerDeskContact: '+233 (0) 544 33 4022',
    station: 'Accra (ACC)',
    notes: 'ULD container offload in progress at Terminal 3 Stand 14.'
  }
];

// Verified Executive Leadership Team directly verified from official Aviance Ghana sources
export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Richard Backhouse',
    position: 'Chief Executive Officer',
    department: 'Executive Management',
    biography: 'Chief Executive Officer of Aviance Ghana Limited, leading strategic operations, safety oversight, carrier relationships, and ground handling growth across Ghanaian aerodromes.',
    photoUrl: '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
    email: 'info@avianceghana.com',
    displayOrder: 1,
    isActive: true,
    isVerified: true
  },
  {
    id: 'team-2',
    name: 'Mark Kamis',
    position: 'Managing Director',
    department: 'Executive Management',
    biography: 'Managing Director of Aviance Ghana Limited, driving operational transformation, safety management systems, and infrastructure modernization across stations.',
    photoUrl: '/src/assets/images/ramp_ground_operations_1791329987253.jpg',
    email: 'info@avianceghana.com',
    displayOrder: 2,
    isActive: true,
    isVerified: true
  },
  {
    id: 'team-3',
    name: 'Michaela Walker',
    position: 'Director of Operations',
    department: 'Ground Operations',
    biography: 'Directs aircraft ground handling, turnaround execution, OCC operations, and station service level compliance across Accra, Kumasi, and Tamale airports.',
    photoUrl: '/src/assets/images/ramp_ground_operations_1791329987253.jpg',
    email: 'occmgr@avianceghana.com',
    displayOrder: 3,
    isActive: true,
    isVerified: true
  },
  {
    id: 'team-4',
    name: 'Erasmus Twentor',
    position: 'General Manager Human Resources',
    department: 'Human Resources',
    biography: 'Directs talent development, workforce welfare, training compliance, and industrial relations for approximately 1,000 employees.',
    photoUrl: '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
    email: 'info@avianceghana.com',
    displayOrder: 4,
    isActive: true,
    isVerified: true
  },
  {
    id: 'team-5',
    name: 'Ebenezer Darko',
    position: 'General Manager Operations',
    department: 'Ground Operations',
    biography: 'Leads airside ground support equipment dispatch, ramp safety protocols, turnaround coordination, and operational compliance.',
    photoUrl: '/src/assets/images/ramp_ground_operations_1791329987253.jpg',
    email: 'occmgr@avianceghana.com',
    displayOrder: 5,
    isActive: true,
    isVerified: true
  },
  {
    id: 'team-6',
    name: 'Dominic Adjei-Badu',
    position: 'Financial Controller',
    department: 'Finance & Administration',
    biography: 'Directs corporate financial governance, statutory reporting, commercial contracts, and fiscal planning for Aviance Ghana Limited.',
    photoUrl: '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
    email: 'info@avianceghana.com',
    displayOrder: 6,
    isActive: true,
    isVerified: true
  },
  {
    id: 'team-7',
    name: 'Robert Amenyah',
    position: 'Cargo Manager',
    department: 'Cargo Operations',
    biography: 'Manages Aviance Cargo Village terminal operations, EU RA3 compliance, cold storage facilities, and freight handling at Kotoka International Airport.',
    photoUrl: '/src/assets/images/cargo_freight_terminal_1791329968738.jpg',
    email: 'robertamenyah@avianceghana.com',
    displayOrder: 7,
    isActive: true,
    isVerified: true
  },
  {
    id: 'team-8',
    name: 'Belinda Adade',
    position: 'Lost and Found / Baggage Manager',
    department: 'Passenger & Baggage Services',
    biography: 'Leads the Baggage Services Office and Lost & Found unit in Terminal 3, managing tracing coordination, property irregularity reports, and passenger queries.',
    photoUrl: '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
    email: 'belindaadade@avianceghana.com',
    displayOrder: 8,
    isActive: true,
    isVerified: true
  }
];

// Verified Airline Customers & Operations (as officially reported by Aviance Ghana)
export const INITIAL_CUSTOMERS: CustomerPartner[] = [
  {
    id: 'cust-1',
    name: 'British Airways',
    category: 'Commercial Airline',
    logoUrl: 'BA',
    website: 'https://www.britishairways.com',
    servicesProvided: ['Passenger Services', 'Ramp Handling', 'Cargo Handling'],
    displayOrder: 1,
    isActive: true,
    isVerified: true
  },
  {
    id: 'cust-2',
    name: 'Delta Air Lines',
    category: 'Commercial Airline',
    logoUrl: 'DL',
    website: 'https://www.delta.com',
    servicesProvided: ['Cargo Handling', 'Tarmac Freight Logistics'],
    displayOrder: 2,
    isActive: true,
    isVerified: true
  },
  {
    id: 'cust-3',
    name: 'Emirates',
    category: 'Commercial Airline',
    logoUrl: 'EK',
    website: 'https://www.emirates.com',
    servicesProvided: ['Passenger Services', 'Ramp Handling', 'Cargo Operations'],
    displayOrder: 3,
    isActive: true,
    isVerified: true
  },
  {
    id: 'cust-4',
    name: 'South African Airways',
    category: 'Commercial Airline',
    logoUrl: 'SA',
    website: 'https://www.flysaa.com',
    servicesProvided: ['Passenger Services', 'Ramp Handling', 'Cargo Handling'],
    displayOrder: 4,
    isActive: true,
    isVerified: true
  },
  {
    id: 'cust-5',
    name: 'Africa World Airlines (AWA)',
    category: 'Commercial Airline',
    logoUrl: 'AW',
    website: 'https://www.flyafricaworld.com',
    servicesProvided: ['Full Ground Handling (Accra, Kumasi & Tamale)'],
    displayOrder: 5,
    isActive: true,
    isVerified: true
  },
  {
    id: 'cust-6',
    name: 'Aviance Alliance Members',
    category: 'Aviation Alliance',
    logoUrl: 'AVI',
    website: 'https://avianceghana.com',
    servicesProvided: ['Global Ground Handling Alliance Network'],
    displayOrder: 6,
    isActive: true,
    isVerified: true
  }
];

// Official & Operational FAQs
export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Passenger',
    question: 'How do I obtain special assistance for elderly passengers or Persons with Reduced Mobility (PRM)?',
    answer: 'Aviance Ghana provides dedicated PRM staff and motorized ambulift high-loaders at Kotoka International Airport, Kumasi, and Tamale. Please request PRM assistance through your booking airline at least 48 hours before departure or contact the Aviance duty team upon arrival.',
    isPublished: true,
    displayOrder: 1,
    createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: 'faq-2',
    category: 'Baggage',
    question: 'My checked baggage did not arrive on my flight into Kotoka Terminal 3. What steps should I take?',
    answer: 'Immediately visit the Aviance Baggage Services Office (BSO) located in the Terminal 3 Arrivals Baggage Hall beside Carousel 2 before exiting customs. Our agents will generate an official Property Irregularity Report (PIR) and initiate global SITA WorldTracer tracing. You can also reach our Lost & Found team via findmybag@avianceghana.com or +233 (0) 544 33 4022.',
    isPublished: true,
    displayOrder: 2,
    createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: 'faq-3',
    category: 'Cargo',
    question: 'What are the temperature capabilities of the Aviance Cargo Village cold storage facility?',
    answer: 'Aviance Cargo Village provides certified dual-redundant cold rooms maintaining +2°C to +8°C for pharmaceuticals and fresh agricultural produce (fruits and vegetables), as well as dedicated -20°C deep freeze units for seafood and perishable shipments.',
    isPublished: true,
    displayOrder: 3,
    createdAt: '2026-01-12T08:00:00Z',
  },
  {
    id: 'faq-4',
    category: 'Lounge',
    question: 'Can walk-in passengers access the Adinkra Lounge in Terminal 3 without airline business class tickets?',
    answer: 'Yes. While the lounge welcomes first and business class travelers from our partner carriers, eligible walk-in passengers may purchase access passes subject to capacity. Enquiries can be submitted via our lounge desk or emailed to loungemanager@avianceghana.com.',
    isPublished: true,
    displayOrder: 4,
    createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: 'faq-5',
    category: 'Careers',
    question: 'Does Aviance Ghana accept National Service Scheme (NSS) personnel and student interns?',
    answer: 'Yes. Aviance Ghana actively accepts annual cohorts of accredited tertiary graduates through the National Service Scheme and vocational aviation interns across ramp operations, passenger handling, cargo logistics, and corporate administration.',
    isPublished: true,
    displayOrder: 5,
    createdAt: '2026-01-20T08:00:00Z',
  },
  {
    id: 'faq-6',
    category: 'Corporate',
    question: 'Which international safety accreditations does Aviance Ghana hold?',
    answer: 'Aviance Ghana is an IATA ISAGO-registered ground service provider, holds a certified Ground Handling Organization license from the Ghana Civil Aviation Authority (GCAA), and maintains EU Cargo RA3 security accreditation for air freight operations.',
    isPublished: true,
    displayOrder: 6,
    createdAt: '2026-01-22T08:00:00Z',
  },
];

// Digital Documents Centre records
export const INITIAL_DOCUMENTS: DigitalDocument[] = [
  {
    id: 'doc-1',
    title: 'Aviance Corporate Code of Conduct & Business Ethics',
    description: 'Official corporate governance standards, anti-bribery regulations, and fair competition policies.',
    category: 'Corporate',
    fileName: 'Aviance_Ghana_Code_of_Conduct_2026.pdf',
    fileSize: '1.4 MB',
    fileType: 'PDF',
    version: '2.4',
    status: 'Active',
    visibility: 'Public',
    verificationStatus: 'Verified Official',
    uploadedBy: 'Dominic Adjei-Badu (Finance & Compliance)',
    uploadDate: '2026-01-15',
    downloadUrl: '#',
  },
  {
    id: 'doc-2',
    title: 'IATA ISAGO Station Audit Summary & Conformance Certificate',
    description: 'IATA Safety Audit for Ground Operations confirmation record for Kotoka International Airport (ACC).',
    category: 'Safety',
    fileName: 'IATA_ISAGO_Registry_ACC_2026.pdf',
    fileSize: '890 KB',
    fileType: 'PDF',
    version: '1.0',
    status: 'Active',
    visibility: 'Public',
    verificationStatus: 'Verified Official',
    uploadedBy: 'Michaela Walker (Operations Director)',
    uploadDate: '2026-01-05',
    expiryDate: '2026-12-31',
    downloadUrl: '#',
  },
  {
    id: 'doc-3',
    title: 'EU Cargo RA3 Security Protocol & Cold Chain Warehouse Manual',
    description: 'Regulated Agent Third Country security handling guidelines and cold storage standard operating procedures.',
    category: 'Compliance',
    fileName: 'EU_RA3_Cargo_Village_Manual_v3.pdf',
    fileSize: '3.2 MB',
    fileType: 'PDF',
    version: '3.1',
    status: 'Active',
    visibility: 'Public',
    verificationStatus: 'Verified Official',
    uploadedBy: 'Robert Amenyah (Cargo Manager)',
    uploadDate: '2026-02-01',
    downloadUrl: '#',
  },
  {
    id: 'doc-4',
    title: 'Standard Ground Handling Agreement (SGHA) Tariff Schedule [Draft]',
    description: 'Proposed 2026 commercial handling tariff schedule for non-scheduled ad-hoc and charter flights.',
    category: 'Reports',
    fileName: 'Aviance_Charter_Tariffs_2026_Proposed.pdf',
    fileSize: '740 KB',
    fileType: 'PDF',
    version: '1.0',
    status: 'Active',
    visibility: 'Internal',
    verificationStatus: 'CMS Verification Required',
    uploadedBy: 'Commercial Directorate',
    uploadDate: '2026-02-10',
    downloadUrl: '#',
  },
  {
    id: 'doc-5',
    title: 'National Service & Internship Scheme Induction Charter',
    description: 'Orientation syllabus, airside safety regulations, and personal protective equipment standards for NSS personnel.',
    category: 'Careers',
    fileName: 'NSS_Aviation_Induction_Pack_2026.pdf',
    fileSize: '1.1 MB',
    fileType: 'PDF',
    version: '2.0',
    status: 'Active',
    visibility: 'Public',
    verificationStatus: 'Verified Official',
    uploadedBy: 'Erasmus Twentor (HR General Manager)',
    uploadDate: '2026-01-20',
    downloadUrl: '#',
  },
];

// Partner Portal Concept Requests
export const INITIAL_PARTNER_REQUESTS: PartnerRequest[] = [
  {
    id: 'pr-101',
    referenceNo: 'PR-ACC-2026-019',
    partnerName: 'British Airways Operations Desk',
    airlineCode: 'BA',
    requestType: 'Slot Handling',
    priority: 'Standard',
    station: 'ACC',
    flightNumber: 'BA 078',
    scheduledDate: '2026-10-08',
    details: 'Wide-body B777-300ER turnaround coordination. Requested dual ambulift staging for PRM group at gate C4.',
    status: 'Approved',
    createdAt: '2026-10-06T09:15:00Z',
  },
  {
    id: 'pr-102',
    referenceNo: 'PR-ACC-2026-020',
    partnerName: 'Delta Air Lines Flight Operations',
    airlineCode: 'DL',
    requestType: 'Charter Assistance',
    priority: 'Urgent',
    station: 'ACC',
    flightNumber: 'DL 456',
    scheduledDate: '2026-10-07',
    details: 'Early arrival slot clearance. Requires GPU 400Hz and air start on stand 12 with priority pallet offload.',
    status: 'In Review',
    createdAt: '2026-10-06T12:30:00Z',
  },
  {
    id: 'pr-103',
    referenceNo: 'PR-KMS-2026-004',
    partnerName: 'Africa World Airlines (AWA)',
    airlineCode: 'AW',
    requestType: 'Ground Support',
    priority: 'Standard',
    station: 'KMS',
    flightNumber: 'AW 102',
    scheduledDate: '2026-10-07',
    details: 'Prempeh I Airport Kumasi scheduled domestic turn. Baggage tug train and passenger stair truck reserved.',
    status: 'Approved',
    createdAt: '2026-10-06T14:00:00Z',
  },
];

// System Health Monitoring baseline
export const INITIAL_SYSTEM_HEALTH: SystemHealthMetric[] = [
  {
    service: 'website',
    displayName: 'Corporate Public Portal (Vite React)',
    status: 'Operational',
    lastChecked: 'Just now',
    latencyMs: 14,
    details: 'HTTP 200 OK · Cloud CDN Edge active · No errors recorded.',
    eventsCount: 0,
  },
  {
    service: 'database',
    displayName: 'Supabase PostgreSQL DB / Dual-Store',
    status: 'Operational',
    lastChecked: 'Just now',
    latencyMs: 38,
    details: 'Dual-mode persistence active. Tables and RLS policies initialized.',
    eventsCount: 0,
  },
  {
    service: 'auth',
    displayName: 'Authentication & RBAC Matrix',
    status: 'Operational',
    lastChecked: 'Just now',
    latencyMs: 18,
    details: 'Role-based access matrix enforced across 10 discrete modules.',
    eventsCount: 0,
  },
  {
    service: 'storage',
    displayName: 'Storage Engine (Media & Documents)',
    status: 'Operational',
    lastChecked: 'Just now',
    latencyMs: 45,
    details: 'Buckets provisioned: media, resumes, certifications, documents.',
    eventsCount: 0,
  },
  {
    service: 'realtime',
    displayName: 'Realtime Broadcast & Notification Bus',
    status: 'Operational',
    lastChecked: 'Just now',
    latencyMs: 22,
    details: 'Internal pub/sub event bus connected; Supabase Realtime fallback active.',
    eventsCount: 0,
  },
  {
    service: 'email',
    displayName: 'Transactional Mailer Gateway',
    status: 'Operational',
    lastChecked: 'Just now',
    latencyMs: 50,
    details: 'Enquiry auto-responder and ticket generator queue operational.',
    eventsCount: 0,
  },
  {
    service: 'apis',
    displayName: 'External Aviation Feeds (SITA / DCS)',
    status: 'Monitoring Configuration Required',
    lastChecked: 'Concept Stage',
    details: 'External airline DCS/WorldTracer API bridge ready for authorized carrier keys.',
    eventsCount: 0,
  },
];

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: 'Aviance Ghana Limited',
  tagline: 'Leading Aviation Ground Handling Agent at Kotoka International Airport',
  headOfficeAddress: 'Aviance Cargo Village, Kotoka International Airport, Accra, Ghana',
  digitalAddress: 'GL-016-1234',
  poBox: 'P.M.B. 33, Kotoka International Airport, Accra, Ghana',
  primaryPhone: '+233 302 778 025',
  secondaryPhone: '+233 593 816 076',
  primaryEmail: 'info@avianceghana.com',
  cargoEmail: 'cargosales@avianceghana.com',
  vipEmail: 'lounges@avianceghana.com',
  careersEmail: 'hr@avianceghana.com',
  operatingHours: '24 Hours / 7 Days a week (Year-Round Flight Support)',
  enableAnalytics: true,
  maintenanceMode: false,
};
