import React from 'react';
import { Plane } from 'lucide-react';
import { formatINR } from '../services/mockApi';

export default function FlightCard({ flight, passengers = 1, onSelect }) {
  const totalEstimatedFare = flight.price * Math.max(1, Number(passengers) || 1);

  return (
    <article className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5">
      {/* Airline & Flight Code */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-11 h-11 rounded-xl bg-[#F5F8FC] text-[#102A43] flex items-center justify-center shrink-0">
          <Plane className="w-5 h-5 text-[#0F766E]" />
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-bold text-[#102A43] truncate">{flight.airline}</h4>
          <p className="text-xs text-[#64748B] font-mono tabular-nums">
            {flight.flightNumber} · {flight.cabin}
          </p>
        </div>
      </div>

      {/* Departure / Duration / Arrival */}
      <div className="flex items-center justify-between sm:justify-center gap-6 sm:gap-8">
        <div>
          <p className="text-base font-bold text-[#102A43] tabular-nums">{flight.departTime}</p>
          <p className="text-xs text-[#64748B]">{flight.from}</p>
        </div>

        <div className="flex flex-col items-center min-w-[96px]">
          <span className="text-xs font-medium text-[#64748B] tabular-nums">
            {flight.duration}
          </span>
          <div className="w-24 h-px bg-slate-300 my-1.5" />
          <span className="text-xs font-semibold text-[#0F766E]">{flight.stops}</span>
        </div>

        <div className="text-right sm:text-left">
          <p className="text-base font-bold text-[#102A43] tabular-nums">{flight.arrivalTime}</p>
          <p className="text-xs text-[#64748B]">{flight.to}</p>
        </div>
      </div>

      {/* Price & Select Action */}
      <div className="flex items-center justify-between md:justify-end gap-5 pt-4 md:pt-0 border-t md:border-t-0 border-slate-200/80">
        <div className="md:text-right">
          <span className="text-xs text-[#64748B] block">
            Estimated fare ({passengers} {passengers > 1 ? 'travellers' : 'traveller'})
          </span>
          <span className="text-lg font-extrabold text-[#102A43] tabular-nums">
            {formatINR(totalEstimatedFare)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(flight, totalEstimatedFare)}
          className="px-4 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0F766E] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#14B8A6]"
        >
          Select flight
        </button>
      </div>
    </article>
  );
}
