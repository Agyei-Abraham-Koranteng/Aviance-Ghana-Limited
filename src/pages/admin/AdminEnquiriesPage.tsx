import React, { useState } from 'react';
import {
  Mail,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  AlertCircle,
  Building,
  User,
  Send,
  Flag,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Enquiry, EnquiryMessage } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const AdminEnquiriesPage: React.FC = () => {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => dataService.getEnquiries());
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Reply tab state
  const [replyMessage, setReplyMessage] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);

  const reload = () => {
    const list = dataService.getEnquiries();
    setEnquiries(list);
    if (selectedEnquiry) {
      const refreshed = list.find((e) => e.id === selectedEnquiry.id);
      if (refreshed) setSelectedEnquiry(refreshed);
    }
  };

  const categories = [
    'All',
    'General',
    'Passenger Services',
    'Cargo',
    'Baggage',
    'Lounge',
    'VIP',
    'Operations',
    'Careers',
    'Partnerships',
    'Other',
  ];

  const statuses: Enquiry['status'][] = [
    'New',
    'Assigned',
    'In Progress',
    'Waiting for Customer',
    'Resolved',
    'Closed',
  ];

  const filtered = enquiries.filter((e) => {
    const matchesCat = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || e.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || e.priority === selectedPriority;
    const matchesSearch =
      e.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
      e.senderName.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesStatus && matchesPriority && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: Enquiry['status']) => {
    dataService.updateEnquiryStatus(id, newStatus);
    reload();
  };

  const handleUpdatePriority = (id: string, newPriority: Enquiry['priority']) => {
    dataService.updateEnquiryStatus(id, selectedEnquiry?.status || 'In Progress', undefined, {
      priority: newPriority,
    });
    reload();
  };

  const handleUpdateDepartment = (id: string, dept: string) => {
    dataService.updateEnquiryStatus(id, selectedEnquiry?.status || 'In Progress', undefined, {
      assignedDepartment: dept,
    });
    reload();
  };

  const handleSaveResolution = (id: string, notes: string) => {
    dataService.updateEnquiryStatus(id, selectedEnquiry?.status || 'In Progress', notes);
    reload();
  };

  const handleApplyTemplate = (type: 'cargo' | 'baggage' | 'vip' | 'general') => {
    if (!selectedEnquiry) return;
    const ref = selectedEnquiry.referenceNo;
    const name = selectedEnquiry.senderName;

    if (type === 'cargo') {
      setReplyMessage(
        `Dear ${name},\n\nThank you for reaching out to Aviance Ghana Cargo Operations regarding your cargo inquiry (${ref}).\n\nOur bonded cargo warehouse at Kotoka International Airport Terminal 3 operates 24/7 with dedicated cold chain storage (+2°C to +8°C) and EU RA3 certified security screening. Our commercial air cargo team is reviewing your routing requirements and will provide formal tariff quotes and airway bill procedures within 4 operational hours.\n\nWarm regards,\nAviance Ghana Cargo Operations Desk\nKotoka International Airport (ACC)`
      );
    } else if (type === 'baggage') {
      setReplyMessage(
        `Dear ${name},\n\nThis is an automated update regarding your baggage file reference ${ref} at Kotoka Terminal 3.\n\nOur Baggage Services Office (BSO) has logged your enquiry into our apron reconciliation tracker. If your bag has been offloaded from the carrier flight, it is currently staged in our secure customs airside baggage clearing hub. Please proceed to the BSO desk near Carousel 4 with your baggage claim tag for collection verification.\n\nBest regards,\nAviance Ghana Passenger & Baggage Services`
      );
    } else if (type === 'vip') {
      setReplyMessage(
        `Dear ${name},\n\nThank you for choosing Aviance Ghana VIP & CIP Flight Support (${ref}).\n\nWe are pleased to confirm our airside executive meet-and-assist, expedited diplomatic immigration, and Adinkra / Akwaaba Lounge reservations for your itinerary at Kotoka International Airport. Our protocol team will be stationed at the airbridge upon arrival.\n\nYours sincerely,\nAviance VIP & Executive Aviation Team`
      );
    } else {
      setReplyMessage(
        `Dear ${name},\n\nThank you for contacting Aviance Ghana Limited (${ref}).\n\nWe have received your enquiry regarding "${selectedEnquiry.subject}" and have routed it to our Duty Station Manager at Terminal 3, Accra. An operational supervisor will revert to you shortly.\n\nKind regards,\nAviance Ghana Corporate Communications`
      );
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !replyMessage.trim()) return;

    setIsSendingReply(true);
    setTimeout(() => {
      dataService.replyToEnquiry(
        selectedEnquiry.id,
        replyMessage,
        user?.fullName || 'Aviance Duty Manager',
        user?.email || 'operations@avianceghana.com'
      );
      setIsSendingReply(false);
      setReplySuccess(true);
      setReplyMessage('');
      reload();
      setTimeout(() => setReplySuccess(false), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Customer Enquiries & Mini CRM
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35">
              SLA Tracker
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Incoming cargo tariffs, VIP ground support, baggage tracers, and passenger inquiries with simulated dispatch
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="space-y-3">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 font-semibold rounded-lg transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#204696] text-white border border-[#58C1EB]/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary filters & search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Status dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#58C1EB]"
            >
              <option value="All">All Statuses</option>
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            {/* Priority dropdown */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#58C1EB]"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ref (AV-26-...), sender, subject..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] font-mono"
            />
          </div>
        </div>
      </div>

      {/* Main CRM Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tickets Queue List (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
          <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Tickets Queue ({filtered.length})</span>
            <span className="font-mono text-[11px] text-slate-500">24-Hour Airside Response SLA</span>
          </div>

          <div className="divide-y divide-slate-800/80 overflow-y-auto max-h-[680px]">
            {filtered.map((enq) => {
              const isSelected = selectedEnquiry?.id === enq.id;
              const isNew = enq.status === 'New';
              const isUrgent = enq.priority === 'Urgent';
              const isHigh = enq.priority === 'High';

              return (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-4 cursor-pointer transition-colors space-y-2 ${
                    isSelected
                      ? 'bg-slate-800/80 border-l-4 border-[#58C1EB]'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#58C1EB] text-xs">
                        {enq.referenceNo}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {enq.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Priority tag */}
                      {(isUrgent || isHigh) && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            isUrgent
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                          }`}
                        >
                          {enq.priority}
                        </span>
                      )}

                      {/* Status badge */}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          enq.status === 'New'
                            ? 'bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35'
                            : enq.status === 'Assigned'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                            : enq.status === 'In Progress'
                            ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                            : enq.status === 'Waiting for Customer'
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                            : enq.status === 'Resolved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                  </div>

                  <div className="font-semibold text-white text-xs line-clamp-1">{enq.subject}</div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[200px]">
                      From: <strong>{enq.senderName}</strong>
                    </span>
                    <span className="font-mono text-slate-500">
                      {new Date(enq.createdAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                No tickets matching current filters.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Ticket Workspace, Controls & Email Dispatch (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          {selectedEnquiry ? (
            <div className="space-y-4 text-xs">
              {/* Ticket Header & SLA Info */}
              <div className="border-b border-slate-800 pb-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#58C1EB] font-bold text-sm">
                    {selectedEnquiry.referenceNo}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    Within 24h SLA Target
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {selectedEnquiry.subject}
                </h3>
                <div className="text-[11px] text-slate-400">
                  Received: {new Date(selectedEnquiry.createdAt).toLocaleString('en-GB')}
                </div>
              </div>

              {/* Sender Details */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-300">
                  <strong>Sender:</strong> {selectedEnquiry.senderName}
                </div>
                <div className="text-slate-300">
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-[#58C1EB] hover:underline font-mono"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                {selectedEnquiry.phone && (
                  <div className="text-slate-300">
                    <strong>Phone:</strong> {selectedEnquiry.phone}
                  </div>
                )}
                {selectedEnquiry.organization && (
                  <div className="text-slate-300">
                    <strong>Organization:</strong> {selectedEnquiry.organization}
                  </div>
                )}
              </div>

              {/* Original Message */}
              <div className="space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  Original Customer Message
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-200 whitespace-pre-line max-h-36 overflow-y-auto leading-relaxed">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Message Communication History */}
              {selectedEnquiry.messages && selectedEnquiry.messages.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#58C1EB]" /> Dispatch History ({selectedEnquiry.messages.length})
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedEnquiry.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span className="text-[#58C1EB] font-semibold">{msg.senderName}</span>
                          <span>{new Date(msg.createdAt).toLocaleTimeString('en-GB')}</span>
                        </div>
                        <div className="text-slate-300 text-[11px] whitespace-pre-line">
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CRM Routing Controls (Status, Priority, Assigned Department) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold text-[11px] block">
                    Update Ticket Status
                  </label>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleUpdateStatus(selectedEnquiry.id, e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#58C1EB] font-mono"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold text-[11px] block">
                    Priority Escalation
                  </label>
                  <select
                    value={selectedEnquiry.priority || 'Medium'}
                    onChange={(e) => handleUpdatePriority(selectedEnquiry.id, e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-[#58C1EB] focus:outline-none focus:border-[#58C1EB] font-mono"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High (Airline Duty Lead)</option>
                    <option value="Urgent">Urgent (Airside Critical)</option>
                  </select>
                </div>
              </div>

              {/* Department Assignment */}
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold text-[11px] block">
                  Assign to Department
                </label>
                <select
                  value={selectedEnquiry.assignedDepartment || selectedEnquiry.category}
                  onChange={(e) => handleUpdateDepartment(selectedEnquiry.id, e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                >
                  <option value="Passenger Services">Passenger Services (Terminal 3)</option>
                  <option value="Cargo & Cold Chain">Cargo & Cold Chain Vault Operations</option>
                  <option value="Baggage Services Office">Baggage Services Office (BSO)</option>
                  <option value="VIP & Executive Aviation">VIP & Executive Aviation</option>
                  <option value="Ramp & Airside Safety">Ramp & Airside Safety</option>
                  <option value="Human Resources">Human Resources & Recruitment</option>
                  <option value="Corporate Communications">Corporate Communications</option>
                </select>
              </div>

              {/* Simulated Customer Email Dispatch */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-[#58C1EB]" /> Send Response to Customer
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">Simulated Email Relay</span>
                </div>

                {/* Quick response templates */}
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('cargo')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-[#58C1EB]"
                  >
                    + Cargo Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('baggage')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-[#58C1EB]"
                  >
                    + Baggage Tracer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('vip')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-[#58C1EB]"
                  >
                    + VIP Lounge
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('general')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-[#58C1EB]"
                  >
                    + General Ack
                  </button>
                </div>

                <form onSubmit={handleSendReply} className="space-y-2">
                  <textarea
                    rows={4}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type official reply to send via aviation mail relay..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] resize-none font-sans"
                  />

                  {replySuccess && (
                    <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Email response successfully dispatched and logged to ticket thread!
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSendingReply || !replyMessage.trim()}
                      className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSendingReply ? 'Dispatching...' : 'Dispatch Email Response'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Resolution Action Internal Notes */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <label className="text-slate-400 font-semibold text-[11px] block">
                  Internal Staff Notes (Not visible to customer)
                </label>
                <textarea
                  rows={2}
                  defaultValue={selectedEnquiry.resolutionNotes || ''}
                  onBlur={(e) => handleSaveResolution(selectedEnquiry.id, e.target.value)}
                  placeholder="Record handling quote notes, supervisor phone log, or airside team notes..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-24 text-slate-500 text-xs space-y-2">
              <Mail className="w-8 h-8 text-slate-700 mx-auto" />
              <div>Select an enquiry ticket from the queue to view full customer communication and dispatch official responses.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
