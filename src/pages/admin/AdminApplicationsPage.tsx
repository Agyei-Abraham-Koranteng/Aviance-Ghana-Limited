import React, { useState } from 'react';
import { UserCheck, Search, Filter, FileText, CheckCircle2, XCircle, Clock, Phone, Mail, MapPin } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Application } from '../../types';

export const AdminApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(() => dataService.getApplications());
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const reload = () => setApplications(dataService.getApplications());

  const statuses: Application['status'][] = [
    'Submitted', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected', 'Archived'
  ];

  const filtered = applications.filter((a) => {
    const matchesStatus = selectedStatus === 'All' || a.status === selectedStatus;
    const matchesSearch =
      a.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: Application['status']) => {
    dataService.updateApplicationStatus(id, newStatus);
    reload();
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  const handleSaveNotes = (id: string, notes: string) => {
    dataService.updateApplicationStatus(id, selectedApp?.status || 'Under Review', notes);
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Recruitment Candidates & Applications Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review applicant qualifications, airside security clearance readiness, and track interview stages
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', ...statuses].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                selectedStatus === st
                  ? 'bg-[#204696] text-white border border-[#58C1EB]/40'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name or role..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
          />
        </div>
      </div>

      {/* Main Grid: List on left, candidate preview panel on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidates Table List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Target Position</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4">Pipeline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`cursor-pointer transition-colors ${
                    selectedApp?.id === app.id ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{app.applicantName}</span>
                      {app.isNssApplicant && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35">
                          NSS
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{app.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-200">{app.jobTitle}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">
                    {new Date(app.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        app.status === 'Shortlisted'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : app.status === 'Interview'
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : app.status === 'Selected'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'bg-slate-950 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Candidate Detail View */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          {selectedApp ? (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-mono text-[#58C1EB]">Application File</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedApp.applicantName}</h3>
                <div className="text-slate-400 font-medium">{selectedApp.jobTitle}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-[#58C1EB]" />
                  <a href={`mailto:${selectedApp.email}`} className="text-[#58C1EB] hover:underline">{selectedApp.email}</a>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-[#58C1EB]" />
                  <span>{selectedApp.phone}</span>
                </div>
                {selectedApp.ghanaDigitalAddress && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-[#58C1EB]" />
                    <span className="font-mono">GPS: {selectedApp.ghanaDigitalAddress}</span>
                  </div>
                )}
                {selectedApp.resumeFileName && (
                  <div className="flex items-center gap-2 text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800">
                    <FileText className="w-4 h-4 text-[#58C1EB]" />
                    <span className="font-mono text-[11px] truncate">{selectedApp.resumeFileName}</span>
                  </div>
                )}
              </div>

              {selectedApp.coverLetter && (
                <div className="space-y-1">
                  <div className="text-slate-500 font-semibold uppercase text-[10px]">Statement / Cover Note</div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80 text-slate-300 leading-relaxed max-h-32 overflow-y-auto">
                    {selectedApp.coverLetter}
                  </div>
                </div>
              )}

              {/* Status Action Selector */}
              <div className="space-y-1.5 pt-2">
                <label className="text-slate-400 font-semibold text-[11px] block">Pipeline Stage</label>
                <div className="flex flex-wrap gap-1 mb-1.5">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Shortlisted')}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
                  >
                    Shortlist
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Interview')}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/30"
                  >
                    Invite Interview
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Selected')}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30"
                  >
                    Select Candidate
                  </button>
                </div>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleUpdateStatus(selectedApp.id, e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#58C1EB] font-mono"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Internal Interview Notes */}
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold text-[11px] block">HR Internal Interview Notes</label>
                <textarea
                  rows={3}
                  defaultValue={selectedApp.internalNotes || ''}
                  onBlur={(e) => handleSaveNotes(selectedApp.id, e.target.value)}
                  placeholder="Record panel notes, GCAA security clearance, or reference feedback..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select an applicant from the table to review resume details and update stage.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
