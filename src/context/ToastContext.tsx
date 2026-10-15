import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
  };
  dismissToast: (id: string) => void;
  toasts: ToastMessage[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string, title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastMessage = { id, type, message, title };

    setToasts((prev) => [...prev.slice(-4), newToast]); // keep max 5 toasts

    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  }, [dismissToast]);

  const toast = {
    success: (message: string, title?: string) => addToast('success', message, title || 'Success'),
    error: (message: string, title?: string) => addToast('error', message, title || 'Action Failed'),
    warning: (message: string, title?: string) => addToast('warning', message, title || 'Attention Required'),
    info: (message: string, title?: string) => addToast('info', message, title || 'System Information'),
  };

  return (
    <ToastContext.Provider value={{ toast, dismissToast, toasts }}>
      {children}
      {/* Toast Notification Container */}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        aria-live="polite"
        role="region"
        aria-label="System notifications"
      >
        {toasts.map((t) => {
          const config = {
            success: {
              icon: CheckCircle2,
              bg: 'bg-slate-900 border-emerald-500/50 text-emerald-400',
              accent: 'text-emerald-400',
            },
            error: {
              icon: AlertCircle,
              bg: 'bg-slate-900 border-rose-500/50 text-rose-400',
              accent: 'text-rose-400',
            },
            warning: {
              icon: AlertTriangle,
              bg: 'bg-slate-900 border-[#204696]/50 text-[#58C1EB]',
              accent: 'text-[#58C1EB]',
            },
            info: {
              icon: Info,
              bg: 'bg-slate-900 border-sky-500/50 text-sky-400',
              accent: 'text-sky-400',
            },
          }[t.type];

          const Icon = config.icon;

          return (
            <div
              key={t.id}
              className={`pointer-events-auto p-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-start gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200 ${config.bg}`}
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.accent}`} />
              <div className="flex-1 min-w-0">
                {t.title && <div className="text-xs font-bold text-white mb-0.5">{t.title}</div>}
                <div className="text-xs text-slate-300 leading-relaxed">{t.message}</div>
              </div>
              <button
                onClick={() => dismissToast(t.id)}
                className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
