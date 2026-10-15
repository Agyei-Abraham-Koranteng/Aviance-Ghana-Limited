import React from 'react';
import { Crown, Wifi, Coffee, ShowerHead, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface VipLoungePageProps {
  onNavigate: (path: string) => void;
  onOpenVipModal: () => void;
}

export const VipLoungePage: React.FC<VipLoungePageProps> = ({ onNavigate: _onNavigate, onOpenVipModal }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero in Official Aviance Blue */}
      <div className={`relative py-20 border-b overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-blue-50 via-slate-50 to-white border-slate-200'
          : 'bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-[#204696]/30'
      }`}>
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/20'
        }`} />
        <div className="absolute inset-0 opacity-15">
          <img
            src="/src/assets/images/adinkra_vip_lounge_1791329977934.jpg"
            alt="Adinkra Lounge interior at Kotoka Terminal 3"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
            isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
          }`}>
            <Crown className="w-4 h-4" /> {t('pages.lounge.kicker', 'Kotoka International Airport Terminal 3 · Executive Departures')}
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('pages.lounge.title', 'Adinkra Lounge & Aviance VIP Protocol')}
          </h1>

          <p className={`text-base max-w-2xl leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('pages.lounge.desc', 'Experience the pinnacle of Ghanaian warmth, hospitality, and discretion. From executive airport lounge comfort overlooking the apron to personalized tarmac vehicle transfers for heads of state, diplomats, and private jet travelers.')}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenVipModal}
              className="px-6 py-3 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>{t('pages.lounge.bookBtn', 'Book Lounge Pass or VIP Handling')}</span>
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
              <span>{t('pages.lounge.hotline', 'VIP Protocol & Charter Hotline (+233 (0) 59 381 6076)')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: Adinkra Lounge Amenities */}
        <div className="space-y-6">
          <div className={`border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            <div className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              {t('pages.lounge.amenitiesKicker', 'Terminal 3 Departure Luxury')}
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('pages.lounge.amenitiesTitle', 'Adinkra Lounge Amenities')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
            }`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
              }`}>
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Artisanal Dining & Bar</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Chef-crafted hot dishes, continental and authentic Ghanaian delicacies, freshly brewed coffees, and a complimentary selection of fine wines and beverages.
              </p>
            </div>

            <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
            }`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
              }`}>
                <ShowerHead className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Private Executive Showers</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Spacious shower suites equipped with plush towels, hair dryers, and premium toiletries to freshen up before long-haul intercontinental flights.
              </p>
            </div>

            <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
            }`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
              }`}>
                <Wifi className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Fiber Wi-Fi & Work Pods</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Dedicated acoustic work stations, high-speed fiber internet, universal international power outlets, and wireless device charging pads.
              </p>
            </div>

            <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
            }`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
              }`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Priority Gate Assistance</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Dedicated flight departure displays and personalized boarding alerts so you never miss a flight announcement while relaxing.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Aviance VIP & Private Jet Ground Handling */}
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
                {t('pages.lounge.vipKicker', 'General Aviation & Diplomats')}
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {t('pages.lounge.vipTitle', 'Aviance VIP & Charter Flight Handling')}
              </h2>
            </div>
            <span className={`text-xs font-mono px-3 py-1 rounded ${
              isLight ? 'text-[#204696] bg-blue-50 font-bold' : 'text-[#58C1EB] bg-[#58C1EB]/10'
            }`}>
              24/7 Diplomatic Liaison
            </span>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 text-xs ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            <div className={`p-4 rounded-xl border space-y-2 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-bold text-sm block ${isLight ? 'text-slate-900' : 'text-white'}`}>Tarmac Transfers</span>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Private luxury vehicle transfer between aircraft stand and terminal VIP lounge, bypassing public concourses.</p>
            </div>
            <div className={`p-4 rounded-xl border space-y-2 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-bold text-sm block ${isLight ? 'text-slate-900' : 'text-white'}`}>Expedited Border Processing</span>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Dedicated protocol liaison with Ghana Immigration Service and Customs for discrete expedited clearances.</p>
            </div>
            <div className={`p-4 rounded-xl border space-y-2 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className={`font-bold text-sm block ${isLight ? 'text-slate-900' : 'text-white'}`}>Executive Aircraft Handling</span>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Pushback, fueling coordination, lavatory/potable water servicing, and inflight catering liaison for executive jets.</p>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className={`border rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isLight
            ? 'bg-blue-50/70 border-blue-200'
            : 'bg-gradient-to-r from-slate-900 to-[#0C1A3A] border-slate-800'
        }`}>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Reserve Adinkra Lounge Passes or Book VIP Protocol
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Advance booking guarantees access and tarmac transfer arrangements.
            </p>
          </div>
          <button
            onClick={onOpenVipModal}
            className="px-6 py-3 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors shrink-0"
          >
            {t('common.requestAccess', 'Submit Booking Request')}
          </button>
        </div>
      </div>
    </div>
  );
};
