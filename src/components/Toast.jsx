import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function Toast() {
  const { toast, removeToast } = useTrip();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        removeToast();
      }, 3600);
      return () => clearTimeout(timer);
    }
  }, [toast, removeToast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0B1F33] text-white px-5 py-3.5 rounded-xl shadow-lg border border-slate-700/80 max-w-md"
    >
      {toast.type === 'warning' ? (
        <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0" />
      )}
      <span className="text-sm font-medium leading-snug">{toast.message}</span>
      <button
        type="button"
        onClick={removeToast}
        aria-label="Dismiss notification"
        className="p-1 text-slate-300 hover:text-white rounded-md focus-visible:outline-2 focus-visible:outline-[#14B8A6] transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
