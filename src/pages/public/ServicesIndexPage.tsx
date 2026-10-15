import React, { useState } from 'react';
import { Plane, ArrowRight, ShieldCheck, Search, Users, PackageCheck, Armchair, Luggage, Wrench, GraduationCap, Cpu } from 'lucide-react';
import { Service } from '../../types';
import { SmartServiceFinder } from '../../components/public/SmartServiceFinder';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface ServicesIndexPageProps {
  services: Service[];
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
  onOpenVipModal: () => void;
}

export const ServicesIndexPage: React.FC<ServicesIndexPageProps> = ({
  services,
  onNavigate,
  onOpenCargoModal,
  onOpenVipModal,
}) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Passenger', 'Ramp', 'Cargo', 'VIP & Hospitality', 'Technical', 'Security & Quality'];

  const categoryLabels: Record<string, string> = {
    All: t('pages.services.all', 'All'),
    Passenger: t('nav.passenger', 'Passenger'),
    Ramp: t('nav.ramp', 'Ramp'),
    Cargo: t('nav.cargo', 'Cargo'),
    'VIP & Hospitality': t('nav.vip', 'VIP & Hospitality'),
    Technical: t('nav.gse', 'Technical'),
    'Security & Quality': t('nav.safety', 'Security & Quality'),
  };

  const filteredServices = services.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className={`text-xs uppercase tracking-wider font-semibold ${
          isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
        }`}>
          {t('pages.services.kicker', 'Aviation Services Directory')}
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          {t('pages.services.title', 'Comprehensive Aviation Ground Handling')}
        </h1>
        <p className={`text-base leading-relaxed ${
          isLight ? 'text-slate-600' : 'text-slate-300'
        }`}>
          {t('pages.services.desc', 'Operating across Kotoka International Airport (ACC), Prempeh I International Kumasi (KMS), and Tamale International (TML), Aviance delivers world-class safety, turnaround efficiency, and passenger hospitality.')}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-xl shadow-lg transition-all ${
        isLight
          ? 'bg-white border-slate-200/90 shadow-slate-200/60'
          : 'bg-[#0A162C]/90 border-[#204696]/30 shadow-[#204696]/5'
      }`}>
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-bold'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-white hover:bg-[#0E2042]'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('pages.services.filterPlaceholder', 'Filter services...')}
            className={`w-full border rounded-lg pl-8 pr-3 py-1.5 text-xs transition-colors focus:outline-none ${
              isLight
                ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                : 'bg-[#060D1A] border-[#204696]/30 text-white placeholder-slate-500 focus:border-[#58C1EB]'
            }`}
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`group border rounded-2xl overflow-hidden transition-all flex flex-col justify-between p-6 shadow-lg ${
              isLight
                ? 'bg-white border-slate-200/90 hover:border-[#204696]/50 hover:shadow-slate-300/60'
                : 'bg-[#0C1933]/90 border-[#204696]/25 hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 shadow-[#204696]/5'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-semibold uppercase ${
                  isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
                }`}>
                  {service.category}
                </span>
                <span className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                  {service.locations[0]?.split('(')[0] || 'ACC'}
                </span>
              </div>

              <h2 className={`text-xl font-bold transition-colors ${
                isLight ? 'text-slate-900 group-hover:text-[#204696]' : 'text-white group-hover:text-[#58C1EB]'
              }`}>
                {getLocalizedTitle(service)}
              </h2>

              <p className={`text-xs leading-relaxed line-clamp-3 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {getLocalizedDesc(service)}
              </p>

              {/* Key Features Bullet List */}
              <div className={`space-y-1.5 pt-2 border-t ${
                isLight ? 'border-slate-100' : 'border-slate-800/80'
              }`}>
                {service.features.slice(0, 3).map((f, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#204696] shrink-0"></span>
                    <span className="line-clamp-1">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`pt-6 mt-6 border-t flex items-center justify-between ${
              isLight ? 'border-slate-100' : 'border-slate-800'
            }`}>
              <button
                onClick={() => onNavigate(`/services/${service.slug}`)}
                className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                  isLight ? 'text-[#204696] hover:text-[#18397a]' : 'text-white group-hover:text-[#58C1EB]'
                }`}
              >
                <span>{t('common.fullSpecs', 'Full Specifications')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {service.slug === 'cargo' ? (
                <button
                  onClick={onOpenCargoModal}
                  className={`text-xs font-semibold ${isLight ? 'text-[#204696] hover:underline' : 'text-[#58C1EB] hover:underline'}`}
                >
                  {t('common.quoteCargo', 'Quote Cargo')}
                </button>
              ) : service.slug === 'vip-charter' || service.slug === 'lounge' ? (
                <button
                  onClick={onOpenVipModal}
                  className={`text-xs font-semibold ${isLight ? 'text-[#204696] hover:underline' : 'text-[#58C1EB] hover:underline'}`}
                >
                  {t('common.requestAccess', 'Request Access')}
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Discovery Finder */}
      <div className="pt-8">
        <SmartServiceFinder
          onNavigate={onNavigate}
          onOpenCargoModal={onOpenCargoModal}
          onOpenVipModal={onOpenVipModal}
        />
      </div>
    </div>
  );
};
