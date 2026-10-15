import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import { Certification } from '../../types';

interface CertificationsPageProps {
  certifications: Certification[];
  onNavigate: (path: string) => void;
}

export const CertificationsPage: React.FC<CertificationsPageProps> = ({ certifications, onNavigate }) => {
  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero in Official Aviance Blue */}
      <div className="py-14 bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-b border-[#204696]/30 text-center relative overflow-hidden">
        {/* Subtle Ambient Backing Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-[#204696]/20 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58C1EB]">
            <ShieldCheck className="w-4 h-4" /> Global Regulatory Compliance
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Accreditations, Licences & Quality Standards
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Aviance Ghana operates under the highest international aviation governance frameworks, validated by IATA, the Ghana Civil Aviation Authority (GCAA), and the European Union.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#0C1933]/90 border border-[#204696]/25 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 transition-all flex flex-col justify-between shadow-lg shadow-[#204696]/5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#58C1EB] uppercase tracking-wider font-semibold">
                    {cert.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {cert.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Official Registration
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#58C1EB] bg-[#204696]/15 px-2 py-0.5 rounded border border-[#58C1EB]/25">
                        CMS Verification Required
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                        cert.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : cert.status === 'expiring_soon'
                          ? 'bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                      }`}
                    >
                      {cert.status === 'active' ? 'Active' : cert.status === 'expiring_soon' ? 'Renewal Due' : 'Pending'}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {cert.name}
                </h3>

                <div className="text-xs text-slate-400 font-medium">
                  Issued by: <span className="text-slate-200">{cert.issuer}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Certificate Ref</span>
                  <span className="text-white font-semibold">{cert.certificateNumber || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Audit Expiry</span>
                  <span className="text-slate-300">{cert.expiryDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Management System (SMS) Callout */}
        <div className="bg-[#0C1933]/95 border border-[#204696]/35 rounded-2xl p-8 space-y-4 max-w-3xl mx-auto text-center shadow-xl shadow-[#204696]/10">
          <div className="w-10 h-10 rounded-full bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/25 flex items-center justify-center mx-auto">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Audit Documentation & Airline Carrier Inquiries
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
            Prospective airline partners requiring complete IATA ISAGO audit reports, station manual excerpts, or dangerous goods handling certifications can request direct copies from our Quality & Safety Directorate.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-2.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors"
            >
              Request Audit Documentation Pack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
