import React from 'react';
import { Star } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { formatINR } from '../services/mockApi';

export default function HotelCard({ hotel, nights = 5, rooms = 1, onViewDetails }) {
  const stayNights = Math.max(1, Number(nights) || 5);
  const stayRooms = Math.max(1, Number(rooms) || 1);
  const totalPrice = hotel.pricePerNight * stayNights * stayRooms;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div>
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <ImageWithFallback
            src={hotel.image}
            alt={hotel.name}
            title={hotel.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-3.5 left-4 right-4 text-white">
            <p className="text-xs font-medium text-slate-200">{hotel.location}</p>
            <h4 className="text-base font-bold text-white leading-snug mt-0.5">
              {hotel.name}
            </h4>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>{hotel.roomType}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#102A43] tabular-nums">
              <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
              {hotel.rating} ({hotel.reviews})
            </span>
          </div>

          <p className="text-xs text-[#64748B] leading-relaxed">
            {hotel.facilities.slice(0, 4).join(' · ')}
          </p>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-[#64748B] block tabular-nums">
            {formatINR(hotel.pricePerNight)} / night · {stayNights}N estimate
          </span>
          <span className="text-base font-extrabold text-[#102A43] tabular-nums">
            {formatINR(totalPrice)} total
          </span>
        </div>

        <button
          type="button"
          onClick={() => onViewDetails(hotel, totalPrice)}
          className="px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#0F766E] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#14B8A6]"
        >
          View details
        </button>
      </div>
    </article>
  );
}
