import React, { useState } from 'react';
import { FileText, ArrowRight, Calendar, User, Search } from 'lucide-react';
import { NewsArticle } from '../../types';

interface NewsIndexPageProps {
  news: NewsArticle[];
  onNavigate: (path: string) => void;
}

export const NewsIndexPage: React.FC<NewsIndexPageProps> = ({ news, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Safety & Compliance', 'Cargo & Logistics', 'Hospitality', 'Company News'];

  const filtered = news.filter((n) => {
    const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Header in Official Aviance Blue */}
      <div className="py-14 bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-b border-[#204696]/30 text-center relative overflow-hidden">
        {/* Subtle Ambient Backing Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-[#204696]/20 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58C1EB]">
            <FileText className="w-4 h-4" /> Media & Corporate Communications
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            News, Press Releases & Bulletins
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Stay informed with official updates regarding station operations, IATA ISAGO audit results, cargo facility enhancements, and executive milestones.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#0A162C]/90 border border-[#204696]/30 rounded-xl shadow-lg shadow-[#204696]/5">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#0E2042]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news..."
              className="w-full bg-[#060D1A] border border-[#204696]/30 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/news/${article.slug}`)}
              className="group cursor-pointer bg-[#0C1933]/90 border border-[#204696]/25 rounded-2xl overflow-hidden hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 transition-all flex flex-col justify-between shadow-lg shadow-[#204696]/5"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-[#58C1EB] font-medium">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#58C1EB] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="px-6 pb-6 pt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate max-w-[120px]">{article.authorName}</span>
                </span>
                <span className="text-[#58C1EB] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
