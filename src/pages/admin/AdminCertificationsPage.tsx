import React, { useState } from 'react';
import { ShieldCheck, Plus, Edit, Trash2, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Certification } from '../../types';

export const AdminCertificationsPage: React.FC = () => {
  const [certs, setCerts] = useState<Certification[]>(() => dataService.getCertifications());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);

  const reload = () => setCerts(dataService.getCertifications());

  const handleOpenAdd = () => {
    setEditingCert({
      name: '',
      issuer: '',
      certificateNumber: 'GH-CERT-' + Math.floor(1000 + Math.random() * 9000),
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: 'active',
      category: 'Ground Safety',
      description: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Certification) => {
    setEditingCert(c);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this certification record?')) {
      dataService.deleteCertification(id);
      reload();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.name || !editingCert?.issuer) return;

    dataService.saveCertification(editingCert as any);
    setModalOpen(false);
    setEditingCert(null);
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Certifications, Licences & Compliance Audit Registry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track IATA ISAGO, EU RA3, GCAA Ground Handling licenses, and expiration warnings
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      {/* Expiry Warning Callout */}
      {certs.some((c) => c.status === 'expiring_soon') && (
        <div className="p-4 bg-[#0C1A3A] border border-[#204696]/60 rounded-xl flex items-start gap-3 text-xs text-[#58C1EB]">
          <AlertTriangle className="w-5 h-5 text-[#58C1EB] shrink-0" />
          <div>
            <strong className="font-bold text-[#58C1EB]">Audit Renewal Warning:</strong> One or more operational certifications expire within 60 days. Initiate pre-audit documentation with the certifying authority.
          </div>
        </div>
      )}

      {/* Certificates Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Standard / Certification</th>
              <th className="py-3 px-4">Certifying Authority</th>
              <th className="py-3 px-4">Certificate Number</th>
              <th className="py-3 px-4">Expiry Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {certs.map((c) => (
              <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-white">
                  <div className="flex items-center gap-2">
                    <span>{c.name}</span>
                    {c.isVerified ? (
                      <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        Verified
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold text-[#58C1EB] bg-[#204696]/15 px-1.5 py-0.5 rounded border border-[#58C1EB]/35">
                        Requires Verification
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-300">{c.issuer}</td>
                <td className="py-3 px-4 font-mono text-[#58C1EB]">{c.certificateNumber}</td>
                <td className="py-3 px-4 font-mono text-slate-400">{c.expiryDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/25'
                    }`}
                  >
                    {c.status === 'active' ? 'Active' : 'Expiring Soon'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleOpenEdit(c)} className="p-1.5 text-slate-400 hover:text-white rounded">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="p-1.5 text-slate-400 hover:text-rose-400 rounded">
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
      {modalOpen && editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Certification Record</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Certification Name *</label>
                <input
                  type="text"
                  required
                  value={editingCert.name || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Certifying Issuer *</label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Certificate Ref Number</label>
                  <input
                    type="text"
                    value={editingCert.certificateNumber || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, certificateNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB] font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Audit Expiry Date</label>
                  <input
                    type="date"
                    value={editingCert.expiryDate || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, expiryDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Status</label>
                <select
                  value={editingCert.status || 'active'}
                  onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
                >
                  <option value="active">Active & Compliant</option>
                  <option value="expiring_soon">Expiring Soon (Audit Due)</option>
                  <option value="renewal_pending">Renewal in Progress / Verification Pending</option>
                </select>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <input
                  type="checkbox"
                  id="isCertVerified"
                  checked={editingCert.isVerified || false}
                  onChange={(e) => setEditingCert({ ...editingCert, isVerified: e.target.checked })}
                  className="rounded border-slate-700 text-[#58C1EB] focus:ring-[#58C1EB]"
                />
                <label htmlFor="isCertVerified" className="text-slate-300 font-semibold cursor-pointer">
                  Administrator Verified Official Certification (Upload on File)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#204696] text-white border border-[#58C1EB]/40 font-bold rounded-lg hover:bg-[#183878]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
