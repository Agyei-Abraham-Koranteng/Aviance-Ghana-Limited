import React, { useState } from 'react';
import { Briefcase, Plus, Edit, Trash2, Search, X, Calendar, MapPin } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Vacancy } from '../../types';

export const AdminCareersPage: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(() => dataService.getVacancies());
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Partial<Vacancy> | null>(null);

  const reload = () => setVacancies(dataService.getVacancies());

  const filtered = vacancies.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingVacancy({
      title: '',
      department: 'Ground Operations',
      location: 'Kotoka International Airport, Terminal 3, Accra',
      employmentType: 'Full-time',
      description: '',
      responsibilities: ['Ensure safety adherence', 'Follow airside operational manual'],
      requirements: ['Minimum 2 years experience in aviation or logistics'],
      deadline: '2026-12-31',
      status: 'Open',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (v: Vacancy) => {
    setEditingVacancy(v);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this vacancy posting?')) {
      dataService.deleteVacancy(id);
      reload();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVacancy?.title || !editingVacancy?.department) return;

    dataService.saveVacancy(editingVacancy as any);
    setModalOpen(false);
    setEditingVacancy(null);
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Careers & Vacancies Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Post and manage job positions and National Service cohorts
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Vacancy</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Deadline</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filtered.map((v) => (
              <tr key={v.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-white">{v.title}</td>
                <td className="py-3 px-4 text-[#58C1EB] font-mono">{v.department}</td>
                <td className="py-3 px-4 text-slate-400 truncate max-w-[150px]">{v.location}</td>
                <td className="py-3 px-4">{v.employmentType}</td>
                <td className="py-3 px-4 font-mono text-slate-400">{v.deadline}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {v.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(v)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                      title="Edit Vacancy"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded"
                      title="Delete Vacancy"
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

      {/* Modal */}
      {modalOpen && editingVacancy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <h3 className="text-base font-bold text-white">
                {editingVacancy.id ? 'Edit Vacancy' : 'Create Job Posting'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={editingVacancy.title || ''}
                  onChange={(e) => setEditingVacancy({ ...editingVacancy, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Department *</label>
                  <input
                    type="text"
                    required
                    value={editingVacancy.department || ''}
                    onChange={(e) => setEditingVacancy({ ...editingVacancy, department: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
                  <select
                    value={editingVacancy.employmentType || 'Full-time'}
                    onChange={(e) => setEditingVacancy({ ...editingVacancy, employmentType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="National Service">National Service</option>
                    <option value="Shift-Based">Shift-Based</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Station / Location</label>
                  <input
                    type="text"
                    value={editingVacancy.location || ''}
                    onChange={(e) => setEditingVacancy({ ...editingVacancy, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deadline Date</label>
                  <input
                    type="date"
                    value={editingVacancy.deadline || ''}
                    onChange={(e) => setEditingVacancy({ ...editingVacancy, deadline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={4}
                  required
                  value={editingVacancy.description || ''}
                  onChange={(e) => setEditingVacancy({ ...editingVacancy, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#58C1EB] resize-none"
                />
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
                  Save Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
