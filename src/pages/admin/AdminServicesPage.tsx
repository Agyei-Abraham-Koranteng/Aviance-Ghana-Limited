import React, { useState } from 'react';
import { Plane, Plus, Edit, Trash2, CheckCircle2, XCircle, Search, ArrowRight, X } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Service } from '../../types';

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(() => dataService.getServices());
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);

  const reload = () => setServices(dataService.getServices());

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingService({
      title: '',
      slug: '',
      category: 'Ramp',
      shortDescription: '',
      fullDescription: '',
      locations: ['Accra (Kotoka T3)'],
      features: ['24/7 Operations Support', 'IATA Compliant Handling'],
      operatingHours: '24/7 Operations',
      contactEmail: 'operations@avianceghana.com',
      contactPhone: '+233 (0)302 778 025',
      isPublished: true,
      displayOrder: services.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (srv: Service) => {
    setEditingService(srv);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service record?')) {
      dataService.deleteService(id);
      reload();
    }
  };

  const handleTogglePublish = (srv: Service) => {
    dataService.saveService({
      ...srv,
      isPublished: !srv.isPublished,
    });
    reload();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) return;

    dataService.saveService(editingService as any);
    setModalOpen(false);
    setEditingService(null);
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Services Management & CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, reorder and publish public aviation services across stations
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service title or category..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {filtered.length} Services Configured
        </span>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Stations</th>
                <th className="py-3 px-4">Hours</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{s.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">/{s.slug}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[#58C1EB]">{s.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-400 line-clamp-1">{s.locations.join(', ')}</span>
                  </td>
                  <td className="py-3 px-4">{s.operatingHours}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublish(s)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.isPublished
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {s.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                        title="Edit Service"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {modalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <h3 className="text-base font-bold text-white">
                {editingService.id ? 'Edit Service' : 'Add New Ground Handling Service'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ''}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={editingService.category || 'Ramp'}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  >
                    <option value="Passenger">Passenger</option>
                    <option value="Ramp">Ramp</option>
                    <option value="Cargo">Cargo</option>
                    <option value="VIP & Hospitality">VIP & Hospitality</option>
                    <option value="Technical">Technical</option>
                    <option value="Security & Quality">Security & Quality</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#58C1EB] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  value={editingService.fullDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#58C1EB] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Dispatch Phone</label>
                  <input
                    type="text"
                    value={editingService.contactPhone || ''}
                    onChange={(e) => setEditingService({ ...editingService, contactPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Dispatch Email</label>
                  <input
                    type="email"
                    value={editingService.contactEmail || ''}
                    onChange={(e) => setEditingService({ ...editingService, contactEmail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={editingService.isPublished ?? true}
                  onChange={(e) => setEditingService({ ...editingService, isPublished: e.target.checked })}
                  className="rounded border-slate-700 text-[#58C1EB] focus:ring-[#58C1EB]"
                />
                <label htmlFor="publishedCheck" className="text-xs text-slate-200 font-medium">
                  Publish to Public Website Immediately
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#204696] text-white border border-[#58C1EB]/40 font-bold text-xs rounded-lg hover:bg-[#183878] transition-colors"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
