import React, { useState } from 'react';
import {
  Users,
  Plane,
  PackageCheck,
  Shield,
  Briefcase,
  Compass,
  ArrowRight,
  Armchair,
  Luggage,
  Sparkles,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface SmartServiceFinderProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal?: () => void;
  onOpenVipModal?: () => void;
}

type VisitorPersona = 'passenger' | 'airline' | 'cargo' | 'corporate' | 'job_seeker' | 'travel_partner';

export const SmartServiceFinder: React.FC<SmartServiceFinderProps> = ({
  onNavigate,
  onOpenCargoModal,
  onOpenVipModal,
}) => {
  const { isLight } = useTheme();
  const { t, language } = useLanguage();
  const [selectedPersona, setSelectedPersona] = useState<VisitorPersona>('passenger');

  const personas: { id: VisitorPersona; label: string; icon: any; shortDesc: string }[] = [
    { id: 'passenger', label: t('finder.pax', 'Passenger'), icon: Users, shortDesc: t('finder.paxDesc', 'Traveling through Kotoka Terminal 3') },
    { id: 'airline', label: t('finder.airline', 'Airline Operator'), icon: Plane, shortDesc: t('finder.airlineDesc', 'Scheduled carrier or charter dispatch') },
    { id: 'cargo', label: t('finder.cargo', 'Cargo Customer'), icon: PackageCheck, shortDesc: t('finder.cargoDesc', 'Air freight, cold chain, or perishables') },
    { id: 'corporate', label: t('finder.corp', 'Corporate & VIP'), icon: Shield, shortDesc: t('finder.corpDesc', 'Executive aviation, protocol & lounge') },
    { id: 'job_seeker', label: t('finder.jobs', 'Job Seeker / NSS'), icon: Briefcase, shortDesc: t('finder.jobsDesc', 'Aviation careers & internships') },
    { id: 'travel_partner', label: t('finder.agency', 'Travel & Agency'), icon: Compass, shortDesc: t('finder.agencyDesc', 'GSA, freight forwarder, or agency') },
  ];

  const recommendations: Record<
    VisitorPersona,
    {
      title: string;
      description: string;
      items: {
        title: string;
        desc: string;
        path?: string;
        actionText: string;
        action?: () => void;
        badge?: string;
      }[];
    }
  > = {
    passenger: {
      title: language === 'fr'
        ? 'Solutions Passagers à l’Aéroport International de Kotoka'
        : language === 'tw'
        ? 'Akwantufoɔ Sombea wɔ Kotoka Amansan Gyinabea'
        : 'Passenger Solutions at Kotoka International Airport',
      description: language === 'fr'
        ? 'Au départ, à l’arrivée ou en transit à Accra (Terminal 3), Kumasi ou Tamale ? Découvrez nos services passagers et traçabilité :'
        : language === 'tw'
        ? 'Woretu kwan, woreba, anaa worefa Nkran (Terminal 3), Kumasi, anaa Tamale? Hwɛ akwantufoɔ sombea ne kotokuo hwehwɛbea:'
        : 'Departing, arriving, or in transit at Accra (Terminal 3), Kumasi, or Tamale? Explore passenger services and tracing facilities:',
      items: [
        {
          title: language === 'fr' ? 'Enregistrement & Embarquement' : language === 'tw' ? 'Akwantufoɔ & Pono Ano Sombea' : 'Passenger & Gate Handling',
          desc: language === 'fr' ? 'Comptoirs dédiés, vérification DCS, coordination des portes et assistance PMR.' : language === 'tw' ? 'Check-in mpono soronko, DCS nhwehwɛmu, gate ahwɛfoɔ, ne PRM mmoa ma akwantufoɔ.' : 'Dedicated check-in desks, DCS verification, boarding gate coordination, and special assistance for PRM travelers.',
          path: '/passenger-services',
          actionText: language === 'fr' ? 'Découvrir l\'Assistance Passagers' : language === 'tw' ? 'Hwɛ Akwantufoɔ Sombea' : 'Explore Passenger Handling',
        },
        {
          title: language === 'fr' ? 'Suivre Mon Bagage · Traçabilité' : language === 'tw' ? 'Hwehwɛ Me Kotokuo Bea' : 'Find My Bag · Status & Tracing',
          desc: language === 'fr' ? 'Recherche automatisée du bagage et bureau litiges bagages 24h/24 au Terminal 3.' : language === 'tw' ? 'Afiri a ɛhwehwɛ wo kotokuo ntɛm ne Terminal 3 dwumayɛbea a ɛsom dɔnhwerew 24/7.' : 'Automated bag tag status query and 24/7 Kotoka Terminal 3 Baggage Services Office liaison desk.',
          path: '/find-my-bag',
          actionText: language === 'fr' ? 'Suivre un Bagage' : language === 'tw' ? 'Hwehwɛ Kotokuo Seesei' : 'Trace Baggage Record',
          badge: language === 'fr' ? 'FONCTIONNALITÉ DIGITALE' : language === 'tw' ? 'AFIRI FOFORƆ' : 'PROPOSED DIGITAL FEATURE',
        },
        {
          title: language === 'fr' ? 'Salon Exécutif Adinkra' : language === 'tw' ? 'Adinkra Ahomegyebea Kɛseɛ' : 'Adinkra Executive Lounge',
          desc: language === 'fr' ? 'Fauteuils confortables en zone réservée, Wi-Fi haut débit, buffet et douches privées au T3.' : language === 'tw' ? 'Ahomegye nkongua pa, Wi-Fi, aduane pa, ne aguarebea wɔ Terminal 3.' : 'Comfortable airside seating, Wi-Fi, refreshments, and private shower suites in Terminal 3 for walk-in travelers.',
          path: '/lounge',
          actionText: language === 'fr' ? 'Découvrir le Salon' : language === 'tw' ? 'Hwɛ Ahomegyebea No' : 'View Lounge Amenities',
        },
      ],
    },
    airline: {
      title: language === 'fr'
        ? 'Opérations Compagnies Régulières & Affrétées'
        : language === 'tw'
        ? 'Wiemhyɛn Akɛseɛ & Daa Akwantu Dwumadie'
        : 'Commercial & Scheduled Carrier Operations',
      description: language === 'fr'
        ? 'Contrats d\'assistance en escale conformes IATA ISAGO (SGHA) à Accra, Kumasi et Tamale :'
        : language === 'tw'
        ? 'IATA ISAGO wiemhyɛn asase so apam a ɛdi mu (SGHA) wɔ Nkran, Kumasi, ne Tamale:'
        : 'Comprehensive IATA ISAGO registered ground handling agreements (SGHA) across Accra, Kumasi, and Tamale:',
      items: [
        {
          title: language === 'fr' ? 'Assistance en Piste & Rotation' : language === 'tw' ? 'Wiemhyɛn Bammbɔ & Ramp' : 'Ramp Handling & Aircraft Turnaround',
          desc: language === 'fr' ? 'Guidage certifié, ambulifts doubles, GPU 400Hz, démarrage à air et repoussage tous tonnages.' : language === 'tw' ? 'Marshalling a ɛdi mu, ambulifts mmienu, GPU 400Hz, nsuo ne pushback mfiri akɛseɛ.' : 'Certified marshalling, dual ambulifts, GPU 400Hz, air start, toilet/water service, and wide/narrow-body pushback.',
          path: '/ramp-handling',
          actionText: language === 'fr' ? 'Voir Capacités Piste' : language === 'tw' ? 'Hwɛ Ramp Dwumadie' : 'View Ramp Capabilities',
        },
        {
          title: language === 'fr' ? 'Centre de Contrôle Opérationnel (OCC)' : language === 'tw' ? 'Wiemhyɛn Dwumayɛbea Kɛseɛ (OCC)' : 'Operations Control Centre (OCC)',
          desc: language === 'fr' ? 'Coordination régulation des vols 24h/24, centrage devis de masse et supervision des créneaux.' : language === 'tw' ? 'Wiemhyɛn kwankyerɛfoɔ 24/7, load control, ne coordinators a wɔwɔ hɔ daa.' : '24/7 airside flight dispatch liaison, load control, slot clearance, and turnaround coordinator supervision.',
          path: '/operations',
          actionText: language === 'fr' ? 'Présentation OCC' : language === 'tw' ? 'Hwɛ OCC Nhyehyɛeɛ' : 'Operational Overview',
        },
        {
          title: language === 'fr' ? 'Portail Partenaire Compagnies' : language === 'tw' ? 'Wiemhyɛnfoɔ Bea Kɛseɛ' : 'Partner Airline Portal Concept',
          desc: language === 'fr' ? 'Réservation de créneaux numériques, réquisition d’assistance et téléchargement d\'audits.' : language === 'tw' ? 'Slot booking, wiemhyɛn akwammisa, ne nkrataa afiri so.' : 'Digital slot booking, handling requisition, station contacts, and billing audit document downloads.',
          path: '/partner-portal',
          actionText: language === 'fr' ? 'Ouvrir le Portail' : language === 'tw' ? 'Bue Wiemhyɛnfoɔ Bea' : 'Open Partner Portal Concept',
          badge: language === 'fr' ? 'FONCTIONNALITÉ DIGITALE' : language === 'tw' ? 'AFIRI FOFORƆ' : 'PROPOSED DIGITAL FEATURE',
        },
      ],
    },
    cargo: {
      title: language === 'fr'
        ? 'Logistique Fret Aérien & Chaîne du Froid'
        : language === 'tw'
        ? 'Nnoɔma Fret & Nnuru Awɔ Bea Kɛseɛ'
        : 'Air Cargo Logistics & Cold Chain Warehouse',
      description: language === 'fr'
        ? 'Manutention de fret sécurisée certifiée UE RA3 au Village Cargo d\'Aviance à Kotoka :'
        : language === 'tw'
        ? 'EU Cargo RA3 nnoɔma bammbɔ wɔ Aviance Nnoɔma Kuro (Cargo Village) mu:'
        : 'Secure air freight handling holding EU Cargo RA3 certification in the Aviance Cargo Village, KIA:',
      items: [
        {
          title: language === 'fr' ? 'Terminal Fret Aérien Certifié UE RA3' : language === 'tw' ? 'EU RA3 Nnoɔma Bea Kɛseɛ' : 'EU RA3 Certified Cargo Terminal',
          desc: language === 'fr' ? 'Magasin sous douane, formalités douanières, contrôle radioscopique X-Ray double vue et palettisation.' : language === 'tw' ? 'Bonded warehouse, customs nkrataa, dual-view X-ray bammbɔ, ne pallets nhyehyɛeɛ.' : 'Bonded warehouse, customs documentation liaison, dual-view X-ray security screening, and dedicated pallet buildup.',
          path: '/cargo',
          actionText: language === 'fr' ? 'Explorer le Terminal Fret' : language === 'tw' ? 'Hwɛ Cargo Terminal' : 'Explore Cargo Terminal',
        },
        {
          title: language === 'fr' ? 'Chambres Froides pour Denrées & Pharmacie' : language === 'tw' ? 'Nnuru & Nnoɔma Awɔ Bea (+2°C–+8°C)' : 'Perishable Cold Room Storage',
          desc: language === 'fr' ? 'Conservation sous température dirigée pour produits pharmaceutiques et exportations horticoles.' : language === 'tw' ? 'Nnuru ne nnuane a ɛhia awɔ bammbɔ a generator gyina hɔ daa.' : 'Temperature-controlled pharmaceutical & fresh horticultural export preservation units with backup generation.',
          path: '/cargo',
          actionText: language === 'fr' ? 'Spécifications Chambres Froides' : language === 'tw' ? 'Hwɛ Awɔ Bea Mmara' : 'Cold Storage Specifications',
        },
        {
          title: language === 'fr' ? 'Devis Fret & Tarifs d\'Affrètement' : language === 'tw' ? 'Nnoɔma Boɔ & Akwammisa' : 'Cargo Rate & Charter Enquiry',
          desc: language === 'fr' ? 'Tarification directe auprès de notre responsable commercial fret (+233 593 816 076 / cargosales@avianceghana.com).' : language === 'tw' ? 'Kasa kyerɛ Cargo Manager Robert Amenyah (+233 593 816 076 / cargosales@avianceghana.com).' : 'Direct quotation from Robert Amenyah, Cargo Manager (+233 593 816 076 / cargosales@avianceghana.com).',
          action: () => (onOpenCargoModal ? onOpenCargoModal() : onNavigate('/contact')),
          actionText: language === 'fr' ? 'Demander un Devis Fret' : language === 'tw' ? 'Bisa Nnoɔma Boɔ' : 'Request Cargo Handling Quote',
        },
      ],
    },
    corporate: {
      title: language === 'fr'
        ? 'Aviation d\'Affaires & Accueil Protocolaire'
        : language === 'tw'
        ? 'VIP & Mpanyimfoɔ Wiemhyɛn Sombea'
        : 'Executive Aviation & Protocol Handling',
      description: language === 'fr'
        ? 'Assistance VIP pour jets privés, délégations diplomatiques et passagers de haute distinction :'
        : language === 'tw'
        ? 'VIP kwan pa ma private jets, aban ananmusifoɔ, ne mpanyimfoɔ akɛseɛ:'
        : 'VIP handling for private jets, diplomatic delegations, and high-profile travellers:',
      items: [
        {
          title: language === 'fr' ? 'Assistance Vols VIP & Affrétés' : language === 'tw' ? 'VIP & Private Jet Sombea' : 'VIP & Charter Flight Support',
          desc: language === 'fr' ? 'Escorte en piste, liaison terminal diplomatique, coordination ravitaillement et transferts Mercedes.' : language === 'tw' ? 'Apron escort, aban terminal nkitahodi, wiemhyɛn ngo som, ne Mercedes kar kwan.' : 'Apron escort, diplomatic terminal liaison, ramp refuel coordination, and airside Mercedes transfers.',
          path: '/vip-charter',
          actionText: language === 'fr' ? 'Services VIP Affrétés' : language === 'tw' ? 'VIP Charter Sombea' : 'VIP Charter Services',
        },
        {
          title: language === 'fr' ? 'Réservations Salons Privés' : language === 'tw' ? 'Ahomegyebea Soronko Booking' : 'Private Lounge Reservations',
          desc: language === 'fr' ? 'Salles de réunion privées exclusives et suites avec douches au Terminal 3.' : language === 'tw' ? 'Nhyiamu adan soronko ne aguarebea pa wɔ Terminal 3 mu.' : 'Exclusive private meeting rooms and executive shower facilities inside Terminal 3.',
          action: () => (onOpenVipModal ? onOpenVipModal() : onNavigate('/lounge')),
          actionText: language === 'fr' ? 'Réserver l\'Accès Salon' : language === 'tw' ? 'Gye Ahomegyebea No' : 'Book Lounge Access',
        },
        {
          title: language === 'fr' ? 'Conciergerie Protocolaire Dédiée' : language === 'tw' ? 'VIP Protocol Nkitahodi' : 'Direct Protocol Concierge',
          desc: language === 'fr' ? 'Contact direct de notre équipe VIP via lounges@avianceghana.com pour l\'organisation de vols sur mesure.' : language === 'tw' ? 'Frɛ yɛn VIP kuw ntɛm wɔ lounges@avianceghana.com ma wo wiemhyɛn nhyehyɛeɛ.' : 'Reach our VIP team directly via lounges@avianceghana.com for tailored flight staging.',
          path: '/contact',
          actionText: language === 'fr' ? 'Contacter le Bureau VIP' : language === 'tw' ? 'Frɛ VIP Desk' : 'Contact VIP Desk',
        },
      ],
    },
    job_seeker: {
      title: language === 'fr'
        ? 'Carrières & Programme de Service National (NSS)'
        : language === 'tw'
        ? 'Adwuma & Ghana National Service (NSS)'
        : 'Aviation Careers & National Service (NSS)',
      description: language === 'fr'
        ? 'Rejoignez plus de 1 000 professionnels de l\'aviation en piste, passage, sûreté, fret et ingénierie :'
        : language === 'tw'
        ? 'Bɛka adwumayɛfoɔ bɛboro 1,000 ho wɔ ramp, akwantufoɔ, bammbɔ, fret, ne engineering mu:'
        : 'Join over 1,000 aviation professionals across ramp, passenger, security, cargo, and engineering divisions:',
      items: [
        {
          title: language === 'fr' ? 'Postes Ouverts & Recrutements' : language === 'tw' ? 'Adwuma a Ɛda Hɔ Seesei' : 'Current Professional Vacancies',
          desc: language === 'fr' ? 'Découvrez nos offres pour superviseurs de piste, agents de passage et techniciens avions.' : language === 'tw' ? 'Hwɛ adwuma ma ramp supervisors, passenger agents, ne aircraft technicians.' : 'Explore open positions for ramp turnaround supervisors, passenger service agents, and aircraft technicians.',
          path: '/careers',
          actionText: language === 'fr' ? 'Consulter les Postes' : language === 'tw' ? 'Hwɛ Adwuma Ahodoɔ' : 'View Open Vacancies',
        },
        {
          title: language === 'fr' ? 'Affectation Service National (NSS)' : language === 'tw' ? 'National Service (NSS) Gyinabea' : 'National Service Scheme (NSS) Placement',
          desc: language === 'fr' ? 'Promotion annuelle de diplômés en accueil passagers, RH, finance, informatique et logistique piste.' : language === 'tw' ? 'Afe biara afe graduate adwuma wɔ akwantufoɔ, HR, sika, IT, ne airside logistics.' : 'Annual graduate intake across passenger facilitation, HR, finance, IT, and airside logistics.',
          path: '/careers',
          actionText: language === 'fr' ? 'Opportunités NSS' : language === 'tw' ? 'Hwɛ NSS Kwan' : 'Explore NSS Opportunities',
          badge: language === 'fr' ? 'PROGRAMME ANNUEL' : language === 'tw' ? 'NSS NHYEHYƐEƐ' : 'PROPOSED RECRUITMENT WORKFLOW',
        },
        {
          title: language === 'fr' ? 'Formation & Développement Aéronautique' : language === 'tw' ? 'Aviation Nteteeɛ & Nkɔsoɔ' : 'Training & Development',
          desc: language === 'fr' ? 'Certifications IATA DGR, sécurité en piste et service client dispensées dans notre académie interne.' : language === 'tw' ? 'IATA DGR, ramp bammbɔ, ne customer service nteteeɛ wɔ yɛn academy mu.' : 'IATA DGR, airside ramp safety, and customer care certifications administered through our internal academy.',
          path: '/training',
          actionText: language === 'fr' ? 'Découvrir nos Formations' : language === 'tw' ? 'Sua Nteteeɛ Ho Asɛm' : 'Learn About Training',
        },
      ],
    },
    travel_partner: {
      title: language === 'fr'
        ? 'Solutions Agences de Voyages & Transitaires'
        : language === 'tw'
        ? 'Akwantuo Dwumakuo & Freight Forwarders'
        : 'Travel Agency & Freight Forwarder Solutions',
      description: language === 'fr'
        ? 'Facilitation d\'escales et de fret pour les billetteries de compagnies, partenaires GSA et transitaires :'
        : language === 'tw'
        ? 'Mmoa pa ma wiemhyɛn nkrataa tɔnfoɔ, GSA partners, ne nnoɔma soasoafoɔ:'
        : 'Facilitating smooth operations for airline ticketing desks, GSA partners, and freight forwarders:',
      items: [
        {
          title: language === 'fr' ? 'Suivi LTA Fret & Manifestes' : language === 'tw' ? 'Airway Bill & Nnoɔma Hwehwɛbea' : 'Cargo Consignment Tracing & Manifests',
          desc: language === 'fr' ? 'Coordination des lettres de transport aérien, dédouanement export et mise à disposition au Cargo Village.' : language === 'tw' ? 'Airway bill nkrataa, export customs nhyehyɛeɛ, ne nnoɔma gyeɛ wɔ Cargo Village.' : 'Coordinate airway bill documents, export customs staging, and consignment releases at Cargo Village.',
          path: '/cargo',
          actionText: language === 'fr' ? 'Guide Fret Logistique' : language === 'tw' ? 'Hwɛ Cargo Kwankyerɛ' : 'Cargo Logistics Guide',
        },
        {
          title: language === 'fr' ? 'Liaison Chefs d\'Escale Terminal 3' : language === 'tw' ? 'Terminal 3 Station Mpanimfoɔ' : 'Terminal 3 Station Liaison',
          desc: language === 'fr' ? 'Annuaire des bureaux d\'escale, chefs d\'équipes et régulateurs de piste.' : language === 'tw' ? 'Ofese directory ma station managers ne supervisors dispatch desks.' : 'Physical office directory for station managers and supervisor dispatch desks.',
          path: '/contact',
          actionText: language === 'fr' ? 'Voir Bureaux d\'Escale' : language === 'tw' ? 'Hwɛ Station Desks' : 'View Station Desks',
        },
        {
          title: language === 'fr' ? 'Centre de Documentation Officiel' : language === 'tw' ? 'Nkrataa Bea Kɛseɛ' : 'Official Document Centre',
          desc: language === 'fr' ? 'Téléchargez le code de bonne conduite, attestations d\'audit ISAGO et licences GCAA.' : language === 'tw' ? 'Twe adwumakuo mmara krataa, ISAGO station audit nkrataa, ne compliance certs.' : 'Download company code of conduct, ISAGO station audit confirmations, and compliance certificates.',
          path: '/documents',
          actionText: language === 'fr' ? 'Consulter les Documents' : language === 'tw' ? 'Hwɛ Nkrataa Bea' : 'Browse Document Centre',
        },
      ],
    },
  };

  const currentRec = recommendations[selectedPersona];

  return (
    <section className={`border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all ${
      isLight ? 'bg-white border-slate-200/90 shadow-slate-200/60' : 'bg-slate-900 border-slate-800'
    }`}>
      {/* Decorative background glow */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/10'
      }`}></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
              isLight
                ? 'bg-blue-50 border border-blue-200 text-[#204696]'
                : 'bg-[#58C1EB]/10 border border-[#58C1EB]/35 text-[#58C1EB]'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('finder.kicker', 'Smart Service Discovery · Website Navigation')}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('finder.title', 'How can Aviance Ghana assist you today?')}
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {t('finder.desc', 'Select your traveler or business role below to instantly view tailored services, contact liaison desks, and ground handling solutions.')}
            </p>
          </div>

          <div className="text-right hidden md:block">
            <StatusBadge status="PROPOSED DIGITAL FEATURE" size="sm" />
          </div>
        </div>

        {/* Persona Selector Tabs */}
        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            {t('finder.step1', 'Step 1: Choose Your Profile')}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {personas.map((p) => {
              const Icon = p.icon;
              const isSelected = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#204696] text-white border-[#58C1EB]/50 shadow-md font-bold'
                      : isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon className={`w-5 h-5 ${
                    isSelected ? 'text-white' : (isLight ? 'text-[#204696]' : 'text-[#58C1EB]')
                  }`} />
                  <div>
                    <div className="text-xs font-semibold leading-tight">{p.label}</div>
                    <div className={`text-[10px] mt-0.5 line-clamp-1 ${
                      isSelected ? 'text-blue-100' : (isLight ? 'text-slate-500' : 'text-slate-500')
                    }`}>
                      {p.shortDesc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tailored Recommendations Grid */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${
                isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
              }`}>
                {t('finder.step2', 'Step 2 · Recommended Pathways')}
              </span>
              <h3 className={`text-lg font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {currentRec.title}
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {currentRec.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentRec.items.map((item, idx) => (
              <div
                key={idx}
                className={`border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-colors group ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-[#204696]/40 hover:bg-white hover:shadow-sm'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold text-[#58C1EB]">
                      0{idx + 1}
                    </span>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 uppercase">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h4 className={`text-sm font-bold transition-colors ${
                    isLight ? 'text-slate-900 group-hover:text-[#204696]' : 'text-white group-hover:text-[#58C1EB]'
                  }`}>
                    {item.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {item.desc}
                  </p>
                </div>

                <div>
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className="w-full px-3 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : item.path ? (
                    <button
                      onClick={() => onNavigate(item.path!)}
                      className={`w-full px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 border ${
                        isLight
                          ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-2xs'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700'
                      }`}
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#58C1EB]" />
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
