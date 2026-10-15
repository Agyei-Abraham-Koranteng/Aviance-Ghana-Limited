import React, { useState } from 'react';
import { Search, Luggage, CheckCircle2, Clock, MapPin, Phone, AlertCircle, ArrowRight } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';
import { BaggageRecord } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface BaggageTrackerProps {
  onOpenEnquiry?: () => void;
}

export const BaggageTracker: React.FC<BaggageTrackerProps> = ({ onOpenEnquiry }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();
  const [tagInput, setTagInput] = useState('');
  const [searchedTag, setSearchedTag] = useState('');
  const [result, setResult] = useState<BaggageRecord | null | 'NOT_FOUND'>(null);
  const [isSearching, setIsSearching] = useState(false);

  const sampleTags = ['ACC-782910', 'EK-451902', 'DL-338291', 'KQ-910234'];

  const handleSearch = (tagToSearch?: string) => {
    const query = (tagToSearch || tagInput).trim();
    if (!query) return;

    setIsSearching(true);
    setSearchedTag(query);

    // Track analytics event
    analyticsService.trackEvent('baggage_search', '/find-my-bag', { tag: query });

    setTimeout(() => {
      const match = dataService.searchBaggage(query);
      setResult(match || 'NOT_FOUND');
      setIsSearching(false);
    }, 400);
  };

  return (
    <div className={`border rounded-2xl shadow-2xl p-6 sm:p-10 max-w-4xl mx-auto transition-all ${
      isLight ? 'bg-white border-slate-200/90 shadow-slate-200/60' : 'bg-slate-900 border-slate-800'
    }`}>
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
          isLight
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            : 'bg-[#72BF44]/15 border border-[#72BF44]/35 text-[#72BF44]'
        }`}>
          <Luggage className="w-3.5 h-3.5" /> {t('baggage.badge', 'Kotoka International Airport Terminal 3 · SITA BRS')}
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          {t('baggage.title', 'Find My Bag · Automated Baggage Tracing')}
        </h2>
        <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
          isLight ? 'text-slate-600' : 'text-slate-300'
        }`}>
          {t('baggage.deskInfo', 'Baggage Services Office Desk located beside Carousel 2 Arrivals Hall · Direct Line: +233 (0) 544 33 4022')} · Email: <a href="mailto:findmybag@avianceghana.com" className={`underline font-semibold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>findmybag@avianceghana.com</a>
        </p>
      </div>

      {/* Search Input Box */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
        <div className="relative flex-1">
          <Luggage className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={t('baggage.inputPlaceholder', 'e.g. ACC-782910 or EK-451902')}
            className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors uppercase font-mono tracking-wider ${
              isLight
                ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#204696]'
                : 'bg-[#060D1A] border-[#204696]/35 text-white placeholder-slate-400 focus:border-[#58C1EB]'
            }`}
          />
        </div>
        <button
          onClick={() => handleSearch()}
          disabled={isSearching}
          className="px-6 py-3 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
        >
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>{t('baggage.trackBtn', 'Track Bag')}</span>
            </>
          )}
        </button>
      </div>

      {/* Quick-Select Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-8">
        <span className={`font-mono text-[11px] uppercase tracking-wider ${
          isLight ? 'text-slate-600 font-semibold' : 'text-[#58C1EB]/90'
        }`}>
          {t('baggage.samplePrompt', 'Sample Active Stubs:')}
        </span>
        {sampleTags.map((sampleTag) => (
          <button
            key={sampleTag}
            onClick={() => {
              setTagInput(sampleTag);
              handleSearch(sampleTag);
            }}
            className={`px-2.5 py-1 rounded-md font-mono text-[11px] border transition-colors ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-[#204696] border-slate-200 font-bold'
                : 'bg-[#060D1A] hover:bg-[#0E2042] hover:text-white text-[#58C1EB] border-[#204696]/30'
            }`}
          >
            {sampleTag}
          </button>
        ))}
      </div>

      {/* Result Display */}
      {result && result !== 'NOT_FOUND' && (
        <div className={`border rounded-2xl p-6 sm:p-8 animate-in fade-in duration-200 shadow-xl ${
          isLight
            ? 'bg-slate-50 border-slate-200'
            : 'bg-[#0A162C]/95 border-[#204696]/35 shadow-[#204696]/10'
        }`}>
          <div className="mb-3">
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
              isLight
                ? 'bg-blue-100 text-[#204696] border-blue-200'
                : 'text-[#58C1EB] bg-[#204696]/15 border-[#58C1EB]/35'
            }`}>
              Verified BRS Telemetry · WorldTracer Tag Record
            </span>
          </div>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div>
              <div className={`flex items-center gap-2 text-xs font-mono ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <span>Tag: <strong className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{result.baggageTag}</strong></span>
                <span>·</span>
                <span>Carrier: <strong className={isLight ? 'text-slate-800' : 'text-slate-200'}>{result.airlineName} ({result.flightNumber})</strong></span>
              </div>
              <h3 className={`text-xl font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Passenger: {result.passengerName}
              </h3>
              <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Routing: {result.routing} · Station: {result.station}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  result.currentStatus === 'Ready for Collection'
                    ? isLight ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : result.currentStatus === 'Ground Handling in Progress'
                    ? isLight ? 'bg-blue-50 text-[#204696] border border-blue-200' : 'bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35'
                    : isLight ? 'bg-sky-50 text-sky-800 border border-sky-200' : 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {result.currentStatus}
              </span>
              <div className={`text-[11px] font-mono mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Updated: {result.lastUpdated}
              </div>
            </div>
          </div>

          {/* Location & Checkpoint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <div className={`p-4 rounded-xl border ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#060D1A] border-[#204696]/25'
            }`}>
              <div className={`text-xs font-medium flex items-center gap-1.5 mb-1 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <MapPin className={`w-4 h-4 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> Current Checkpoint
              </div>
              <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                {result.lastCheckpoint}
              </div>
              {result.notes && (
                <div className={`text-xs mt-2 p-2.5 rounded border ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#091326] border-[#204696]/20 text-slate-400'
                }`}>
                  {result.notes}
                </div>
              )}
            </div>

            <div className={`p-4 rounded-xl border ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#060D1A] border-[#204696]/25'
            }`}>
              <div className={`text-xs font-medium flex items-center gap-1.5 mb-1 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <Phone className={`w-4 h-4 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} /> Aviance Baggage Desk Liaison
              </div>
              <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                Terminal 3 Baggage Services Office (BSO)
              </div>
              <div className={`text-xs font-mono mt-1 ${isLight ? 'text-[#204696] font-semibold' : 'text-[#58C1EB]'}`}>
                Direct Line: {result.handlerDeskContact}
              </div>
              <div className={`text-[11px] mt-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Available 24/7 for flight arrival passenger queries.
              </div>
            </div>
          </div>

          {/* Operational Progress Bar */}
          <div className={`pt-2 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Ground Handling Lifecycle
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className={`p-2 rounded font-medium border ${
                isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                1. Offloaded
              </div>
              <div className={`p-2 rounded font-medium border ${
                isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                2. Reconciled
              </div>
              <div
                className={`p-2 rounded font-medium border ${
                  result.currentStatus === 'Ready for Collection'
                    ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : isLight ? 'bg-blue-50 border-blue-200 text-[#204696]' : 'bg-[#204696]/15 border-[#58C1EB]/25 text-[#58C1EB]'
                }`}
              >
                3. Arrival Belt
              </div>
              <div
                className={`p-2 rounded font-medium border ${
                  result.currentStatus === 'Ready for Collection'
                    ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : isLight ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                4. Collection
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Not Found State */}
      {result === 'NOT_FOUND' && (
        <div className={`border rounded-xl p-8 text-center animate-in fade-in duration-200 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <AlertCircle className={`w-10 h-10 mx-auto mb-3 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
          <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {t('baggage.notFoundTitle', 'No Baggage Record Found')} ({searchedTag})
          </h3>
          <p className={`text-sm max-w-md mx-auto mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {t('baggage.notFoundDesc', 'The bag tag entered does not match active arrivals records. Please visit the Aviance Baggage Services Office in Terminal 3.')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <a
              href="tel:+233302778025"
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 border transition-colors ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
              Call BSO Desk (+233 302 778 025 Ext. 204)
            </a>
            {onOpenEnquiry && (
              <button
                onClick={onOpenEnquiry}
                className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm text-xs font-semibold rounded-lg flex items-center gap-2"
              >
                <span>{t('baggage.fileClaimBtn', 'File Baggage Claim')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
