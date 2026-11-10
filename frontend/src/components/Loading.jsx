import React from 'react';

export default function Loading({ variant = 'cards', count = 3, label = 'Loading travel options...' }) {
  if (variant === 'rows') {
    return (
      <div className="space-y-3" aria-busy="true" aria-label={label}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-200/80 shrink-0" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-slate-200/80 rounded" />
                <div className="h-3 w-24 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="h-4 w-20 bg-slate-200/80 rounded" />
              <div className="h-3 w-24 bg-slate-100 rounded" />
              <div className="h-4 w-20 bg-slate-200/80 rounded" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-5 w-24 bg-slate-200/80 rounded" />
              <div className="h-9 w-28 bg-slate-200/80 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-busy="true"
      aria-label={label}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-slate-200/80 w-full" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-28 bg-slate-100 rounded" />
            <div className="h-5 w-44 bg-slate-200/80 rounded" />
            <div className="h-3.5 w-full bg-slate-100 rounded" />
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="h-4 w-24 bg-slate-200/80 rounded" />
              <div className="h-8 w-24 bg-slate-200/80 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
