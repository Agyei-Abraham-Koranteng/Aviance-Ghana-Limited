import React, { useState } from 'react';
import { Luggage, Phone, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BaggageTracker } from '../../components/public/BaggageTracker';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface FindMyBagPageProps {
  onNavigate: (path: string) => void;
}

export const FindMyBagPage: React.FC<FindMyBagPageProps> = ({ onNavigate: _onNavigate }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  const [_enquiryOpen, _setEnquiryOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    baggageTag: '',
    flightNumber: '',
    airline: '',
    description: '',
  });
  const [enquirySuccessRef, setEnquirySuccessRef] = useState<string | null>(null);

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const created = dataService.submitEnquiry({
      category: 'Baggage',
      senderName: enquiryForm.name,
      email: enquiryForm.email || 'guest@avianceghana.com',
      phone: enquiryForm.phone,
      subject: `Baggage Claim File: Tag ${enquiryForm.baggageTag || 'N/A'} (Flight ${enquiryForm.flightNumber})`,
      message: `
Airline: ${enquiryForm.airline}
Flight Number: ${enquiryForm.flightNumber}
Baggage Tag Stub: ${enquiryForm.baggageTag}

Physical Description:
${enquiryForm.description}
      `.trim(),
      priority: 'Urgent',
    });

    analyticsService.trackEvent('enquiry_submit', '/find-my-bag', {
      type: 'baggage_claim',
      ref: created.referenceNo,
    });

    setEnquirySuccessRef(created.referenceNo);
  };

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero Header in Official Aviance Blue */}
      <div className={`py-14 border-b text-center relative overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-blue-50 via-slate-50 to-white border-slate-200'
          : 'bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-[#204696]/30'
      }`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 blur-3xl pointer-events-none rounded-full ${
          isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/20'
        }`} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              <Luggage className="w-4 h-4" /> {t('pages.baggage.kicker', 'Kotoka International Airport Terminal 3 · Baggage Services')}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#72BF44]/15 text-[#72BF44] border border-[#72BF44]/35">
              LIVE TELEMETRY
            </span>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
              isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#204696]/30 text-[#58C1EB] border-[#58C1EB]/30'
            }`}>
              IATA WORLDTRACER CONNECTED
            </span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('pages.baggage.title', 'Find My Bag · Real-Time Baggage Tracing')}
          </h1>
          <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('pages.baggage.desc', 'Direct passenger status query for checked luggage, carousel offload stages, and delayed baggage reconciliation at Kotoka International Airport (ACC) Terminal 3.')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* The Live Baggage Tracker Component */}
        <BaggageTracker onOpenEnquiry={() => _setEnquiryOpen(true)} />

        {/* Operational Baggage Desks & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
              isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <Phone className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Terminal 3 Baggage Office</h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Located on the Arrivals Baggage Claim Hall beside Carousel 2. Staffed around the clock for arriving commercial flights.
            </p>
            <div className={`text-xs font-mono font-semibold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>
              Tel: +233 (0) 544 33 4022
            </div>
          </div>

          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
              isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>SITA WorldTracer Network</h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Our baggage tracing team connects directly to international tracing systems utilized by partner airlines and WorldTracer tracing desks.
            </p>
            <div className={`text-xs font-mono font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              International Tracing Desks
            </div>
          </div>

          <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
              isLight ? 'bg-blue-50 text-[#204696] border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border-[#58C1EB]/25'
            }`}>
              <Clock className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Baggage Delivery & Rush Tags</h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Delayed bags received on subsequent flights are priority rush-tagged, customs cleared, and staged for passenger collection or delivery liaison.
            </p>
            <div className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Email: findmybag@avianceghana.com
            </div>
          </div>
        </div>

        {/* Claim / Enquiry Drawer Form */}
        <div className={`border rounded-2xl p-8 max-w-3xl mx-auto space-y-6 shadow-2xl transition-all ${
          isLight
            ? 'bg-white border-slate-200/90 shadow-slate-200/60'
            : 'bg-[#0C1933]/95 border-[#204696]/35 shadow-[#204696]/10'
        }`}>
          <div className={`border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('pages.baggage.claimHeading', 'Submit a Baggage Claim or Enquiry')}
            </h3>
            <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('pages.baggage.claimDesc', 'Our arrivals baggage resolution team is on-duty 24/7 inside Terminal 3. Submit your flight and baggage details for urgent tracing.')}
            </p>
          </div>

          {enquirySuccessRef ? (
            <div className={`p-6 rounded-xl border text-center space-y-3 ${
              isLight ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-950 border-emerald-500/30'
            }`}>
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Baggage Query Logged Successfully
              </h4>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Assistance Ticket Reference: <strong className={`font-mono ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>{enquirySuccessRef}</strong>. Our Baggage Services Office at Kotoka Terminal 3 has received your details and will trace your record.
              </p>
              <button
                onClick={() => setEnquirySuccessRef(null)}
                className="px-4 py-2 bg-[#204696] text-xs font-semibold text-white rounded-lg hover:bg-[#18397a] transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitClaim} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {t('pages.contact.name', 'Passenger Full Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    placeholder="e.g. Kwame Mensah"
                    className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {t('pages.contact.phone', 'Contact Phone / WhatsApp')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    placeholder="+233 24 000 0000"
                    className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Baggage Tag Stub Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.baggageTag}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, baggageTag: e.target.value })}
                    placeholder="e.g. BA-902144"
                    className={`w-full border rounded-lg px-3 py-2 text-xs font-mono uppercase transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Airline
                  </label>
                  <input
                    type="text"
                    value={enquiryForm.airline}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, airline: e.target.value })}
                    placeholder="e.g. British Airways"
                    className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Flight Number
                  </label>
                  <input
                    type="text"
                    value={enquiryForm.flightNumber}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, flightNumber: e.target.value })}
                    placeholder="e.g. BA 078"
                    className={`w-full border rounded-lg px-3 py-2 text-xs font-mono uppercase transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Bag Description & Characteristics (Brand, Color, Shell)
                </label>
                <textarea
                  rows={3}
                  value={enquiryForm.description}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, description: e.target.value })}
                  placeholder="e.g. Samsonite black hard-shell suitcase with yellow identifier ribbon on handle..."
                  className={`w-full border rounded-lg p-3 text-xs resize-none transition-colors focus:outline-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                      : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                  }`}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors"
                >
                  {t('pages.baggage.fileClaim', 'Submit Baggage File')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
