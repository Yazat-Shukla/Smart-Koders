import React from 'react';
import {
  Plane,
  Hotel,
  Compass,
  Car,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  FileText,
  Download
} from 'lucide-react';
import { formatINR } from '../services/mockApi';

export default function BookingCard({ booking, onViewDetails, onViewVoucher, onDownloadVoucher }) {
  const renderIcon = () => {
    if (booking.type === 'Flight') return <Plane className="w-5 h-5 text-[#0F766E]" />;
    if (booking.type === 'Hotel') return <Hotel className="w-5 h-5 text-[#0F766E]" />;
    if (booking.type === 'Activity') return <Compass className="w-5 h-5 text-[#0F766E]" />;
    return <Car className="w-5 h-5 text-[#0F766E]" />;
  };

  const renderStatus = () => {
    if (booking.status === 'Confirmed') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Confirmed</span>
        </span>
      );
    }
    if (booking.status === 'Pending') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B45309]">
          <Clock className="w-3.5 h-3.5" />
          <span>Pending</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        <XCircle className="w-3.5 h-3.5" />
        <span>{booking.status}</span>
      </span>
    );
  };

  return (
    <article className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-slate-300 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-5">
      <div className="flex items-start gap-4 min-w-0">
        <div className="w-11 h-11 rounded-xl bg-[#F5F8FC] flex items-center justify-center shrink-0 mt-0.5">
          {renderIcon()}
        </div>

        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
            <span className="font-semibold text-[#0F766E]">{booking.type}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">Ref: {booking.reference}</span>
            <span aria-hidden="true">·</span>
            <span>{booking.provider}</span>
          </div>

          <h3 className="text-base font-bold text-[#102A43]">{booking.title}</h3>

          <p className="text-xs text-[#64748B]">
            {booking.destination} · {booking.dates}
          </p>

          <p className="text-xs text-[#64748B] pt-0.5">{booking.details}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200/80 shrink-0">
        <div className="flex items-center gap-4">
          {renderStatus()}
          <span className="text-lg font-extrabold text-[#102A43] tabular-nums">
            {formatINR(booking.price)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(booking)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View details</span>
          </button>

          <button
            type="button"
            onClick={() => onViewVoucher(booking)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View voucher</span>
          </button>

          <button
            type="button"
            onClick={() => onDownloadVoucher(booking)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#102A43] hover:bg-[#0F766E] text-white text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </article>
  );
}
