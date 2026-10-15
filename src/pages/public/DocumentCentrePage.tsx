import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  FolderDown,
  Building,
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { INITIAL_DOCUMENTS } from '../../constants/avianceData';
import { DigitalDocument } from '../../types';
import { useToast } from '../../context/ToastContext';

interface DocumentCentrePageProps {
  onNavigate: (path: string) => void;
}

export const DocumentCentrePage: React.FC<DocumentCentrePageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [documents] = useState<DigitalDocument[]>(INITIAL_DOCUMENTS);
  const { toast } = useToast();

  const categories = [
    'All',
    'Corporate',
    'Safety',
    'Compliance',
    'Reports',
    'Policies',
  ];

  const filtered = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (doc: DigitalDocument) => {
    toast.info(
      `Downloading ${doc.fileName} (${doc.fileSize}). Official verified PDF file simulated.`,
      'Document Download'
    );
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-150">
      {/* Hero Header in Official Aviance Blue */}
      <div className="py-12 bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border border-[#204696]/30 rounded-3xl p-6 sm:p-10 text-center space-y-3 relative overflow-hidden shadow-2xl">
        {/* Subtle Ambient Backing Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-[#204696]/20 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58C1EB]">
            <FileText className="w-4 h-4" /> Aviance Ghana Corporate Governance
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Digital Document Centre
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Access official corporate policies, IATA ISAGO station audit confirmations, EU Cargo RA3 manuals, and code of conduct publications.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents or manuals..."
            className="w-full bg-[#060D1A] border border-[#204696]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#58C1EB] transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#204696] text-white border border-[#58C1EB]/40 shadow-sm'
                  : 'bg-[#071120] border border-[#204696]/20 text-slate-400 hover:text-white hover:bg-[#0E2042]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#0C1933]/90 border border-[#204696]/25 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 transition-all shadow-lg shadow-[#204696]/5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold text-[#58C1EB] uppercase tracking-wider">
                  {doc.category}
                </span>
                <StatusBadge status={doc.verificationStatus} size="xs" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug">{doc.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{doc.description}</p>
              </div>

              <div className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 font-mono">
                <div className="flex justify-between">
                  <span>File:</span>
                  <span className="text-slate-200 truncate max-w-[170px]">{doc.fileName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size & Type:</span>
                  <span className="text-slate-200">{doc.fileSize} · {doc.fileType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="text-slate-200">v{doc.version}</span>
                </div>
                {doc.expiryDate && (
                  <div className="flex justify-between">
                    <span>Valid Through:</span>
                    <span className="text-[#58C1EB]">{doc.expiryDate}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                Uploaded: {doc.uploadDate}
              </div>
              <button
                onClick={() => handleDownload(doc)}
                className="px-3.5 py-1.5 bg-[#071120] hover:bg-[#204696] hover:text-white text-slate-200 text-xs font-semibold rounded-lg border border-[#204696]/30 transition-colors flex items-center gap-1.5"
              >
                <FolderDown className="w-3.5 h-3.5 text-[#58C1EB]" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-[#0C1933]/90 border border-[#204696]/30 rounded-2xl text-slate-400 text-xs space-y-2 shadow-xl">
          <p>No documents matching your search filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            className="text-[#58C1EB] hover:underline font-semibold"
          >
            Clear Search Filters
          </button>
        </div>
      )}
    </div>
  );
};
