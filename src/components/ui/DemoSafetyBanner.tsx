import React, { useState } from 'react';
import { RotateCcw, ShieldAlert, Check, X, Info } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { useToast } from '../../context/ToastContext';

interface DemoSafetyBannerProps {
  onNavigatePresentation?: () => void;
}

export const DemoSafetyBanner: React.FC<DemoSafetyBannerProps> = ({ onNavigatePresentation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { toast } = useToast();

  const handleResetDemoData = () => {
    setIsResetting(true);
    setTimeout(() => {
      // Clear localStorage cache for dynamic demonstration records
      const keys = [
        'aviance_enquiries',
        'aviance_applications',
        'aviance_audit_logs',
        'aviance_notifications',
        'aviance_baggage',
      ];
      keys.forEach((k) => localStorage.removeItem(k));
      setIsResetting(false);
      setModalOpen(false);
      toast.info('Simulated records reverted to official baseline state.', 'Demo Data Reset');
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/95 border border-slate-700/80 hover:border-[#58C1EB]/60 text-slate-300 text-xs font-mono shadow-xl backdrop-blur-md transition-all group"
          title="Demo Mode Safety & State Controls"
          aria-label="Demo Mode Safety Controls"
        >
          <span className="w-2 h-2 rounded-full bg-[#204696] group-hover:animate-ping"></span>
          <span className="font-semibold text-white">DEMO MODE</span>
          <span className="text-[11px] text-slate-400 group-hover:text-[#58C1EB] transition-colors">
            · Safety Active
          </span>
        </button>

        {onNavigatePresentation && (
          <button
            onClick={onNavigatePresentation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#204696] hover:bg-[#183878] text-white text-slate-950 text-xs font-bold shadow-xl transition-all"
          >
            <span>Executive Demo Slides</span>
          </button>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-[#58C1EB] font-bold text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>Demo Mode & Data Safety</span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                This application is an enterprise <strong>redevelopment concept and CMS prototype</strong> for Aviance Ghana Limited.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#58C1EB]" /> Operational Data Isolation:
                </div>
                <ul className="list-disc pl-4 space-y-1 text-slate-400">
                  <li>Sample baggage tracking records are simulated.</li>
                  <li>Customer enquiries submitted here generate real prototype tickets for evaluation, not live Aviance work orders.</li>
                  <li>Verified corporate information is marked with <span className="text-emerald-400 font-semibold font-mono">✓ VERIFIED OFFICIAL</span>.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
              <button
                onClick={handleResetDemoData}
                disabled={isResetting}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isResetting ? 'Resetting...' : 'Reset Demo Records'}</span>
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm text-xs font-bold rounded-lg transition-colors"
              >
                Continue Evaluation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
