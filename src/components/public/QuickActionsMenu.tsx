import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Luggage,
  PackageCheck,
  Search,
  ArrowRight,
  ShieldAlert,
  Clock,
  Armchair,
  Plane,
  Briefcase,
  Phone,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  ChevronRight,
  X,
  FileText,
  Thermometer,
  Layers,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';

export type QuickActionContext = 'all' | 'passenger' | 'cargo' | 'airline' | 'careers';

interface QuickActionItem {
  id: string;
  context: QuickActionContext[];
  title: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string; // for icon bg
  actionType: 'report_lost_luggage' | 'check_cargo' | 'navigate' | 'modal_cargo' | 'modal_vip' | 'call';
  targetPath?: string;
  phoneNumber?: string;
  popular?: boolean;
}

interface QuickActionsMenuProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
  onOpenVipModal: () => void;
}

export const QuickActionsMenu: React.FC<QuickActionsMenuProps> = ({
  onNavigate,
  onOpenCargoModal,
  onOpenVipModal,
}) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();
  const [activeContext, setActiveContext] = useState<QuickActionContext>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals for instant tasks
  const [lostLuggageOpen, setLostLuggageOpen] = useState(false);
  const [cargoStatusOpen, setCargoStatusOpen] = useState(false);

  // Lost Luggage State
  const [lostLuggageForm, setLostLuggageForm] = useState({
    name: '',
    email: '',
    phone: '',
    airline: 'Africa World Airlines',
    flightNumber: '',
    bagTag: '',
    station: 'Kotoka International Airport (ACC - Terminal 3)',
    description: '',
  });
  const [lostLuggageRef, setLostLuggageRef] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [isSubmittingLuggage, setIsSubmittingLuggage] = useState(false);

  // Cargo Status Tracker State
  const [awbInput, setAwbInput] = useState('074-88491204');
  const [searchedAwb, setSearchedAwb] = useState<string | null>('074-88491204');

  // Simulated Cargo Waybills
  const demoCargoShipments: Record<string, {
    awb: string;
    carrier: string;
    origin: string;
    destination: string;
    commodity: string;
    weight: string;
    temperature: string;
    status: string;
    stage: 'received' | 'screened' | 'vault' | 'apron';
    lastUpdate: string;
    notes: string;
  }> = {
    '074-88491204': {
      awb: '074-88491204',
      carrier: 'KLM Cargo / Air France',
      origin: 'ACC (Accra Kotoka)',
      destination: 'AMS (Amsterdam Schiphol)',
      commodity: 'Perishable Horticultural (Fresh Papaya & Mango)',
      weight: '3,450 kg',
      temperature: '+4.2°C (Dual-Redundant Perishable Vault)',
      status: 'Cold Vault Staged · Cleared for Apron Loading',
      stage: 'vault',
      lastUpdate: '22 mins ago · Kotoka Cargo Village Bay 4',
      notes: 'Phytosanitary inspection passed. EU RA3 security seal verified.',
    },
    '176-33920194': {
      awb: '176-33920194',
      carrier: 'Emirates SkyCargo',
      origin: 'DXB (Dubai)',
      destination: 'ACC (Accra Kotoka)',
      commodity: 'Pharmaceutical Vaccines (GDP Certified)',
      weight: '1,120 kg',
      temperature: '+3.8°C (Monitored Active Reefer)',
      status: 'Customs Verification Completed · Ready for Consignee',
      stage: 'screened',
      lastUpdate: '45 mins ago · Aviance Pharma Wing',
      notes: 'GDP continuous data-logger report exported and verified.',
    },
    '057-99201823': {
      awb: '057-99201823',
      carrier: 'Air France Cargo',
      origin: 'CDG (Paris Charles de Gaulle)',
      destination: 'ACC (Accra Kotoka)',
      commodity: 'Diplomatic & Priority Courier Pouches',
      weight: '480 kg',
      temperature: 'Ambient Staging (18°C - 22°C)',
      status: 'Airside Offloaded · Transfer to Cargo Bond',
      stage: 'received',
      lastUpdate: '1 hour ago · T3 Apron Stand 5',
      notes: 'Escorted under Aviance Security supervision to bonded vault.',
    },
  };

  const currentShipment = searchedAwb ? demoCargoShipments[searchedAwb] : null;

  const handleCopyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleSubmitLostLuggage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLuggage(true);

    setTimeout(() => {
      const created = dataService.submitEnquiry({
        category: 'Baggage',
        senderName: lostLuggageForm.name,
        email: lostLuggageForm.email,
        phone: lostLuggageForm.phone,
        subject: `URGENT Lost Baggage Report: Tag ${lostLuggageForm.bagTag || 'NO-TAG'} (${lostLuggageForm.flightNumber || 'Flight TBD'})`,
        message: `
[PASSENGER LOST / DELAYED LUGGAGE CLAIM]
Passenger: ${lostLuggageForm.name}
Phone: ${lostLuggageForm.phone}
Airline: ${lostLuggageForm.airline}
Flight Number: ${lostLuggageForm.flightNumber}
Baggage Tag Stub: ${lostLuggageForm.bagTag || 'Tag not attached/missing'}
Station of Arrival/Disembarkation: ${lostLuggageForm.station}

Luggage Description & Identifiers:
${lostLuggageForm.description}
        `.trim(),
        priority: 'Urgent',
      });

      analyticsService.trackEvent('enquiry_submit', '/quick-actions/lost-luggage', {
        ref: created.referenceNo,
      });

      setLostLuggageRef(created.referenceNo);
      setIsSubmittingLuggage(false);
    }, 450);
  };

  const handleSearchAwb = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = awbInput.trim();
    if (demoCargoShipments[clean]) {
      setSearchedAwb(clean);
    } else {
      setSearchedAwb(clean);
    }
  };

  // List of Context-Aware Actions with complete localization
  const actionItems: QuickActionItem[] = [
    {
      id: 'report-lost-luggage',
      context: ['passenger'],
      title: t('qa.lostLuggage.title', 'Report Lost Luggage'),
      badge: t('qa.lostLuggage.badge', 'URGENT TRACE'),
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      description: t('qa.lostLuggage.desc', 'Submit an immediate delayed or lost bag claim directly to the 24/7 Kotoka T3 Baggage Services Office.'),
      icon: Luggage,
      accentColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      actionType: 'report_lost_luggage',
      popular: true,
    },
    {
      id: 'check-cargo-status',
      context: ['cargo'],
      title: t('qa.cargoStatus.title', 'Check Cargo Status'),
      badge: t('qa.cargoStatus.badge', 'AWB LIVE LOOKUP'),
      badgeColor: 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/35',
      description: t('qa.cargoStatus.desc', 'Trace air freight airway bills, check cold chain vault temperatures, and verify customs clearance.'),
      icon: PackageCheck,
      accentColor: 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/35',
      actionType: 'check_cargo',
      popular: true,
    },
    {
      id: 'find-my-bag',
      context: ['passenger'],
      title: t('qa.findMyBag.title', 'Find My Bag (Tag Status)'),
      badge: t('qa.findMyBag.badge', 'LIVE BRS'),
      badgeColor: 'bg-blue-400/10 text-blue-400 border-blue-400/30',
      description: t('qa.findMyBag.desc', 'Query your bag tag barcode against the simulated BRS ground handling checkpoint telemetry.'),
      icon: Search,
      accentColor: 'bg-blue-400/10 text-blue-400 border-blue-400/30',
      actionType: 'navigate',
      targetPath: '/find-my-bag',
      popular: true,
    },
    {
      id: 'reserve-lounge',
      context: ['passenger'],
      title: t('qa.reserveLounge.title', 'Adinkra Lounge Booking'),
      badge: t('qa.reserveLounge.badge', 'VIP COMFORT'),
      badgeColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
      description: t('qa.reserveLounge.desc', 'Reserve walk-in hospitality, shower suites, high-speed Wi-Fi, and refreshments at Kotoka T3 airside.'),
      icon: Armchair,
      accentColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
      actionType: 'modal_vip',
    },
    {
      id: 'submit-cargo-enquiry',
      context: ['cargo'],
      title: t('qa.cargoEnquiry.title', 'Cargo Tariff & Cold Chain'),
      badge: t('qa.cargoEnquiry.badge', 'EU RA3'),
      badgeColor: 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/35',
      description: t('qa.cargoEnquiry.desc', 'Request perishable cold vault space (+2°C to +8°C) or dangerous goods handling tariffs.'),
      icon: Thermometer,
      accentColor: 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/35',
      actionType: 'modal_cargo',
    },
    {
      id: 'ramp-turnaround',
      context: ['airline'],
      title: t('qa.rampTurnaround.title', 'Airline SGHA & Ramp Turnaround'),
      badge: t('qa.rampTurnaround.badge', 'ISAGO CERTIFIED'),
      badgeColor: 'bg-sky-400/10 text-sky-400 border-sky-400/30',
      description: t('qa.rampTurnaround.desc', 'Request IATA Standard Ground Handling Agreement (SGHA) support or towbarless pushback dispatch.'),
      icon: Plane,
      accentColor: 'bg-sky-400/10 text-sky-400 border-sky-400/30',
      actionType: 'navigate',
      targetPath: '/ramp-handling',
    },
    {
      id: 'careers-nss',
      context: ['careers'],
      title: t('qa.careersNss.title', 'Apply for Careers & NSS Scheme'),
      badge: t('qa.careersNss.badge', 'GRADUATE INTAKE'),
      badgeColor: 'bg-indigo-400/10 text-indigo-400 border-indigo-400/30',
      description: t('qa.careersNss.desc', 'Submit an application for open airside operations positions or the Ghana National Service Scheme (NSS).'),
      icon: Briefcase,
      accentColor: 'bg-indigo-400/10 text-indigo-400 border-indigo-400/30',
      actionType: 'navigate',
      targetPath: '/careers',
      popular: true,
    },
    {
      id: 'duty-hotline',
      context: ['passenger', 'airline', 'cargo'],
      title: t('qa.dutyHotline.title', '24/7 Operations Duty Desk'),
      badge: t('qa.dutyHotline.badge', 'HOTLINE'),
      badgeColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
      description: t('qa.dutyHotline.desc', 'Direct telephone liaison with Kotoka Terminal 3 airside ground dispatch supervisor.'),
      icon: Phone,
      accentColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
      actionType: 'call',
      phoneNumber: '+233544334022',
    },
  ];

  // Filter actions based on active context and search query
  const filteredActions = actionItems.filter((item) => {
    const matchesContext =
      activeContext === 'all' || item.context.includes(activeContext);

    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesContext && matchesSearch;
  });

  const handleActionClick = (action: QuickActionItem) => {
    analyticsService.trackEvent('quick_action_click', '/home', {
      actionId: action.id,
      title: action.title,
    });

    switch (action.actionType) {
      case 'report_lost_luggage':
        setLostLuggageOpen(true);
        break;
      case 'check_cargo':
        setCargoStatusOpen(true);
        break;
      case 'navigate':
        if (action.targetPath) onNavigate(action.targetPath);
        break;
      case 'modal_cargo':
        onOpenCargoModal();
        break;
      case 'modal_vip':
        onOpenVipModal();
        break;
      case 'call':
        if (action.phoneNumber) window.location.href = `tel:${action.phoneNumber}`;
        break;
      default:
        break;
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Container Card */}
      <div className={`border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all ${
        isLight
          ? 'bg-white border-slate-200/90 shadow-slate-200/60'
          : 'bg-[#0A162C]/95 border-[#204696]/35'
      }`}>
        {/* Subtle Ambient Backing Glow */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-[#204696]/10' : 'bg-[#204696]/25'
        }`} />
        <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-[#58C1EB]/10' : 'bg-[#58C1EB]/15'
        }`} />

        {/* Section Header */}
        <div className={`relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${
          isLight ? 'border-slate-200' : 'border-slate-800/80'
        }`}>
          <div>
            <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1.5 ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              <Sparkles className="w-4 h-4 text-[#72BF44] animate-pulse" />
              <span>{t('qa.badge', 'Instant Self-Service Portal')}</span>
              <span className={isLight ? 'text-slate-300' : 'text-slate-600'}>·</span>
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>{t('qa.badgeSub', 'Context-Aware Rapid Actions')}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('qa.title', 'Airport Quick Actions')}
            </h2>
            <p className={`text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {t('qa.desc', 'Instantly file lost luggage queries, track air cargo airway bills, book VIP hospitality, or contact airside dispatch in seconds.')}
            </p>
          </div>

          {/* Search Bar for Instant Task Filtering */}
          <div className="w-full md:w-72 relative">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('qa.searchPlaceholder', 'Search task (e.g. luggage, cargo)...')}
              className={`w-full border rounded-xl pl-9 pr-8 py-2.5 text-xs transition-colors focus:outline-none ${
                isLight
                  ? 'bg-slate-50 border-slate-300 focus:border-[#204696] text-slate-900 placeholder-slate-400'
                  : 'bg-[#060D1A] border-[#204696]/30 focus:border-[#58C1EB] text-white placeholder-slate-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                aria-label="Clear quick actions search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Context-Aware Filter Tabs */}
        <div className="relative z-10 pt-5 pb-6 flex flex-wrap items-center gap-2">
          <span className={`text-[11px] font-mono uppercase tracking-wider mr-2 hidden sm:inline-block ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            {t('qa.whoAmI', 'I am a:')}
          </span>
          {[
            { id: 'all', label: t('qa.tabAll', 'All Tasks'), icon: Layers },
            { id: 'passenger', label: t('qa.tabPassenger', 'Passenger / Traveler'), icon: Luggage },
            { id: 'cargo', label: t('qa.tabCargo', 'Cargo Shipper / Forwarder'), icon: PackageCheck },
            { id: 'airline', label: t('qa.tabAirline', 'Airline / Charter Operator'), icon: Plane },
            { id: 'careers', label: t('qa.tabCareers', 'Job Seeker / NSS Scheme'), icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeContext === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveContext(tab.id as QuickActionContext);
                  analyticsService.trackEvent('quick_action_context_change', '/home', { context: tab.id });
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#204696] text-white border border-[#58C1EB]/60 shadow-md shadow-[#204696]/40 font-bold'
                    : isLight
                    ? 'bg-slate-100 text-slate-700 hover:text-[#204696] hover:bg-slate-200 border border-slate-200'
                    : 'bg-[#060D1A] text-slate-300 hover:text-[#58C1EB] hover:bg-[#0E2042] border border-[#204696]/25'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? (isLight ? 'text-white' : 'text-[#58C1EB]') : (isLight ? 'text-slate-500' : 'text-slate-400')}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Context Notification Banner */}
        <div className={`relative z-10 mb-6 px-4 py-2.5 rounded-xl border text-xs flex items-center justify-between gap-4 transition-all ${
          isLight
            ? 'bg-blue-50/80 border-blue-200 text-slate-700'
            : 'bg-[#060D1A]/90 border-[#204696]/30 text-slate-300'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="text-[11px] sm:text-xs">
              {activeContext === 'all' && (
                <span><strong>Station Watch:</strong> Kotoka Terminal 3 is in continuous turnaround. Select any task below for instant handling.</span>
              )}
              {activeContext === 'passenger' && (
                <span><strong>Passenger Services:</strong> Arrived at Kotoka T3 without your bag? Report lost luggage below for immediate tracing.</span>
              )}
              {activeContext === 'cargo' && (
                <span><strong>Cargo Village Status:</strong> EU RA3 cold storage (+2°C to +8°C) active. Track waybills or request temperature staging.</span>
              )}
              {activeContext === 'airline' && (
                <span><strong>Flight Operations:</strong> Ramp turnaround teams, GPU 400Hz, and towbarless tractors staged for apron operations.</span>
              )}
              {activeContext === 'careers' && (
                <span><strong>Talent & NSS:</strong> National Service Scheme and airside trainee intake applications currently accepting submissions.</span>
              )}
            </span>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 hidden sm:inline-block ${
            isLight
              ? 'bg-blue-100 text-[#204696] border-blue-200 font-bold'
              : 'text-[#58C1EB] bg-[#58C1EB]/10 border-[#58C1EB]/25'
          }`}>
            24/7 ACTIVE
          </span>
        </div>

        {/* Actions Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                onClick={() => handleActionClick(action)}
                className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm ${
                  isLight
                    ? 'bg-white border-slate-200 hover:border-[#204696]/40 hover:bg-slate-50/80 hover:shadow-md'
                    : 'bg-[#071120]/80 border-[#204696]/25 hover:border-[#58C1EB]/60 hover:bg-[#0B172E] hover:shadow-[#204696]/30'
                } ${
                  action.popular ? (isLight ? 'ring-1 ring-[#204696]/20' : 'ring-1 ring-[#58C1EB]/40') : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-[#204696]'
                        : `${action.accentColor}`
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {action.badge && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        isLight
                          ? 'bg-blue-50 text-[#204696] border-blue-200'
                          : (action.badgeColor || 'bg-slate-800 text-slate-300')
                      }`}>
                        {action.badge}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm font-bold transition-colors ${
                    isLight
                      ? 'text-slate-900 group-hover:text-[#204696]'
                      : 'text-white group-hover:text-[#58C1EB]'
                  }`}>
                    {action.title}
                  </h3>

                  <p className={`text-xs mt-1.5 leading-relaxed line-clamp-3 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {action.description}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs transition-colors ${
                  isLight
                    ? 'border-slate-100 text-slate-500 group-hover:text-[#204696]'
                    : 'border-slate-800/80 text-slate-400 group-hover:text-[#58C1EB]'
                }`}>
                  <span className="font-semibold text-[11px]">
                    {action.actionType === 'report_lost_luggage' && t('qa.act.claim', 'File Urgent Claim')}
                    {action.actionType === 'check_cargo' && t('qa.act.track', 'Track Waybill')}
                    {action.actionType === 'navigate' && t('qa.act.openPortal', 'Open Portal')}
                    {action.actionType === 'modal_cargo' && t('qa.act.quote', 'Request Quote')}
                    {action.actionType === 'modal_vip' && t('qa.act.reserve', 'Reserve Pass')}
                    {action.actionType === 'call' && t('qa.act.call', 'Call Hotline')}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('qa.noMatch', 'No tasks matched your search')}
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('qa.noMatchDesc', 'Try searching for "luggage", "cargo", "lounge", or reset your filters.')}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveContext('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#204696] text-white border border-[#58C1EB]/40 font-bold text-xs hover:bg-[#183878] transition-colors"
            >
              {t('qa.resetSearch', 'Reset Search & Filters')}
            </button>
          </div>
        )}
      </div>

      {/* MODAL 1: REPORT LOST LUGGAGE (EXPRESS FORM) */}
      {lostLuggageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400 border border-rose-500/30">
                  <Luggage className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">Report Lost or Delayed Luggage</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
                      URGENT CLAIM
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Kotoka International Airport (ACC) · Terminal 3 Baggage Services Office
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setLostLuggageOpen(false);
                  setLostLuggageRef(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close lost luggage modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {lostLuggageRef ? (
                /* Success View */
                <div className="p-6 bg-slate-950 border border-emerald-500/30 rounded-2xl text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Baggage File Created</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                      Your lost luggage claim has been logged into the Aviance Ghana Baggage Services Dispatch system. Our duty baggage supervisor at Terminal 3 has been alerted.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-3 max-w-sm mx-auto">
                    <div className="text-left">
                      <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Claim Reference ID</div>
                      <div className="text-base font-mono font-bold text-[#58C1EB]">{lostLuggageRef}</div>
                    </div>
                    <button
                      onClick={() => handleCopyRef(lostLuggageRef)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium flex items-center gap-1.5 transition-colors"
                    >
                      {copiedRef ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => {
                        setLostLuggageOpen(false);
                        onNavigate('/find-my-bag');
                      }}
                      className="px-4 py-2.5 bg-[#204696] text-white border border-[#58C1EB]/40 font-bold text-xs rounded-xl hover:bg-[#183878] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Track on Find My Bag Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setLostLuggageRef(null);
                        setLostLuggageForm({
                          name: '',
                          email: '',
                          phone: '',
                          airline: 'Africa World Airlines',
                          flightNumber: '',
                          bagTag: '',
                          station: 'Kotoka International Airport (ACC - Terminal 3)',
                          description: '',
                        });
                      }}
                      className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs rounded-xl transition-colors"
                    >
                      File Another Claim
                    </button>
                  </div>
                </div>
              ) : (
                /* Report Form */
                <form onSubmit={handleSubmitLostLuggage} className="space-y-4">
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-rose-200">Terminal 3 Notice:</strong> For arriving passengers currently at Kotoka Airport, please also visit our physical desk located beside Carousel 2 or call our duty lead at <strong>+233 (0) 544 33 4022</strong>.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Passenger Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lostLuggageForm.name}
                        onChange={(e) => setLostLuggageForm({ ...lostLuggageForm, name: e.target.value })}
                        placeholder="e.g. Kwame Mensah"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#58C1EB] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={lostLuggageForm.phone}
                        onChange={(e) => setLostLuggageForm({ ...lostLuggageForm, phone: e.target.value })}
                        placeholder="+233 24 123 4567"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#58C1EB] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={lostLuggageForm.email}
                        onChange={(e) => setLostLuggageForm({ ...lostLuggageForm, email: e.target.value })}
                        placeholder="kwame.mensah@example.com"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#58C1EB] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Airline Name *
                      </label>
                      <select
                        value={lostLuggageForm.airline}
                        onChange={(e) => setLostLuggageForm({ ...lostLuggageForm, airline: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#58C1EB] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Africa World Airlines">Africa World Airlines (AWA)</option>
                        <option value="PassionAir">PassionAir</option>
                        <option value="British Airways">British Airways</option>
                        <option value="Delta Air Lines">Delta Air Lines</option>
                        <option value="KLM Royal Dutch Airlines">KLM Royal Dutch Airlines</option>
                        <option value="Air France">Air France</option>
                        <option value="Emirates">Emirates</option>
                        <option value="Qatar Airways">Qatar Airways</option>
                        <option value="Ethiopian Airlines">Ethiopian Airlines</option>
                        <option value="Turkish Airlines">Turkish Airlines</option>
                        <option value="Other Carrier">Other Carrier</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Flight Number
                      </label>
                      <input
                        type="text"
                        value={lostLuggageForm.flightNumber}
                        onChange={(e) => setLostLuggageForm({ ...lostLuggageForm, flightNumber: e.target.value })}
                        placeholder="e.g. BA078 / AW102"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#58C1EB] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Baggage Tag Stub Number (if available)
                      </label>
                      <input
                        type="text"
                        value={lostLuggageForm.bagTag}
                        onChange={(e) => setLostLuggageForm({ ...lostLuggageForm, bagTag: e.target.value })}
                        placeholder="e.g. AV-ACC-88310 or 0125BA993"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#58C1EB] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none uppercase font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Airport Station
                    </label>
                    <select
                      value={lostLuggageForm.station}
                      onChange={(e) => setLostLuggageForm({ ...lostLuggageForm, station: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#58C1EB] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Kotoka International Airport (ACC - Terminal 3)">Kotoka International Airport (ACC - Terminal 3)</option>
                      <option value="Prempeh I International Airport (KMS - Kumasi)">Prempeh I International Airport (KMS - Kumasi)</option>
                      <option value="Tamale International Airport (TML)">Tamale International Airport (TML)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Luggage Description (Color, Brand, Markings, Wheels) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={lostLuggageForm.description}
                      onChange={(e) => setLostLuggageForm({ ...lostLuggageForm, description: e.target.value })}
                      placeholder="e.g. Black Samsonite hard-shell suitcase with 4 spinner wheels, red ribbon tied to top handle, contains personal clothing."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#58C1EB] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setLostLuggageOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingLuggage}
                      className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmittingLuggage ? (
                        <span>Logging Claim...</span>
                      ) : (
                        <>
                          <Luggage className="w-4 h-4" />
                          <span>Submit Urgent Baggage Claim</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CHECK CARGO STATUS & AIRWAY BILL TRACKER */}
      {cargoStatusOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#58C1EB]/10 rounded-xl text-[#58C1EB] border border-[#58C1EB]/35">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">Check Air Cargo Status & AWB Tracker</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35 font-bold">
                      EU RA3 FACILITY
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Aviance Cargo Village · Kotoka International Airport (ACC)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCargoStatusOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close cargo status modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Search Form */}
              <form onSubmit={handleSearchAwb} className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300">
                  Enter 11-Digit Air Waybill (AWB) Number
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={awbInput}
                      onChange={(e) => setAwbInput(e.target.value)}
                      placeholder="e.g. 074-88491204"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#58C1EB] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Track Status</span>
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="text-slate-400">Sample Active Waybills:</span>
                  {Object.keys(demoCargoShipments).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setAwbInput(tag);
                        setSearchedAwb(tag);
                      }}
                      className={`font-mono px-2 py-0.5 rounded border transition-colors ${
                        searchedAwb === tag
                          ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-bold border-[#58C1EB]'
                          : 'bg-slate-950 text-slate-300 hover:text-[#58C1EB] border-slate-800'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </form>

              {/* Waybill Status Card */}
              {currentShipment ? (
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Waybill Identification</div>
                      <div className="text-lg font-mono font-bold text-[#58C1EB]">{currentShipment.awb}</div>
                      <div className="text-xs text-slate-300 font-semibold">{currentShipment.carrier}</div>
                    </div>
                    <div className="sm:text-right">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Routing</div>
                      <div className="text-xs font-mono font-bold text-white">{currentShipment.origin} &rarr; {currentShipment.destination}</div>
                      <div className="text-[11px] text-slate-400">{currentShipment.weight}</div>
                    </div>
                  </div>

                  {/* Operational Status Highlight */}
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#58C1EB] font-bold">Current Processing Stage</span>
                      <span className="text-[10px] font-mono text-slate-400">{currentShipment.lastUpdate}</span>
                    </div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>{currentShipment.status}</span>
                    </div>
                    <p className="text-xs text-slate-400 pt-1 leading-relaxed">{currentShipment.notes}</p>
                  </div>

                  {/* Cold Chain & Specs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-1">
                      <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-[#58C1EB]" />
                        <span>Temperature Monitoring</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200">{currentShipment.temperature}</div>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-1">
                      <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                        <Layers className="w-3 h-3 text-[#58C1EB]" />
                        <span>Commodity Class</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200">{currentShipment.commodity}</div>
                    </div>
                  </div>

                  {/* Stage Progress Bar */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Cargo Village Chain of Custody</div>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        1. Intake & Weigh
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        2. EU RA3 Screening
                      </div>
                      <div className={`p-2 rounded-lg border ${
                        currentShipment.stage === 'vault' || currentShipment.stage === 'apron'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}>
                        3. Vault / Palletizing
                      </div>
                      <div className={`p-2 rounded-lg border ${
                        currentShipment.stage === 'apron'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}>
                        4. Apron Staging
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-[#58C1EB] mx-auto" />
                  <div className="text-sm font-bold text-white">Custom Waybill Lookup</div>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Waybill #{awbInput} was not located in active ramp telemetry. Live records connect to airline SITA Cargo Interchange protocols.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#58C1EB]" />
                  <span>Cargo Village Desk: <a href="tel:+233593816076" className="text-[#58C1EB] font-mono hover:underline">+233 59 381 6076</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCargoStatusOpen(false);
                      onOpenCargoModal();
                    }}
                    className="px-4 py-2 bg-[#204696] text-white border border-[#58C1EB]/40 font-bold text-xs rounded-xl hover:bg-[#183878] transition-colors"
                  >
                    Submit Tariff Enquiry
                  </button>
                  <button
                    onClick={() => {
                      setCargoStatusOpen(false);
                      onNavigate('/cargo');
                    }}
                    className="px-4 py-2 bg-slate-800 text-white font-semibold text-xs rounded-xl hover:bg-slate-700 transition-colors"
                  >
                    Cargo Terminal Specs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
