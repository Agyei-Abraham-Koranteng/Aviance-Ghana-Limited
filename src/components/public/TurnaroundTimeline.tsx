import React, { useState } from 'react';
import { Plane, Luggage, Fuel, Users, ShieldCheck, ArrowRight, Play, Pause } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const TurnaroundTimeline: React.FC = () => {
  const { isLight } = useTheme();
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: t('timeline.step1.title', 'Aircraft Inbound & Apron Marshalling'),
      time: 'T - 00 Min',
      icon: Plane,
      description: t('timeline.step1.desc', 'Aircraft touches down at Kotoka International Airport. Certified ground marshaller guides the airliner to gate/stand with optical docking guidance or lighted wands. Chocks inserted, safety cones positioned around wings and engine cowlings.'),
      checklist: ['Engine shutdown verification', 'Wheel chocks secured', 'Safety perimeter established', 'Pre-arrival FOD sweep complete']
    },
    {
      step: '02',
      title: t('timeline.step2.title', 'GPU Connection & Passenger Disembarkation'),
      time: 'T + 03 Min',
      icon: Users,
      description: t('timeline.step2.desc', 'Ground Power Unit (GPU 400Hz) and pre-conditioned air units connected. Passenger boarding bridge or motorized passenger stairs positioned. Cabin doors disarmed and opened; passengers disembark with PRM ambulift support.'),
      checklist: ['400Hz electrical power coupled', 'Stairs/bridge docked securely', 'PRM care team assist passengers', 'Cabin crew handover initiated']
    },
    {
      step: '03',
      title: t('timeline.step3.title', 'Baggage & Cargo Hold Offloading'),
      time: 'T + 08 Min',
      icon: Luggage,
      description: t('timeline.step3.desc', 'High-speed belt loaders and main deck container loaders interface with aircraft cargo holds. ULD containers and bulk baggage systematically offloaded onto tug trains for immediate transit to baggage sortation belts and the Cargo Village.'),
      checklist: ['Bulk baggage transferred to carousel', 'Priority bags offloaded first', 'EU RA3 cargo chain maintained', 'Hold damage inspection conducted']
    },
    {
      step: '04',
      title: t('timeline.step4.title', 'Cabin Servicing, Water & Fuel Liaison'),
      time: 'T + 22 Min',
      icon: Fuel,
      description: t('timeline.step4.desc', 'Potable water servicing and lavatory hygiene servicing completed under strict sanitation protocols. Inflight catering coordination and fuel hydrants liaised under fire guard safety watch.'),
      checklist: ['Potable water serviced', 'Lavatory truck vacuum cycle', 'Inflight catering restocked', 'Ramp safety fire watch active']
    },
    {
      step: '05',
      title: t('timeline.step5.title', 'Outbound DCS Boarding & Baggage Loading'),
      time: 'T + 38 Min',
      icon: Users,
      description: t('timeline.step5.desc', 'Departure Control System (DCS) boarding processed at Terminal 3 gates. Automated Baggage Reconciliation System (BRS) verifies every loaded bag matches a boarded passenger. Final loadsheet calculated and signed by captain.'),
      checklist: ['100% BRS baggage reconciliation', 'Biometric gate boarding finalized', 'Trim sheet & loadsheet signed', 'Cargo doors locked and sealed']
    },
    {
      step: '06',
      title: t('timeline.step6.title', 'Towbarless Pushback & Engine Start'),
      time: 'T + 50 Min',
      icon: ShieldCheck,
      description: t('timeline.step6.desc', 'Headset communications technician connects directly to flight deck. Aviance heavy towbarless pushback tractor connects to nose gear. Clear air traffic control clearance received, pushback executed, and all-clear wave given as engines spool.'),
      checklist: ['Nose gear bypass pin removed', 'Intercom headset clearance confirmed', 'Towbarless tractor pushback completed', 'Final salute & safe flight dispatch']
    }
  ];

  return (
    <div className={`border rounded-2xl p-6 sm:p-10 shadow-2xl transition-all ${
      isLight ? 'bg-white border-slate-200/90 shadow-slate-200/60' : 'bg-slate-900 border-slate-800'
    }`}>
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className={`text-xs uppercase tracking-wider font-semibold mb-2 ${
          isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
        }`}>
          {t('timeline.kicker', 'Operational Precision & Turnaround Efficiency')}
        </div>
        <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          {t('timeline.title', 'The 50-Minute Aircraft Turnaround Journey')}
        </h3>
        <p className={`text-sm mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {t('timeline.subtitle', 'From touchdown to departure, every second is choreographed under rigorous IATA ISAGO safety standards by Aviance ground crews.')}
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = idx === activeStep;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl text-left border transition-all ${
                isActive
                  ? isLight
                    ? 'bg-blue-50 border-[#204696] text-[#204696] shadow-sm font-bold'
                    : 'bg-[#58C1EB]/10 border-[#58C1EB]/40 text-white font-bold'
                  : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`font-mono text-xs font-bold ${
                  isActive ? (isLight ? 'text-[#204696]' : 'text-[#58C1EB]') : (isLight ? 'text-slate-500' : 'text-slate-500')
                }`}>
                  {s.step}
                </span>
                <span className={`font-mono text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {s.time}
                </span>
              </div>
              <div className="text-xs font-semibold line-clamp-1">
                {s.title.split('&')[0].trim()}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase */}
      {steps[activeStep] && (
        <div className={`border rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center animate-in fade-in duration-200 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/90'
        }`}>
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                isLight
                  ? 'bg-blue-100 text-[#204696] border-blue-200'
                  : 'bg-[#58C1EB]/20 text-[#58C1EB] border-[#58C1EB]/35'
              }`}>
                {t('timeline.phase', 'Phase')} {steps[activeStep].step} · {steps[activeStep].time}
              </span>
              <h4 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {steps[activeStep].title}
              </h4>
            </div>

            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {steps[activeStep].description}
            </p>

            <div className="pt-2">
              <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                isLight ? 'text-slate-500' : 'text-slate-500'
              }`}>
                {t('timeline.safetyVerif', 'Mandatory Safety Verification')}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {steps[activeStep].checklist.map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded border ${
                    isLight
                      ? 'text-slate-800 bg-white border-slate-200 shadow-2xs'
                      : 'text-slate-300 bg-slate-900/80 border-slate-800'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#204696] shrink-0"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-xl border text-center space-y-4 ${
            isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {t('timeline.seqControls', 'Sequence Controls')}
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border-transparent'
                }`}
              >
                {t('timeline.prev', 'Previous Phase')}
              </button>
              <button
                onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <span>{t('timeline.next', 'Next Phase')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
              {t('timeline.directive', 'Complies with IATA AHM 900 & GCAA Ground Handling Directives')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
