import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
    >
      <div
        className="fixed inset-0 bg-[#0B1F33]/55 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative bg-white rounded-2xl border border-slate-200 shadow-xl w-full ${maxWidth} z-10 overflow-hidden`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80">
          <h3 id="modal-heading" className="text-lg font-bold text-[#102A43]">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-500 hover:text-[#102A43] hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#14B8A6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
