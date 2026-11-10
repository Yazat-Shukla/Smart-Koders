import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { formatINR } from '../services/mockApi';

export default function DestinationCard({ destination, onExplore }) {
  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col justify-between transition-colors hover:border-slate-300">
      <div>
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <ImageWithFallback
            src={destination.image}
            alt={`${destination.name}, ${destination.country}`}
            title={destination.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/85 via-[#0B1F33]/25 to-transparent pointer-events-none" />
          <div className="absolute bottom-3.5 left-4 right-4 text-white">
            <p className="text-xs font-medium text-slate-200">
              {destination.country} · {destination.type}
            </p>
            <h3 className="text-lg font-bold text-white leading-snug mt-0.5">
              {destination.name}
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>
              {destination.category} · Best: {destination.bestSeason}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#102A43] tabular-nums">
              <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
              {destination.rating}
            </span>
          </div>

          <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2">
            {destination.description}
          </p>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-[#64748B] block">Estimated trip cost</span>
          <span className="text-base font-bold text-[#102A43] tabular-nums">
            {formatINR(destination.budget)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onExplore(destination)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#0F766E] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#14B8A6]"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}
