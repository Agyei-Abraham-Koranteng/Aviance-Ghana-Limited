import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ArrowRight } from 'lucide-react';
import { INITIAL_FAQS } from '../../constants/avianceData';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const categories = [
    'All',
    'Passenger',
    'Baggage',
    'Cargo',
    'Lounge',
    'Careers',
    'Corporate',
    'General',
  ];

  const categoryLabels: Record<string, string> = {
    All: t('pages.services.all', 'All'),
    Passenger: t('nav.passenger', 'Passenger'),
    Baggage: t('telemetry.tracing', 'Baggage'),
    Cargo: t('nav.cargo', 'Cargo'),
    Lounge: t('nav.lounge', 'Lounge'),
    Careers: t('nav.careers', 'Careers'),
    Corporate: t('footer.corporateLinks', 'Corporate'),
    General: 'General',
  };

  const filtered = INITIAL_FAQS.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-150">
      {/* Hero in Official Aviance Blue */}
      <div className={`py-12 border rounded-3xl p-6 sm:p-10 text-center space-y-3 relative overflow-hidden shadow-2xl transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-blue-50 via-slate-50 to-white border-slate-200'
          : 'bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-[#204696]/30'
      }`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 blur-3xl pointer-events-none rounded-full ${
          isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/20'
        }`} />
        <div className="relative z-10 space-y-3">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
            isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
          }`}>
            <HelpCircle className="w-4 h-4" /> {t('pages.faqs.kicker', 'Help & Passenger Assistance')}
          </div>
          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('pages.faqs.title', 'Frequently Asked Questions')}
          </h1>
          <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('pages.faqs.desc', 'Quick answers to common inquiries regarding passenger handling at Kotoka Terminal 3, lost baggage tracing, cargo cold chain storage, and airline recruitment.')}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              language === 'fr'
                ? "Rechercher une question (ex. bagage perdu, accès salon, cargo)..."
                : language === 'tw'
                ? "Hwehwɛ nsɛmmisa (e.g. kotokuo a ayera, ahomegyebea, cargo)..."
                : "Search questions (e.g. lost bag, lounge walk-in, cargo cold room, NSS)..."
            }
            className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm transition-colors focus:outline-none ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696] shadow-2xs'
                : 'bg-[#060D1A] border-[#204696]/30 text-white placeholder-slate-400 focus:border-[#58C1EB]'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#204696] text-white border border-[#58C1EB]/40 shadow-xs'
                  : isLight
                  ? 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-2xs'
                  : 'bg-[#071120] border border-[#204696]/20 text-slate-400 hover:text-white hover:bg-[#0E2042]'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`border rounded-2xl overflow-hidden transition-colors shadow-lg ${
                isLight
                  ? 'bg-white border-slate-200/90 shadow-slate-200/50'
                  : 'bg-[#0C1933]/90 border-[#204696]/25 shadow-[#204696]/5'
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div>
                  <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider block mb-1 ${
                    isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
                  }`}>
                    {faq.category}
                  </span>
                  <span className={`text-sm sm:text-base font-bold leading-snug ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-transform ${
                    isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-600'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  } ${isOpen ? `rotate-180 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}` : ''}`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className={`px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t animate-in fade-in duration-100 ${
                  isLight
                    ? 'border-slate-100 text-slate-700'
                    : 'border-slate-800/80 text-slate-300'
                }`}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className={`text-center py-12 border rounded-2xl text-xs shadow-xl ${
            isLight
              ? 'bg-white border-slate-200 text-slate-600'
              : 'bg-[#0C1933]/90 border-[#204696]/30 text-slate-400'
          }`}>
            {language === 'fr'
              ? 'Aucune question ne correspond à votre recherche. '
              : language === 'tw'
              ? 'Nsɛmmisa biara nni hɔ a ɛne wo nhwehwɛmu hyia. '
              : 'No questions matching your search. '}
            <button
              onClick={() => onNavigate('/contact')}
              className={`hover:underline font-semibold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}
            >
              {language === 'fr' ? 'Contactez directement nos équipes.' : language === 'tw' ? 'Frɛ yɛn afotufoɔ ntɛm.' : 'Contact our team directly.'}
            </button>
          </div>
        )}
      </div>

      {/* Still need help callout */}
      <div className={`border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl ${
        isLight
          ? 'bg-blue-50/80 border-blue-200'
          : 'bg-[#0A162C]/95 border-[#204696]/40'
      }`}>
        <div>
          <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {language === 'fr' ? 'Besoin d\'une Assistance Supplémentaire ?' : language === 'tw' ? 'Wohia Mmoa Bi Bio?' : 'Need Further Assistance?'}
          </h3>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {language === 'fr'
              ? 'Notre Centre de Contrôle des Opérations 24h/24 et nos comptoirs au Terminal 3 sont à votre service.'
              : language === 'tw'
              ? 'Yɛn 24/7 Operations Control Centre ne dwumayɛfoɔ wɔ Kotoka Terminal 3 pɛ sɛ wɔboa wo.'
              : 'Our 24/7 Operations Control Centre and customer service desks at Kotoka Terminal 3 are ready to help.'}
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-5 py-2.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>{t('nav.contact', 'Contact Aviance Ghana')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
