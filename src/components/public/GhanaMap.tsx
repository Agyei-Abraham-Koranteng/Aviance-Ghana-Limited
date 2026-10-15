import React, { useState } from 'react';
import { Plane, MapPin, CheckCircle2, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { LocationItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface GhanaMapProps {
  locations: LocationItem[];
  onSelectStation?: (code: string) => void;
}

export const GhanaMap: React.FC<GhanaMapProps> = ({ locations, onSelectStation }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();
  const [activeCode, setActiveCode] = useState<string>('ACC');
  const activeLocation = locations.find((l) => l.code === activeCode) || locations[0];

  return (
    <div className={`border rounded-2xl overflow-hidden shadow-xl p-6 sm:p-8 transition-all ${
      isLight ? 'bg-white border-slate-200 shadow-slate-200/60' : 'bg-slate-900 border-slate-800'
    }`}>
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Interactive Map Visual */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className={`text-xs uppercase tracking-wider font-semibold mb-4 flex items-center gap-2 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t('map.operationalCoverage', 'Operational Coverage Across Ghana')}
          </div>

          <div className={`relative w-72 h-96 border rounded-xl p-4 flex items-center justify-center overflow-hidden ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
          }`}>
            {/* Ghana Outline Silhouette SVG */}
            <svg
              viewBox="0 0 300 400"
              className="w-full h-full text-slate-800/80 stroke-slate-700 stroke-[1.5] fill-slate-800/30"
            >
              {/* Approximated Ghana polygon border */}
              <path
                d="M 120 40 L 190 35 L 210 90 L 225 150 L 215 220 L 245 280 L 220 340 L 190 360 L 130 350 L 85 330 L 70 260 L 95 200 L 80 140 L 105 80 Z"
                className="transition-all duration-300"
              />
              {/* Flight corridors */}
              <line x1="175" y1="345" x2="135" y2="250" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
              <line x1="175" y1="345" x2="155" y2="130" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
              <line x1="135" y1="250" x2="155" y2="130" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
            </svg>

            {/* Station 1: Tamale (TML) */}
            <button
              onClick={() => {
                setActiveCode('TML');
                if (onSelectStation) onSelectStation('TML');
              }}
              className="absolute top-[32%] left-[52%] -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
              title="Tamale International Airport"
            >
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all ${
                  activeCode === 'TML'
                    ? 'bg-[#204696] text-white border border-[#58C1EB]/40 ring-4 ring-[#58C1EB]/40 scale-110'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
                }`}
              >
                <Plane className="w-3.5 h-3.5 -rotate-45" />
              </div>
              <span
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[11px] font-semibold whitespace-nowrap px-1.5 py-0.5 rounded ${
                  activeCode === 'TML' ? 'bg-[#58C1EB]/20 text-[#58C1EB] border border-[#58C1EB]/35' : 'text-slate-400'
                }`}
              >
                Tamale (TML)
              </span>
            </button>

            {/* Station 2: Kumasi (KMS) */}
            <button
              onClick={() => {
                setActiveCode('KMS');
                if (onSelectStation) onSelectStation('KMS');
              }}
              className="absolute top-[62%] left-[45%] -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
              title="Prempeh I International Airport Kumasi"
            >
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all ${
                  activeCode === 'KMS'
                    ? 'bg-[#204696] text-white border border-[#58C1EB]/40 ring-4 ring-[#58C1EB]/40 scale-110'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
                }`}
              >
                <Plane className="w-3.5 h-3.5 -rotate-45" />
              </div>
              <span
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[11px] font-semibold whitespace-nowrap px-1.5 py-0.5 rounded ${
                  activeCode === 'KMS' ? 'bg-[#58C1EB]/20 text-[#58C1EB] border border-[#58C1EB]/35' : 'text-slate-400'
                }`}
              >
                Kumasi (KMS)
              </span>
            </button>

            {/* Station 3: Accra (ACC - Headquarters) */}
            <button
              onClick={() => {
                setActiveCode('ACC');
                if (onSelectStation) onSelectStation('ACC');
              }}
              className="absolute top-[86%] left-[58%] -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
              title="Kotoka International Airport Accra"
            >
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                  activeCode === 'ACC'
                    ? 'bg-[#204696] text-white border border-[#58C1EB]/40 ring-4 ring-[#58C1EB]/40 scale-115'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-[#204696]/50'
                }`}
              >
                <Plane className="w-4 h-4 -rotate-45" />
              </div>
              <span
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[11px] font-bold whitespace-nowrap px-1.5 py-0.5 rounded ${
                  activeCode === 'ACC' ? 'bg-[#58C1EB]/20 text-[#58C1EB] border border-[#58C1EB]/40' : 'text-slate-300'
                }`}
              >
                Accra (ACC) ★ HQ
              </span>
            </button>
          </div>

          {/* Station selector tabs */}
          <div className="flex gap-2 mt-4">
            {locations.map((loc) => (
              <button
                key={loc.code}
                onClick={() => {
                  setActiveCode(loc.code);
                  if (onSelectStation) onSelectStation(loc.code);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeCode === loc.code
                    ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-semibold'
                    : isLight
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {loc.name.split('—')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Station Detailed Information Card */}
        {activeLocation && (
          <div className={`w-full lg:w-1/2 border rounded-xl p-6 space-y-4 transition-all ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800/90'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              isLight ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  isLight ? 'bg-blue-50 text-[#204696] font-semibold' : 'text-[#58C1EB] bg-[#58C1EB]/10'
                }`}>
                  ICAO: {activeLocation.icaoCode} · IATA: {activeLocation.iataCode}
                </span>
                <h3 className={`text-lg font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {activeLocation.airportName}
                </h3>
              </div>
              <span className={`flex items-center gap-1.5 text-xs font-medium ${
                isLight ? 'text-emerald-700' : 'text-emerald-400'
              }`}>
                <CheckCircle2 className="w-4 h-4" /> {t('map.op247', 'Operational 24/7')}
              </span>
            </div>

            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {activeLocation.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className={`space-y-1 p-3 rounded-lg border ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}>
                <div className={`font-medium flex items-center gap-1.5 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  <MapPin className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> {t('map.physicalStation', 'Physical Station')}
                </div>
                <div className={isLight ? 'text-slate-800 font-medium' : 'text-slate-200'}>{activeLocation.address}</div>
                {activeLocation.digitalAddress && (
                  <div className={`font-mono text-[11px] ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]/90'}`}>
                    GhanaPost: {activeLocation.digitalAddress}
                  </div>
                )}
              </div>

              <div className={`space-y-1 p-3 rounded-lg border ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}>
                <div className={`font-medium flex items-center gap-1.5 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  <Clock className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> {t('map.opsHours', 'Flight Operations Hours')}
                </div>
                <div className={isLight ? 'text-slate-800 font-medium' : 'text-slate-200'}>{activeLocation.operatingHours}</div>
              </div>

              <div className={`space-y-1 p-3 rounded-lg border ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}>
                <div className={`font-medium flex items-center gap-1.5 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> {t('map.stationContact', 'Station Contact')}
                </div>
                <div className={isLight ? 'text-slate-800 font-medium' : 'text-slate-200'}>{activeLocation.contactPhone}</div>
              </div>

              <div className={`space-y-1 p-3 rounded-lg border ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}>
                <div className={`font-medium flex items-center gap-1.5 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  <Mail className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> {t('map.dispatchEmail', 'Dispatch Desk Email')}
                </div>
                <a href={`mailto:${activeLocation.contactEmail}`} className={`hover:underline ${
                  isLight ? 'text-[#204696] font-medium' : 'text-[#58C1EB]'
                }`}>
                  {activeLocation.contactEmail}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
