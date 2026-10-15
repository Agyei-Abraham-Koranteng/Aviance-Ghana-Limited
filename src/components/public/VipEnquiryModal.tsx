import React, { useState } from 'react';
import { X, Crown, CheckCircle2 } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';

interface VipEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: 'VIP' | 'Lounge';
}

export const VipEnquiryModal: React.FC<VipEnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'VIP',
}) => {
  const [formData, setFormData] = useState({
    senderName: '',
    email: '',
    phone: '',
    organization: '',
    serviceType: defaultCategory === 'Lounge' ? 'Adinkra Lounge Corporate Access' : 'Private Aircraft Ground Handling',
    flightNumberOrTail: '',
    arrivalDate: '',
    passengersCount: '1',
    notes: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `${formData.serviceType} Request (${formData.passengersCount} Pax)`;
    const fullMessage = `
Organization / Principal: ${formData.organization || 'Private Individual'}
Service: ${formData.serviceType}
Flight / Tail Number: ${formData.flightNumberOrTail || 'TBD'}
Date & Time: ${formData.arrivalDate || 'Flexible'}
Passenger Count: ${formData.passengersCount}

Special Protocol Requests:
${formData.notes || 'None specified'}
    `.trim();

    setTimeout(() => {
      const created = dataService.submitEnquiry({
        category: defaultCategory === 'Lounge' ? 'Lounge' : 'VIP',
        senderName: formData.senderName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        subject,
        message: fullMessage,
        priority: 'High',
      });

      analyticsService.trackEvent('enquiry_submit', defaultCategory === 'Lounge' ? '/lounge' : '/vip-charter', {
        type: defaultCategory,
        ref: created.referenceNo,
      });

      setIsSubmitting(false);
      setSubmittedRef(created.referenceNo);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060D1A]/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#0A162C] border border-[#204696]/35 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#204696]/25 bg-[#060D1A]/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#58C1EB]/10 rounded text-[#58C1EB] border border-[#58C1EB]/25">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {defaultCategory === 'Lounge' ? 'Adinkra Lounge Booking Request' : 'Aviance VIP & Executive Handling'}
              </h3>
              <p className="text-xs text-slate-400">
                Kotoka International Airport Terminal 3 · Dedicated Protocol Service
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedRef ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">
                Request Dispatched to Protocol Desk
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Reference: <strong className="text-[#58C1EB] font-mono">{submittedRef}</strong>. Our VIP coordinator will review your schedule and contact you with tarmac transfer confirmations and lounge passes.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#204696] text-white border border-[#58C1EB]/40 font-semibold text-xs rounded-lg hover:bg-[#183878] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    placeholder="e.g. David Mensah"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Organization / Entity
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Embassy / Diplomatic Mission"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vip@organization.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+233 24 000 0000"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Requested Service
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  >
                    <option>Private Aircraft Ground Handling</option>
                    <option>Diplomatic Tarmac Escort & Customs</option>
                    <option>Adinkra Lounge Day Pass Access</option>
                    <option>Adinkra Lounge Corporate Block Reservation</option>
                    <option>VIP Apron Vehicle Transfer (Mercedes-Benz)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Flight / Aircraft Tail Number
                  </label>
                  <input
                    type="text"
                    value={formData.flightNumberOrTail}
                    onChange={(e) => setFormData({ ...formData, flightNumberOrTail: e.target.value })}
                    placeholder="e.g. 9G-ABC or BA 078"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="text"
                    value={formData.arrivalDate}
                    onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                    placeholder="e.g. 15 Oct 2026, 14:00 GMT"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Number of Guests / Passengers
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.passengersCount}
                    onChange={(e) => setFormData({ ...formData, passengersCount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#58C1EB] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Specific Requests (Dietary, Armored Vehicle Escort, Inflight Catering)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Detail any special protocol or handling requirements..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#204696] text-white border border-[#58C1EB]/40 font-semibold text-xs rounded-lg hover:bg-[#183878] transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit VIP Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
