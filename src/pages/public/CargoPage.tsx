import React from 'react';
import {
  PackageCheck,
  ShieldCheck,
  Thermometer,
  ArrowRight,
  Phone,
  Scale
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface CargoPageProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
}

export const CargoPage: React.FC<CargoPageProps> = ({ onNavigate: _onNavigate, onOpenCargoModal }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero in Official Aviance Blue */}
      <div className={`relative py-16 border-b overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-blue-50 via-slate-50 to-white border-slate-200'
          : 'bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-[#204696]/30'
      }`}>
        {/* Subtle Ambient Backing Glow */}
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/20'
        }`} />
        <div className="absolute inset-0 opacity-15">
          <img
            src="/src/assets/images/cargo_freight_terminal_1791329968738.jpg"
            alt="Aviance Cargo Village air cargo loading"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
            isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
          }`}>
            <PackageCheck className="w-4 h-4" /> {t('pages.cargo.kicker', 'Aviance Cargo Village · Kotoka International Airport')}
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('pages.cargo.title', 'Air Cargo Logistics & Cold Chain Infrastructure')}
          </h1>

          <p className={`text-base max-w-2xl leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('pages.cargo.desc', 'Ghana’s premier EU RA3-certified air freight handling terminal. Providing continuous cold-chain perishable vaults, pharmaceutical Good Distribution Practice (GDP) handling, dangerous goods staging, and direct customs integration.')}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenCargoModal}
              className="px-6 py-3 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>{t('pages.cargo.submitBtn', 'Submit Air Cargo Enquiry')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+233593816076"
              className={`px-5 py-3 border text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 shadow-2xs'
                  : 'bg-slate-950 border-slate-700/80 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
              <span>{t('pages.cargo.hotline', 'Cargo Operations Desk (+233 (0) 59 381 6076)')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Specs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
              isLight
                ? 'bg-blue-50 text-[#204696] border-blue-200'
                : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <Thermometer className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('pages.cargo.coldChainTitle', 'Cold Chain & Perishables')}
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('pages.cargo.coldChainDesc', '450m³ dual-redundant cold storage maintaining +2°C to +8°C for pharmaceuticals, fresh fruits, vegetables, and -20°C deep freeze for sea produce and specialized cargo.')}
            </p>
          </div>

          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
              isLight
                ? 'bg-blue-50 text-[#204696] border-blue-200'
                : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('pages.cargo.ra3Title', 'EU RA3 Security Screening')}
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('pages.cargo.ra3Desc', 'Regulated Agent Third Country (RA3) accredited security infrastructure. High-penetration dual-view X-ray inspection, explosive trace detection, and bonded physical escort.')}
            </p>
          </div>

          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
              isLight
                ? 'bg-blue-50 text-[#204696] border-blue-200'
                : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <Scale className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('pages.cargo.dgTitle', 'ULD Build-up & Breakdown')}
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('pages.cargo.dgDesc', 'Specialized roller-bed staging areas for wide-body freighter pallets (PMC, PAG, AMF, AKE). Precision calibrated digital weigh bridges and tie-down net securing under IATA AHM.')}
            </p>
          </div>
        </div>

        {/* Operational Flow & ICUMS Integration */}
        <div className={`border rounded-2xl p-8 space-y-6 shadow-xl transition-all ${
          isLight
            ? 'bg-white border-slate-200/90 shadow-slate-200/60'
            : 'bg-[#0C1933]/95 border-[#204696]/35 shadow-[#204696]/10'
        }`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div>
              <div className={`text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
              }`}>
                Logistics Architecture
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Cargo Village Operational Workflow
              </h2>
            </div>
            <span className={`text-xs font-mono font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              ICUMS Integrated (Ghana Revenue Authority)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className={`p-4 rounded-xl border space-y-1.5 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-mono font-bold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>STAGE 01</span>
              <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Cargo Intake & Verification</div>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Air Waybill validation, dimension checks, dangerous goods checklist verification, and physical receipt.</p>
            </div>

            <div className={`p-4 rounded-xl border space-y-1.5 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-mono font-bold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>STAGE 02</span>
              <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Security Screening & Staging</div>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Dual-view cargo X-ray screening, EU RA3 verification stamp, and transfer to ambient or cold vault storage.</p>
            </div>

            <div className={`p-4 rounded-xl border space-y-1.5 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-mono font-bold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>STAGE 03</span>
              <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Pallet ULD Assembly</div>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Pallet contour shaping, netting, weigh bridge recording, and e-manifest transmission to aircraft loadmaster.</p>
            </div>

            <div className={`p-4 rounded-xl border space-y-1.5 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-mono font-bold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>STAGE 04</span>
              <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Tarmac Transfer & Loading</div>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Tug tractor transport to aircraft stand, main-deck or lower-deck high loader transfer, hold locks engaged.</p>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className={`border rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isLight
            ? 'bg-blue-50/70 border-blue-200'
            : 'bg-gradient-to-r from-slate-900 to-[#0C1A3A] border-slate-800'
        }`}>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Need Customized Cargo Tariffs or Charter Staging?
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Our air freight commercial desk operates 24/7 to provide handling rates and aircraft slot allocations.
            </p>
          </div>
          <button
            onClick={onOpenCargoModal}
            className="px-6 py-3 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors shrink-0"
          >
            {t('common.quoteCargo', 'Submit Cargo Quote Request')}
          </button>
        </div>
      </div>
    </div>
  );
};
