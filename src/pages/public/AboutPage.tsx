import React from 'react';
import { Plane, ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const { t, language } = useLanguage();

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero */}
      <div className={`py-16 border-b text-center relative overflow-hidden transition-colors ${
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
            <Plane className="w-4 h-4 -rotate-45" /> {t('pages.about.kicker', 'Corporate Overview')}
          </div>
          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('pages.about.title', 'About Aviance Ghana Limited')}
          </h1>
          <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('pages.about.desc', 'The foundation of Ghana\'s aviation ground handling infrastructure. Connecting West Africa with global destinations through certified safety, operational reliability, and Ghanaian hospitality.')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              {t('pages.about.heritageKicker', 'Our Heritage & Mandate')}
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('pages.about.heritageTitle', 'Pioneering Ground Handling Standards in West Africa')}
            </h2>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {t('pages.about.heritageP1', 'Aviance Ghana Limited is an authorized Ground Handling Organization (GHO) licensed by the Ghana Civil Aviation Authority (GCAA). Based at Kotoka International Airport in Accra, with active stations at Prempeh I International Airport Kumasi and Tamale International Airport, Aviance is the trusted ground handling partner for international scheduled carriers, cargo freighter operators, and executive aviation.')}
            </p>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {t('pages.about.heritageP2', 'With a relentless focus on IATA ISAGO safety compliance, continuous staff development at our Aviation Training Academy, and investment in modern Ground Support Equipment, we ensure that aircraft turnarounds occur on schedule with zero compromise on safety or security.')}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/management')}
                className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  isLight ? 'text-[#204696] hover:text-[#18397a]' : 'text-[#58C1EB] hover:text-white'
                }`}
              >
                <span>{t('pages.about.meetLeadership', 'Meet Executive Leadership')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60'
              : 'bg-[#0C1933]/90 border-[#204696]/30 shadow-[#204696]/5'
          }`}>
            <div className={`text-xs font-semibold uppercase tracking-wider border-b pb-3 ${
              isLight ? 'text-slate-500 border-slate-200' : 'text-slate-400 border-slate-800'
            }`}>
              {t('pages.about.pillarsTitle', 'Core Strategic Pillars')}
            </div>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <ShieldCheck className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <div>
                  <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {language === 'fr' ? 'Sécurité Absolue en Priorité' : language === 'tw' ? 'Bammbɔ a Ɛdi Mu Kan' : 'Uncompromising Safety First'}
                  </h4>
                  <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                    {language === 'fr'
                      ? 'Un système de gestion de la sécurité (SMS) rigoureux et audité en continu selon les normes IATA ISAGO et GCAA.'
                      : language === 'tw'
                      ? 'Safety Management System (SMS) a ɛdi mu a wɔsɔ hwɛ daa wɔ IATA ISAGO ne GCAA mmara ase.'
                      : 'A rigorous just-culture Safety Management System (SMS) audited continuously under IATA ISAGO and GCAA regulations.'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <div>
                  <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {language === 'fr' ? 'Ponctualité Opérationnelle' : language === 'tw' ? 'Berɛ Ano Ntɛmntɛmyɛ' : 'Operational Punctuality'}
                  </h4>
                  <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                    {language === 'fr'
                      ? 'Exécution rigoureuse des rotations en piste assurant la ponctualité des vols (OTP) pour les compagnies aériennes.'
                      : language === 'tw'
                      ? 'Ramp adwumayɛ pa a ɛma wiemhyɛn tu kɔ berɛ ano pɛpɛɛpɛ a akyidie nni ho.'
                      : 'Precision ground turnaround execution ensuring on-time performance (OTP) for carrier flight networks.'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <div>
                  <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {language === 'fr' ? 'Hospitalité & Sens du Service' : language === 'tw' ? 'Akwantufoɔ Akwaaba Pa' : 'Customer-Centric Hospitality'}
                  </h4>
                  <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                    {language === 'fr'
                      ? 'De l\'enregistrement des passagers au confort exclusif du Salon Adinkra, offrant la chaleur authentique du Ghana.'
                      : language === 'tw'
                      ? 'Check-in pono ano kɔsi Adinkra Lounge ahomegye mu, Ghanafoɔ ahohoyerɛ pa a ɛdi mu.'
                      : 'From front-of-house check-in to Adinkra Lounge executive comfort, delivering authentic Ghanaian warmth.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Governance & Code of Conduct Link */}
        <div className={`border rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl transition-all ${
          isLight
            ? 'bg-blue-50/60 border-blue-200/80 shadow-slate-200/60'
            : 'bg-[#0C1933]/95 border-[#204696]/35 shadow-[#204696]/10'
        }`}>
          <div className="space-y-1">
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t('footer.codeOfConduct', 'Corporate Code of Conduct')}
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {language === 'fr'
                ? 'Aviance Ghana applique un code de conduite strict contre la corruption, garantissant une concurrence loyale et le respect mutuel.'
                : language === 'tw'
                ? 'Aviance Ghana yɛ adwuma wɔ porɔeɛ ne kɛtɛasehyɛ ho mmara den ase de ma adwumayɛ pa.'
                : 'Aviance Ghana operates under a strict anti-bribery, fair competition, and anti-harassment Code of Conduct.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/code-of-conduct')}
            className={`px-5 py-2.5 text-xs font-semibold rounded-lg border transition-colors shrink-0 ${
              isLight
                ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {t('footer.codeOfConduct', 'Review Code of Conduct')}
          </button>
        </div>
      </div>
    </div>
  );
};
