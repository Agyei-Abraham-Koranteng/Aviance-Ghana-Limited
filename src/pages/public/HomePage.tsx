import React from 'react';
import {
  Plane,
  ArrowRight,
  ShieldCheck,
  Luggage,
  PackageCheck,
  Armchair,
  Users,
  Wrench,
  CheckCircle2,
  Calendar,
  Building,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { GhanaMap } from '../../components/public/GhanaMap';
import { TurnaroundTimeline } from '../../components/public/TurnaroundTimeline';
import { SmartServiceFinder } from '../../components/public/SmartServiceFinder';
import { QuickActionsMenu } from '../../components/public/QuickActionsMenu';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Service, LocationItem, Certification, NewsArticle, CustomerPartner } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface HomePageProps {
  services: Service[];
  locations: LocationItem[];
  certifications: Certification[];
  news: NewsArticle[];
  customers: CustomerPartner[];
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
  onOpenVipModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  services,
  locations,
  certifications,
  news,
  customers,
  onNavigate,
  onOpenCargoModal,
  onOpenVipModal,
}) => {
  const { isLight } = useTheme();
  const { t, language } = useLanguage();

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Cinematic Backdrop Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_aviance_turnaround_1791329957957.jpg"
            alt="Aircraft turnaround ground handling at Kotoka International Airport"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transform animate-fade-in transition-transform duration-1000"
          />
          {/* Contrast scrim adapting to light and dark theme */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${
            isLight
              ? 'bg-gradient-to-t from-slate-100 via-slate-100/90 to-blue-900/15'
              : 'bg-gradient-to-t from-[#08101E] via-[#08101E]/80 to-[#204696]/25'
          }`}></div>
          <div className={`absolute inset-0 ${isLight ? 'bg-white/60' : 'bg-[#08101E]/40'}`}></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left pt-12">
          <div className="max-w-3xl space-y-6">
            {/* Trust Kicker - Zero pill metadata rule */}
            <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#72BF44] animate-pulse"></span>
              <span>{t('hero.kicker', 'Aviance Ghana Limited · Established 1994')}</span>
              <span aria-hidden="true">·</span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-300'}>{t('hero.stations', 'Accra (KIA) · Kumasi · Tamale')}</span>
            </div>

            {/* Display Headline */}
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-balance ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('hero.title1', 'Ground Handling.')} <br />
              <span className={`text-transparent bg-clip-text ${
                isLight
                  ? 'bg-gradient-to-r from-[#204696] via-[#0284C7] to-[#15803D]'
                  : 'bg-gradient-to-r from-[#58C1EB] via-[#60A5FA] to-[#72BF44]'
              }`}>
                {t('hero.title2', 'Elevated to Precision.')}
              </span>
            </h1>

            {/* Value Proposition */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              {t('hero.subtitle', 'A full-service aviation ground handling provider certified and regulated by IATA ISAGO and the Ghana Civil Aviation Authority (GCAA). Delivering professional passenger services, ramp handling, Cargo RA3 secure logistics, and executive lounge hospitality.')}
            </p>

            {/* Redevelopment Concept Note */}
            <div className={`inline-block p-2.5 rounded-lg border text-xs shadow-lg ${
              isLight
                ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/60'
                : 'bg-[#0C1933]/90 border-[#204696]/35 text-slate-300 shadow-[#204696]/5'
            }`}>
              <strong className={`font-semibold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>
                {t('hero.badgeTitle', 'Official Corporate Identity:')}
              </strong>{' '}
              {t('hero.badgeDesc', 'Digital platform synchronized with certified Aviance Ghana business operations, IATA ISAGO standards, and GCAA regulations.')}
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onNavigate('/services')}
                className="px-6 py-3.5 bg-gradient-to-r from-[#204696] to-[#18397a] hover:from-[#2653b3] hover:to-[#204696] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#204696]/40 border border-[#58C1EB]/50 flex items-center justify-center gap-2"
              >
                <span>{t('hero.exploreBtn', 'Explore Aviation Services')}</span>
                <ArrowRight className="w-4 h-4 text-[#58C1EB]" />
              </button>

              <a
                href="#quick-actions"
                className={`px-5 py-3.5 font-semibold text-sm rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-blue-50/80 hover:bg-blue-100 text-[#204696] border-[#204696]/30'
                    : 'bg-[#58C1EB]/10 hover:bg-[#58C1EB]/20 text-[#58C1EB] border-[#58C1EB]/30'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#72BF44] animate-pulse" />
                <span>{t('qa.title', 'Quick Actions Menu')}</span>
              </a>

              <button
                onClick={() => onNavigate('/find-my-bag')}
                className={`px-5 py-3.5 font-semibold text-sm rounded-xl border transition-colors flex items-center justify-center gap-2 shadow-md ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 hover:border-[#204696]/40'
                    : 'bg-[#0A162C]/90 hover:bg-[#0E1C38] text-white border-[#204696]/40 hover:border-[#58C1EB]/60'
                }`}
              >
                <Luggage className={`w-4 h-4 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <span>{t('hero.baggageBtn', 'Track Inbound Bag')}</span>
              </button>

              <button
                onClick={onOpenCargoModal}
                className={`px-5 py-3.5 font-medium text-sm rounded-xl border transition-colors flex items-center justify-center gap-2 shadow-md ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 hover:border-emerald-600/60'
                    : 'bg-[#071120] hover:bg-[#0C1933] text-slate-200 hover:text-white border-[#204696]/30 hover:border-[#72BF44]/60'
                }`}
              >
                <PackageCheck className="w-4 h-4 text-[#72BF44]" />
                <span>{t('hero.cargoBtn', 'Cargo Village (RA3)')}</span>
              </button>
            </div>

            {/* Station Trust Markers */}
            <div className={`pt-8 border-t flex flex-wrap items-center gap-6 text-xs ${
              isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800/80 text-slate-400'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>ACC</span>
                <span>{t('hero.trustAcc', 'Kotoka T3 & Cargo Village')}</span>
              </div>
              <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-slate-600'}>/</span>
              <div className="flex items-center gap-2">
                <span className={`font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>KMS</span>
                <span>{t('hero.trustKms', 'Prempeh I Airport Kumasi')}</span>
              </div>
              <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-slate-600'}>/</span>
              <div className="flex items-center gap-2">
                <span className={`font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>TML</span>
                <span>{t('hero.trustTml', 'Tamale International Airport')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTEXT-AWARE QUICK ACTIONS MENU */}
      <div id="quick-actions" className="scroll-mt-24">
        <QuickActionsMenu
          onNavigate={onNavigate}
          onOpenCargoModal={onOpenCargoModal}
          onOpenVipModal={onOpenVipModal}
        />
      </div>

      {/* 3. KEY FACTS & OPERATIONAL FIGURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex items-center justify-between text-xs px-1">
          <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            {t('stats.keyFactsTitle', 'Operational Strengths & Station Benchmarks')}
          </span>
          <StatusBadge status="VERIFIED OFFICIAL" size="xs" />
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 border rounded-2xl shadow-xl backdrop-blur-sm transition-all ${
          isLight
            ? 'bg-white border-slate-200/90 shadow-slate-200/60'
            : 'bg-[#0C1933]/90 border-[#204696]/35 shadow-[#204696]/10'
        }`}>
          <div className="space-y-1">
            <div className={`text-3xl sm:text-4xl font-extrabold font-mono tabular-nums tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              3
            </div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              {t('stats.stationsLabel', 'International Stations')}
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('stats.stationsDesc', 'Accra (Kotoka T3), Kumasi & Tamale')}
            </p>
          </div>

          <div className="space-y-1">
            <div className={`text-3xl sm:text-4xl font-extrabold font-mono tabular-nums tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              100%
            </div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              {t('stats.auditLabel', 'ISAGO Audit Compliance')}
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('stats.auditDesc', 'IATA Ground Operations Manual standard')}
            </p>
          </div>

          <div className="space-y-1">
            <div className={`text-3xl sm:text-4xl font-extrabold font-mono tabular-nums tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              ~1,000
            </div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              {t('stats.workforceLabel', 'Aviation Professionals')}
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('stats.workforceDesc', 'Ramp, passenger, cargo & technical workforce')}
            </p>
          </div>

          <div className="space-y-1">
            <div className={`text-3xl sm:text-4xl font-extrabold font-mono tabular-nums tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              24/7
            </div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              {t('stats.watchLabel', 'Active Airside Watch')}
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('stats.watchDesc', 'Continuous turnaround & cargo clearance')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES BENTO & EDITORIAL SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-5 ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <div>
            <div className={`text-xs uppercase tracking-wider font-semibold mb-1 ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              {t('bento.kicker', 'End-to-End Capabilities')}
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('bento.title', 'Aviation Ground Handling Solutions')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/services')}
            className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isLight ? 'text-[#204696] hover:text-[#153170]' : 'text-[#58C1EB] hover:text-white'
            }`}
          >
            <span>{t('bento.viewAll', 'View All Operational Services')} ({services.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Ramp Handling (Featured Col-Span-2) */}
          <div className={`md:col-span-2 group relative border rounded-2xl overflow-hidden transition-all flex flex-col justify-between p-6 sm:p-8 shadow-lg ${
            isLight
              ? 'bg-white border-slate-200 hover:border-[#204696]/50 hover:shadow-slate-300/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 shadow-[#204696]/5'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono uppercase tracking-wider ${
                  isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
                }`}>
                  {t('bento.rampPill', '01 · Ramp & Turnaround')}
                </span>
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {t('bento.rampCert', 'Wide & Narrow-Body Certified')}
                </span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold transition-colors ${
                isLight ? 'text-slate-900 group-hover:text-[#204696]' : 'text-white group-hover:text-[#58C1EB]'
              }`}>
                {t('bento.rampTitle', 'Aircraft Ramp Turnaround & GSE Pushback')}
              </h3>
              <p className={`text-sm leading-relaxed max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {t('bento.rampDesc', 'Full-service airside turnaround under IATA ISAGO. Towbarless pushback tractors, Ground Power Units (GPU 400Hz), air start units, baggage conveyors, and potable water/toilet sanitization servicing.')}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Marshalling & Chocks', 'Towbarless Pushback', 'GPU 90-180 kVA', 'Baggage Reconciliation (BRS)'].map((f) => (
                  <span key={f} className={`text-xs px-2.5 py-1 rounded border ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-[#071120] border-[#204696]/25 text-slate-300'
                  }`}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-6 flex items-center justify-between">
              <button
                onClick={() => onNavigate('/ramp-handling')}
                className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                  isLight ? 'text-[#204696] hover:text-[#153170]' : 'text-white hover:text-[#58C1EB]'
                }`}
              >
                <span>{t('bento.rampAction', 'View Ramp Protocol')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                ISAGO Registered
              </span>
            </div>
          </div>

          {/* Card 2: Cargo Terminal */}
          <div className={`group border rounded-2xl overflow-hidden transition-all p-6 sm:p-8 flex flex-col justify-between shadow-lg ${
            isLight
              ? 'bg-white border-slate-200 hover:border-[#204696]/50 hover:shadow-slate-300/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 shadow-[#204696]/5'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono uppercase tracking-wider ${
                  isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
                }`}>
                  {t('bento.cargoPill', '02 · Air Freight')}
                </span>
                <span className={`text-xs font-mono ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                  EU RA3
                </span>
              </div>
              <h3 className={`text-xl font-bold transition-colors ${
                isLight ? 'text-slate-900 group-hover:text-[#204696]' : 'text-white group-hover:text-[#58C1EB]'
              }`}>
                {t('bento.cargoTitle', 'Aviance Cargo Village & Cold Chain')}
              </h3>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {t('bento.cargoDesc', 'EU RA3 certified air freight logistics with temperature-monitored pharmaceutical and perishable cold vaults (+2°C to +8°C).')}
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between">
              <button
                onClick={() => onNavigate('/cargo')}
                className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                  isLight ? 'text-[#204696] hover:text-[#153170]' : 'text-white hover:text-[#58C1EB]'
                }`}
              >
                <span>{t('bento.cargoSpecs', 'Cargo Specifications')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenCargoModal}
                className={`text-xs ${isLight ? 'text-[#204696] hover:underline' : 'text-[#58C1EB] hover:underline'}`}
              >
                {t('bento.cargoQuote', 'Quote Rates')}
              </button>
            </div>
          </div>

          {/* Card 3: Adinkra Lounge */}
          <div className={`group border rounded-2xl overflow-hidden transition-all p-6 sm:p-8 flex flex-col justify-between shadow-lg ${
            isLight
              ? 'bg-white border-slate-200 hover:border-[#204696]/50 hover:shadow-slate-300/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 shadow-[#204696]/5'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono uppercase tracking-wider ${
                  isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
                }`}>
                  {t('bento.vipPill', '03 · VIP Hospitality')}
                </span>
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Terminal 3
                </span>
              </div>
              <h3 className={`text-xl font-bold transition-colors ${
                isLight ? 'text-slate-900 group-hover:text-[#204696]' : 'text-white group-hover:text-[#58C1EB]'
              }`}>
                {t('bento.vipTitle', 'Adinkra Executive Lounge')}
              </h3>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {t('bento.vipDesc', 'Ghana’s premier departure lounge at Kotoka Terminal 3. High-speed Wi-Fi, chef-curated dining, private showers, and quiet business pods.')}
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between">
              <button
                onClick={() => onNavigate('/lounge')}
                className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                  isLight ? 'text-[#204696] hover:text-[#153170]' : 'text-white hover:text-[#58C1EB]'
                }`}
              >
                <span>{t('bento.vipAmenities', 'Lounge Amenities')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenVipModal}
                className={`text-xs ${isLight ? 'text-[#204696] hover:underline' : 'text-[#58C1EB] hover:underline'}`}
              >
                {t('bento.vipBook', 'Book Access')}
              </button>
            </div>
          </div>

          {/* Card 4: Passenger Services (Col-Span-2) */}
          <div className={`md:col-span-2 group border rounded-2xl overflow-hidden transition-all p-6 sm:p-8 flex flex-col justify-between shadow-lg ${
            isLight
              ? 'bg-white border-slate-200 hover:border-[#204696]/50 hover:shadow-slate-300/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 shadow-[#204696]/5'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono uppercase tracking-wider ${
                  isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
                }`}>
                  {t('bento.paxPill', '04 · Front-of-House')}
                </span>
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Amadeus · Sabre · SITA
                </span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold transition-colors ${
                isLight ? 'text-slate-900 group-hover:text-[#204696]' : 'text-white group-hover:text-[#58C1EB]'
              }`}>
                {t('bento.paxTitle', 'Passenger Check-in, Boarding & PRM Care')}
              </h3>
              <p className={`text-sm leading-relaxed max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {t('bento.paxDesc', 'Certified DCS agents operating check-in, biometric gate verification, transit connection desks, and specialized PRM assistance with high-lift ambulifts.')}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['DCS Check-in', 'Gate Management', 'PRM Ambulift', 'VIP Protocol Escort'].map((f) => (
                  <span key={f} className={`text-xs px-2.5 py-1 rounded border ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-[#071120] border-[#204696]/25 text-slate-300'
                  }`}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-6 flex items-center justify-between">
              <button
                onClick={() => onNavigate('/passenger-services')}
                className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                  isLight ? 'text-[#204696] hover:text-[#153170]' : 'text-white hover:text-[#58C1EB]'
                }`}
              >
                <span>{t('bento.paxDetails', 'Passenger Handling Details')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('/find-my-bag')}
                className={`text-xs font-semibold flex items-center gap-1 ${
                  isLight ? 'text-[#204696] hover:text-[#153170]' : 'text-[#58C1EB] hover:text-white'
                }`}
              >
                <Luggage className="w-3.5 h-3.5" /> {t('nav.findMyBag', 'Find My Bag')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TURNAROUND TIMELINE INTERACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TurnaroundTimeline />
      </section>

      {/* SMART SERVICE FINDER (INTERACTIVE DISCOVERY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmartServiceFinder
          onNavigate={onNavigate}
          onOpenCargoModal={onOpenCargoModal}
          onOpenVipModal={onOpenVipModal}
        />
      </section>

      {/* 5. INTERACTIVE GHANA MAP & STATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className={`text-xs uppercase tracking-wider font-semibold ${
            isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
          }`}>
            {t('map.kicker', 'National Network')}
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('map.title', 'Strategic Presence Across Ghanaian Aerodromes')}
          </h2>
          <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {t('map.desc', 'Click any station to review handling capacities, operating hours, and local dispatch contacts.')}
          </p>
        </div>

        <GhanaMap locations={locations} />
      </section>

      {/* 6. SAFETY, QUALITY & COMPLIANCE BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`border rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl transition-all ${
          isLight
            ? 'bg-white border-slate-200/90 shadow-slate-200/60'
            : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
        }`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div>
              <div className={`text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
              }`}>
                {t('certs.kicker', 'Safety Governance')}
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {t('certs.title', 'Internationally Audited Operational Standards')}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/certifications')}
              className={`text-xs font-semibold flex items-center gap-1 ${
                isLight ? 'text-[#204696] hover:text-[#153170]' : 'text-[#58C1EB] hover:text-white'
              }`}
            >
              <span>{t('certs.viewAll', 'View All Certificates')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.slice(0, 3).map((cert) => (
              <div
                key={cert.id}
                className={`border rounded-xl p-5 space-y-2 transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#071120] border-[#204696]/25'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-semibold ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    {cert.certificateNumber}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t('certs.active', 'Active')}
                  </span>
                </div>
                <h4 className={`text-sm font-bold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {cert.name}
                </h4>
                <p className={`text-xs leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {cert.issuer} · Valid to {cert.expiryDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER AIRLINES & CARGO FREIGHTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className={`text-xs uppercase tracking-wider font-semibold ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            {t('customers.kicker', 'Official Customer Airline Operations')}
          </div>
          <h3 className={`text-xl sm:text-2xl font-bold ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('customers.title', 'Carriers Handled in Ghana')}
          </h3>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {t('customers.desc', 'Airlines and alliance networks with verified ground and cargo handling operations managed by Aviance Ghana.')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {customers.map((c) => (
            <div
              key={c.id}
              className={`border rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-[#204696]/40 hover:bg-slate-50 shadow-2xs'
                  : 'bg-[#0C1933]/90 border-[#204696]/25 hover:border-[#58C1EB]/50 hover:bg-[#0E2042]'
              }`}
            >
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-mono font-bold text-xs mb-2 ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-[#204696]'
                  : 'bg-[#071120] border-[#204696]/30 text-[#58C1EB]'
              }`}>
                {c.logoUrl}
              </div>
              <div className={`text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                {c.name}
              </div>
              <div className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {c.category === 'Cargo Carrier' ? 'Cargo Operations' : c.category === 'Aviation Alliance' ? 'Alliance Network' : 'Scheduled Airline'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LATEST NEWS & PRESS RELEASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className={`flex items-center justify-between border-b pb-4 ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              {t('news.kicker', 'Corporate Bulletins')}
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('news.title', 'Latest News & Operational Updates')}
            </h3>
          </div>
          <button
            onClick={() => onNavigate('/news')}
            className={`text-xs font-semibold flex items-center gap-1 ${
              isLight ? 'text-[#204696] hover:text-[#153170]' : 'text-[#58C1EB] hover:text-white'
            }`}
          >
            <span>{t('news.allPress', 'All Press Releases')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 3).map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/news/${article.slug}`)}
              className={`group cursor-pointer border rounded-xl overflow-hidden transition-all flex flex-col justify-between shadow-lg ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-[#204696]/50 hover:shadow-slate-300/60'
                  : 'bg-[#0C1933]/90 border-[#204696]/25 hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 shadow-[#204696]/5'
              }`}
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className={isLight ? 'text-[#204696] font-semibold' : 'text-[#58C1EB] font-medium'}>
                    {article.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <h4 className={`text-base font-bold transition-colors line-clamp-2 ${
                  isLight ? 'text-slate-900 group-hover:text-[#204696]' : 'text-white group-hover:text-[#58C1EB]'
                }`}>
                  {article.title}
                </h4>
                <p className={`text-xs leading-relaxed line-clamp-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {article.excerpt}
                </p>
              </div>
              <div className={`px-6 pb-6 pt-2 flex items-center justify-between text-xs border-t ${
                isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/60 text-slate-400'
              }`}>
                <span>{article.readTimeMinutes} {t('news.minRead', 'min read')}</span>
                <span className={`group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold ${
                  isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                }`}>
                  {t('news.read', 'Read Article')} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. FINAL CONVERSION / CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className={`border rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl transition-all ${
          isLight
            ? 'bg-gradient-to-r from-blue-50 via-slate-50 to-blue-100/60 border-blue-200/80 shadow-slate-200/60'
            : 'bg-gradient-to-r from-[#0C1933] via-[#10244C] to-[#204696]/50 border-[#204696]/40 shadow-[#204696]/15'
        }`}>
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('cta.title', "Partner with Ghana's Aviation Ground Handling Leader")}
            </h3>
            <p className={`text-sm leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {t('cta.desc', "Whether you are an international airline scheduling new routes into Kotoka Terminal 3, an air freight charter, or an executive jet operator, Aviance Ghana delivers certified operational excellence.")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-sm rounded-xl transition-all shadow-md text-center"
            >
              {t('cta.contact', 'Contact Head Office')}
            </button>
            <button
              onClick={onOpenVipModal}
              className={`px-6 py-3.5 font-semibold text-sm rounded-xl transition-all border text-center ${
                isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                  : 'bg-[#081326] hover:bg-[#0E2042] text-white border-[#204696]/30'
              }`}
            >
              {t('cta.vip', 'Request VIP / Charter Service')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
