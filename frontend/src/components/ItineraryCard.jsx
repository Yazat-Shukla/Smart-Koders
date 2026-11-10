import React from 'react';
import { Clock, MapPin, ArrowUp, ArrowDown, Pencil, Trash2 } from 'lucide-react';
import { formatINR } from '../services/mockApi';

export default function ItineraryCard({
  activity,
  index,
  totalCount,
  onEdit,
  onRemove,
  onMoveUp,
  onMoveDown
}) {
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="relative pl-10 pb-6 last:pb-0">
      {/* Vertical Hairline Rail */}
      {index < totalCount - 1 && (
        <div
          aria-hidden="true"
          className="absolute left-3.5 top-8 bottom-0 w-px bg-slate-200"
        />
      )}

      {/* Numbered Stop Marker */}
      <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-[#102A43] text-white text-xs font-mono font-semibold flex items-center justify-center tabular-nums">
        {stepNumber}
      </div>

      <article className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
            <span className="inline-flex items-center gap-1 font-semibold text-[#0F766E] tabular-nums">
              <Clock className="w-3.5 h-3.5" />
              {activity.time}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{activity.duration}</span>
            <span aria-hidden="true">·</span>
            <span>{activity.category}</span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-sm font-bold text-[#102A43] tabular-nums">
              {Number(activity.cost) === 0 ? 'Complimentary' : formatINR(activity.cost)}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onMoveUp}
                disabled={index === 0}
                aria-label={`Move ${activity.name} up`}
                title="Move up"
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#102A43] hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onMoveDown}
                disabled={index === totalCount - 1}
                aria-label={`Move ${activity.name} down`}
                title="Move down"
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#102A43] hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onEdit}
                aria-label={`Edit ${activity.name}`}
                title="Edit activity"
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#0F766E] hover:bg-slate-100 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove ${activity.name}`}
                title="Remove activity"
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <h4 className="text-base font-bold text-[#102A43] mt-2">{activity.name}</h4>
        <p className="text-sm text-[#64748B] mt-1 leading-relaxed">{activity.description}</p>

        <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-3 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
          <span>{activity.location}</span>
        </div>
      </article>
    </div>
  );
}
