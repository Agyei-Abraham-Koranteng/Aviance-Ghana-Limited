import React, { useState } from 'react';
import { Luggage, Plus, Edit, Search, X, CheckCircle2, MapPin } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { BaggageRecord } from '../../types';

export const AdminBaggagePage: React.FC = () => {
  const [records, setRecords] = useState<BaggageRecord[]>(() => dataService.getBaggageRecords());
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Partial<BaggageRecord> | null>(null);

  const reload = () => setRecords(dataService.getBaggageRecords());

  const filtered = records.filter(
    (b) =>
      b.baggageTag.toLowerCase().includes(search.toLowerCase()) ||
      b.passengerName.toLowerCase().includes(search.toLowerCase()) ||
      b.flightNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingRecord({
      baggageTag: `ACC-${Math.floor(100000 + Math.random() * 900000)}`,
      passengerName: '',
      airlineCode: 'BA',
      airlineName: 'British Airways',
      flightNumber: 'BA 078',
      routing: 'LHR -> ACC',
      currentStatus: 'Ready for Collection',
      lastCheckpoint: 'Baggage Services Office (BSO), Terminal 3 Accra',
      handlerDeskContact: '+233 (0)302 778 025 (Ext. 204)',
      station: 'Accra (ACC)',
      notes: 'Cleared baggage sorting and staged for passenger.',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (rec: BaggageRecord) => {
    setEditingRecord(rec);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord?.baggageTag || !editingRecord?.passengerName) return;

    dataService.saveBaggageRecord(editingRecord as any);
    setModalOpen(false);
    setEditingRecord(null);
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Find My Bag · Baggage Reconciliation & Telemetry
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#72BF44]/15 text-[#72BF44] border border-[#72BF44]/35">
              LIVE BRS TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Airport apron baggage reconciliation, sorting milestones, and arrivals claim office files
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Baggage Record</span>
        </button>
      </div>

      {/* Operational Telemetry Summary */}
      <div className="p-4 bg-[#204696]/15 border border-[#58C1EB]/30 rounded-xl flex items-start gap-3">
        <Luggage className="w-5 h-5 text-[#58C1EB] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <div className="font-bold text-[#58C1EB] uppercase tracking-wider text-[11px]">
            KOTOKA INTERNATIONAL AIRPORT TERMINAL 3 · SITA WORLDTRACER INTEGRATION
          </div>
          <p className="text-slate-300 leading-relaxed">
            Baggage tracking files are synchronized with airline Departure Control Systems (DCS) via SITA BagMessage protocols and WorldTracer station desks at Terminal 3 Carousel 2.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tag (ACC-...), flight, passenger..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] font-mono"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {filtered.length} Baggage Feed Records
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Baggage Tag</th>
              <th className="py-3 px-4">Passenger</th>
              <th className="py-3 px-4">Flight</th>
              <th className="py-3 px-4">Current Checkpoint</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-mono font-bold text-[#58C1EB]">{b.baggageTag}</div>
                  <div className="text-[9px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                    SITA BRS ACTIVE
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-white">{b.passengerName}</td>
                <td className="py-3 px-4 font-mono text-slate-300">{b.airlineCode} {b.flightNumber}</td>
                <td className="py-3 px-4 text-slate-400 truncate max-w-[200px]">{b.lastCheckpoint}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      b.currentStatus === 'Ready for Collection'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : b.currentStatus === 'Ground Handling in Progress'
                        ? 'bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/25'
                        : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    }`}
                  >
                    {b.currentStatus}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {modalOpen && editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <h3 className="text-base font-bold text-white">
                {editingRecord.id ? 'Update Baggage File' : 'Create Baggage Record'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Baggage Tag Stub *</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.baggageTag || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, baggageTag: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB] font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Passenger Name *</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.passengerName || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, passengerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Airline</label>
                  <input
                    type="text"
                    value={editingRecord.airlineName || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, airlineName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Flight Number</label>
                  <input
                    type="text"
                    value={editingRecord.flightNumber || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, flightNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB] font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tracking Status</label>
                <select
                  value={editingRecord.currentStatus || 'Ground Handling in Progress'}
                  onChange={(e) => setEditingRecord({ ...editingRecord, currentStatus: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                >
                  <option value="Located">Located</option>
                  <option value="Ground Handling in Progress">Ground Handling in Progress</option>
                  <option value="Ready for Collection">Ready for Collection</option>
                  <option value="In Transit">In Transit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Current Checkpoint Location *</label>
                <input
                  type="text"
                  required
                  value={editingRecord.lastCheckpoint || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, lastCheckpoint: e.target.value })}
                  placeholder="e.g. Carousel 2 Baggage Services Office, Terminal 3"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notes / Instructions for Passenger</label>
                <textarea
                  rows={2}
                  value={editingRecord.notes || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#58C1EB] resize-none"
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
