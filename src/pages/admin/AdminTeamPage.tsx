import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, X, Mail } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { TeamMember } from '../../types';

export const AdminTeamPage: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(() => dataService.getTeam());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);

  const reload = () => setTeam(dataService.getTeam());

  const handleOpenAdd = () => {
    setEditingMember({
      name: '',
      position: '',
      department: 'Ground Operations',
      biography: '',
      email: '',
      photoUrl: '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
      isActive: true,
      isVerified: false,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (m: TeamMember) => {
    setEditingMember(m);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete team member profile?')) {
      const updated = team.filter((t) => t.id !== id);
      setTeam(updated);
      localStorage.setItem('aviance_team', JSON.stringify(updated));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember?.name || !editingMember?.position) return;

    dataService.saveTeamMember(editingMember as any);
    setModalOpen(false);
    setEditingMember(null);
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Executive Leadership & Management Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain public leadership profiles, biographies, and departmental roles
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Executive</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((m) => (
          <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-[#58C1EB] uppercase">{m.department}</span>
                    {m.isVerified ? (
                      <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        VERIFIED OFFICIAL
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold text-[#58C1EB] bg-[#204696]/15 px-1.5 py-0.5 rounded border border-[#58C1EB]/35">
                        CMS VERIFICATION REQUIRED
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleOpenEdit(m)} className="p-1 text-slate-400 hover:text-white">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="p-1 text-slate-400 hover:text-rose-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white">{m.name}</h3>
                <div className="text-xs text-slate-400 font-medium">{m.position}</div>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{m.biography}</p>
              </div>
            {m.email && <div className="text-[11px] text-[#58C1EB]/90 font-mono truncate">{m.email}</div>}
          </div>
        ))}
      </div>

      {modalOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Leadership Profile</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingMember.name || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Position Title *</label>
                <input
                  type="text"
                  required
                  value={editingMember.position || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Department</label>
                <input
                  type="text"
                  value={editingMember.department || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={editingMember.email || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Executive Biography</label>
                <textarea
                  rows={3}
                  value={editingMember.biography || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, biography: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <input
                  type="checkbox"
                  id="isVerified"
                  checked={editingMember.isVerified || false}
                  onChange={(e) => setEditingMember({ ...editingMember, isVerified: e.target.checked })}
                  className="rounded border-slate-700 text-[#58C1EB] focus:ring-[#58C1EB]"
                />
                <label htmlFor="isVerified" className="text-slate-300 font-semibold cursor-pointer">
                  Administrator Verified Official Profile
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#204696] text-white border border-[#58C1EB]/40 font-bold rounded-lg hover:bg-[#183878]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
