import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { Service } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface ServiceDetailPageProps {
  service: Service;
  allServices: Service[];
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
  onOpenVipModal: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  allServices,
  onNavigate,
  onOpenCargoModal,
  onOpenVipModal,
}) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  const getLocalizedTitle = (s: Service) => {
    switch (s.slug) {
      case 'passenger-services': return t('services.passenger.title', s.title);
      case 'ramp-handling': return t('services.ramp.title', s.title);
      case 'cargo': return t('services.cargo.title', s.title);
      case 'vip-charter': return t('services.vip.title', s.title);
      case 'lounge': return t('services.lounge.title', s.title);
      case 'baggage': return t('services.baggage.title', s.title);
      case 'gse-fleet-maintenance': return t('services.gse.title', s.title);
      case 'training': return t('services.training.title', s.title);
      case 'security-flight-supervision': return t('services.security.title', s.title);
      default: return s.title;
    }
  };

  const getLocalizedDesc = (s: Service) => {
    switch (s.slug) {
      case 'passenger-services': return t('services.passenger.desc', s.shortDescription);
      case 'ramp-handling': return t('services.ramp.desc', s.shortDescription);
      case 'cargo': return t('services.cargo.desc', s.shortDescription);
      case 'vip-charter': return t('services.vip.desc', s.shortDescription);
      case 'lounge': return t('services.lounge.desc', s.shortDescription);
      case 'baggage': return t('services.baggage.desc', s.shortDescription);
      case 'gse-fleet-maintenance': return t('services.gse.desc', s.shortDescription);
      case 'training': return t('services.training.desc', s.shortDescription);
      case 'security-flight-supervision': return t('services.security.desc', s.shortDescription);
      default: return s.shortDescription;
    }
  };

  const relatedServices = allServices
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 2);

  const fallbackRelated = relatedServices.length > 0 ? relatedServices : allServices.filter((s) => s.id !== service.id).slice(0, 2);

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero Header in Official Aviance Blue */}
      <div className={`relative py-16 border-b overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-blue-50 via-slate-50 to-white border-slate-200'
          : 'bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-[#204696]/30'
      }`}>
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/20'
        }`} />
        <div className="absolute inset-0 opacity-15">
          <img
            src={service.heroImage || '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg'}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <button
            onClick={() => onNavigate('/services')}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-400 hover:text-[#58C1EB]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Services</span>
          </button>

          <div className={`flex flex-wrap items-center gap-2 text-xs font-mono ${
            isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
          }`}>
            <span>{service.category}</span>
            <span aria-hidden="true">·</span>
            <span>IATA ISAGO Compliant</span>
            <span aria-hidden="true">·</span>
            <span>{service.operatingHours}</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight text-balance ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {getLocalizedTitle(service)}
          </h1>

          <p className={`text-base max-w-3xl leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {getLocalizedDesc(service)}
          </p>

          <div className="pt-4 flex flex-wrap gap-2">
            {service.locations.map((loc) => (
              <span key={loc} className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 border ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                  : 'bg-slate-950/80 border-slate-700/80 text-slate-200'
              }`}>
                <MapPin className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> {loc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left 2 Cols: Detailed Scope & Features */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-4">
              <h2 className={`text-xl font-bold border-b pb-3 ${
                isLight ? 'text-slate-900 border-slate-200' : 'text-white border-slate-800'
              }`}>
                Operational Overview & Scope of Service
              </h2>
              <p className={`text-sm leading-relaxed whitespace-pre-line ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {service.fullDescription}
              </p>
            </section>

            {/* Certified Features & Capabilities */}
            <section className="space-y-4">
              <h2 className={`text-xl font-bold border-b pb-3 ${
                isLight ? 'text-slate-900 border-slate-200' : 'text-white border-slate-800'
              }`}>
                Certified Service Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 border rounded-xl flex items-start gap-3 shadow-md ${
                      isLight
                        ? 'bg-white border-slate-200 shadow-slate-200/50'
                        : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isLight ? 'text-emerald-600' : 'text-[#72BF44]'
                    }`} />
                    <span className={`text-xs font-medium leading-snug ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs if available */}
            {service.faqs && service.faqs.length > 0 && (
              <section className="space-y-4">
                <h2 className={`text-xl font-bold border-b pb-3 flex items-center gap-2 ${
                  isLight ? 'text-slate-900 border-slate-200' : 'text-white border-slate-800'
                }`}>
                  <HelpCircle className={`w-4 h-4 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                  Frequently Asked Operational Questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className={`border rounded-xl p-4 space-y-2 shadow-md ${
                      isLight
                        ? 'bg-white border-slate-200 shadow-slate-200/50'
                        : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
                    }`}>
                      <h4 className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {faq.question}
                      </h4>
                      <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Col: Contact & Action Panel */}
          <div className="space-y-6">
            <div className={`border rounded-2xl p-6 space-y-6 sticky top-28 shadow-xl ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0A162C]/95 border-[#204696]/40'
            }`}>
              <div>
                <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                  isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
                }`}>
                  Service Dispatch & Liaison
                </div>
                <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Operational Desk Contacts
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className={`p-3 rounded-lg border space-y-1 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#071120] border-[#204696]/25'
                }`}>
                  <div className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <Clock className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> Operational Availability
                  </div>
                  <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{service.operatingHours}</div>
                </div>

                <div className={`p-3 rounded-lg border space-y-1 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/80'
                }`}>
                  <div className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> Operations Desk Phone
                  </div>
                  <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{service.contactPhone}</div>
                </div>

                <div className={`p-3 rounded-lg border space-y-1 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/80'
                }`}>
                  <div className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <Mail className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> Direct Liaison Email
                  </div>
                  <a href={`mailto:${service.contactEmail}`} className={`hover:underline font-semibold block truncate ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    {service.contactEmail}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                {service.slug === 'cargo' ? (
                  <button
                    onClick={onOpenCargoModal}
                    className="w-full py-2.5 bg-[#204696] hover:bg-[#183878] text-white font-bold text-xs rounded-xl transition-colors shadow-sm text-center"
                  >
                    {t('common.quoteCargo', 'Request Air Cargo Handling Quote')}
                  </button>
                ) : service.slug === 'vip-charter' || service.slug === 'lounge' ? (
                  <button
                    onClick={onOpenVipModal}
                    className="w-full py-2.5 bg-[#204696] hover:bg-[#183878] text-white font-bold text-xs rounded-xl transition-colors shadow-sm text-center"
                  >
                    {t('common.requestAccess', 'Request VIP Lounge / Handling')}
                  </button>
                ) : service.slug === 'baggage' ? (
                  <button
                    onClick={() => onNavigate('/find-my-bag')}
                    className="w-full py-2.5 bg-[#204696] hover:bg-[#183878] text-white font-bold text-xs rounded-xl transition-colors shadow-sm text-center"
                  >
                    {t('nav.findMyBag', 'Open Find My Bag Portal')}
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('/contact')}
                    className="w-full py-2.5 bg-[#204696] hover:bg-[#183878] text-white font-bold text-xs rounded-xl transition-colors shadow-sm text-center"
                  >
                    {t('nav.contact', 'Contact Operations Department')}
                  </button>
                )}

                <button
                  onClick={() => onNavigate('/contact')}
                  className={`w-full py-2.5 font-semibold text-xs rounded-xl transition-colors text-center border ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  {t('footer.headOffice', 'General Head Office Enquiry')}
                </button>
              </div>
            </div>

            {/* Related Services */}
            {fallbackRelated.length > 0 && (
              <div className={`border rounded-2xl p-6 space-y-3 shadow-xl ${
                isLight ? 'bg-white border-slate-200/90' : 'bg-[#0C1933]/90 border-[#204696]/30'
              }`}>
                <div className={`text-xs font-semibold uppercase tracking-wider ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Related Services
                </div>
                <div className="space-y-2">
                  {fallbackRelated.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => onNavigate(`/services/${r.slug}`)}
                      className={`w-full text-left p-3 rounded-lg transition-colors group border ${
                        isLight
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                          : 'bg-[#071120] hover:bg-[#0E1C38] border-[#204696]/25'
                      }`}
                    >
                      <div className={`text-xs font-semibold ${
                        isLight ? 'text-slate-900 group-hover:text-[#204696]' : 'text-slate-200 group-hover:text-[#58C1EB]'
                      }`}>
                        {getLocalizedTitle(r)}
                      </div>
                      <div className={`text-[11px] line-clamp-1 mt-0.5 ${
                        isLight ? 'text-slate-500' : 'text-slate-500'
                      }`}>
                        {getLocalizedDesc(r)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
