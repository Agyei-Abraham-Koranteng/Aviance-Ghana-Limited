import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  X,
  Globe,
  Share2,
  History,
  CheckCircle,
  Clock,
  ArrowRight,
  Shield,
  FileCheck,
  RotateCcw,
  Calendar,
  User,
  Tag,
  AlertTriangle,
  Archive,
  Send,
  Sparkles
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { NewsArticle, ContentRevision, ContentStatus } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const AdminNewsPage: React.FC = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>(() => dataService.getNews());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<NewsArticle> | null>(null);
  const [changeSummary, setChangeSummary] = useState<string>('Routine content review');

  // Preview & Revision drawers
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'seo' | 'history'>('edit');
  const [selectedRevision, setSelectedRevision] = useState<ContentRevision | null>(null);

  const reload = () => setArticles(dataService.getNews());

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Published' && (a.status === 'Published' || a.isPublished)) ||
      (statusFilter === 'Draft' && a.status === 'Draft') ||
      (statusFilter === 'Submitted for Review' && a.status === 'Submitted for Review') ||
      (statusFilter === 'Approved' && a.status === 'Approved') ||
      (statusFilter === 'Archived' && a.status === 'Archived');
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingArticle({
      title: '',
      slug: '',
      category: 'Company News',
      excerpt: '',
      content: '',
      authorName: user?.fullName || 'Aviance Corporate Communications',
      authorRole: 'Media Unit',
      authorEmail: user?.email || 'comms@avianceghana.com',
      readTimeMinutes: 3,
      tags: ['Aviation', 'Ghana', 'Ground Handling'],
      isPublished: false,
      status: 'Draft',
      version: 1,
      revisions: [],
    });
    setChangeSummary('Initial draft creation');
    setViewMode('edit');
    setModalOpen(true);
  };

  const handleOpenEdit = (a: NewsArticle) => {
    setEditingArticle(a);
    setChangeSummary('Editorial update');
    setViewMode('edit');
    setSelectedRevision(null);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this news publication permanently from the CMS?')) {
      dataService.deleteNews(id);
      reload();
    }
  };

  const handleQuickStatusChange = (
    article: NewsArticle,
    newStatus: ContentStatus,
    summary: string
  ) => {
    const updated: Partial<NewsArticle> = {
      ...article,
      status: newStatus,
      isPublished: newStatus === 'Published',
      updatedAt: new Date().toISOString(),
    };

    if (newStatus === 'Submitted for Review') {
      updated.reviewerEmail = 'editor@avianceghana.com';
    } else if (newStatus === 'Approved') {
      updated.approverEmail = user?.email || 'executive@avianceghana.com';
    } else if (newStatus === 'Published') {
      updated.approverEmail = user?.email || 'executive@avianceghana.com';
      if (!article.publishedAt) {
        updated.publishedAt = new Date().toISOString();
      }
    }

    dataService.saveNews(updated as any, summary);
    reload();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle?.title || !editingArticle?.content) return;

    dataService.saveNews(editingArticle as any, changeSummary);
    setModalOpen(false);
    setEditingArticle(null);
    reload();
  };

  const handleRestoreRevision = (articleId: string, revisionId: string) => {
    if (confirm('Restore article to this previous version? Current state will be saved in version history.')) {
      const restored = dataService.restoreNewsRevision(articleId, revisionId);
      setEditingArticle(restored);
      setSelectedRevision(null);
      reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              News & Publications Enterprise CMS
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35">
              Workflow Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Editorial pipeline: Draft → Review → Approval → Published → Archived · Full version control & restore
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Write Press Release</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          {['All', 'Published', 'Draft', 'Submitted for Review', 'Approved', 'Archived'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 font-semibold rounded-lg transition-colors ${
                statusFilter === st
                  ? 'bg-[#204696] text-white border border-[#58C1EB]/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search headline, category..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
          />
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Article & Version</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Author & Reviewers</th>
              <th className="py-3 px-4">Lifecycle Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Workflow Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filtered.map((a) => {
              const status: ContentStatus = a.status || (a.isPublished ? 'Published' : 'Draft');
              const isPub = status === 'Published';
              const isReview = status === 'Submitted for Review';
              const isApproved = status === 'Approved';
              const isDraft = status === 'Draft';
              const isArchived = status === 'Archived';

              return (
                <tr key={a.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#58C1EB] bg-[#58C1EB]/10 px-1.5 py-0.5 rounded border border-[#58C1EB]/35 shrink-0">
                        v{a.version || 1}
                      </span>
                      <div className="font-semibold text-white truncate" title={a.title}>
                        {a.title}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {a.excerpt}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[#58C1EB] font-mono text-[11px]">{a.category}</span>
                  </td>
                  <td className="py-3 px-4 text-[11px]">
                    <div className="text-slate-200 font-medium">{a.authorName || 'Corporate Comms'}</div>
                    {a.reviewerEmail && (
                      <div className="text-slate-500 text-[10px]">Reviewer: {a.reviewerEmail}</div>
                    )}
                    {a.approverEmail && (
                      <div className="text-emerald-400/80 text-[10px]">Approver: {a.approverEmail}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                        isPub
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : isReview
                          ? 'bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35'
                          : isApproved
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                          : isArchived
                          ? 'bg-slate-800 text-slate-400 border border-slate-700'
                          : 'bg-slate-900 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                    {a.publishedAt
                      ? new Date(a.publishedAt).toLocaleDateString('en-GB')
                      : a.createdAt
                      ? new Date(a.createdAt).toLocaleDateString('en-GB')
                      : '—'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* State transition shortcuts */}
                      {isDraft && (
                        <button
                          onClick={() => handleQuickStatusChange(a, 'Submitted for Review', 'Submitted for editorial review')}
                          className="px-2 py-1 text-[10px] font-semibold bg-[#58C1EB]/10 text-[#58C1EB] hover:bg-[#58C1EB]/20 rounded border border-[#58C1EB]/35"
                          title="Submit for Review"
                        >
                          Submit
                        </button>
                      )}
                      {isReview && (
                        <button
                          onClick={() => handleQuickStatusChange(a, 'Approved', 'Approved by editor')}
                          className="px-2 py-1 text-[10px] font-semibold bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 rounded border border-sky-500/30"
                          title="Approve Article"
                        >
                          Approve
                        </button>
                      )}
                      {(isApproved || isDraft || isReview) && (
                        <button
                          onClick={() => handleQuickStatusChange(a, 'Published', 'Published live to website')}
                          className="px-2 py-1 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded border border-emerald-500/30"
                          title="Publish Live"
                        >
                          Publish
                        </button>
                      )}
                      {isPub && (
                        <button
                          onClick={() => handleQuickStatusChange(a, 'Draft', 'Unpublished back to draft')}
                          className="px-2 py-1 text-[10px] font-semibold bg-slate-800 text-slate-300 hover:text-white rounded"
                          title="Unpublish to Draft"
                        >
                          Unpublish
                        </button>
                      )}
                      {!isArchived ? (
                        <button
                          onClick={() => handleQuickStatusChange(a, 'Archived', 'Archived article')}
                          className="p-1.5 text-slate-400 hover:text-[#58C1EB] hover:bg-slate-800 rounded"
                          title="Archive"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleQuickStatusChange(a, 'Draft', 'Restored from archive to draft')}
                          className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded"
                          title="Restore to Draft"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenEdit(a)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                        title="Edit Article / Workflow"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(a.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded"
                        title="Delete Permanently"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Full Modal Editor with Workflow, Live Preview, and Revision History */}
      {modalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Topbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#58C1EB] bg-[#58C1EB]/10 px-2 py-0.5 rounded border border-[#58C1EB]/35">
                  Version {editingArticle.version || 1}
                </span>
                <h3 className="text-base font-bold text-white">
                  {editingArticle.id ? `Edit Article: ${editingArticle.title || 'Untitled'}` : 'Compose Press Release'}
                </h3>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('edit')}
                  className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                    viewMode === 'edit' ? 'bg-[#204696] text-white border border-[#58C1EB]/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1 font-semibold rounded-md transition-colors flex items-center gap-1 ${
                    viewMode === 'preview' ? 'bg-[#204696] text-white border border-[#58C1EB]/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Live Preview
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('history')}
                  className={`px-3 py-1 font-semibold rounded-md transition-colors flex items-center gap-1 ${
                    viewMode === 'history' ? 'bg-[#204696] text-white border border-[#58C1EB]/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <History className="w-3.5 h-3.5" /> Revisions ({editingArticle.revisions?.length || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('seo')}
                  className={`px-3 py-1 font-semibold rounded-md transition-colors flex items-center gap-1 ${
                    viewMode === 'seo' ? 'bg-[#204696] text-white border border-[#58C1EB]/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" /> SEO
                </button>
              </div>

              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TAB 1: EDIT FORM */}
            {viewMode === 'edit' && (
              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
                {/* Workflow Status Selector */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      Workflow Pipeline State
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Determine where this publication sits in the editorial review hierarchy
                    </p>
                  </div>
                  <select
                    value={editingArticle.status || 'Draft'}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        status: e.target.value as ContentStatus,
                        isPublished: e.target.value === 'Published',
                      })
                    }
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#58C1EB] focus:outline-none focus:border-[#58C1EB]"
                  >
                    <option value="Draft">Draft (Authoring)</option>
                    <option value="Submitted for Review">Submitted for Review</option>
                    <option value="Approved">Approved (Ready to publish)</option>
                    <option value="Published">Published (Live Public)</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Headline Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                    placeholder="e.g., Aviance Ghana Passes 2026 IATA ISAGO Audit with 100% Conformance"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      value={editingArticle.category || 'Company News'}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                    >
                      <option value="Safety & Compliance">Safety & Compliance</option>
                      <option value="Cargo & Logistics">Cargo & Logistics</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Company News">Company News</option>
                      <option value="Operations Update">Operations Update</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={editingArticle.authorName || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, authorName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Author Email</label>
                    <input
                      type="email"
                      value={editingArticle.authorEmail || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, authorEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                      placeholder="author@avianceghana.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Assigned Reviewer / Approver
                    </label>
                    <input
                      type="email"
                      value={editingArticle.reviewerEmail || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, reviewerEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                      placeholder="reviewer@avianceghana.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Change Summary Note (Version Reason) *
                    </label>
                    <input
                      type="text"
                      required
                      value={changeSummary}
                      onChange={(e) => setChangeSummary(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                      placeholder="e.g., Updated GCAA station audit figures"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Excerpt / Executive Summary *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingArticle.excerpt || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#58C1EB] resize-none"
                    placeholder="Short summary displayed on public cards and RSS feeds"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Article Body (Markdown supported) *
                  </label>
                  <textarea
                    rows={9}
                    required
                    value={editingArticle.content || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#58C1EB] resize-none font-sans"
                    placeholder="Write complete press release or operational notice..."
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">
                    Will save as <strong>Version {(editingArticle.version || 1) + (editingArticle.id ? 1 : 0)}</strong>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#204696] text-white border border-[#58C1EB]/40 font-bold text-xs rounded-lg hover:bg-[#183878] transition-colors shadow-md"
                    >
                      Save & Commit Version
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 2: LIVE PREVIEW BEFORE PUBLISHING (Requirement 4) */}
            {viewMode === 'preview' && (
              <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-950">
                <div className="p-3 bg-[#204696]/15 border border-[#58C1EB]/35 rounded-xl text-xs text-[#58C1EB] flex items-center justify-between">
                  <span>
                    <strong>Preview Mode:</strong> Exactly how this article will render publicly on the Aviance Ghana portal.
                  </span>
                  <span className="font-mono text-[10px] bg-[#204696] text-white border border-[#58C1EB]/40 px-2 py-0.5 rounded font-bold uppercase">
                    Status: {editingArticle.status || 'Draft'}
                  </span>
                </div>

                {/* Simulated Article Layout */}
                <div className="max-w-2xl mx-auto space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#204696] text-white border border-[#58C1EB]/40">
                      {editingArticle.category || 'Company News'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {editingArticle.readTimeMinutes || 3} min read
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      VERIFIED OFFICIAL
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {editingArticle.title || 'Untitled Headline'}
                  </h1>

                  <div className="flex items-center gap-3 border-y border-slate-800 py-3 text-xs text-slate-400">
                    <User className="w-4 h-4 text-[#58C1EB]" />
                    <div>
                      <span className="text-white font-medium">{editingArticle.authorName || 'Corporate Comms'}</span>
                      <span className="text-slate-500"> · {editingArticle.authorRole || 'Media Relations'}</span>
                    </div>
                  </div>

                  <div className="text-sm text-slate-300 font-serif leading-relaxed italic border-l-2 border-[#58C1EB] pl-4 py-1">
                    {editingArticle.excerpt || 'Article summary excerpt...'}
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line space-y-3 font-sans">
                    {editingArticle.content || 'Article content...'}
                  </div>

                  {editingArticle.tags && editingArticle.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800">
                      {editingArticle.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: REVISION HISTORY (Requirement 4) */}
            {viewMode === 'history' && (
              <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-950">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <History className="w-4 h-4 text-[#58C1EB]" /> Complete Revision Audit Trail
                    </h4>
                    <p className="text-xs text-slate-400">
                      Audit all prior versions, authors, change logs, and restore earlier revisions
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#58C1EB]">
                    Current Version: v{editingArticle.version || 1}
                  </span>
                </div>

                {/* Current Active Version Card */}
                <div className="p-4 bg-slate-900 border border-[#58C1EB]/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#58C1EB] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Version {editingArticle.version || 1} (Current State)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {editingArticle.status || 'Published'}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-white">{editingArticle.title}</div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Author: {editingArticle.authorName}</span>
                    <span>Updated: {new Date(editingArticle.updatedAt || editingArticle.createdAt || Date.now()).toLocaleString('en-GB')}</span>
                  </div>
                </div>

                {/* Historical Revisions List */}
                {editingArticle.revisions && editingArticle.revisions.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Archived Previous Snapshots
                    </div>
                    {editingArticle.revisions.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-300">
                            Version {rev.version} — Previous Snapshot
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                            {rev.status}
                          </span>
                        </div>
                        <div className="text-xs font-medium text-slate-200">{rev.title}</div>
                        <div className="text-[11px] text-[#58C1EB]/90 font-mono">
                          Change note: "{rev.changeSummary}"
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
                          <span>By {rev.authorName} ({rev.authorEmail})</span>
                          <span>{new Date(rev.createdAt).toLocaleString('en-GB')}</span>
                        </div>
                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => editingArticle.id && handleRestoreRevision(editingArticle.id, rev.id)}
                            className="px-3 py-1 bg-[#58C1EB]/10 hover:bg-[#204696] text-[#58C1EB] hover:text-slate-950 font-semibold text-xs rounded-lg transition-colors border border-[#58C1EB]/35 flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Restore This Version
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                    No historical revisions yet. A version snapshot is generated each time you save an update.
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SEO PREVIEW */}
            {viewMode === 'seo' && (
              <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-950">
                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#58C1EB]" /> Google Search SERP Snippet
                  </div>
                  <div className="p-4 bg-white rounded-xl text-left space-y-1">
                    <div className="text-[12px] text-slate-600 truncate">
                      https://avianceghana.com/news/{editingArticle.slug || 'article-slug'}
                    </div>
                    <div className="text-[16px] text-blue-800 font-medium hover:underline truncate">
                      {editingArticle.title || 'Article Headline Here'} — Aviance Ghana
                    </div>
                    <div className="text-[13px] text-slate-700 line-clamp-2">
                      {editingArticle.excerpt || 'Article summary excerpt that appears in Google search engine rankings.'}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-[#58C1EB]" /> Social Card OpenGraph Preview (LinkedIn & X)
                  </div>
                  <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-900 max-w-md">
                    <div className="h-40 bg-slate-800 flex items-center justify-center text-slate-500 font-mono text-xs">
                      [Social Hero Image 1200x630]
                    </div>
                    <div className="p-3 space-y-1">
                      <div className="text-[10px] uppercase font-mono text-slate-400">avianceghana.com</div>
                      <div className="text-xs font-bold text-white truncate">{editingArticle.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2">{editingArticle.excerpt}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
