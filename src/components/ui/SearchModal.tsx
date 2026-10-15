import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Plane,
  FileText,
  Briefcase,
  HelpCircle,
  Users,
  MapPin,
  Handshake,
  FolderDown,
  History,
  Sparkles,
  Command,
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { INITIAL_FAQS, INITIAL_DOCUMENTS } from '../../constants/avianceData';
import { Service, NewsArticle, Vacancy, TeamMember, CustomerPartner, LocationItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('aviance_recent_searches') || '[]');
    } catch {
      return ['Cargo Village', 'Find My Bag', 'Adinkra Lounge', 'Turnaround'];
    }
  });

  const [services, setServices] = useState<Service[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [customers, setCustomers] = useState<CustomerPartner[]>([]);
  const [locations, setLocations] = useState<LocationItem[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setServices(dataService.getServices());
      setNews(dataService.getNews());
      setVacancies(dataService.getVacancies());
      setTeam(dataService.getTeam());
      setCustomers(dataService.getCustomers());
      setLocations(dataService.getLocations());
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const handleSelect = (path: string, termToRecord?: string) => {
    const term = termToRecord || query.trim();
    if (term) {
      const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
      setRecentSearches(updated);
      try {
        localStorage.setItem('aviance_recent_searches', JSON.stringify(updated));
      } catch {}
    }
    onClose();
    onNavigate(path);
  };

  const handleRemoveRecent = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s !== term);
    setRecentSearches(updated);
    try {
      localStorage.setItem('aviance_recent_searches', JSON.stringify(updated));
    } catch {}
  };

  // Filtered lists
  const filteredServices = q
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      )
    : services.slice(0, 3);

  const filteredPages = [
    { name: 'Adinkra Executive Lounge (Terminal 3)', path: '/lounge', category: 'Pages', desc: 'Hospitality, Wi-Fi, refreshments & showers' },
    { name: 'Find My Bag · Status & Tracing', path: '/find-my-bag', category: 'Pages', desc: 'Kotoka Terminal 3 baggage reconciliation' },
    { name: 'Air Cargo Terminal & Cold Chain', path: '/cargo', category: 'Pages', desc: 'EU RA3 certified warehouse & cold rooms' },
    { name: 'Flight Operations & Turnaround', path: '/operations', category: 'Pages', desc: '24/7 OCC dispatch & ramp marshalling' },
    { name: 'Safety, Quality & Certifications', path: '/certifications', category: 'Pages', desc: 'IATA ISAGO, Cargo RA3, GCAA license' },
    { name: 'Executive Leadership Team', path: '/management', category: 'Pages', desc: 'Board of directors & executive profiles' },
    { name: 'Digital Document Centre', path: '/documents', category: 'Pages', desc: 'Corporate policies, SGHA & code of conduct' },
    { name: 'Airline Partner Portal Concept', path: '/partner-portal', category: 'Pages', desc: 'Commercial slot handling & turnaround requests' },
    { name: 'Frequently Asked Questions (FAQ)', path: '/faqs', category: 'Pages', desc: 'Common inquiries on terminal services' },
    { name: 'Station Contact Directory', path: '/contact', category: 'Pages', desc: 'Kotoka T3, Kumasi & Tamale station numbers' },
  ].filter((p) => !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));

  const filteredNews = q
    ? news.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      )
    : news.slice(0, 2);

  const filteredFaqs = q
    ? INITIAL_FAQS.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      )
    : [];

  const filteredVacancies = q
    ? vacancies.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.department.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      )
    : [];

  const filteredTeam = q
    ? team.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.position.toLowerCase().includes(q) ||
          t.department.toLowerCase().includes(q)
      )
    : [];

  const filteredDocuments = q
    ? INITIAL_DOCUMENTS.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      )
    : [];

  const filteredCustomers = q
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.servicesProvided.some((s) => s.toLowerCase().includes(q))
      )
    : [];

  const categories = ['All', 'Services', 'Pages', 'News', 'FAQs', 'Careers', 'Team', 'Documents'];

  const hasAnyResults =
    filteredServices.length > 0 ||
    filteredPages.length > 0 ||
    filteredNews.length > 0 ||
    filteredFaqs.length > 0 ||
    filteredVacancies.length > 0 ||
    filteredTeam.length > 0 ||
    filteredDocuments.length > 0 ||
    filteredCustomers.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-[#060D1A]/85 backdrop-blur-md animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Global Intelligent Search"
    >
      <div className="w-full max-w-3xl bg-[#0A162C] border border-[#204696]/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header Input */}
        <div className="flex items-center px-5 py-4 border-b border-[#204696]/25 gap-3 bg-[#081224]">
          <Search className="w-5 h-5 text-[#58C1EB] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder', 'Search services, documentation, stations, staff, or flights...')}
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none font-medium"
            autoFocus
          />
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0E2042] border border-[#204696]/40 text-[10px] font-mono text-slate-400">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#0E2042] transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-5 py-2.5 bg-[#060D1A]/85 border-b border-[#204696]/20 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          {categories.map((cat) => {
            const categoryLabels: Record<string, string> = {
              All: t('search.categoriesAll', 'All'),
              Services: t('search.categoriesServices', 'Services'),
              Pages: t('nav.services', 'Pages'),
              News: t('drawer.allNews', 'News'),
              FAQs: t('search.categoriesFaqs', 'FAQs'),
              Careers: t('search.categoriesCareers', 'Careers'),
              Team: t('search.categoriesTeam', 'Leadership'),
              Documents: t('search.categoriesDocs', 'Documents'),
            };
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors shrink-0 text-xs ${
                  activeCategory === cat
                    ? 'bg-[#204696] text-white border border-[#58C1EB]/40 shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            );
          })}
        </div>

        {/* Recent & Suggested Queries when query is empty */}
        {!q && (
          <div className="px-5 py-3 bg-slate-950/40 border-b border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 flex items-center gap-1 text-[11px] font-mono">
              <History className="w-3.5 h-3.5" /> {t('search.recent', 'Recent Searches')}:
            </span>
            {recentSearches.map((term) => (
              <span
                key={term}
                onClick={() => setQuery(term)}
                className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-[#58C1EB] transition-colors text-[11px]"
              >
                <span>{term}</span>
                <button
                  onClick={(e) => handleRemoveRecent(e, term)}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Services Group */}
          {(activeCategory === 'All' || activeCategory === 'Services') && filteredServices.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-[#58C1EB]" /> Ground Handling Services
              </div>
              <div className="space-y-1.5">
                {filteredServices.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => handleSelect(srv.slug ? `/services/${srv.slug}` : `/services`, srv.title)}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-800 transition-colors group border border-transparent hover:border-slate-700"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-[#58C1EB]">
                        {srv.title}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">{srv.shortDescription}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#58C1EB] transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pages Group */}
          {(activeCategory === 'All' || activeCategory === 'Pages') && filteredPages.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Official Sections & Portals
              </div>
              <div className="space-y-1.5">
                {filteredPages.map((page, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(page.path, page.name)}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-800 transition-colors group border border-transparent hover:border-slate-700"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-sky-400">
                        {page.name}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">{page.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* News Group */}
          {(activeCategory === 'All' || activeCategory === 'News') && filteredNews.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#58C1EB]" /> Articles & Press Bulletins
              </div>
              <div className="space-y-1.5">
                {filteredNews.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleSelect(`/news/${n.slug}`, n.title)}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-800 transition-colors group border border-transparent hover:border-slate-700"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-[#58C1EB]">
                        {n.title}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">{n.excerpt}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#58C1EB] transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Careers Group */}
          {(activeCategory === 'All' || activeCategory === 'Careers') && filteredVacancies.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#58C1EB]" /> Current Vacancies
              </div>
              <div className="space-y-1.5">
                {filteredVacancies.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleSelect('/careers', v.title)}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-800 transition-colors group border border-transparent hover:border-slate-700"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-[#58C1EB]">
                        {v.title}
                      </div>
                      <div className="text-xs text-slate-400">{v.department} · {v.location}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#58C1EB]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Group */}
          {(activeCategory === 'All' || activeCategory === 'FAQs') && filteredFaqs.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> Frequently Asked Questions
              </div>
              <div className="space-y-1.5">
                {filteredFaqs.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleSelect('/faqs', f.question)}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-800 transition-colors group border border-transparent hover:border-slate-700"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400">
                        {f.question}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">{f.answer}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documents Group */}
          {(activeCategory === 'All' || activeCategory === 'Documents') && filteredDocuments.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FolderDown className="w-3.5 h-3.5 text-[#58C1EB]" /> Publications & Documents
              </div>
              <div className="space-y-1.5">
                {filteredDocuments.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect('/documents', d.title)}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-800 transition-colors group border border-transparent hover:border-slate-700"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-[#58C1EB]">
                        {d.title}
                      </div>
                      <div className="text-xs text-slate-400">{d.category} · {d.fileSize}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#58C1EB]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {q && !hasAnyResults && (
            <div className="text-center py-12 text-slate-400 text-xs space-y-2">
              <p>{t('search.noResults', 'No results found for')} "{query}".</p>
              <p className="text-slate-500">
                Try searching for "Ramp", "Cargo", "Baggage", "Lounge", "ISAGO", or "Kumasi".
              </p>
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="px-5 py-3 bg-[#060D1A] border-t border-[#204696]/25 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Global Intelligent Search · Aviance Ghana</span>
          <span className="hidden sm:inline">{t('search.esc', 'Press ESC to dismiss')}</span>
        </div>
      </div>
    </div>
  );
};
