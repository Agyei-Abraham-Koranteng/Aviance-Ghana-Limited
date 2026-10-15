import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'tw' | 'fr';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'tw', label: 'Twi', nativeLabel: 'Twi (Akan)', flag: '🇬🇭' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
];

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Top Telemetry Bar
    'telemetry.station': "ACC · Kotoka Int'l",
    'telemetry.terminal': 'Terminal 3 (DGAA)',
    'telemetry.isago': 'ISAGO Registered',
    'telemetry.gcaa': 'GCAA Authorized Handler',
    'telemetry.occ': '24/7 OCC:',
    'telemetry.portal': 'Airline Portal',
    'telemetry.tracing': 'Baggage Tracing',

    // Navigation
    'nav.services': 'Services',
    'nav.flightOps': 'Flight Ops',
    'nav.cargo': 'Cargo',
    'nav.findMyBag': 'Find My Bag',
    'nav.lounge': 'Adinkra Lounge',
    'nav.safety': 'Safety & Standards',
    'nav.careers': 'Careers',
    'nav.more': 'More',
    'nav.about': 'About Aviance Ghana',
    'nav.management': 'Executive Leadership',
    'nav.documents': 'Document Centre',
    'nav.faqs': 'Operational FAQs',
    'nav.contact': 'Contact & Station Info',
    'nav.requestHandling': 'Request Handling',
    'nav.admin': 'Admin',
    'nav.search': 'Search',
    'nav.themeLight': 'Light',
    'nav.themeNavy': 'Navy',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.completeDirectory': 'Complete Directory',
    'nav.servicesTitle': 'Ground Handling & Aviation Services',

    // Hero Section
    'hero.kicker': 'Aviance Ghana Limited · Established 1994',
    'hero.stations': 'Accra (KIA) · Kumasi · Tamale',
    'hero.title1': 'Ground Handling.',
    'hero.title2': 'Elevated to Precision.',
    'hero.subtitle':
      'A full-service aviation ground handling provider certified and regulated by IATA ISAGO and the Ghana Civil Aviation Authority (GCAA). Delivering professional passenger services, ramp handling, Cargo RA3 secure logistics, and executive lounge hospitality.',
    'hero.badgeTitle': 'Official Corporate Identity:',
    'hero.badgeDesc':
      'Digital platform synchronized with certified Aviance Ghana business operations, IATA ISAGO standards, and GCAA regulations.',
    'hero.exploreBtn': 'Explore Aviation Services',
    'hero.baggageBtn': 'Track Inbound Bag',
    'hero.cargoBtn': 'Cargo Village (RA3)',

    // Services Mega Menu
    'services.passenger.title': 'Passenger Services',
    'services.passenger.desc': 'DCS check-in, boarding & PRM care',
    'services.ramp.title': 'Ramp Handling',
    'services.ramp.desc': 'Aircraft turnaround, GPU & pushback',
    'services.cargo.title': 'Air Cargo Terminal',
    'services.cargo.desc': 'EU RA3 cold chain & perishables',
    'services.vip.title': 'VIP & Charter Services',
    'services.vip.desc': 'Meet & greet, executive ramp handling',
    'services.lounge.title': 'Lounge Services (Adinkra)',
    'services.lounge.desc': 'Executive hospitality Terminal 3',
    'services.baggage.title': 'Baggage Services',
    'services.baggage.desc': 'Delayed baggage & WorldTracer desk',
    'services.gse.title': 'GSE & Fleet Maintenance',
    'services.gse.desc': 'Airside workshop & motorized fleet',
    'services.training.title': 'Operational Training',
    'services.training.desc': 'Ramp safety, DGR & IATA AHM',
    'services.occ.title': 'OCC - Flight Operations',
    'services.occ.desc': '24/7 flight coordination center',

    // Stats Section
    'stats.turnaround': 'Turnaround Reliability',
    'stats.turnaroundSub': 'On-time pushback performance',
    'stats.cargo': 'Annual Cargo Tonnage',
    'stats.cargoSub': 'Secure RA3 freight processed',
    'stats.safety': 'ISAGO Safety Audit Score',
    'stats.safetySub': 'Zero major ramp non-conformances',
    'stats.established': 'Years of Operational Excellence',
    'stats.establishedSub': 'Serving Ghana aviation since 1994',

    // Core Features
    'features.turnaroundTitle': 'The 50-Minute Aircraft Turnaround Journey',
    'features.turnaroundSubtitle':
      'From touchdown to departure, every second is choreographed under rigorous IATA ISAGO safety standards by Aviance ground crews.',
    'features.finderTitle': 'Find the Exact Aviation Solution for Your Flight Operation',
    'features.finderSubtitle':
      'Select your flight category and station to view tailored ground handling capabilities, SLAs, and technical equipment.',
    'features.baggageTitle': 'Find My Bag · Automated Baggage Tracing',
    'features.baggageSubtitle':
      'Real-time baggage reconciliation desk located at Kotoka Terminal 3 Arrivals Hall.',
    'features.mapTitle': 'Aviance Station Network Across Ghana',
    'features.mapSubtitle':
      'Three certified commercial stations providing standardized ramp, passenger, and cargo handling services.',

    // Footer
    'footer.companyDesc':
      'Established in 1994, Aviance Ghana is a full-service aviation ground handling provider operating at Kotoka International Airport (Accra), Kumasi, and Tamale. Delivering IATA ISAGO-certified ramp handling, Cargo RA3 security, passenger services, executive lounge hospitality, and VIP/charter assistance.',
    'footer.certTitle': 'Official Certifications & Standards',
    'footer.aviationServices': 'Aviation Services',
    'footer.corporateLinks': 'Corporate & Governance',
    'footer.operationalStations': 'Operational Stations',
    'footer.copyright': 'All rights reserved. Aviance Ghana Limited. Regulated by GCAA & IATA ISAGO.',

    // Common
    'common.readMore': 'Read More',
    'common.viewDetails': 'View Details',
    'common.contactUs': 'Contact OCC',
    'common.switchLanguage': 'Select Language',
    'common.close': 'Close',

    // Station Trust Markers
    'hero.trustAcc': 'ACC · Kotoka T3 & Cargo Village',
    'hero.trustKms': 'KMS · Prempeh I Airport Kumasi',
    'hero.trustTml': 'TML · Tamale International Airport',

    // Stats Section
    'stats.keyFactsTitle': 'Operational Strengths & Station Benchmarks',
    'stats.verified': 'VERIFIED OFFICIAL',
    'stats.stationsLabel': 'International Stations',
    'stats.stationsDesc': 'Accra (Kotoka T3), Kumasi & Tamale',
    'stats.auditLabel': 'ISAGO Audit Compliance',
    'stats.auditDesc': 'IATA Ground Operations Manual standard',
    'stats.workforceLabel': 'Aviation Professionals',
    'stats.workforceDesc': 'Ramp, passenger, cargo & technical workforce',
    'stats.watchLabel': 'Active Airside Watch',
    'stats.watchDesc': 'Continuous turnaround & cargo clearance',

    // Core Bento Services
    'bento.kicker': 'End-to-End Capabilities',
    'bento.title': 'Aviation Ground Handling Solutions',
    'bento.viewAll': 'View All Operational Services',
    'bento.rampPill': '01 · Ramp & Turnaround',
    'bento.rampCert': 'Wide & Narrow-Body Certified',
    'bento.rampTitle': 'Aircraft Ramp Turnaround & GSE Pushback',
    'bento.rampDesc': 'Full-service airside turnaround under IATA ISAGO. Towbarless pushback tractors, Ground Power Units (GPU 400Hz), air start units, baggage conveyors, and potable water/toilet sanitization servicing.',
    'bento.rampAction': 'View Ramp Protocol',
    'bento.cargoPill': '02 · Air Freight',
    'bento.cargoTitle': 'Aviance Cargo Village & Cold Chain',
    'bento.cargoDesc': 'EU RA3 certified air freight logistics with temperature-monitored pharmaceutical and perishable cold vaults (+2°C to +8°C).',
    'bento.cargoSpecs': 'Cargo Specifications',
    'bento.cargoQuote': 'Quote Rates',
    'bento.vipPill': '03 · VIP Hospitality',
    'bento.vipTitle': 'Adinkra Executive Lounge',
    'bento.vipDesc': 'Ghana’s premier departure lounge at Kotoka Terminal 3. High-speed Wi-Fi, chef-curated dining, private showers, and quiet business pods.',
    'bento.vipAmenities': 'Lounge Amenities',
    'bento.vipBook': 'Book Access',
    'bento.paxPill': '04 · Front-of-House',
    'bento.paxTitle': 'Passenger Check-in, Boarding & PRM Care',
    'bento.paxDesc': 'Certified DCS agents operating check-in, biometric gate verification, transit connection desks, and specialized PRM assistance with high-lift ambulifts.',
    'bento.paxDetails': 'Passenger Handling Details',

    // National Map
    'map.kicker': 'National Network',
    'map.title': 'Strategic Presence Across Ghanaian Aerodromes',
    'map.desc': 'Click any station to review handling capacities, operating hours, and local dispatch contacts.',

    // Safety & Governance
    'certs.kicker': 'Safety Governance',
    'certs.title': 'Internationally Audited Operational Standards',
    'certs.viewAll': 'View All Certificates',
    'certs.active': 'Active',

    // Customer Airlines
    'customers.kicker': 'Official Customer Airline Operations',
    'customers.title': 'Carriers Handled in Ghana',
    'customers.desc': 'Airlines and alliance networks with verified ground and cargo handling operations managed by Aviance Ghana.',

    // Latest News
    'news.kicker': 'Corporate Bulletins',
    'news.title': 'Latest News & Operational Updates',
    'news.allPress': 'All Press Releases',
    'news.read': 'Read Article',
    'news.minRead': 'min read',

    // Final CTA
    'cta.title': "Partner with Ghana's Aviation Ground Handling Leader",
    'cta.desc': "Whether you are an international airline scheduling new routes into Kotoka Terminal 3, an air freight charter, or an executive jet operator, Aviance Ghana delivers certified operational excellence.",
    'cta.contact': 'Contact Head Office',
    'cta.vip': 'Request VIP / Charter Service',

    // Quick Actions Menu
    'qa.badge': 'Instant Self-Service Portal',
    'qa.badgeSub': 'Context-Aware Rapid Actions',
    'qa.title': 'Airport Quick Actions',
    'qa.desc': 'Instantly file lost luggage queries, track air cargo airway bills, book VIP hospitality, or contact airside dispatch in seconds.',
    'qa.searchPlaceholder': 'Search task (e.g. luggage, cargo)...',
    'qa.whoAmI': 'I am a:',
    'qa.tabAll': 'All Tasks',
    'qa.tabPassenger': 'Passenger / Traveler',
    'qa.tabCargo': 'Cargo Shipper / Forwarder',
    'qa.tabAirline': 'Airline / Charter Operator',
    'qa.tabCareers': 'Job Seeker / NSS Scheme',
    'qa.liveStatus': '24/7 ACTIVE',
    'qa.lostLuggage.title': 'Report Lost Luggage',
    'qa.lostLuggage.badge': 'URGENT TRACE',
    'qa.lostLuggage.desc': 'Submit an immediate delayed or lost bag claim directly to the 24/7 Kotoka T3 Baggage Services Office.',
    'qa.cargoStatus.title': 'Check Cargo Status',
    'qa.cargoStatus.badge': 'AWB LIVE LOOKUP',
    'qa.cargoStatus.desc': 'Trace air freight airway bills, check cold chain vault temperatures, and verify customs clearance.',
    'qa.findMyBag.title': 'Find My Bag (Tag Status)',
    'qa.findMyBag.badge': 'LIVE BRS',
    'qa.findMyBag.desc': 'Query your bag tag barcode against the simulated BRS ground handling checkpoint telemetry.',
    'qa.reserveLounge.title': 'Adinkra Lounge Booking',
    'qa.reserveLounge.badge': 'VIP COMFORT',
    'qa.reserveLounge.desc': 'Reserve walk-in hospitality, shower suites, high-speed Wi-Fi, and refreshments at Kotoka T3 airside.',
    'qa.cargoEnquiry.title': 'Cargo Tariff & Cold Chain',
    'qa.cargoEnquiry.badge': 'EU RA3',
    'qa.cargoEnquiry.desc': 'Request perishable cold vault space (+2°C to +8°C) or dangerous goods handling tariffs.',
    'qa.rampTurnaround.title': 'Airline SGHA & Ramp Turnaround',
    'qa.rampTurnaround.badge': 'ISAGO CERTIFIED',
    'qa.rampTurnaround.desc': 'Request IATA Standard Ground Handling Agreement (SGHA) support or towbarless pushback dispatch.',
    'qa.careersNss.title': 'Apply for Careers & NSS Scheme',
    'qa.careersNss.badge': 'GRADUATE INTAKE',
    'qa.careersNss.desc': 'Submit an application for open airside operations positions or the Ghana National Service Scheme (NSS).',
    'qa.dutyHotline.title': '24/7 Operations Duty Manager',
    'qa.dutyHotline.badge': 'AIRSIDE OCC',
    'qa.dutyHotline.desc': 'Immediate airside coordinator hotline for ramp dispatch, diversion coordination, and urgent station escalations.',
    'qa.act.claim': 'File Urgent Claim',
    'qa.act.track': 'Track Waybill',
    'qa.act.openPortal': 'Open Portal',
    'qa.act.quote': 'Request Quote',
    'qa.act.reserve': 'Reserve Pass',
    'qa.act.call': 'Call Hotline',
    'qa.resetSearch': 'Reset Search & Filters',
    'qa.noMatch': 'No tasks matched your search',
    'qa.noMatchDesc': 'Try searching for "luggage", "cargo", "lounge", or reset your filters.',

    // Turnaround Timeline
    'timeline.kicker': 'Operational Precision & Turnaround Efficiency',
    'timeline.title': 'The 50-Minute Aircraft Turnaround Journey',
    'timeline.subtitle': 'From touchdown to departure, every second is choreographed under rigorous IATA ISAGO safety standards by Aviance ground crews.',
    'timeline.safetyVerif': 'Mandatory Safety Verification',
    'timeline.seqControls': 'Sequence Controls',
    'timeline.prev': 'Previous Phase',
    'timeline.next': 'Next Phase',
    'timeline.directive': 'Complies with IATA AHM 900 & GCAA Ground Handling Directives',
    'timeline.phase': 'Phase',
    'timeline.step1.title': 'Aircraft Inbound & Apron Marshalling',
    'timeline.step1.desc': 'Aircraft touches down at Kotoka International Airport. Certified ground marshaller guides the airliner to stand with lighted wands. Chocks inserted, safety cones positioned around wings and engines.',
    'timeline.step2.title': 'GPU Connection & Passenger Disembarkation',
    'timeline.step2.desc': 'Ground Power Unit (GPU 400Hz) connected. Passenger boarding bridge or motorized stairs positioned. Cabin doors opened; passengers disembark with PRM ambulift support.',
    'timeline.step3.title': 'Baggage & Cargo Hold Offloading',
    'timeline.step3.desc': 'High-speed belt loaders interface with aircraft cargo holds. ULD containers and bulk baggage systematically offloaded onto tug trains for immediate transit to baggage sortation.',
    'timeline.step4.title': 'Cabin Servicing, Water & Fuel Liaison',
    'timeline.step4.desc': 'Potable water servicing and lavatory hygiene servicing completed under strict sanitation protocols. Inflight catering restocked and fuel hydrants liaised under fire guard safety watch.',
    'timeline.step5.title': 'Outbound DCS Boarding & Baggage Loading',
    'timeline.step5.desc': 'Departure Control System (DCS) boarding processed at Terminal 3 gates. Automated Baggage Reconciliation System (BRS) verifies every bag. Final loadsheet signed by captain.',
    'timeline.step6.title': 'Towbarless Pushback & Engine Start',
    'timeline.step6.desc': 'Headset technician connects directly to flight deck. Aviance heavy towbarless pushback tractor connects to nose gear. Clear ATC clearance received, pushback executed smoothly.',

    // Smart Service Finder
    'finder.kicker': 'Smart Service Discovery · Website Navigation',
    'finder.title': 'How can Aviance Ghana assist you today?',
    'finder.desc': 'Select your traveler or business role below to instantly view tailored services, contact liaison desks, and ground handling solutions.',
    'finder.step1': 'Step 1: Choose Your Profile',
    'finder.pax': 'Passenger',
    'finder.paxDesc': 'Traveling through Kotoka Terminal 3',
    'finder.airline': 'Airline Operator',
    'finder.airlineDesc': 'Scheduled carrier or charter dispatch',
    'finder.cargo': 'Cargo Customer',
    'finder.cargoDesc': 'Air freight, cold chain, or perishables',
    'finder.corp': 'Corporate & VIP',
    'finder.corpDesc': 'Executive aviation, protocol & lounge',
    'finder.jobs': 'Job Seeker / NSS',
    'finder.jobsDesc': 'Aviation careers & internships',
    'finder.agency': 'Travel & Agency',
    'finder.agencyDesc': 'GSA, freight forwarder, or agency',

    // Baggage Tracker
    'baggage.badge': 'Kotoka International Airport Terminal 3 · SITA BRS',
    'baggage.title': 'Find My Bag · Automated Baggage Tracing',
    'baggage.deskInfo': 'Baggage Services Office Desk located beside Carousel 2 Arrivals Hall · Direct Line: +233 (0) 544 33 4022',
    'baggage.inputPlaceholder': 'e.g. ACC-782910 or EK-451902',
    'baggage.trackBtn': 'Track Bag',
    'baggage.samplePrompt': 'Try sample bag tag barcode numbers:',
    'baggage.fileClaimBtn': 'File Baggage Claim',
    'baggage.notFoundTitle': 'No Baggage Record Found',
    'baggage.notFoundDesc': 'The bag tag entered does not match active arrivals records. Please visit the Aviance Baggage Services Office in Terminal 3.',

    // Search Modal
    'search.placeholder': 'Search services, documentation, stations, staff, or flights...',
    'search.categoriesAll': 'All',
    'search.categoriesServices': 'Services',
    'search.categoriesDocs': 'Documents',
    'search.categoriesCareers': 'Careers',
    'search.categoriesFaqs': 'FAQs',
    'search.categoriesStations': 'Stations',
    'search.categoriesTeam': 'Leadership',
    'search.recent': 'Recent Searches',
    'search.noResults': 'No results found for',
    'search.esc': 'ESC to close',

    // Station Network
    'map.operationalCoverage': 'Operational Coverage Across Ghana',
    'map.stationProfile': 'Station Profile & Capabilities',
    'map.operatingHours': 'Operating Hours',
    'map.runway': 'Runway Specifications',
    'map.handlingCap': 'Handling Capabilities',
    'map.contactDispatch': 'Contact Station Dispatch',

    // Footer Extra
    'footer.paxHandling': 'Passenger Handling & PRM',
    'footer.rampTurnaround': 'Aircraft Ramp Turnaround',
    'footer.cargoVillage': 'Air Cargo Village Terminal',
    'footer.vipCharter': 'Aviance VIP & Charter',
    'footer.adinkraLounge': 'Adinkra Executive Lounge',
    'footer.baggageDesk': 'Baggage & WorldTracer',
    'footer.findMyBag': 'Find My Bag Portal',
    'footer.aboutAviance': 'About Aviance Ghana',
    'footer.opHubs': 'Operational Hubs (ACC·KMS·TML)',
    'footer.leadership': 'Executive Leadership',
    'footer.safetyCerts': 'Safety, Licences & Compliance',
    'footer.newsPress': 'News & Press Releases',
    'footer.careersNss': 'Careers & National Service',
    'footer.codeOfConduct': 'Corporate Code of Conduct',
    'footer.docCentre': 'Digital Document Centre',
    'footer.airlinePortal': 'Airline Portal Concept',
    'footer.helpFaqs': 'Help & FAQs',
    'footer.headOffice': 'Head Office Contact',
    'footer.hours': 'Office: Mon–Fri 08:00–17:00 · Flight Ops 24/7',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',

    // Mobile Drawer Extra
    'drawer.operationsHubs': 'Operations & Hubs',
    'drawer.companyResources': 'Company & Resources',
    'drawer.leadership': 'Leadership',
    'drawer.allNews': 'News',
    'drawer.adminPortal': 'Admin Portal & CMS',

    // Pages - Services Directory
    'pages.services.kicker': 'Aviation Services Directory',
    'pages.services.title': 'Comprehensive Aviation Ground Handling',
    'pages.services.desc': 'Operating across Kotoka International Airport (ACC), Prempeh I International Kumasi (KMS), and Tamale International (TML), Aviance delivers world-class safety, turnaround efficiency, and passenger hospitality.',
    'pages.services.filterPlaceholder': 'Filter services...',
    'pages.services.all': 'All',

    // Pages - About Us
    'pages.about.kicker': 'Corporate Overview',
    'pages.about.title': 'About Aviance Ghana Limited',
    'pages.about.desc': 'The foundation of Ghana\'s aviation ground handling infrastructure. Connecting West Africa with global destinations through certified safety, operational reliability, and Ghanaian hospitality.',
    'pages.about.heritageKicker': 'Our Heritage & Mandate',
    'pages.about.heritageTitle': 'Pioneering Ground Handling Standards in West Africa',
    'pages.about.heritageP1': 'Aviance Ghana Limited is an authorized Ground Handling Organization (GHO) licensed by the Ghana Civil Aviation Authority (GCAA). Based at Kotoka International Airport in Accra, with active stations at Prempeh I International Airport Kumasi and Tamale International Airport, Aviance is the trusted ground handling partner for international scheduled carriers, cargo freighter operators, and executive aviation.',
    'pages.about.heritageP2': 'With a relentless focus on IATA ISAGO safety compliance, continuous staff development at our Aviation Training Academy, and investment in modern Ground Support Equipment, we ensure that aircraft turnarounds occur on schedule with zero compromise on safety or security.',
    'pages.about.meetLeadership': 'Meet Executive Leadership',
    'pages.about.pillarsTitle': 'Core Strategic Pillars',

    // Pages - Contact Us
    'pages.contact.kicker': 'Station Directory & Enquiries',
    'pages.contact.title': 'Contact Aviance Ghana',
    'pages.contact.desc': 'Connect with station managers, cargo sales desks, flight operations dispatchers, and corporate leadership across Accra, Kumasi, and Tamale.',
    'pages.contact.formTitle': 'Submit an Operational or Business Enquiry',
    'pages.contact.formSubtitle': 'Direct routing to station managers, cargo sales, and flight operations dispatchers.',
    'pages.contact.name': 'Full Name',
    'pages.contact.email': 'Official Work Email',
    'pages.contact.phone': 'Phone Number',
    'pages.contact.org': 'Airline / Organization',
    'pages.contact.category': 'Enquiry Category',
    'pages.contact.subject': 'Subject / Flight Call Sign',
    'pages.contact.message': 'Detailed Operational Message',
    'pages.contact.sendBtn': 'Send Official Enquiry',
    'pages.contact.successTitle': 'Enquiry Transmitted Successfully',
    'pages.contact.successMsg': 'Your enquiry has been logged into our operations system. An operations manager will reply promptly.',
    'pages.contact.submitAnother': 'Submit Another Request',

    // Pages - Cargo Terminal
    'pages.cargo.kicker': 'EU RA3 Certified Cold Chain Terminal',
    'pages.cargo.title': 'Aviance Air Cargo Village',
    'pages.cargo.desc': 'Secure, temperature-regulated air freight processing at Kotoka International Airport. Dedicated pharmaceutical vault and fresh perishables handling.',

    // Pages - FAQs
    'pages.faqs.kicker': 'Knowledge Base & Questions',
    'pages.faqs.title': 'Operational Frequently Asked Questions',
    'pages.faqs.desc': 'Clear answers regarding passenger procedures, baggage tracking, cargo tariffs, airline ramp handling, and airport protocol.',

    // Pages - Lounge
    'pages.lounge.kicker': 'Terminal 3 Departure Hospitality',
    'pages.lounge.title': 'Adinkra Executive Lounge',
    'pages.lounge.desc': 'Experience tranquility before departure. Premium Ghanaian hospitality, artisan buffet, private shower suites, and high-speed Wi-Fi.',
    'pages.lounge.bookBtn': 'Book Lounge Pass or VIP Handling',
    'pages.lounge.hotline': 'VIP Protocol & Charter Hotline (+233 (0) 59 381 6076)',
    'pages.lounge.amenitiesKicker': 'Terminal 3 Departure Luxury',
    'pages.lounge.amenitiesTitle': 'Adinkra Lounge Amenities',
    'pages.lounge.vipKicker': 'Airside Diplomatic Discretion',
    'pages.lounge.vipTitle': 'Aviance VIP & Charter Protocol Handling',
    'pages.lounge.vipDesc': 'Tarmac luxury vehicle transfers, direct VIP lounge escort, customs and immigration express clearance for dignitaries, diplomats, and private aviation travelers.',

    // Pages - Careers
    'pages.careers.kicker': 'Aviation Talent & Careers',
    'pages.careers.title': 'Build Your Career in Aviation',
    'pages.careers.desc': "Join the men and women powering Ghana's commercial air transport. From aircraft ramp handling and electro-mechanical engineering to passenger hospitality and air cargo logistics.",
    'pages.careers.all': 'All Positions',
    'pages.careers.fullTime': 'Full-time',
    'pages.careers.nss': 'National Service',
    'pages.careers.activeCount': 'Active Opportunities',
    'pages.careers.applyBtn': 'Apply for Position',

    // Pages - Cargo Details
    'pages.cargo.submitBtn': 'Submit Air Cargo Enquiry',
    'pages.cargo.hotline': 'Cargo Operations Desk (+233 (0) 59 381 6076)',
    'pages.cargo.coldChainTitle': 'Cold Chain & Perishables',
    'pages.cargo.coldChainDesc': '450m³ dual-redundant cold storage maintaining +2°C to +8°C for pharmaceuticals, fresh fruits, vegetables, and -20°C deep freeze for sea produce and specialized cargo.',
    'pages.cargo.ra3Title': 'EU RA3 Security Screening',
    'pages.cargo.ra3Desc': 'Regulated Agent Third Country (RA3) accredited security infrastructure. High-penetration dual-view X-ray inspection, explosive trace detection, and bonded physical escort.',
    'pages.cargo.dgTitle': 'Dangerous Goods (IATA DGR)',
    'pages.cargo.dgDesc': 'Certified category 6 DGR specialists for Class 1-9 dangerous goods handling, dry ice replenishment, lithium battery acceptance, and radiation monitoring.',

    // Pages - Baggage / Find My Bag
    'pages.baggage.kicker': 'Kotoka International Airport Terminal 3 · Baggage Services',
    'pages.baggage.title': 'Find My Bag · Real-Time Baggage Tracing',
    'pages.baggage.desc': 'Direct link into Aviance Ghana’s Baggage Services Desk and global IATA WorldTracer network. Track delayed bags, submit property irregularity reports, and arrange delivery.',
    'pages.baggage.fileClaim': 'File Delayed Baggage Report',
    'pages.baggage.claimHeading': 'Submit a Baggage Claim or Enquiry',
    'pages.baggage.claimDesc': 'Our arrivals baggage resolution team is on-duty 24/7 inside Terminal 3. Submit your flight and baggage details for urgent tracing.',

    // Pages - Contact Extra
    'pages.contact.hoursTitle': 'Operating Hours',
    'pages.contact.hoursVal': '24 Hours / 7 Days (Flight Operations)',
    'pages.contact.stationContactsTitle': 'Station & Dispatch Desk Directory',

    // Common Buttons & Labels
    'common.fullSpecs': 'Full Specifications',
    'common.quoteCargo': 'Quote Cargo Rates',
    'common.requestAccess': 'Request Access',
    'common.callDesk': 'Call Operations Desk',

    // Finder & Map extra keys
    'finder.step2': 'Step 2 · Recommended Pathways',
    'finder.step2Desc': 'Tailored ground handling services and priority action links based on your selected profile.',
    'map.physicalStation': 'Physical Station',
    'map.opsHours': 'Flight Operations Hours',
    'map.stationContact': 'Station Contact',
    'map.dispatchEmail': 'Dispatch Desk Email',
    'map.op247': 'Operational 24/7',
  },

  tw: {
    // Top Telemetry Bar
    'telemetry.station': "ACC · Kotoka Amansan Gyinabea",
    'telemetry.terminal': 'Terminal 3 (DGAA)',
    'telemetry.isago': 'ISAGO a Wɔagye Atom',
    'telemetry.gcaa': 'GCAA Wiemhyɛn Dwumayɛfoɔ',
    'telemetry.occ': '24/7 OCC Dɔnhwerew:',
    'telemetry.portal': 'Wiemhyɛnfoɔ Bea',
    'telemetry.tracing': 'Kotokuo Hwehwɛ',

    // Navigation
    'nav.services': 'Ndwuma',
    'nav.flightOps': 'Wiemhyɛn Dwuma',
    'nav.cargo': 'Nnoɔma Fret',
    'nav.findMyBag': 'Hwehwɛ Me Kotokuo',
    'nav.lounge': 'Adinkra Ahomegyebea',
    'nav.safety': 'Bammbɔ & Gyinapɛn',
    'nav.careers': 'Adwuma Hwehwɛ',
    'nav.more': 'Pii Bio',
    'nav.about': 'Aviance Ghana Ho Asɛm',
    'nav.management': 'Akandifoɔ Panyin',
    'nav.documents': 'Nkrataa Bea',
    'nav.faqs': 'Nsɛmmisa a Wɔtaa Bisa',
    'nav.contact': 'Kasa Kyerɛ Yɛn',
    'nav.requestHandling': 'Bisa Dwumadie',
    'nav.admin': 'Adwumayɛfoɔ Kɛseɛ',
    'nav.search': 'Hwehwɛ',
    'nav.themeLight': 'Hann',
    'nav.themeNavy': 'Kuntann',
    'nav.menu': 'Nhyehyɛeɛ',
    'nav.close': 'To Mu',
    'nav.completeDirectory': 'Ndwuma Nyinaa Din',
    'nav.servicesTitle': 'Asase So Wiemhyɛn Ndwuma Nyinaa',

    // Hero Section
    'hero.kicker': 'Aviance Ghana Limited · Wɔhyɛɛ aseɛ 1994',
    'hero.stations': 'Nkran (KIA) · Kumase · Tamale',
    'hero.title1': 'Asase So Dwumadie.',
    'hero.title2': 'Pɛpɛɛpɛyɛ a Ɛkorɔn.',
    'hero.subtitle':
      'Wiemhyɛn asase so dwumayɛfoɔ panyin a IATA ISAGO ne Ghana Civil Aviation Authority (GCAA) agye atom. Yɛde akwantufoɔ dwumadie, wiemhyɛn bammbɔ, Nnoɔma Cargo RA3 ahobammbɔ, ne ahomegyebea pa ma akwantufoɔ ne wiemhyɛn kuo.',
    'hero.badgeTitle': 'Aban Nkrataa:',
    'hero.badgeDesc':
      'Dwumadie nhyehyɛeɛ a ɛne Aviance Ghana mmara, IATA ISAGO bammbɔ, ne GCAA gyinapɛn nyinaa hyia pɛpɛɛpɛ.',
    'hero.exploreBtn': 'Hwehwɛ Ndwuma Nyinaa',
    'hero.baggageBtn': 'Hwehwɛ Wo Kotokuo',
    'hero.cargoBtn': 'Nnoɔma Bea Kɛseɛ (RA3)',

    // Services Mega Menu
    'services.passenger.title': 'Akwantufoɔ Sombea',
    'services.passenger.desc': 'Check-in, boarding ne PRM mmoa',
    'services.ramp.title': 'Wiemhyɛn Bammbɔ & Ramp',
    'services.ramp.desc': 'Wiemhyɛn nsakraeɛ, GPU ne pushback',
    'services.cargo.title': 'Nnoɔma Wiemhyɛn Bea',
    'services.cargo.desc': 'EU RA3 nwunwunbea ne nnoɔma fret',
    'services.vip.title': 'VIP & Akwammisa Pɔtee',
    'services.vip.desc': 'Akwantufoɔ akɛseɛ nkyia ne mmoa',
    'services.lounge.title': 'Adinkra Ahomegyebea (T3)',
    'services.lounge.desc': 'Akwantufoɔ ahomegyebea a ɛkorɔn',
    'services.baggage.title': 'Kotokuo Dwumadie',
    'services.baggage.desc': 'Kotokuo a ayera ne WorldTracer mfididwuma',
    'services.gse.title': 'GSE & Mfididwuma Siesie',
    'services.gse.desc': 'Airside mfididwuma ne teaseɛnam siesie',
    'services.training.title': 'Adwumayɛfoɔ Nteteeɛ',
    'services.training.desc': 'Ramp ahobammbɔ, DGR ne IATA AHM',
    'services.occ.title': 'OCC - Wiemhyɛn Nhyehyɛe',
    'services.occ.desc': 'Dɔnhwerew 24/7 wiemhyɛn akwankyerɛ',

    // Stats Section
    'stats.turnaround': 'Wiemhyɛn Berɛ Pɛpɛɛpɛ',
    'stats.turnaroundSub': 'Pushback berɛ pɔtee a yɛdi so',
    'stats.cargo': 'Nnoɔma Afe Kɛseɛ (Tons)',
    'stats.cargoSub': 'RA3 nnoɔma ahobammbɔ kɛseɛ',
    'stats.safety': 'ISAGO Ahobammbɔ Nkrataa',
    'stats.safetySub': 'Mfomsoɔ biara nni yɛn ramp bammbɔ mu',
    'stats.established': 'Mfeɛ a Yɛasom Wiemhyɛn',
    'stats.establishedSub': 'Yɛsom Ghana firi afe 1994 besi nnɛ',

    // Core Features
    'features.turnaroundTitle': 'Wiemhyɛn Akwantuo Simma 50 Nsakraeɛ',
    'features.turnaroundSubtitle':
      'Firi berɛ a wiemhyɛn si asase so kɔsi sɛ ɛtu bio, Aviance adwumayɛfoɔ de simma biara yɛ adwuma sɛdeɛ IATA ISAGO bammbɔ mmara kyerɛ.',
    'features.finderTitle': 'Hwehwɛ Dwumadie Pɔtee a Wuhia Ma Wiemhyɛn',
    'features.finderSubtitle':
      'Yi wiemhyɛn su ne gyinabea na hunu yɛn asase so mfididwuma, nteteeɛ ne mmara.',
    'features.baggageTitle': 'Hwehwɛ Me Kotokuo · BRS Mfididwuma',
    'features.baggageSubtitle':
      'Kotokuo hwehwɛbea mfididwuma pɔtee wɔ Kotoka Terminal 3 Akwantufoɔ Badwam.',
    'features.mapTitle': 'Aviance Gyinabea Ahodoɔ Wɔ Ghana',
    'features.mapSubtitle':
      'Gyinabea mmiɛnsa a agye atom a ɛma ramp, akwantufoɔ ne nnoɔma dwumadie a ɛkorɔn.',

    // Footer
    'footer.companyDesc':
      'Wɔhyɛɛ aseɛ 1994, Aviance Ghana yɛ wiemhyɛn asase so dwumayɛfoɔ kɛseɛ a ɛwɔ Kotoka International Airport (Nkran), Kumase ne Tamale. Yɛde IATA ISAGO bammbɔ, Cargo RA3 ahobammbɔ, akwantufoɔ sombea ne VIP ahomegyebea ma.',
    'footer.certTitle': 'Aban Bammbɔ & Gyinapɛn Nkrataa',
    'footer.aviationServices': 'Wiemhyɛn Ndwuma',
    'footer.corporateLinks': 'Adwumakuo & Nhyehyɛeɛ',
    'footer.operationalStations': 'Gyinabea Ahodoɔ',
    'footer.copyright': 'Aviance Ghana Limited. Mmara nyinaa yɛ GCAA & IATA ISAGO de.',

    // Common
    'common.readMore': 'Kenkan Bio',
    'common.viewDetails': 'Hwɛ Ne Nyinaa',
    'common.contactUs': 'Frɛ OCC Seesei',
    'common.switchLanguage': 'Pau Kasa',
    'common.close': 'To Mu',

    // Station Trust Markers
    'hero.trustAcc': 'ACC · Kotoka T3 & Nnoɔma Bea',
    'hero.trustKms': 'KMS · Prempeh I Wiemhyɛn Bea Kumase',
    'hero.trustTml': 'TML · Tamale Amansan Wiemhyɛn Bea',

    // Stats Section
    'stats.keyFactsTitle': 'Yɛn Ahoɔden & Gyinapɛn Kɛseɛ',
    'stats.verified': 'ABAN NKRATAA PA',
    'stats.stationsLabel': 'Amansan Gyinabea',
    'stats.stationsDesc': 'Nkran (Kotoka T3), Kumase ne Tamale',
    'stats.auditLabel': 'ISAGO Ahobammbɔ Nhyehyɛeɛ',
    'stats.auditDesc': 'IATA Ground Operations Manual gyinapɛn so',
    'stats.workforceLabel': 'Wiemhyɛn Adwumayɛfoɔ Pa',
    'stats.workforceDesc': 'Ramp, akwantufoɔ, nnoɔma ne mfididwuma foɔ',
    'stats.watchLabel': 'Airside Bammbɔ Daa',
    'stats.watchDesc': 'Wiemhyɛn nsakraeɛ ne nnoɔma fret dɔnhwerew nyinaa',

    // Core Bento Services
    'bento.kicker': 'Dwumadie Nyinaa a Ɛkɔ So',
    'bento.title': 'Asase So Wiemhyɛn Dwumadie Nhyehyɛeɛ',
    'bento.viewAll': 'Hwɛ Wiemhyɛn Ndwuma Nyinaa',
    'bento.rampPill': '01 · Wiemhyɛn Bammbɔ & Ramp',
    'bento.rampCert': 'Wiemhyɛn Akɛseɛ & Nketewa Bammbɔ',
    'bento.rampTitle': 'Wiemhyɛn Nsakraeɛ & GSE Pushback',
    'bento.rampDesc': 'Wiemhyɛn asase so dwumadie a IATA ISAGO ahyɛ da agye atom. Pushback teaseɛnam a ɛntwe akurotoɔ, GPU (400Hz), nsuo ne ahotew mfididwuma.',
    'bento.rampAction': 'Hwɛ Ramp Mmara',
    'bento.cargoPill': '02 · Nnoɔma Wiemhyɛn Fret',
    'bento.cargoTitle': 'Aviance Nnoɔma Bea Kɛseɛ & Awɔnwɔnbea',
    'bento.cargoDesc': 'EU RA3 nnoɔma ahobammbɔ mfididwuma a ɛwɔ awɔnwɔnbea ma nnuru ne nnuane (+2°C kɔsi +8°C).',
    'bento.cargoSpecs': 'Nnoɔma Nhyehyɛeɛ',
    'bento.cargoQuote': 'Bisa Boɔ',
    'bento.vipPill': '03 · VIP Ahomegyebea',
    'bento.vipTitle': 'Adinkra Ahomegyebea Kɛseɛ',
    'bento.vipDesc': 'Ghana ahomegyebea a ɛdi kan wɔ Kotoka Terminal 3. Wi-Fi a ɛyɛ ntɛm, aduane pa, aduarebea ne adwumayɛbea dwoodwoo.',
    'bento.vipAmenities': 'Ahomegyebea Nnoɔma',
    'bento.vipBook': 'Kora Bea Seesei',
    'bento.paxPill': '04 · Akwantufoɔ Sombea',
    'bento.paxTitle': 'Check-in, Wiemhyɛn Mu Forone PRM Mmoa',
    'bento.paxDesc': 'DCS adwumayɛfoɔ a wɔagye atom ma check-in, biometric nkrataa hwehwɛ, ne PRM mmoa ma ayarefoɔ ne nkɔkoraa.',
    'bento.paxDetails': 'Akwantufoɔ Sombea Ho Nsɛm',

    // National Map
    'map.kicker': 'Ɔman No Mu Baabiara',
    'map.title': 'Aviance Gyinabea Ahodoɔ Wɔ Ghana',
    'map.desc': 'Mia gyinabea biara so na hwɛ baabi a yɛyɛ adwuma, dɔnhwerew ne nkitahodi.',

    // Safety & Governance
    'certs.kicker': 'Bammbɔ & Nhyehyɛeɛ',
    'certs.title': 'Amansan Bammbɔ & Gyinapɛn Nkrataa',
    'certs.viewAll': 'Hwɛ Nkrataa Nyinaa',
    'certs.active': 'Ɛwɔ Mu',

    // Customer Airlines
    'customers.kicker': 'Wiemhyɛn Kuo a Yɛsom Wɔn',
    'customers.title': 'Wiemhyɛn Ahodoɔ a Yɛhwɛ Wɔn Wɔ Ghana',
    'customers.desc': 'Wiemhyɛn akuo akɛseɛ ne amansan agye atom a Aviance Ghana hwɛ wɔn so wɔ Ghana.',

    // Latest News
    'news.kicker': 'Adwumakuo Amanneɛbɔ',
    'news.title': 'Nkutahodie Foforɔ & Wiemhyɛn Ho Nsɛm',
    'news.allPress': 'Amanneɛbɔ Nyinaa',
    'news.read': 'Kenkan Asɛm No',
    'news.minRead': 'simma akenkan',

    // Final CTA
    'cta.title': "Ka Aviance Ghana, Wiemhyɛn Panyin No Ho",
    'cta.desc': "Sɛ woyɛ wiemhyɛn kuo foforɔ a woreba Kotoka Terminal 3, anaa nnoɔma fret, Aviance Ghana ma wo dwumadie a ɛkorɔn.",
    'cta.contact': 'Frɛ Yɛn Tiatia',
    'cta.vip': 'Bisa VIP / Charter Dwumadie',

    // Quick Actions Menu
    'qa.badge': 'Woankasa Dwumayɛbea Ntɛmntɛm',
    'qa.badgeSub': 'Ndwuma a Wotumi Yɛ Seesei Ara',
    'qa.title': 'Wiemhyɛn Bea Ndwuma Ntɛmntɛm',
    'qa.desc': 'Hwehwɛ wo kotokuo a ayera, hwɛ nnoɔma fret awb, kora VIP ahomegyebea, anaa frɛ airside ntɛm ara.',
    'qa.searchPlaceholder': 'Hwehwɛ dwuma (e.g. kotokuo, nnoɔma fret)...',
    'qa.whoAmI': 'Meyɛ:',
    'qa.tabAll': 'Ndwuma Nyinaa',
    'qa.tabPassenger': 'Okwantuni',
    'qa.tabCargo': 'Nnoɔma Somafoɔ',
    'qa.tabAirline': 'Wiemhyɛn Wura',
    'qa.tabCareers': 'Adwuma Hwehwɛfoɔ / NSS',
    'qa.liveStatus': '24/7 ƐKƆ SO',
    'qa.lostLuggage.title': 'Ka Kotokuo a Ayera Ho Asɛm',
    'qa.lostLuggage.badge': 'NTƐM HWEHWƐ',
    'qa.lostLuggage.desc': 'Fa kotokuo a ayera anaa akyɛ ho amanneɛbɔ kɔ Kotoka T3 Kotokuo Dwumayɛbea tiatia.',
    'qa.cargoStatus.title': 'Hwɛ Nnoɔma Fret Gyinabea',
    'qa.cargoStatus.badge': 'AWB SEESEI ARA',
    'qa.cargoStatus.desc': 'Hwehwɛ nnoɔma fret krataa (AWB), hwɛ awɔnwɔnbea ahoɔhyɛ, na hunu customs nkrataa.',
    'qa.findMyBag.title': 'Hwehwɛ Me Kotokuo (BRS)',
    'qa.findMyBag.badge': 'BRS SEESEI',
    'qa.findMyBag.desc': 'Fa wo bag tag nɔmba hwehwɛ baabi pɔtee a wo kotokuo adu wɔ aeropod mu.',
    'qa.reserveLounge.title': 'Kora Adinkra Ahomegyebea',
    'qa.reserveLounge.badge': 'VIP AHOMEGYE',
    'qa.reserveLounge.desc': 'Kora ahomegyebea, aduarebea, Wi-Fi ntɛmntɛm, ne aduane pa wɔ Kotoka T3 wiemhyɛn gyinabea.',
    'qa.cargoEnquiry.title': 'Nnoɔma Boɔ & Awɔnwɔnbea',
    'qa.cargoEnquiry.badge': 'EU RA3',
    'qa.cargoEnquiry.desc': 'Bisa baabi ma nnoɔma a ɛporɔw (+2°C kɔsi +8°C) anaa nnoɔma a ɛyɛ hu bammbɔ boɔ.',
    'qa.rampTurnaround.title': 'Wiemhyɛn SGHA & Ramp Nsakraeɛ',
    'qa.rampTurnaround.badge': 'ISAGO A WƆAGYE ATOM',
    'qa.rampTurnaround.desc': 'Bisa IATA SGHA apam anaa pushback teaseɛnam dwumadie ma wo wiemhyɛn.',
    'qa.careersNss.title': 'Kɔ Adwuma & NSS Nhyehyɛeɛ',
    'qa.careersNss.badge': 'ADWUMA FOFORƆ',
    'qa.careersNss.desc': 'Fa wo nkrataa kɔma wiemhyɛn asase so adwuma anaa Ghana National Service Scheme (NSS).',
    'qa.dutyHotline.title': 'Dɔnhwerew 24/7 Dwumayɛfoɔ Panyin',
    'qa.dutyHotline.badge': 'AIRSIDE OCC',
    'qa.dutyHotline.desc': 'Frɛ airside dwumayɛfoɔ panyin seesei ma wiemhyɛn nsakraeɛ ne bammbɔ ho asɛm.',
    'qa.act.claim': 'Fa Amanneɛbɔ Kɔ',
    'qa.act.track': 'Hwɛ AWB',
    'qa.act.openPortal': 'Bue Dwumayɛbea',
    'qa.act.quote': 'Bisa Boɔ',
    'qa.act.reserve': 'Kora Krataa',
    'qa.act.call': 'Frɛ Tiatia',
    'qa.resetSearch': 'Siesie Hwehwɛbea Bio',
    'qa.noMatch': 'Dwuma biara nni hɔ a ɛne wo hwehwɛ hyia',
    'qa.noMatchDesc': 'Sɔ hwehwɛ "kotokuo", "nnoɔma fret", anaa "ahomegyebea" bio.',

    // Turnaround Timeline
    'timeline.kicker': 'Pɛpɛɛpɛyɛ & Berɛ So Dwumadie',
    'timeline.title': 'Wiemhyɛn Simma 50 Nsakraeɛ Kɛseɛ',
    'timeline.subtitle': 'Firi berɛ a wiemhyɛn si fɔm kɔsi sɛ ɛtu bio, Aviance adwumayɛfoɔ de simma biara yɛ adwuma sɛdeɛ IATA ISAGO bammbɔ kyerɛ.',
    'timeline.safetyVerif': 'Ahobammbɔ a Ɛwɔ Sɛ Yɛyɛ Pɛpɛɛpɛ',
    'timeline.seqControls': 'Dwumadie Nhyehyɛeɛ',
    'timeline.prev': 'Fasuo a Etwaam',
    'timeline.next': 'Fasuo a Edi Hɔ',
    'timeline.directive': 'Ɛne IATA AHM 900 & GCAA mmara nyinaa hyia pɛpɛɛpɛ',
    'timeline.phase': 'Fasuo',
    'timeline.step1.title': 'Wiemhyɛn Baso & Apron Marshalling',
    'timeline.step1.desc': 'Wiemhyɛn si fɔm wɔ Kotoka Amansan Gyinabea. Adwumayɛfoɔ panyin de kanea kyerɛ wiemhyɛn kwan ma ɛkɔ gyinabea pɔtee. Wɔde chocks ne cones gu ho ma bammbɔ.',
    'timeline.step2.title': 'GPU Nkitahodie & Akwantufoɔ Siane',
    'timeline.step2.desc': 'Wɔde Anyinam Ahoɔden GPU (400Hz) fam wiemhyɛn ho ntɛm. Wɔde atwerɛ ma akwantufoɔ siane, na PRM mmoa ma ayarefoɔ.',
    'timeline.step3.title': 'Kotokuo & Nnoɔma Fret Yiyi Firi Wiemhyɛn Mu',
    'timeline.step3.desc': 'Mfididwuma kɛseɛ yiyi kotokuo ne fret nyinaa firi wiemhyɛn mu kɔ carousel ne Aviance Cargo Village awɔnwɔnbea.',
    'timeline.step4.title': 'Wiemhyɛn Mu Siesie, Nsuo & Petrol Nkitahodie',
    'timeline.step4.desc': 'Wɔsiesie nsuo tew ne ahotew aduro wɔ wiemhyɛn mu pɛpɛɛpɛ. Wɔde aduane hyɛ mu bio na petrol nso wɔhwɛ so wɔ ogya bammbɔ ase.',
    'timeline.step5.title': 'DCS Boarding & Kotokuo a Wɔde Gu Mu Bio',
    'timeline.step5.desc': 'Terminal 3 aboboano DCS mfididwuma gye akwantufoɔ kɔ mu. BRS hwɛ ma kotokuo biara ne ne wura hyia pɛpɛɛpɛ ansa na captain agye atom.',
    'timeline.step6.title': 'Towbarless Pushback & Wiemhyɛn Tu',
    'timeline.step6.desc': 'Mfididwumani no ne wiemhyɛnkafoɔ no kasa tiatia. Teaseɛnam kɛseɛ pushback no pia wiemhyɛn no kɔ baabi a ɛbɛtu, na wɔma kwan ma etu dwoodwoo.',

    // Smart Service Finder
    'finder.kicker': 'Wiemhyɛn Dwumadie Hwehwɛbea Pa',
    'finder.title': 'Ɛdeɛn na Aviance Ghana bɛtumi ayɛ ama wo nnɛ?',
    'finder.desc': 'Pau dwuma a wowɔ wɔ wiemhyɛn gyinabea ha na hunu mmoa pɔtee a yɛde ma wo.',
    'finder.step1': 'Fasuo 1: Pau Wo Gyinabea',
    'finder.pax': 'Okwantuni',
    'finder.paxDesc': 'Woretu kwan wɔ Kotoka Terminal 3',
    'finder.airline': 'Wiemhyɛn Kuw',
    'finder.airlineDesc': 'Wiemhyɛn a ɛba daa anaa charter',
    'finder.cargo': 'Nnoɔma Somafoɔ',
    'finder.cargoDesc': 'Nnoɔma fret, awɔnwɔnbea anaa nnuane',
    'finder.corp': 'Adwumakuo & VIP',
    'finder.corpDesc': 'Wiemhyɛn akɛseɛ, ahomegyebea pa',
    'finder.jobs': 'Adwuma Hwehwɛfoɔ / NSS',
    'finder.jobsDesc': 'Wiemhyɛn adwuma ne nteteeɛ',
    'finder.agency': 'Akwantuo & Nkitahodi',
    'finder.agencyDesc': 'GSA, nnoɔma fret dwumayɛfoɔ',

    // Baggage Tracker
    'baggage.badge': 'Kotoka Amansan Gyinabea Terminal 3 · SITA BRS',
    'baggage.title': 'Hwehwɛ Me Kotokuo · Mfididwuma Pa',
    'baggage.deskInfo': 'Kotokuo Dwumayɛbea wɔ Carousel 2 Nkyɛn wɔ Baabi a Wɔsi Fɔm · Frɛ: +233 (0) 544 33 4022',
    'baggage.inputPlaceholder': 'e.g. ACC-782910 anaa EK-451902',
    'baggage.trackBtn': 'Hwehwɛ Kotokuo',
    'baggage.samplePrompt': 'Sɔ nɔmba ahodoɔ yi hwɛ:',
    'baggage.fileClaimBtn': 'Fa Amanneɛbɔ Kɔ',
    'baggage.notFoundTitle': 'Yɛanhu Kotokuo Nkrataa Biara',
    'baggage.notFoundDesc': 'Tag nɔmba no nni yɛn nkrataa mu seesei. Kɔ Aviance Kotokuo Dwumayɛbea wɔ Terminal 3.',

    // Search Modal
    'search.placeholder': 'Hwehwɛ ndwuma, nkrataa, gyinabea, adwumayɛfoɔ anaa wiemhyɛn...',
    'search.categoriesAll': 'Nyinaa',
    'search.categoriesServices': 'Ndwuma',
    'search.categoriesDocs': 'Nkrataa',
    'search.categoriesCareers': 'Adwuma',
    'search.categoriesFaqs': 'Nsɛmmisa',
    'search.categoriesStations': 'Gyinabea',
    'search.categoriesTeam': 'Akandifoɔ',
    'search.recent': 'Nea Wahwehwɛ Nnansa Yi',
    'search.noResults': 'Yɛanhu hwee a ɛne yi hyia:',
    'search.esc': 'ESC ma ɛnto mu',

    // Station Network
    'map.operationalCoverage': 'Dwumadie a Ɛkɔ So Wɔ Ghana Baabiara',
    'map.stationProfile': 'Gyinabea Ho Nsɛm & Ahoɔden',
    'map.operatingHours': 'Adwumayɛ Dɔnhwerew',
    'map.runway': 'Wiemhyɛn Kwan Nhyehyɛeɛ',
    'map.handlingCap': 'Dwumadie a Yɛtumi Yɛ',
    'map.contactDispatch': 'Frɛ Gyinabea Panyin',

    // Footer Extra
    'footer.paxHandling': 'Akwantufoɔ Sombea & PRM',
    'footer.rampTurnaround': 'Wiemhyɛn Ramp Nsakraeɛ',
    'footer.cargoVillage': 'Nnoɔma Wiemhyɛn Bea (RA3)',
    'footer.vipCharter': 'Aviance VIP & Akwammisa',
    'footer.adinkraLounge': 'Adinkra Ahomegyebea (T3)',
    'footer.baggageDesk': 'Kotokuo & WorldTracer',
    'footer.findMyBag': 'Hwehwɛ Me Kotokuo Bea',
    'footer.aboutAviance': 'Aviance Ghana Ho Asɛm',
    'footer.opHubs': 'Gyinabea Ahodoɔ (ACC·KMS·TML)',
    'footer.leadership': 'Akandifoɔ Panyin',
    'footer.safetyCerts': 'Bammbɔ, Tumikrataa & Mmara',
    'footer.newsPress': 'Amanneɛbɔ & Nsɛm Foforɔ',
    'footer.careersNss': 'Adwuma & National Service',
    'footer.codeOfConduct': 'Adwumakuo Mmara & Suban',
    'footer.docCentre': 'Nkrataa Bea Kɛseɛ',
    'footer.airlinePortal': 'Wiemhyɛnfoɔ Bea',
    'footer.helpFaqs': 'Mmoa & Nsɛmmisa',
    'footer.headOffice': 'Adwumakuo Panyin Nkitahodi',
    'footer.hours': 'Adwumayɛ: Ɛdwoada–Efiada 08:00–17:00 · Wiemhyɛn Dɔnhwerew 24/7',
    'footer.privacy': 'Kokoamsɛm Mmara',
    'footer.terms': 'Dwumadie Mmara',

    // Mobile Drawer Extra
    'drawer.operationsHubs': 'Dwumayɛbea & Gyinabea',
    'drawer.companyResources': 'Adwumakuo & Nhyehyɛeɛ',
    'drawer.leadership': 'Akandifoɔ',
    'drawer.allNews': 'Amanneɛbɔ',
    'drawer.adminPortal': 'Adwumayɛfoɔ Panyin Portal',

    // Pages - Services Directory
    'pages.services.kicker': 'Wiemhyɛn Sombea Nhyehyɛeɛ',
    'pages.services.title': 'Wiemhyɛn Sombea a Ɛdi Mu Nyinaa',
    'pages.services.desc': 'Yɛyɛ adwuma wɔ Kotoka Amansan Wiemhyɛn Gyinabea (ACC), Prempeh I Kumasi (KMS), ne Tamale (TML), de bammbɔ, ntɛmntɛmyɛ, ne akwantufoɔ akwaaba pa ma.',
    'pages.services.filterPlaceholder': 'Hwehwɛ sombea ahodoɔ...',
    'pages.services.all': 'Nyinaa',

    // Pages - About Us
    'pages.about.kicker': 'Adwumakuo Ho Asɛm',
    'pages.about.title': 'Aviance Ghana Limited Ho Asɛm',
    'pages.about.desc': 'Ghana wiemhyɛn asase so dwumayɛbea nnyinasoɔ. Yɛka Atɔeɛ Afrika bom kɔ wiase nyinaa denam bammbɔ, nokwareyɛ, ne Ghanafoɔ ahohoyerɛ so.',
    'pages.about.heritageKicker': 'Yɛn Abakɔsɛm & Ahyɛdeɛ',
    'pages.about.heritageTitle': 'Akandifoɔ wɔ Wiemhyɛn Sombea Gyinapɛn mu wɔ Atɔeɛ Afrika',
    'pages.about.heritageP1': 'Aviance Ghana Limited yɛ adwumakuo a Ghana Wiemhyɛn Mmara Ahemfie (GCAA) ama wɔn tumi. Yɛwɔ Kotoka Amansan Gyinabea wɔ Nkran, ne Kumasi ne Tamale, yɛsom wiemhyɛn akɛseɛ ne nnoɔma soasoafoɔ nyinaa.',
    'pages.about.heritageP2': 'Yɛde IATA ISAGO bammbɔ mmara to yɛn anim, tete yɛn adwumayɛfoɔ daa, na yɛtɔ mfiri foforɔ de hwɛ ma wiemhyɛn tu kɔ berɛ ano pɛpɛɛpɛ a asiane biara nni ho.',
    'pages.about.meetLeadership': 'Hunu Yɛn Akandifoɔ Panyin',
    'pages.about.pillarsTitle': 'Yɛn Nhyehyɛeɛ Dum Titiriw',

    // Pages - Contact Us
    'pages.contact.kicker': 'Gyinabea Ahodoɔ & Nkitahodi',
    'pages.contact.title': 'Frɛ Aviance Ghana',
    'pages.contact.desc': 'Kasa kyerɛ gyinabea so ahwɛfoɔ, nnoɔma ho adwumayɛfoɔ, wiemhyɛn dwumayɛbea, ne mpanyimfoɔ wɔ Nkran, Kumasi, ne Tamale.',
    'pages.contact.formTitle': 'Fa Wo Dwumadie anaa Asem Kɔ',
    'pages.contact.formSubtitle': 'Nkrataa kɔ ntɛm kɔma gyinabea ahwɛfoɔ ne nnoɔma dwumayɛfoɔ seesei ara.',
    'pages.contact.name': 'Wo Din Nyinaa',
    'pages.contact.email': 'Wo Adwuma Email',
    'pages.contact.phone': 'Telefon Nɔma',
    'pages.contact.org': 'Wiemhyɛn Kuw / Adwumakuo',
    'pages.contact.category': 'Nsɛm Kuw',
    'pages.contact.subject': 'Asɛm Ti / Wiemhyɛn Nɔma',
    'pages.contact.message': 'Asɛm a Ɛfa Ho Nyinaa',
    'pages.contact.sendBtn': 'Soma Krataa No Seesei',
    'pages.contact.successTitle': 'Krataa No Akɔ Yie Pa Ara',
    'pages.contact.successMsg': 'Yɛagye wo krataa no wɔ yɛn dwumayɛbea afiri mu. Panyin bi bɛbua wo ntɛm ara.',
    'pages.contact.submitAnother': 'Soma Krataa Foforɔ',

    // Pages - Cargo Terminal
    'pages.cargo.kicker': 'EU RA3 Agyapadeɛ & Nnoɔma Awɔ Bea',
    'pages.cargo.title': 'Aviance Nnoɔma Kuro (Air Cargo Village)',
    'pages.cargo.desc': 'Nnoɔma bammbɔ ne nnuru a ɛhia awɔ bea pa wɔ Kotoka Amansan Gyinabea.',

    // Pages - FAQs
    'pages.faqs.kicker': 'Nimdeɛ Bea & Nsɛmmisa',
    'pages.faqs.title': 'Nsɛmmisa a Wɔtaa Bisa Mpɛn Pii',
    'pages.faqs.desc': 'Mmuaeɛ pa ma akwantufoɔ kwan, kotokuo hwehwɛbea, nnoɔma tow, ne wiemhyɛn asase so sombea.',

    // Pages - Lounge
    'pages.lounge.kicker': 'Terminal 3 Akwantufoɔ Ahomegyebea',
    'pages.lounge.title': 'Adinkra Ahomegyebea Kɛseɛ',
    'pages.lounge.desc': 'Nya ahomegye pa ansa na woatu kwan. Aduane pa, aguarebea, ne intanɛt ntɛmntɛm.',
    'pages.lounge.bookBtn': 'Gye Ahomegyebea Tumikrataa',
    'pages.lounge.hotline': 'VIP Protocol & Wiemhyɛn Hotline (+233 (0) 59 381 6076)',
    'pages.lounge.amenitiesKicker': 'Terminal 3 Ahoɔfɛ & Ahomegye',
    'pages.lounge.amenitiesTitle': 'Adinkra Ahomegyebea Nnoɔma',
    'pages.lounge.vipKicker': 'Diplomatic Ahobammbɔ',
    'pages.lounge.vipTitle': 'Aviance VIP & Wiemhyɛn a Wɔabɔ Ho Paa Dwuma',
    'pages.lounge.vipDesc': 'Kar fɛfɛ wɔ wiemhyɛn gyinabea, kwan pa ma akandifoɔ ne customs nkabom ntɛmntɛm.',

    // Pages - Careers
    'pages.careers.kicker': 'Wiemhyɛn Nyansa & Nnwuma',
    'pages.careers.title': 'Si Wo Nnwuma wɔ Wiemhyɛn Mu',
    'pages.careers.desc': 'Ka mmarima ne mmaa a wɔbɔ mmɔden wɔ Ghana wiemhyɛn mu ho. Firi ramp handling kɔsi cargo ne akwantufoɔ anim.',
    'pages.careers.all': 'Adwuma Nyinaa',
    'pages.careers.fullTime': 'Bere Nyinaa',
    'pages.careers.nss': 'Ɔman Som (NSS)',
    'pages.careers.activeCount': 'Nnwuma a Ɛwɔ Hɔ Seesei',
    'pages.careers.applyBtn': 'Pɛ Adwuma Yi',

    // Pages - Cargo Details
    'pages.cargo.submitBtn': 'Bisa Nnoɔma Ho Asɛm',
    'pages.cargo.hotline': 'Cargo Adwumayɛbea (+233 (0) 59 381 6076)',
    'pages.cargo.coldChainTitle': 'Awɔ Dan & Nnuaba',
    'pages.cargo.coldChainDesc': 'Awɔ dan 450m³ a ɛyɛ +2°C kɔsi +8°C ma nnuru ne nnuaba, ne -20°C ma nsuom nnoɔma.',
    'pages.cargo.ra3Title': 'EU RA3 Bammbɔ Nhwehwɛmu',
    'pages.cargo.ra3Desc': 'RA3 bammbɔ a wɔagye atom. X-ray nhwehwɛmu a emu yɛ den ne bammbɔfoɔ a wɔka nnoɔma ho.',
    'pages.cargo.dgTitle': 'Nnoɔma a Asiane Wɔ Ho (IATA DGR)',
    'pages.cargo.dgDesc': 'Adwumayɛfoɔ a wɔatete wɔn ma nnoɔma a asiane wɔ ho, dry ice, ne batere ahodoɔ.',

    // Pages - Baggage / Find My Bag
    'pages.baggage.kicker': 'Kotoka Amansan Gyinabea Terminal 3 · Kotokuo Dwumayɛbea',
    'pages.baggage.title': 'Hwehwɛ Me Kotokuo · Ntɛmntɛm Nhwehwɛmu',
    'pages.baggage.desc': 'Nkabom kɔ Aviance Ghana Kotokuo Adwumayɛbea ne IATA WorldTracer. Hwehwɛ kotokuo a akyɛ.',
    'pages.baggage.fileClaim': 'Bɔ Kotokuo a Akyɛ Ho Amanneɛ',
    'pages.baggage.claimHeading': 'Kyerɛw Kotokuo Ho Amanneɛbɔ',
    'pages.baggage.claimDesc': 'Yɛn adwumayɛfoɔ wɔ Terminal 3 dɔnhwerew 24/7. Fa wo nkrataa kɔ ma yɛnhwehwɛ ntɛmntɛm.',

    // Pages - Contact Extra
    'pages.contact.hoursTitle': 'Adwumayɛ Dɔnhwerew',
    'pages.contact.hoursVal': 'Dɔnhwerew 24 / Nna 7 (Wiemhyɛn Dwuma)',
    'pages.contact.stationContactsTitle': 'Gyinabea & Dispatch Nkrataabeahodoɔ',

    // Common Buttons & Labels
    'common.fullSpecs': 'Dwumadie Nkyerɛkyerɛmu',
    'common.quoteCargo': 'Bisa Nnoɔma Boɔ',
    'common.requestAccess': 'Srɛ Kwan',
    'common.callDesk': 'Frɛ Adwumayɛbea',

    // Finder & Map extra keys
    'finder.step2': 'Fa 2 · Akwan a Wɔkamfo Kyerɛ',
    'finder.step2Desc': 'Ndwuma a wɔayɛ ama wo titiriw sɛnea wo profile teɛ.',
    'map.physicalStation': 'Gyinabea Ankasa',
    'map.opsHours': 'Wiemhyɛn Adwumayɛ Dɔnhwerew',
    'map.stationContact': 'Gyinabea Telefon',
    'map.dispatchEmail': 'Dispatch Email',
    'map.op247': 'Yɛyɛ Adwuma Dɔnhwerew 24/7',
  },

  fr: {
    // Top Telemetry Bar
    'telemetry.station': "ACC · Kotoka Int'l",
    'telemetry.terminal': 'Terminal 3 (DGAA)',
    'telemetry.isago': 'Homologué ISAGO',
    'telemetry.gcaa': 'Opérateur Agréé GCAA',
    'telemetry.occ': 'OCC 24h/7j :',
    'telemetry.portal': 'Portail Compagnies',
    'telemetry.tracing': 'Suivi Bagages',

    // Navigation
    'nav.services': 'Services',
    'nav.flightOps': 'Opérations de Vol',
    'nav.cargo': 'Fret Aérien',
    'nav.findMyBag': 'Suivre Mes Bagages',
    'nav.lounge': 'Salon Adinkra',
    'nav.safety': 'Sécurité & Normes',
    'nav.careers': 'Carrières',
    'nav.more': 'Plus',
    'nav.about': "À Propos d'Aviance",
    'nav.management': 'Direction Générale',
    'nav.documents': 'Centre Documentaire',
    'nav.faqs': 'FAQ Opérationnelle',
    'nav.contact': 'Contacts & Stations',
    'nav.requestHandling': "Demande d'Assistance",
    'nav.admin': 'Portail Admin',
    'nav.search': 'Rechercher',
    'nav.themeLight': 'Clair',
    'nav.themeNavy': 'Marine',
    'nav.menu': 'Menu',
    'nav.close': 'Fermer',
    'nav.completeDirectory': 'Répertoire Complet',
    'nav.servicesTitle': "Assistance en Escale & Services Aéroportuaires",

    // Hero Section
    'hero.kicker': 'Aviance Ghana Limited · Fondé en 1994',
    'hero.stations': 'Accra (KIA) · Kumasi · Tamale',
    'hero.title1': 'Assistance en Escale.',
    'hero.title2': 'Élevée à la Précision.',
    'hero.subtitle':
      "Fournisseur complet d'assistance aéroportuaire en escale certifié par IATA ISAGO et l'Autorité de l'Aviation Civile du Ghana (GCAA). Services passagers, assistance en piste, fret sécurisé RA3 et salons VIP exécutifs.",
    'hero.badgeTitle': 'Identité Officielle :',
    'hero.badgeDesc':
      "Plateforme numérique synchronisée avec les opérations certifiées d'Aviance Ghana, les normes IATA ISAGO et la réglementation GCAA.",
    'hero.exploreBtn': 'Explorer les Services Aériens',
    'hero.baggageBtn': 'Suivre Mon Bagage',
    'hero.cargoBtn': 'Terminal Fret (RA3)',

    // Services Mega Menu
    'services.passenger.title': 'Services Passagers',
    'services.passenger.desc': "Enregistrement DCS, embarquement & assistance PMR",
    'services.ramp.title': 'Assistance en Piste',
    'services.ramp.desc': 'Rotation aéronef, GPU 400Hz & repoussage',
    'services.cargo.title': 'Terminal Fret Aérien',
    'services.cargo.desc': 'Entrepôt certifié UE RA3 & chaîne du froid',
    'services.vip.title': 'Services VIP & Vols Spéciaux',
    'services.vip.desc': 'Accueil protocolaire, salon d’honneur & escale privée',
    'services.lounge.title': 'Salon Exécutif Adinkra (T3)',
    'services.lounge.desc': 'Hospitalité de prestige au Terminal 3',
    'services.baggage.title': 'Services Bagages',
    'services.baggage.desc': 'Rapprochement BRS & comptoir WorldTracer',
    'services.gse.title': 'Maintenance des Équipements GSE',
    'services.gse.desc': 'Atelier côté piste & entretien des engins tracteurs',
    'services.training.title': 'Formation Opérationnelle',
    'services.training.desc': 'Sécurité en piste, matières dangereuses (DGR) & IATA',
    'services.occ.title': 'CCO - Centre de Contrôle Opérationnel',
    'services.occ.desc': 'Coordination des mouvements de vols 24h/24 et 7j/7',

    // Stats Section
    'stats.turnaround': 'Fiabilité de Rotation',
    'stats.turnaroundSub': 'Ponctualité au repoussage garantie',
    'stats.cargo': 'Tonnage Annuel de Fret',
    'stats.cargoSub': 'Cargaison sécurisée certifiée RA3',
    'stats.safety': 'Score d’Audit ISAGO',
    'stats.safetySub': 'Zéro non-conformité majeure en piste',
    'stats.established': 'Années d’Excellence Aéronautique',
    'stats.establishedSub': 'Au service du ciel ghanéen depuis 1994',

    // Core Features
    'features.turnaroundTitle': 'La Rotation Avion en 50 Minutes Chrono',
    'features.turnaroundSubtitle':
      "Du poser des roues au décollage, chaque seconde est orchestrée selon les standards stricts de l'IATA ISAGO par les équipes d'Aviance.",
    'features.finderTitle': 'Trouvez la Solution d’Assistance pour Vos Vols',
    'features.finderSubtitle':
      'Sélectionnez le type d’aéronef et l’escale pour découvrir nos capacités matérielles, SLAs et équipements spécialisés.',
    'features.baggageTitle': 'Suivre Mon Bagage · Traçabilité Automatisée',
    'features.baggageSubtitle':
      'Comptoir de rapprochement bagages situé au hall des arrivées du Terminal 3 de Kotoka.',
    'features.mapTitle': 'Réseau d’Escales Aviance au Ghana',
    'features.mapSubtitle':
      'Trois escales certifiées assurant des prestations standardisées en piste, passagers et fret.',

    // Footer
    'footer.companyDesc':
      "Fondée en 1994, Aviance Ghana est l’opérateur leader d’assistance aéroportuaire à l'Aéroport International de Kotoka (Accra), Kumasi et Tamale. Certifié IATA ISAGO, UE RA3, avec salon VIP exécutif.",
    'footer.certTitle': 'Certifications & Agréments Officiels',
    'footer.aviationServices': 'Prestations Aéronautiques',
    'footer.corporateLinks': 'Gouvernance & Documents',
    'footer.operationalStations': 'Escales Opérationnelles',
    'footer.copyright': 'Tous droits réservés. Aviance Ghana Limited. Régulé par la GCAA et IATA ISAGO.',

    // Common
    'common.readMore': 'En savoir plus',
    'common.viewDetails': 'Voir les détails',
    'common.contactUs': 'Contacter le CCO',
    'common.switchLanguage': 'Choisir la langue',
    'common.close': 'Fermer',

    // Station Trust Markers
    'hero.trustAcc': 'ACC · Kotoka T3 & Terminal Fret',
    'hero.trustKms': 'KMS · Aéroport Prempeh I Kumasi',
    'hero.trustTml': 'TML · Aéroport International Tamale',

    // Stats Section
    'stats.keyFactsTitle': 'Performances Opérationnelles & Références Escale',
    'stats.verified': 'OFFICIELLEMENT VÉRIFIÉ',
    'stats.stationsLabel': 'Escales Internationales',
    'stats.stationsDesc': 'Accra (Kotoka T3), Kumasi & Tamale',
    'stats.auditLabel': 'Conformité d’Audit ISAGO',
    'stats.auditDesc': 'Standard IATA Ground Operations Manual',
    'stats.workforceLabel': 'Professionnels de l’Aérien',
    'stats.workforceDesc': 'Personnel piste, passagers, fret et technique',
    'stats.watchLabel': 'Veille Piste Active 24/7',
    'stats.watchDesc': 'Rotations continues & dédouanement de fret',

    // Core Bento Services
    'bento.kicker': 'Capacités Opérationnelles Globales',
    'bento.title': 'Solutions Complètes d’Assistance en Escale',
    'bento.viewAll': 'Tous les Services Opérationnels',
    'bento.rampPill': '01 · Assistance en Piste & Rotation',
    'bento.rampCert': 'Certifié Gros & Moyen-Courriers',
    'bento.rampTitle': 'Rotation Aéronef & Repoussage Tracté GSE',
    'bento.rampDesc': 'Assistance airside intégrale sous normes IATA ISAGO. Tracteurs pushback sans barre, Groupes de Puissance (GPU 400Hz), démarreurs d’air, tapis à bagages et vidange/eau potable.',
    'bento.rampAction': 'Voir le Protocole Piste',
    'bento.cargoPill': '02 · Fret Aérien',
    'bento.cargoTitle': 'Terminal de Fret Aviance & Chaîne du Froid',
    'bento.cargoDesc': 'Logistique de fret aérien certifiée UE RA3 avec chambres froides pharmaceutiques et périssables monitorées (+2°C à +8°C).',
    'bento.cargoSpecs': 'Spécifications Fret',
    'bento.cargoQuote': 'Tarifs Fret',
    'bento.vipPill': '03 · Hospitalité VIP',
    'bento.vipTitle': 'Salon Exécutif Adinkra',
    'bento.vipDesc': 'Le salon d’honneur de référence au Terminal 3 de Kotoka. Wi-Fi haut débit, restauration gastronomique, douches privées et espaces affaires.',
    'bento.vipAmenities': 'Prestations du Salon',
    'bento.vipBook': 'Réserver l’Accès',
    'bento.paxPill': '04 · Accueil & Passagers',
    'bento.paxTitle': 'Enregistrement, Embarquement & Assistance PMR',
    'bento.paxDesc': 'Agents certifiés DCS pour l’enregistrement, contrôle biométrique d’embarquement, correspondances et ambulifts PMR.',
    'bento.paxDetails': 'Détails Services Passagers',

    // National Map
    'map.kicker': 'Réseau National',
    'map.title': 'Présence Stratégique sur les Aérodromes du Ghana',
    'map.desc': 'Cliquez sur une escale pour consulter les capacités d’assistance, les horaires et les contacts du régulateur.',

    // Safety & Governance
    'certs.kicker': 'Gouvernance & Sécurité',
    'certs.title': 'Normes Opérationnelles Auditées Internationalement',
    'certs.viewAll': 'Voir Tous les Certificats',
    'certs.active': 'Actif',

    // Customer Airlines
    'customers.kicker': 'Compagnies Clientes Officielles',
    'customers.title': 'Transporteurs Traités au Ghana',
    'customers.desc': 'Compagnies aériennes et alliances mondiales bénéficiant de l’assistance escale certifiée Aviance Ghana.',

    // Latest News
    'news.kicker': 'Bulletins d’Entreprise',
    'news.title': 'Dernières Actualités & Mises à Jour',
    'news.allPress': 'Tous les Communiqués',
    'news.read': 'Lire l’Article',
    'news.minRead': 'min de lecture',

    // Final CTA
    'cta.title': 'Associez-vous au Leader de l’Assistance au Ghana',
    'cta.desc': 'Que vous programmiez de nouvelles liaisons vers Kotoka Terminal 3, un vol cargo ou un vol d’affaires, Aviance Ghana garantit l’excellence opérationnelle.',
    'cta.contact': 'Contacter le Siège',
    'cta.vip': 'Demande VIP / Vol Spécial',

    // Quick Actions Menu
    'qa.badge': 'Portail Libre-Service Immédiat',
    'qa.badgeSub': 'Actions Rapides Contextuelles',
    'qa.title': 'Actions Rapides Aéroport',
    'qa.desc': 'Déclarez un bagage retardé, suivez une lettre de transport aérien, réservez le salon VIP ou joignez le régulateur d’escale en quelques secondes.',
    'qa.searchPlaceholder': 'Rechercher une action (bagage, fret, salon)...',
    'qa.whoAmI': 'Je suis :',
    'qa.tabAll': 'Toutes les Tâches',
    'qa.tabPassenger': 'Passager / Voyageur',
    'qa.tabCargo': 'Expéditeur / Transitaire Fret',
    'qa.tabAirline': 'Compagnie / Opérateur Vol',
    'qa.tabCareers': 'Candidat / Programme NSS',
    'qa.liveStatus': '24h/24 ACTIF',
    'qa.lostLuggage.title': 'Déclarer un Bagage Perdu',
    'qa.lostLuggage.badge': 'SUIVI URGENT',
    'qa.lostLuggage.desc': 'Soumettez une réclamation immédiate pour bagage retardé au bureau du Terminal 3 de Kotoka.',
    'qa.cargoStatus.title': 'Statut du Fret Aérien',
    'qa.cargoStatus.badge': 'SUIVI AWB DIRECT',
    'qa.cargoStatus.desc': 'Suivez les lettres de transport aérien LTA, vérifiez les températures des chambres froides et le dédouanement.',
    'qa.findMyBag.title': 'Suivre Mon Bagage (Tag BRS)',
    'qa.findMyBag.badge': 'BRS EN DIRECT',
    'qa.findMyBag.desc': 'Consultez le code-barres de votre étiquette bagage dans le système de rapprochement BRS.',
    'qa.reserveLounge.title': 'Réservation Salon Adinkra',
    'qa.reserveLounge.badge': 'CONFORT VIP',
    'qa.reserveLounge.desc': 'Réservez vos accès salon, douches privatives, Wi-Fi très haut débit et buffets au Terminal 3.',
    'qa.cargoEnquiry.title': 'Tarifs Fret & Chaîne du Froid',
    'qa.cargoEnquiry.badge': 'UE RA3',
    'qa.cargoEnquiry.desc': 'Demandez un espace en chambre froide (+2°C à +8°C) ou un devis pour matières dangereuses DGR.',
    'qa.rampTurnaround.title': 'Contrat SGHA & Assistance Piste',
    'qa.rampTurnaround.badge': 'HOMOLOGUÉ ISAGO',
    'qa.rampTurnaround.desc': 'Sollicitez un contrat d\'assistance SGHA ou des moyens de repoussage et matériel de piste.',
    'qa.careersNss.title': 'Carrières & Programme National NSS',
    'qa.careersNss.badge': 'RECRUTEMENT',
    'qa.careersNss.desc': 'Postulez aux offres côté piste ou au programme national de stage NSS du Ghana.',
    'qa.dutyHotline.title': 'Permanence d\'Exploitation 24/7',
    'qa.dutyHotline.badge': 'CCO PISTE',
    'qa.dutyHotline.desc': 'Ligne directe avec le superviseur d\'escale pour les déroutements, pushback et urgences piste.',
    'qa.act.claim': 'Déclarer une Réclamation',
    'qa.act.track': 'Suivre la LTA',
    'qa.act.openPortal': 'Ouvrir le Portail',
    'qa.act.quote': 'Demander un Devis',
    'qa.act.reserve': 'Réserver un Pass',
    'qa.act.call': 'Appeler la Ligne',
    'qa.resetSearch': 'Réinitialiser les Filtres',
    'qa.noMatch': 'Aucune tâche ne correspond à votre recherche',
    'qa.noMatchDesc': 'Essayez de rechercher "bagage", "fret", "salon" ou réinitialisez vos filtres.',

    // Turnaround Timeline
    'timeline.kicker': 'Précision & Ponctualité de Rotation',
    'timeline.title': 'La Rotation Avion en 50 Minutes Chrono',
    'timeline.subtitle': 'De l’atterrissage au décollage, chaque seconde est orchestrée sous le contrôle rigoureux IATA ISAGO par les équipes Aviance.',
    'timeline.safetyVerif': 'Vérifications de Sécurité Obligatoires',
    'timeline.seqControls': 'Contrôle de Séquence',
    'timeline.prev': 'Phase Précédente',
    'timeline.next': 'Phase Suivante',
    'timeline.directive': 'Conforme aux Directives IATA AHM 900 & GCAA',
    'timeline.phase': 'Phase',
    'timeline.step1.title': 'Arrivée Aéronef & Guidage en Piste',
    'timeline.step1.desc': 'L\'aéronef atterrit à Kotoka International. Le placeur certifié guide l\'avion au poste avec balises lumineuses. Calage des roues et cônes de sécurité positionnés.',
    'timeline.step2.title': 'Raccordement GPU & Débarquement Passagers',
    'timeline.step2.desc': 'Groupe électrogène de piste GPU (400Hz) raccordé. Passerelle ou escabeau motorisé en place. Débarquement avec assistance PMR ambulift.',
    'timeline.step3.title': 'Déchargement des Soutes Bagages & Fret',
    'timeline.step3.desc': 'Tapis motorisés et chargeurs gros-porteurs interfacés aux soutes. Conteneurs ULD et bagages vrac acheminés rapidement vers le tri et le Terminal Fret.',
    'timeline.step4.title': 'Nettoyage Cabine, Eau Potable & Plein Carburant',
    'timeline.step4.desc': 'Service d\'eau potable et vidange des toilettes sous règles sanitaires strictes. Réapprovisionnement catering et avitaillement sous surveillance anti-incendie.',
    'timeline.step5.title': 'Embarquement DCS & Chargement Bagages BRS',
    'timeline.step5.desc': 'Embarquement traité via DCS aux portes du Terminal 3. Rapprochement 100% BRS garantissant la conformité de chaque bagage. Devis de masse signé par le commandant.',
    'timeline.step6.title': 'Repoussage Sans Barre & Démarrage Moteurs',
    'timeline.step6.desc': 'Agent casque relié au poste de pilotage. Tracteur lourd sans barre connecté au train avant. Autorisation ATC reçue, repoussage exécuté en toute sécurité.',

    // Smart Service Finder
    'finder.kicker': 'Découverte Intelligente des Prestations',
    'finder.title': 'Comment Aviance Ghana peut vous assister aujourd\'hui ?',
    'finder.desc': 'Sélectionnez votre profil voyageur ou compagnie pour afficher immédiatement les solutions sur mesure.',
    'finder.step1': 'Étape 1 : Choisissez Votre Profil',
    'finder.pax': 'Passager',
    'finder.paxDesc': 'Voyageant via le Terminal 3 de Kotoka',
    'finder.airline': 'Compagnie Aérienne',
    'finder.airlineDesc': 'Vols réguliers ou affrètement spécial',
    'finder.cargo': 'Client Fret Aérien',
    'finder.cargoDesc': 'Fret aérien, chaîne du froid et périssables',
    'finder.corp': 'Aviation d\'Affaires & VIP',
    'finder.corpDesc': 'Aviation exécutive, protocole & salon',
    'finder.jobs': 'Candidat / Programme NSS',
    'finder.jobsDesc': 'Métiers de l\'aérien & stages d\'études',
    'finder.agency': 'Agences de Voyages & Transit',
    'finder.agencyDesc': 'GSA, transitaires et agences agréées',

    // Baggage Tracker
    'baggage.badge': 'Aéroport International de Kotoka Terminal 3 · SITA BRS',
    'baggage.title': 'Suivre Mon Bagage · Traçabilité Automatisée',
    'baggage.deskInfo': 'Bureau des litiges bagages situé à côté du tapis 2 en salle des arrivées · Tél : +233 (0) 544 33 4022',
    'baggage.inputPlaceholder': 'ex. ACC-782910 ou EK-451902',
    'baggage.trackBtn': 'Rechercher',
    'baggage.samplePrompt': 'Numéros d\'étiquettes de démonstration :',
    'baggage.fileClaimBtn': 'Déclarer un Litige Bagage',
    'baggage.notFoundTitle': 'Aucun Bagage Trouvé',
    'baggage.notFoundDesc': 'Ce numéro de bagage ne correspond à aucun dossier actif. Rendez-vous au comptoir Aviance du Terminal 3.',

    // Search Modal
    'search.placeholder': 'Rechercher prestations, documents, escales, équipes...',
    'search.categoriesAll': 'Tout',
    'search.categoriesServices': 'Services',
    'search.categoriesDocs': 'Documents',
    'search.categoriesCareers': 'Carrières',
    'search.categoriesFaqs': 'FAQ',
    'search.categoriesStations': 'Escales',
    'search.categoriesTeam': 'Direction',
    'search.recent': 'Recherches Récentes',
    'search.noResults': 'Aucun résultat pour',
    'search.esc': 'ÉCHAP pour fermer',

    // Station Network
    'map.operationalCoverage': 'Couverture Opérationnelle au Ghana',
    'map.stationProfile': 'Fiche d\'Escale & Capacités',
    'map.operatingHours': 'Horaires d\'Exploitation',
    'map.runway': 'Spécifications de Piste',
    'map.handlingCap': 'Capacités de Traitement',
    'map.contactDispatch': 'Contacter le Régulateur d\'Escale',

    // Footer Extra
    'footer.paxHandling': 'Assistance Passagers & PMR',
    'footer.rampTurnaround': 'Rotation Avion en Piste',
    'footer.cargoVillage': 'Terminal Fret Aérien (RA3)',
    'footer.vipCharter': 'Aviance VIP & Vols Affrétés',
    'footer.adinkraLounge': 'Salon Exécutif Adinkra (T3)',
    'footer.baggageDesk': 'Service Bagages & Litiges',
    'footer.findMyBag': 'Portail Suivi Bagages',
    'footer.aboutAviance': 'À Propos d\'Aviance Ghana',
    'footer.opHubs': 'Escales Opérationnelles (ACC·KMS·TML)',
    'footer.leadership': 'Direction Générale',
    'footer.safetyCerts': 'Sécurité, Agréments & Normes',
    'footer.newsPress': 'Actualités & Communiqués',
    'footer.careersNss': 'Carrières & Stage NSS',
    'footer.codeOfConduct': 'Code de Conduite Entreprise',
    'footer.docCentre': 'Centre Documentaire Numérique',
    'footer.airlinePortal': 'Portail Compagnies Aériennes',
    'footer.helpFaqs': 'Aide & FAQ',
    'footer.headOffice': 'Contact Siège Social',
    'footer.hours': 'Bureaux : Lun–Ven 08h–17h · Piste 24h/7j',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions d\'Utilisation',

    // Mobile Drawer Extra
    'drawer.operationsHubs': 'Opérations & Escales',
    'drawer.companyResources': 'Entreprise & Ressources',
    'drawer.leadership': 'Direction Générale',
    'drawer.allNews': 'Actualités',
    'drawer.adminPortal': 'Portail Admin & CMS',

    // Pages - Services Directory
    'pages.services.kicker': 'Répertoire des Services d\'Assistance',
    'pages.services.title': 'Assistance en Escale Complète & Certifiée',
    'pages.services.desc': 'Présent sur l\'Aéroport International de Kotoka (ACC), Kumasi Prempeh I (KMS) et Tamale (TML), Aviance garantit une sécurité optimale, des rotations ponctuelles et un accueil passagers irréprochable.',
    'pages.services.filterPlaceholder': 'Filtrer les services...',
    'pages.services.all': 'Tous',

    // Pages - About Us
    'pages.about.kicker': 'Présentation Générale',
    'pages.about.title': 'À Propos d\'Aviance Ghana Limited',
    'pages.about.desc': 'Le pilier de l\'assistance aéroportuaire en escale au Ghana. Connecter l\'Afrique de l\'Ouest au monde entier avec rigueur, sécurité certifiée et hospitalité ghanéenne.',
    'pages.about.heritageKicker': 'Notre Histoire & Notre Mission',
    'pages.about.heritageTitle': 'Pionnier des Standards d\'Assistance en Piste en Afrique de l\'Ouest',
    'pages.about.heritageP1': 'Aviance Ghana Limited est une société agréée d\'assistance en escale (GHO) autorisée par l\'Autorité de l\'Aviation Civile du Ghana (GCAA). Basée à l\'Aéroport International de Kotoka à Accra, avec des escales actives à Kumasi et Tamale, Aviance est le partenaire de confiance des compagnies régulières, cargos et vols d\'affaires.',
    'pages.about.heritageP2': 'Grâce au respect strict des normes de sécurité IATA ISAGO, à la formation continue de notre personnel dans notre académie interne et aux investissements dans des engins de piste modernes, nous garantissons des rotations en temps voulu sans aucun compromis sur la sécurité.',
    'pages.about.meetLeadership': 'Découvrir la Direction Générale',
    'pages.about.pillarsTitle': 'Piliers Stratégiques',

    // Pages - Contact Us
    'pages.contact.kicker': 'Répertoire des Escales & Contacts',
    'pages.contact.title': 'Contacter Aviance Ghana',
    'pages.contact.desc': 'Échangez directement avec nos chefs d\'escale, commerciaux fret, régulateurs de vol et la direction générale à Accra, Kumasi et Tamale.',
    'pages.contact.formTitle': 'Envoyer une Demande Opérationnelle ou Commerciale',
    'pages.contact.formSubtitle': 'Transmission directe aux chefs d\'escale et à la coordination des opérations.',
    'pages.contact.name': 'Nom et Prénom',
    'pages.contact.email': 'Email Professionnel',
    'pages.contact.phone': 'Numéro de Téléphone',
    'pages.contact.org': 'Compagnie / Entreprise',
    'pages.contact.category': 'Catégorie de Demande',
    'pages.contact.subject': 'Objet / Indicatif de Vol',
    'pages.contact.message': 'Message Détaillé',
    'pages.contact.sendBtn': 'Envoyer la Demande Officielle',
    'pages.contact.successTitle': 'Demande Transmise avec Succès',
    'pages.contact.successMsg': 'Votre demande a été enregistrée dans nos systèmes opérationnels. Un responsable vous répondra dans les plus brefs délais.',
    'pages.contact.submitAnother': 'Envoyer une Autre Demande',

    // Pages - Cargo Terminal
    'pages.cargo.kicker': 'Terminal Fret & Chaîne du Froid Certifié UE RA3',
    'pages.cargo.title': 'Village Cargo Aérien Aviance',
    'pages.cargo.desc': 'Traitement sécurisé et sous température dirigée du fret aérien à Kotoka. Chambres froides pharmaceutiques et denrées périssables.',

    // Pages - FAQs
    'pages.faqs.kicker': 'Base de Connaissances & Questions',
    'pages.faqs.title': 'Questions Fréquentes sur l\'Assistance',
    'pages.faqs.desc': 'Réponses claires aux questions des passagers, traçabilité des bagages, tarifs fret et procédures d\'escale.',

    // Pages - Lounge
    'pages.lounge.kicker': 'Hospitalité Départs Terminal 3',
    'pages.lounge.title': 'Salon Exécutif Adinkra',
    'pages.lounge.desc': 'Profitez d\'un havre de paix avant votre vol. Buffet raffiné, douches privées, espace travail et connexion Wi-Fi haut débit.',
    'pages.lounge.bookBtn': 'Réserver un Pass Salon ou VIP',
    'pages.lounge.hotline': 'Ligne Directe VIP & Vols Privés (+233 (0) 59 381 6076)',
    'pages.lounge.amenitiesKicker': 'Luxe aux Départs Terminal 3',
    'pages.lounge.amenitiesTitle': 'Prestations du Salon Adinkra',
    'pages.lounge.vipKicker': 'Discrétion Diplomatique en Piste',
    'pages.lounge.vipTitle': 'Assistance Protocolaire VIP & Vols Privés',
    'pages.lounge.vipDesc': 'Transferts sur piste en véhicules de prestige, escorte dédiée, formalités de police et douane accélérées pour délégations et vols d\'affaires.',

    // Pages - Careers
    'pages.careers.kicker': 'Carrières & Talents Aéronautiques',
    'pages.careers.title': 'Bâtissez Votre Carrière dans l\'Aviation',
    'pages.careers.desc': 'Rejoignez les équipes professionnelles qui font battre le transport aérien ghanéen. De la piste à l\'ingénierie, en passant par l\'accueil passagers et le fret.',
    'pages.careers.all': 'Tous les Postes',
    'pages.careers.fullTime': 'Temps Plein',
    'pages.careers.nss': 'Service National (NSS)',
    'pages.careers.activeCount': 'Postes Disponibles',
    'pages.careers.applyBtn': 'Postuler à ce Poste',

    // Pages - Cargo Details
    'pages.cargo.submitBtn': 'Demander une Cotation Cargo',
    'pages.cargo.hotline': 'Bureau des Opérations Fret (+233 (0) 59 381 6076)',
    'pages.cargo.coldChainTitle': 'Chaîne du Froid & Périssables',
    'pages.cargo.coldChainDesc': 'Stockage frigorifique 450m³ sécurisé maintenant +2°C à +8°C pour produits pharmaceutiques et fruits, et congélation -20°C.',
    'pages.cargo.ra3Title': 'Sûreté & Contrôle UE RA3',
    'pages.cargo.ra3Desc': 'Infrastructure de sûreté accréditée Agent Habilité Pays Tiers (RA3). Inspection radioscopique double-vue, détection de traces d\'explosifs et escorte sécurisée.',
    'pages.cargo.dgTitle': 'Marchandises Dangereuses (IATA DGR)',
    'pages.cargo.dgDesc': 'Spécialistes certifiés IATA DGR pour matières des classes 1 à 9, réapprovisionnement en carboglace et batteries lithium.',

    // Pages - Baggage / Find My Bag
    'pages.baggage.kicker': 'Aéroport International Kotoka Terminal 3 · Litiges Bagages',
    'pages.baggage.title': 'Retrouver Mon Bagage · Suivi en Temps Réel',
    'pages.baggage.desc': 'Lien direct avec le bureau litiges bagages d\'Aviance Ghana et le réseau mondial WorldTracer de l\'IATA. Suivez vos bagages retardés et signalez un incident.',
    'pages.baggage.fileClaim': 'Déclarer un Bagage Manquant',
    'pages.baggage.claimHeading': 'Soumettre une Déclaration ou Réclamation Bagage',
    'pages.baggage.claimDesc': 'Notre équipe litiges bagages est active 24h/24 au Terminal 3. Transmettez vos coordonnées pour un traitement prioritaire.',

    // Pages - Contact Extra
    'pages.contact.hoursTitle': 'Horaires d\'Exploitation',
    'pages.contact.hoursVal': '24 Heures / 7 Jours (Opérations Aériennes)',
    'pages.contact.stationContactsTitle': 'Annuaire des Escales & Dispatch',

    // Common Buttons & Labels
    'common.fullSpecs': 'Spécifications Complètes',
    'common.quoteCargo': 'Devis Fret Aérien',
    'common.requestAccess': 'Demander l\'Accès',
    'common.callDesk': 'Appeler le Dispatch',

    // Finder & Map extra keys
    'finder.step2': 'Étape 2 · Parcours Recommandés',
    'finder.step2Desc': 'Services d\'assistance ciblés et liens d\'action prioritaires selon votre profil.',
    'map.physicalStation': 'Escale Physique',
    'map.opsHours': 'Horaires d\'Exploitation',
    'map.stationContact': 'Contact Escale',
    'map.dispatchEmail': 'Email Dispatch',
    'map.op247': 'Opérationnel 24h/24 · 7j/7',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('aviance_language');
      if (saved === 'en' || saved === 'tw' || saved === 'fr') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('aviance_language', lang);
    } catch {
      // fallback
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict[key]) {
      return langDict[key];
    }
    const enDict = TRANSLATIONS.en;
    if (enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
