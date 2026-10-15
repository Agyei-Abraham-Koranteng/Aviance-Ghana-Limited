import React, { useState } from 'react';
import { Briefcase, MapPin, ArrowRight, GraduationCap, Calendar } from 'lucide-react';
import { Vacancy } from '../../types';
import { ApplicationModal } from '../../components/public/ApplicationModal';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface CareersPageProps {
  vacancies: Vacancy[];
  onNavigate: (path: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ vacancies, onNavigate }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [filterType, setFilterType] = useState<string>('All');

  const nationalServiceVacancies = vacancies.filter((v) => v.employmentType === 'National Service');

  const filteredVacancies = vacancies.filter((v) => {
    if (filterType === 'All') return true;
    if (filterType === 'National Service') return v.employmentType === 'National Service';
    return v.employmentType === filterType;
  });

  const getFilterLabel = (type: string) => {
    if (type === 'All') return t('pages.careers.all', 'All Positions');
    if (type === 'Full-time') return t('pages.careers.fullTime', 'Full-time');
    if (type === 'National Service') return t('pages.careers.nss', 'National Service');
    return type;
  };

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero in Official Aviance Blue */}
      <div className={`py-14 border-b text-center relative overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-blue-50 via-slate-50 to-white border-slate-200'
          : 'bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-[#204696]/30'
      }`}>
        {/* Subtle Ambient Backing Glow */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 blur-3xl pointer-events-none rounded-full ${
          isLight ? 'bg-[#204696]/5' : 'bg-[#204696]/20'
        }`} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
            isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
          }`}>
            <Briefcase className="w-4 h-4" /> {t('pages.careers.kicker', 'Aviation Talent & Careers')}
          </div>
          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('pages.careers.title', 'Build Your Career in Aviation')}
          </h1>
          <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('pages.careers.desc', "Join the men and women powering Ghana's commercial air transport. From aircraft ramp handling and electro-mechanical engineering to passenger hospitality and air cargo logistics.")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Filter Controls */}
        <div className={`flex items-center justify-between border-b pb-4 ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            {['All', 'Full-time', 'National Service'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === type
                    ? 'bg-[#204696] text-white border border-[#58C1EB]/40 shadow-xs'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-[#0E2042]'
                }`}
              >
                {getFilterLabel(type)}
              </button>
            ))}
          </div>
          <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
            {filteredVacancies.length} {t('pages.careers.activeCount', 'Active Opportunities')}
          </span>
        </div>

        {/* Vacancies List */}
        <div className="space-y-6">
          {filteredVacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              className={`border rounded-2xl p-6 sm:p-8 transition-all space-y-4 shadow-lg ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-[#204696]/50 hover:shadow-slate-300/60'
                  : 'bg-[#0C1933]/90 border-[#204696]/25 hover:border-[#58C1EB]/60 hover:bg-[#0E2042]/95 shadow-[#204696]/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className={`flex flex-wrap items-center gap-2 text-xs ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    <span className={`font-semibold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>
                      {vacancy.department}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {vacancy.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className={`px-2 py-0.5 rounded font-mono text-[11px] border ${
                      isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-950 text-slate-300 border-slate-800'
                    }`}>
                      {vacancy.employmentType}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold pt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {vacancy.title}
                  </h3>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className={`text-xs flex items-center sm:justify-end gap-1 mb-2 ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    <Calendar className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                    <span>Apply by: {vacancy.deadline}</span>
                  </div>
                  <button
                    onClick={() => setSelectedVacancy(vacancy)}
                    className="px-5 py-2.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <span>{t('pages.careers.applyBtn', 'Apply for Position')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className={`text-xs leading-relaxed max-w-3xl ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {vacancy.description}
              </p>

              {/* Responsibilities & Requirements */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t text-xs ${
                isLight ? 'border-slate-100 text-slate-700' : 'border-slate-800/80 text-slate-300'
              }`}>
                <div>
                  <span className={`font-semibold block mb-1 uppercase tracking-wider text-[11px] ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>Key Responsibilities</span>
                  <ul className="space-y-1">
                    {vacancy.responsibilities.slice(0, 3).map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className={isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}>•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className={`font-semibold block mb-1 uppercase tracking-wider text-[11px] ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>Candidate Qualifications</span>
                  <ul className="space-y-1">
                    {vacancy.requirements.slice(0, 3).map((req, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className={isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}>•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated National Service Scheme (NSS) Card */}
        <div className={`border rounded-2xl p-8 space-y-4 shadow-lg ${
          isLight
            ? 'bg-blue-50/70 border-blue-200'
            : 'bg-gradient-to-r from-slate-900 to-[#0C1A3A] border-slate-800'
        }`}>
          <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
            isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
          }`}>
            <GraduationCap className="w-5 h-5" /> National Service Personnel (NSS) Intake
          </div>
          <h3 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            National Service Program 2026 / 2027
          </h3>
          <p className={`text-xs max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Aviance Ghana participates actively in grooming prospective Ghanaian graduates across aviation ground operations, IT networks, human resource administration, passenger check-in liaison, and finance accounting.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                const nss = nationalServiceVacancies[0];
                if (nss) setSelectedVacancy(nss);
                else onNavigate('/contact');
              }}
              className="px-6 py-2.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors"
            >
              Submit National Service Application
            </button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        vacancy={selectedVacancy}
        isOpen={Boolean(selectedVacancy)}
        onClose={() => setSelectedVacancy(null)}
      />
    </div>
  );
};
