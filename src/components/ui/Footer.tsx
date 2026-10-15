import React from 'react';
import { Plane, MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { AvianceLogo } from './AvianceLogo';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  return (
    <footer className={`relative border-t overflow-hidden transition-colors ${
      isLight
        ? 'bg-[#F1F5F9] border-[#204696]/20 text-slate-600'
        : 'bg-[#060D1A] border-[#204696]/30 text-slate-300'
    }`}>
      {/* Subtle bottom ambient glow in Aviance Royal Cobalt Blue */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#204696]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#58C1EB]/5 blur-3xl pointer-events-none rounded-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b ${
          isLight ? 'border-slate-300/80' : 'border-slate-800/80'
        }`}>
          {/* Column 1: Company Profile & Accreditations */}
          <div className="lg:col-span-2 space-y-4">
            <div className="py-1">
              <AvianceLogo variant={isLight ? 'on-light' : 'on-dark'} size="lg" />
            </div>
            <p className={`text-sm leading-relaxed max-w-sm ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {t('footer.companyDesc', 'Established in 1994, Aviance Ghana is a full-service aviation ground handling provider operating at Kotoka International Airport (Accra), Kumasi, and Tamale. Delivering IATA ISAGO-certified ramp handling, Cargo RA3 security, passenger services, executive lounge hospitality, and VIP/charter assistance.')}
            </p>

            <div className="pt-2">
              <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                isLight ? 'text-slate-500' : 'text-slate-500'
              }`}>
                {t('footer.certTitle', 'Official Certifications & Standards')}
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className={`px-2.5 py-1 rounded flex items-center gap-1.5 border ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-700 shadow-xs'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#204696]" /> IATA ISAGO Registered
                </span>
                <span className={`px-2.5 py-1 rounded border ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-700 shadow-xs'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                  GCAA Authorized GHO
                </span>
                <span className={`px-2.5 py-1 rounded border ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-700 shadow-xs'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                  Cargo RA3 Certified
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Aviation Services */}
          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('footer.aviationServices', 'Aviation Services')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('/passenger-services')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.paxHandling', 'Passenger Handling & PRM')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/ramp-handling')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.rampTurnaround', 'Aircraft Ramp Turnaround')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/cargo')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.cargoVillage', 'Air Cargo Village Terminal')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/vip-charter')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.vipCharter', 'Aviance VIP & Charter')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/lounge')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.adinkraLounge', 'Adinkra Executive Lounge')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/baggage')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.baggageDesk', 'Baggage & WorldTracer')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/find-my-bag')} className={`font-medium transition-colors text-left flex items-center gap-1 ${
                  isLight ? 'text-[#204696] hover:text-[#18397a]' : 'text-[#58C1EB] hover:text-white'
                }`}>
                  {t('footer.findMyBag', 'Find My Bag Portal')} <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate & Network */}
          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('footer.corporateLinks', 'Corporate & Hubs')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('/about')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.aboutAviance', 'About Aviance Ghana')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/operations')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.opHubs', 'Operational Hubs (ACC·KMS·TML)')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/management')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.leadership', 'Executive Leadership')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/certifications')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.safetyCerts', 'Safety, Licences & Compliance')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/news')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.newsPress', 'News & Press Releases')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/careers')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.careersNss', 'Careers & National Service')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/code-of-conduct')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.codeOfConduct', 'Corporate Code of Conduct')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/documents')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.docCentre', 'Digital Document Centre')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/partner-portal')} className={`transition-colors text-left flex items-center gap-1 ${
                  isLight ? 'text-[#204696] hover:text-[#18397a]' : 'text-sky-400 hover:text-sky-300'
                }`}>
                  {t('footer.airlinePortal', 'Partner Portal Concept')} <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faqs')} className={`transition-colors text-left ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.helpFaqs', 'Help & FAQs')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Stations */}
          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('footer.headOffice', 'Head Office Contact')}
            </h4>
            <div className={`space-y-3 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <div className="flex items-start gap-2">
                <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <div>
                  <span className={`block font-medium ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                    Head Office · Cargo Village
                  </span>
                  P.M.B. 33, Kotoka International Airport, Accra, Ghana
                  <div className={`font-mono text-[11px] mt-0.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]/90'}`}>
                    Digital Address: GL-016-1234
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <span>+233 (0) 30 277 8025 / +233 (0) 59 381 6076</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <a href="mailto:info@avianceghana.com" className={`transition-colors ${
                  isLight ? 'hover:text-[#204696] text-slate-700' : 'hover:text-white text-slate-300'
                }`}>
                  info@avianceghana.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <span>{t('footer.hours', 'Office: Mon–Fri 08:00–17:00 · Flight Ops 24/7')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with Official Copyright & Station Details */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          <div>
            &copy; {new Date().getFullYear()} Aviance Ghana Limited. Kotoka International Airport Terminal 3, Accra, Ghana. {t('footer.copyright', 'All rights reserved.')}
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => onNavigate('/privacy-policy')} className={`transition-colors ${
              isLight ? 'hover:text-[#204696]' : 'hover:text-white'
            }`}>
              {t('footer.privacy', 'Privacy Policy')}
            </button>
            <button onClick={() => onNavigate('/terms')} className={`transition-colors ${
              isLight ? 'hover:text-[#204696]' : 'hover:text-white'
            }`}>
              {t('footer.terms', 'Terms of Use')}
            </button>
            <button onClick={() => onNavigate('/partner-portal')} className={`font-semibold transition-colors ${
              isLight ? 'text-[#204696] hover:text-[#18397a]' : 'text-[#58C1EB] hover:text-white'
            }`}>
              {t('telemetry.portal', 'Airline Portal')}
            </button>
            <button onClick={() => onNavigate('/admin')} className={`transition-colors font-medium ${
              isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
            }`}>
              {t('drawer.adminPortal', 'CMS Admin Portal')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
