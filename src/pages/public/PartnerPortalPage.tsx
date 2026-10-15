import React, { useState } from 'react';
import {
  Handshake,
  Plane,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Phone,
  Calendar,
  Send,
  Lock,
  ArrowRight,
  Shield,
  HelpCircle,
  FolderDown,
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { INITIAL_PARTNER_REQUESTS } from '../../constants/avianceData';
import { PartnerRequest } from '../../types';
import { useToast } from '../../context/ToastContext';

interface PartnerPortalPageProps {
  onNavigate: (path: string) => void;
}

export const PartnerPortalPage: React.FC<PartnerPortalPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'submit' | 'contacts' | 'documents'>('requests');
  const [requests, setRequests] = useState<PartnerRequest[]>(INITIAL_PARTNER_REQUESTS);
  const { toast } = useToast();

  const [form, setForm] = useState({
    airline: 'British Airways',
    airlineCode: 'BA',
    flightNumber: '',
    station: 'ACC',
    requestType: 'Slot Handling' as PartnerRequest['requestType'],
    priority: 'Standard' as PartnerRequest['priority'],
    scheduledDate: new Date().toISOString().split('T')[0],
    details: '',
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.flightNumber || !form.details) {
      toast.warning('Please enter flight number and handling details.', 'Incomplete Submission');
      return;
    }

    const newReq: PartnerRequest = {
      id: `pr-${Date.now()}`,
      referenceNo: `PR-${form.station}-2026-${Math.floor(100 + Math.random() * 900)}`,
      partnerName: `${form.airline} Operations Desk`,
      airlineCode: form.airlineCode,
      requestType: form.requestType,
      priority: form.priority,
      station: form.station as any,
      flightNumber: form.flightNumber,
      scheduledDate: form.scheduledDate,
      details: form.details,
      status: 'Received',
      createdAt: new Date().toISOString(),
    };

    setRequests([newReq, ...requests]);
    toast.success(
      `Turnaround requisition logged under reference ${newReq.referenceNo} (Simulated prototype submission).`,
      'Requisition Submitted'
    );
    setForm({ ...form, flightNumber: '', details: '' });
    setActiveTab('requests');
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-150">
      {/* Top Banner Notice */}
      <div className="bg-[#0A162C]/95 border border-[#204696]/35 rounded-3xl p-6 sm:p-10 space-y-4 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Backing Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#204696]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#58C1EB] uppercase tracking-wider">
                Airline Commercial Gateway
              </span>
              <StatusBadge status="VERIFIED OFFICIAL" size="xs" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Airline Customer & Operations Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Direct station interface enabling commercial carrier station managers to coordinate ad-hoc turnaround slots, ground power units, ambulifts, and SGHA billing documentation at Kotoka International Airport.
            </p>
          </div>

          <div className="p-3 bg-[#060D1A] rounded-xl border border-[#204696]/25 text-xs text-slate-400 space-y-1 sm:text-right">
            <div className="font-semibold text-white">Station Operator Session:</div>
            <div className="font-mono text-[#58C1EB]">British Airways Ground Operations (BA/BAW)</div>
            <div className="text-[11px] text-slate-500">ACC Terminal 3 Flight Dispatch Desk</div>
          </div>
        </div>

        {/* Operational Dispatch Notice */}
        <div className="p-3.5 bg-[#204696]/15 border border-[#58C1EB]/30 rounded-xl flex items-start gap-3 text-xs text-slate-200">
          <Shield className="w-4 h-4 shrink-0 mt-0.5 text-[#58C1EB]" />
          <span>
            <strong>Secure Station Dispatch:</strong> All turnaround requests and equipment dispatches are coordinated in real-time with the 24/7 Operations Control Centre (OCC) via VHF 131.8 MHz, telephone (+233 244 334 022), and SITA telex (ACCKXXH).
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#204696]/30 pb-3 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'requests'
              ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-bold shadow-sm'
              : 'bg-[#0A162C] border border-[#204696]/25 text-slate-300 hover:text-white'
          }`}
        >
          Active Requisitions ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab('submit')}
          className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'submit'
              ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-bold shadow-sm'
              : 'bg-[#0A162C] border border-[#204696]/25 text-slate-300 hover:text-white'
          }`}
        >
          Submit Turnaround Request
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'contacts'
              ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-bold shadow-sm'
              : 'bg-[#0A162C] border border-[#204696]/25 text-slate-300 hover:text-white'
          }`}
        >
          Duty Supervisory Contacts
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'documents'
              ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-bold shadow-sm'
              : 'bg-[#0A162C] border border-[#204696]/25 text-slate-300 hover:text-white'
          }`}
        >
          SGHA & SLA Manuals
        </button>
      </div>

      {/* Tab 1: Active Requests List */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Recent Ground Support & Ad-Hoc Flight Slot Filings</span>
            <span className="font-mono text-[#58C1EB]">Showing Simulated Records</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-[#0C1933]/90 border border-[#204696]/30 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-xl shadow-[#204696]/5"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#58C1EB]">{req.referenceNo}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        req.status === 'Approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : req.status === 'In Review'
                          ? 'bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    Flight {req.flightNumber || 'Ad-Hoc'} · {req.requestType}
                  </h3>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>Station: <strong>{req.station}</strong></span>
                    <span>·</span>
                    <span>Date: {req.scheduledDate}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    {req.details}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Priority: <strong className="text-white">{req.priority}</strong></span>
                  <span className="font-mono text-[10px]">{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Submit Requisition Form */}
      {activeTab === 'submit' && (
        <div className="bg-[#0C1933]/90 border border-[#204696]/35 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6 shadow-2xl">
          <div className="border-b border-[#204696]/30 pb-3">
            <h3 className="text-base font-bold text-white">Submit Ad-Hoc Service Requisition</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Request ramp GSE staging, ambulift priority, or early slot handling clearance.
            </p>
          </div>

          <form onSubmit={handleSubmitRequest} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Airline Carrier</label>
                <input
                  type="text"
                  readOnly
                  value="British Airways (BA)"
                  className="w-full bg-[#071120] border border-[#204696]/30 rounded-lg p-2.5 text-slate-300 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Station *</label>
                <select
                  value={form.station}
                  onChange={(e) => setForm({ ...form, station: e.target.value })}
                  className="w-full bg-[#071120] border border-[#204696]/30 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-[#58C1EB]"
                >
                  <option value="ACC">ACC - Kotoka International Airport (Terminal 3)</option>
                  <option value="KMS">KMS - Prempeh I Airport Kumasi</option>
                  <option value="TML">TML - Tamale International Airport</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Flight Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BA 078"
                  value={form.flightNumber}
                  onChange={(e) => setForm({ ...form, flightNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono uppercase focus:outline-none focus:border-[#58C1EB]"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Request Scope</label>
                <select
                  value={form.requestType}
                  onChange={(e) => setForm({ ...form, requestType: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#58C1EB]"
                >
                  <option value="Slot Handling">Slot Handling</option>
                  <option value="Ground Support">Ground Support (GSE)</option>
                  <option value="Charter Assistance">Charter Assistance</option>
                  <option value="Billing & Audit">Billing & Audit Liaison</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Urgency</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#58C1EB]"
                >
                  <option value="Standard">Standard</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Flight Critical">Flight Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Scheduled Date</label>
              <input
                type="date"
                value={form.scheduledDate}
                onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-[#58C1EB]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Handling Details & Equipment *</label>
              <textarea
                rows={3}
                required
                placeholder="State aircraft type (e.g. B777-300ER), gate preference, dual ambulift request, or specialized cargo offload requirements..."
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Requisition</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Supervisory Contacts */}
      {activeTab === 'contacts' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0C1933]/90 border border-[#204696]/30 rounded-2xl p-6 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-white">Operations Control Centre (OCC)</h3>
            <p className="text-xs text-slate-400">24/7 Flight Dispatch & Turnaround Supervision</p>
            <div className="text-xs font-mono text-[#58C1EB]">+233 302 778 025</div>
            <div className="text-xs text-slate-300">operations@avianceghana.com</div>
          </div>
          <div className="bg-[#0C1933]/90 border border-[#204696]/30 rounded-2xl p-6 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-white">Cargo Village Terminal Liaison</h3>
            <p className="text-xs text-slate-400">Robert Amenyah, Cargo Manager</p>
            <div className="text-xs font-mono text-[#58C1EB]">+233 593 816 076</div>
            <div className="text-xs text-slate-300">cargosales@avianceghana.com</div>
          </div>
          <div className="bg-[#0C1933]/90 border border-[#204696]/30 rounded-2xl p-6 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-white">Baggage Services Office (BSO)</h3>
            <p className="text-xs text-slate-400">Belinda Adade, Lost & Found Manager</p>
            <div className="text-xs font-mono text-[#58C1EB]">+233 244 334 022</div>
            <div className="text-xs text-slate-300">belindaadade@avianceghana.com</div>
          </div>
        </div>
      )}

      {/* Tab 4: Documents */}
      {activeTab === 'documents' && (
        <div className="bg-[#0C1933]/90 border border-[#204696]/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white">Operational Service Level Agreements (SLA) & Manuals</h3>
          <p className="text-xs text-slate-400">Standard documents available for airline station directors:</p>
          <div className="space-y-2">
            {[
              { title: 'Standard Ground Handling Agreement (SGHA) Main Agreement Baseline', size: '1.2 MB' },
              { title: 'IATA Ground Operations Manual (IGOM) Conformance Summary', size: '2.4 MB' },
              { title: 'Kotoka Terminal 3 Emergency Response Plan (ERP) Liaison Protocol', size: '950 KB' },
            ].map((d, i) => (
              <div
                key={i}
                className="bg-[#071120] p-3 rounded-xl border border-[#204696]/25 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 text-slate-200">
                  <FileText className="w-4 h-4 text-[#58C1EB]" />
                  <span>{d.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-slate-500">{d.size}</span>
                  <button
                    onClick={() => toast.info('SGHA document downloaded and dispatched to station manager.', 'Document Access')}
                    className="p-1.5 text-[#58C1EB] hover:text-white"
                  >
                    <FolderDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
