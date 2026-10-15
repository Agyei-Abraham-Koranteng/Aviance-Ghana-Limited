import React, { useState } from 'react';
import { Handshake, Plus, Edit, Trash2, X, ExternalLink } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { CustomerPartner } from '../../types';

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerPartner[]>(() => dataService.getCustomers());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Partial<CustomerPartner> | null>(null);

  const reload = () => setCustomers(dataService.getCustomers());

  const handleOpenAdd = () => {
    setEditingCustomer({
      name: '',
      category: 'Commercial Airline',
      logoUrl: 'AIR',
      website: 'https://',
      servicesProvided: ['Ramp Handling', 'Passenger Services'],
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c: CustomerPartner) => {
    setEditingCustomer(c);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete customer partnership?')) {
      const updated = customers.filter((c) => c.id !== id);
      setCustomers(updated);
      localStorage.setItem('aviance_customers', JSON.stringify(updated));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer?.name) return;

    dataService.saveCustomer(editingCustomer as any);
    setModalOpen(false);
    setEditingCustomer(null);
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Airlines & Customer Partners Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain carrier logos, handling scopes, and official commercial partner listings
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Airline Partner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-[#58C1EB] font-mono text-xs">
                  {c.logoUrl}
                </div>
                <div className="flex items-center gap-1.5">
                  {c.isVerified ? (
                    <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      VERIFIED OFFICIAL
                    </span>
                  ) : (
                    <span className="text-[9px] font-semibold text-[#58C1EB] bg-[#204696]/15 px-1.5 py-0.5 rounded border border-[#58C1EB]/35">
                      CMS VERIFICATION REQUIRED
                    </span>
                  )}
                  <button onClick={() => handleOpenEdit(c)} className="p-1 text-slate-400 hover:text-white">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-1 text-slate-400 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="text-sm font-bold text-white">{c.name}</h3>
              <div className="text-[11px] text-[#58C1EB]/90 font-mono">{c.category}</div>
              <div className="text-xs text-slate-400 mt-1 line-clamp-1">{c.servicesProvided.join(', ')}</div>
            </div>

            {c.website && (
              <a href={c.website} target="_blank" rel="noreferrer" className="text-[11px] text-slate-500 hover:text-[#58C1EB] flex items-center gap-1">
                <span>Carrier Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>

      {modalOpen && editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Partner Carrier</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Airline / Partner Name *</label>
                <input
                  type="text"
                  required
                  value={editingCustomer.name || ''}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={editingCustomer.category || 'Commercial Airline'}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
                  >
                    <option value="Commercial Airline">Commercial Airline</option>
                    <option value="Cargo Carrier">Cargo Carrier</option>
                    <option value="Executive & Charter">Executive & Charter</option>
                    <option value="Aviation Alliance">Aviation Alliance</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">IATA Code / Logo Code</label>
                  <input
                    type="text"
                    value={editingCustomer.logoUrl || ''}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, logoUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB] font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Website URL</label>
                <input
                  type="url"
                  value={editingCustomer.website || ''}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, website: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <input
                  type="checkbox"
                  id="isCustVerified"
                  checked={editingCustomer.isVerified || false}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, isVerified: e.target.checked })}
                  className="rounded border-slate-700 text-[#58C1EB] focus:ring-[#58C1EB]"
                />
                <label htmlFor="isCustVerified" className="text-slate-300 font-semibold cursor-pointer">
                  Administrator Verified Airline Relationship
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
