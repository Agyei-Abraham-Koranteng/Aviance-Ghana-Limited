import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Building2, Send } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';
import { Enquiry } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate: _onNavigate }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: 'General' as Enquiry['category'],
    subject: '',
    message: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = dataService.submitEnquiry({
        category: formData.category,
        senderName: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        subject: formData.subject,
        message: formData.message,
        priority: 'Medium',
      });

      analyticsService.trackEvent('enquiry_submit', '/contact', {
        category: formData.category,
        ref: created.referenceNo,
      });

      setIsSubmitting(false);
      setSubmittedRef(created.referenceNo);
    }, 400);
  };

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero in Official Aviance Blue */}
      <div className={`py-14 border-b text-center relative overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-blue-50 via-slate-50 to-white border-slate-200'
          : 'bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-[#204696]/30'
      }`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 blur-3xl pointer-events-none rounded-full ${
          isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/20'
        }`} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
            isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
          }`}>
            <Mail className="w-4 h-4" /> {t('pages.contact.kicker', 'Station Directory & Enquiries')}
          </div>
          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('pages.contact.title', 'Contact Aviance Ghana')}
          </h1>
          <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('pages.contact.desc', 'Headquartered at Kotoka International Airport Cargo Village, with active station dispatch offices at Prempeh I Airport Kumasi and Tamale International.')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Column 1: Station Contact Cards */}
          <div className="space-y-6">
            <div className={`border rounded-2xl p-6 space-y-4 shadow-lg transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
            }`}>
              <div className={`flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider ${
                isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
              }`}>
                <Building2 className="w-4 h-4" /> {t('footer.headOffice', 'Head Office Contact')}
              </div>
              <div className={`space-y-3 text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                <div className="flex items-start gap-2.5">
                  <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                  <div>
                    <span className={`font-semibold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Aviance Ghana Head Office · Cargo Village
                    </span>
                    Private Mail Bag 33, Kotoka International Airport, Accra, Ghana
                    <div className={`font-mono text-[11px] mt-0.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>
                      Digital Address: GL-116-0409
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                  <a href="tel:+233593816076" className="hover:underline font-medium">
                    +233 (0) 59 381 6076
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                  <a href="mailto:info@avianceghana.com" className={`hover:underline font-medium ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    info@avianceghana.com
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                  <span>Admin: Mon–Fri 08:00–17:00 · Flight Ops 24/7</span>
                </div>
              </div>
            </div>

            {/* Departmental Direct Contacts */}
            <div className={`border rounded-2xl p-6 space-y-3 shadow-lg transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
            }`}>
              <div className={`text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {t('pages.contact.stationContactsTitle', 'Direct Operational Contacts')}
              </div>
              <div className={`space-y-2 text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>{t('nav.cargo', 'Cargo Services')}</span>
                  <a href="mailto:robertamenyah@avianceghana.com" className={`hover:underline truncate max-w-[180px] font-medium ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    robertamenyah@avianceghana.com
                  </a>
                </div>
                <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>{t('nav.findMyBag', 'Baggage / Lost & Found')}</span>
                  <a href="mailto:belindaadade@avianceghana.com" className={`hover:underline truncate max-w-[180px] font-medium ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    belindaadade@avianceghana.com
                  </a>
                </div>
                <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>OCC - Flight Operations</span>
                  <a href="mailto:occmgr@avianceghana.com" className={`hover:underline truncate max-w-[180px] font-medium ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    occmgr@avianceghana.com
                  </a>
                </div>
                <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>{t('nav.lounge', 'Executive Lounge')}</span>
                  <a href="mailto:loungemanager@avianceghana.com" className={`hover:underline truncate max-w-[180px] font-medium ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    loungemanager@avianceghana.com
                  </a>
                </div>
                <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>{t('nav.vip', 'VIP & Charter Bookings')}</span>
                  <a href="mailto:charterops@avianceghana.com" className={`hover:underline truncate max-w-[180px] font-medium ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    charterops@avianceghana.com
                  </a>
                </div>
                <div className="flex justify-between py-1">
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Domestic (KMS & TML)</span>
                  <a href="mailto:derricknakuja@avianceghana.com" className={`hover:underline truncate max-w-[180px] font-medium ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    derricknakuja@avianceghana.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Enquiry Form */}
          <div className="lg:col-span-2">
            <div className={`border rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-200/60'
                : 'bg-[#0C1933]/95 border-[#204696]/35 shadow-[#204696]/10'
            }`}>
              <div className={`border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {t('pages.contact.formTitle', 'Submit an Operational or Business Enquiry')}
                </h2>
                <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {t('pages.contact.formSubtitle', 'Direct routing to station managers, cargo sales, and flight operations dispatchers.')}
                </p>
              </div>

              {submittedRef ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {t('pages.contact.successTitle', 'Enquiry Transmitted Successfully')}
                  </h3>
                  <p className={`text-xs max-w-md mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {t('pages.contact.successMsg', 'Your enquiry has been logged into our operations system.')}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmittedRef(null)}
                      className="px-6 py-2.5 bg-[#204696] hover:bg-[#18397a] text-xs font-semibold text-white rounded-lg transition-colors shadow-sm"
                    >
                      {t('pages.contact.submitAnother', 'Submit Another Request')}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {t('pages.contact.name', 'Full Name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Samuel Boateng"
                        className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                            : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {t('pages.contact.org', 'Organization / Airline')}
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Airline / Cargo Forwarder"
                        className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                            : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {t('pages.contact.email', 'Email Address')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                            : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {t('pages.contact.phone', 'Phone / WhatsApp')}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+233 24 000 0000"
                        className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                            : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {t('pages.contact.category', 'Department Category')} *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#204696]'
                            : 'bg-slate-950 border-slate-700 text-white focus:border-[#58C1EB]'
                        }`}
                      >
                        <option value="General">General Inquiries</option>
                        <option value="Passenger Services">Passenger Services & PRM</option>
                        <option value="Ramp">Ramp Handling & Pushback</option>
                        <option value="Cargo">Air Cargo & Cold Storage</option>
                        <option value="Lounge">Adinkra Lounge</option>
                        <option value="VIP">Aviance VIP & Charter</option>
                        <option value="Baggage">Baggage Inquiries</option>
                        <option value="IT">Information Technology</option>
                        <option value="Careers">Careers & HR</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {t('pages.contact.subject', 'Subject Line')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief summary of enquiry"
                        className={`w-full border rounded-lg px-3 py-2 text-xs transition-colors focus:outline-none ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                            : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#58C1EB]'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {t('pages.contact.message', 'Detailed Message')} *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify flight schedule details, cargo volume, or handling requirements..."
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
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting...' : t('pages.contact.sendBtn', 'Send Official Enquiry')}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
