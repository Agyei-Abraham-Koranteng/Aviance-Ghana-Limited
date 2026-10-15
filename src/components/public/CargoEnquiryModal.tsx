import React, { useState } from 'react';
import { X, PackageCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';

interface CargoEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CargoEnquiryModal: React.FC<CargoEnquiryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    senderName: '',
    email: '',
    phone: '',
    organization: '',
    commodityType: 'Perishables / Horticultural',
    origin: 'ACC (Accra)',
    destination: '',
    estimatedWeightKg: '',
    temperatureControlled: 'Yes (+2°C to +8°C Cold Chain)',
    message: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `Air Cargo Handling Enquiry: ${formData.commodityType} (${formData.estimatedWeightKg || 'TBD'} kg)`;
    const fullMessage = `
Organization: ${formData.organization || 'N/A'}
Commodity: ${formData.commodityType}
Routing: ${formData.origin} -> ${formData.destination || 'Unspecified'}
Gross Weight: ${formData.estimatedWeightKg} kg
Cold Chain Required: ${formData.temperatureControlled}

Additional Details:
${formData.message}
    `.trim();

    setTimeout(() => {
      const created = dataService.submitEnquiry({
        category: 'Cargo',
        senderName: formData.senderName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        subject,
        message: fullMessage,
        priority: 'High',
      });

      analyticsService.trackEvent('enquiry_submit', '/cargo', {
        type: 'cargo',
        ref: created.referenceNo,
      });

      setIsSubmitting(false);
      setSubmittedRef(created.referenceNo);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060D1A]/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0A162C] border border-[#204696]/35 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#204696]/25 bg-[#060D1A]/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#58C1EB]/10 rounded text-[#58C1EB] border border-[#58C1EB]/25">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Air Cargo & Cold Chain Tariff Enquiry
              </h3>
              <p className="text-xs text-slate-400">
                Aviance Cargo Village · EU RA3 Accredited Air Freight Hub
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

        {/* Form Body or Success State */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedRef ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">
                Cargo Enquiry Submitted Successfully
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Your enquiry reference is <strong className="text-[#58C1EB] font-mono">{submittedRef}</strong>. An Aviance Cargo documentation specialist will contact you with handling rates, cold store staging slots, and customs guidelines.
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
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    placeholder="e.g. Kwame Asante"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Company / Freight Forwarder *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. West Coast Logistics Ltd"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="operations@company.com"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Commodity Category
                  </label>
                  <select
                    value={formData.commodityType}
                    onChange={(e) => setFormData({ ...formData, commodityType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  >
                    <option>Perishables / Horticultural</option>
                    <option>Pharmaceuticals / Vaccines</option>
                    <option>General Air Cargo</option>
                    <option>Dangerous Goods (DGR)</option>
                    <option>Valuables / Diplomatic Mail</option>
                    <option>Live Animals (AVI)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Gross Weight (KG)
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedWeightKg}
                    onChange={(e) => setFormData({ ...formData, estimatedWeightKg: e.target.value })}
                    placeholder="e.g. 2500"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cold Storage
                  </label>
                  <select
                    value={formData.temperatureControlled}
                    onChange={(e) => setFormData({ ...formData, temperatureControlled: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#58C1EB]"
                  >
                    <option>Yes (+2°C to +8°C Cold Chain)</option>
                    <option>Yes (-20°C Deep Freeze)</option>
                    <option>Ambient Warehouse (15°C - 25°C)</option>
                    <option>Not Required</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Origin Station
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#58C1EB] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Destination Airport
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. LHR, AMS, CDG, DXB"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Specific Handling Instructions / Target Flight Dates
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide AWB details, aircraft type, pallet breakdown requirements, or scheduled departure dates..."
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
                  className="px-6 py-2 bg-[#204696] text-white border border-[#58C1EB]/40 font-semibold text-xs rounded-lg hover:bg-[#183878] transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Transmitting...' : 'Send Cargo Enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
