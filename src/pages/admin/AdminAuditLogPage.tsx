import React, { useState } from 'react';
import { History, Search, Download, ShieldCheck } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { AuditLog } from '../../types';

export const AdminAuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>(() => dataService.getAuditLogs());
  const [search, setSearch] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.module.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Timestamp,User,Action,Module,RecordId,Details\n' +
      logs.map((l) => `"${l.createdAt}","${l.userEmail}","${l.action}","${l.module}","${l.recordId || ''}","${l.details}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aviance_audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Security & Operational Audit Trail
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable log of all administrative actions, content modifications, and status changes
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-[#58C1EB]" />
          <span>Export Audit Log</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action, user, module..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {filtered.length} Audit Entries
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Timestamp (UTC)</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Module</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Details / Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-slate-400">{new Date(l.createdAt).toLocaleString('en-GB')}</td>
                <td className="py-3 px-4 text-white font-sans">{l.userEmail}</td>
                <td className="py-3 px-4 text-[#58C1EB]">{l.module}</td>
                <td className="py-3 px-4 text-slate-200 font-sans font-semibold">{l.action}</td>
                <td className="py-3 px-4 text-slate-400 font-sans truncate max-w-[280px]">{l.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
