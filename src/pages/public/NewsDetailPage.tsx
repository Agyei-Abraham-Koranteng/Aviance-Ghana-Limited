import React from 'react';
import { ArrowLeft, Calendar, User, Clock, Share2, ArrowRight } from 'lucide-react';
import { NewsArticle } from '../../types';

interface NewsDetailPageProps {
  article: NewsArticle;
  allNews: NewsArticle[];
  onNavigate: (path: string) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ article, allNews, onNavigate }) => {
  const related = allNews.filter((n) => n.id !== article.id).slice(0, 2);

  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* Header in Official Aviance Blue */}
      <div className="py-14 bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-b border-[#204696]/30 relative overflow-hidden">
        {/* Subtle Ambient Backing Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#204696]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4 relative z-10">
          <button
            onClick={() => onNavigate('/news')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#58C1EB] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to News
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#58C1EB] font-mono">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTimeMinutes} min read</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-400 border-t border-[#204696]/30">
            <div className="w-7 h-7 rounded-full bg-[#204696] text-white flex items-center justify-center font-bold">
              {article.authorName.charAt(0)}
            </div>
            <div>
              <div className="text-white font-medium">{article.authorName}</div>
              <div className="text-slate-400">{article.authorRole}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-6 whitespace-pre-line font-sans">
          {article.content}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-6 border-t border-[#204696]/30 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-400">Topics:</span>
            {article.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-[#0C1933] border border-[#204696]/30 rounded text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-[#204696]/30 space-y-4">
            <h3 className="text-lg font-bold text-white">More Press Releases</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <div
                  key={r.id}
                  onClick={() => onNavigate(`/news/${r.slug}`)}
                  className="p-4 bg-[#0C1933]/90 border border-[#204696]/30 rounded-xl hover:border-[#58C1EB]/60 cursor-pointer space-y-2 shadow-lg transition-all"
                >
                  <span className="text-[11px] font-mono text-[#58C1EB]">{r.category}</span>
                  <h4 className="text-sm font-bold text-white line-clamp-2">{r.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
