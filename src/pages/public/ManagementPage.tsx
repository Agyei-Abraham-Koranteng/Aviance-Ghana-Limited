import React from 'react';
import { Users, Mail, ArrowLeft } from 'lucide-react';
import { TeamMember } from '../../types';

interface ManagementPageProps {
  team: TeamMember[];
  onNavigate: (path: string) => void;
}

export const ManagementPage: React.FC<ManagementPageProps> = ({ team, onNavigate }) => {
  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero in Official Aviance Blue */}
      <div className="py-14 bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-b border-[#204696]/30 text-center relative overflow-hidden">
        {/* Subtle Ambient Backing Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-[#204696]/20 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <button
            onClick={() => onNavigate('/about')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to About
          </button>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58C1EB]">
            <Users className="w-4 h-4" /> Corporate Governance
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Executive Leadership Team
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Experienced aviation professionals guiding ground operations, safety compliance, cargo logistics, and corporate strategy across Aviance Ghana Limited.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-[#0C1933]/90 border border-[#204696]/25 rounded-2xl overflow-hidden hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 transition-all flex flex-col justify-between shadow-lg shadow-[#204696]/5"
            >
              <div className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-[#58C1EB]/35 flex items-center justify-center font-bold text-[#58C1EB] text-xl overflow-hidden">
                  {member.name.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#58C1EB] uppercase tracking-wider font-semibold">
                      {member.department}
                    </span>
                    {member.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 tracking-wider">
                        VERIFIED OFFICIAL
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#58C1EB] bg-[#204696]/15 px-2 py-0.5 rounded border border-[#58C1EB]/25 tracking-wider">
                        CMS VERIFICATION REQUIRED
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {member.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium">
                    {member.position}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {member.biography}
                </p>
              </div>

              {member.email && (
                <div className="px-6 py-3 bg-slate-950/60 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#58C1EB]" />
                    <span>Liaison Desk</span>
                  </span>
                  <a href={`mailto:${member.email}`} className="text-[#58C1EB] hover:underline">
                    {member.email}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
