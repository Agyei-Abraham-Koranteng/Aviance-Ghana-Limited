import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'conduct' | 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export const LegalPages: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const content = {
    conduct: {
      title: 'Corporate Code of Conduct & Ethics',
      subtitle: 'Aviance Ghana Limited Governance Standards',
      sections: [
        {
          title: '1. Safety & Regulatory Compliance',
          text: 'Every Aviance employee, contractor, and airside agent is empowered and obligated to stop any operation where safety or security could be compromised. Adherence to IATA ISAGO, GCAA regulations, and airport bye-laws is absolute.'
        },
        {
          title: '2. Zero Tolerance for Bribery & Corruption',
          text: 'Aviance Ghana strictly prohibits offering, promising, giving, requesting, or accepting any bribe, kickback, or facilitation payment under any circumstance. All commercial relationships must withstand public scrutiny.'
        },
        {
          title: '3. Fair Competition & Airline Confidentiality',
          text: 'We protect confidential operational, passenger, and commercial data shared with us by our client airlines and ground logistics partners. DCS data and flight manifests are treated with strict security.'
        },
        {
          title: '4. Non-Discrimination & Workplace Respect',
          text: 'We provide an inclusive, safe workplace free from discrimination, harassment, and intimidation based on gender, ethnicity, religion, disability, or nationality.'
        }
      ]
    },
    privacy: {
      title: 'Website Privacy & Data Protection Policy',
      subtitle: 'Compliance with the Ghana Data Protection Act 2012 (Act 843)',
      sections: [
        {
          title: '1. Data Collection Principles',
          text: 'Aviance Ghana collects only personal data strictly necessary to respond to service enquiries, process job applications, or manage baggage tracing requests.'
        },
        {
          title: '2. First-Party Privacy-Conscious Analytics',
          text: 'Our website analytics engine records aggregate page views and session durations without collecting or selling sensitive personal identifiers, third-party cookies, or cross-site tracking profiles.'
        },
        {
          title: '3. Recruitment Data Storage',
          text: 'Resumes and employment applications submitted through our career portal are held securely in restricted HR storage and accessed only by authorized recruitment personnel.'
        },
        {
          title: '4. Your Rights',
          text: 'Under Act 843, you have the right to request access to, correction of, or deletion of your personal contact records held in our customer enquiry database by emailing info@avianceghana.com.'
        }
      ]
    },
    terms: {
      title: 'Terms of Website Use & Portal Access',
      subtitle: 'Legal Conditions Governing the Aviance Ghana Digital Platform',
      sections: [
        {
          title: '1. Intellectual Property',
          text: 'All trademarks, logos, brand assets, imagery, and text content published on this digital platform are the proprietary intellectual property of Aviance Ghana Limited or used under permission.'
        },
        {
          title: '2. Baggage Telemetry & Tracking Status',
          text: 'The baggage query portal provides status updates derived from baggage reconciliation feeds. Actual baggage delivery timelines remain subject to airline carriage contracts and customs inspection clearance.'
        },
        {
          title: '3. Portal Security',
          text: 'Administrative portal access is restricted to authorized personnel. Unauthorized access attempts are logged with audit timestamps and IP addresses in accordance with Ghanaian cybersecurity laws.'
        }
      ]
    }
  }[type];

  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* Hero in Official Aviance Blue */}
      <div className="py-14 bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-b border-[#204696]/30 relative overflow-hidden">
        {/* Subtle Ambient Backing Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-[#204696]/20 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58C1EB]">
            <ShieldCheck className="w-4 h-4" /> {content.subtitle}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {content.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {content.sections.map((sec, idx) => (
          <div key={idx} className="bg-[#0C1933]/90 border border-[#204696]/25 rounded-2xl p-6 sm:p-8 space-y-2 shadow-lg shadow-[#204696]/5">
            <h3 className="text-lg font-bold text-white">
              {sec.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {sec.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
