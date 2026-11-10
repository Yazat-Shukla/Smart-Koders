import React from 'react';
import { Bot, User, CheckCircle2, CalendarDays, Wallet, Calendar, Plus, Building2 } from 'lucide-react';
import { formatINR } from '../services/mockApi';

export default function ChatMessage({
  message,
  onGenerateItinerary,
  onQuickRefineBudget,
  onQuickRefineDates,
  onAddRecommendedActivity,
  onCompareHotels
}) {
  const isUser = message.sender === 'user';
  const preview = message.itineraryPreview;

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? 'bg-[#102A43] text-white' : 'bg-[#14B8A6] text-[#0B1F33]'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className={`max-w-[88%] sm:max-w-[78%] space-y-3 ${isUser ? 'items-end flex flex-col' : ''}`}>
        <div
          className={`px-4 py-3.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-[#102A43] text-white rounded-tr-xs'
              : 'bg-white text-[#172B4D] border border-slate-200/80 rounded-tl-xs'
          }`}
        >
          <p className="whitespace-pre-line">{message.text}</p>
          <span
            className={`text-[11px] block mt-1.5 tabular-nums ${
              isUser ? 'text-slate-300' : 'text-[#64748B]'
            }`}
          >
            {message.timestamp}
          </span>
        </div>

        {preview && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 space-y-4 w-full">
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-slate-200/80">
              <div>
                <p className="text-xs font-medium text-[#0F766E]">
                  Simulated trip proposal · {preview.duration}
                </p>
                <h4 className="text-base font-bold text-[#102A43] mt-0.5">
                  {preview.destination}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#64748B] block">Estimated total</span>
                <span className="text-base font-extrabold text-[#102A43] tabular-nums">
                  {formatINR(preview.estimatedTotal)}
                </span>
              </div>
            </div>

            {/* Flight & Stay Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#64748B] block">Estimated airfare</span>
                <span className="font-semibold text-[#102A43] mt-0.5 block">
                  {preview.flightEstimate}
                </span>
              </div>
              <div>
                <span className="text-[#64748B] block">Suggested accommodation</span>
                <span className="font-semibold text-[#102A43] mt-0.5 block">
                  {preview.hotelRecommendation}
                </span>
              </div>
            </div>

            {/* Cost Breakdown */}
            {preview.costBreakdown && preview.costBreakdown.length > 0 && (
              <div className="pt-3 border-t border-slate-200/70 space-y-1.5">
                <p className="text-xs font-semibold text-[#102A43]">Estimated cost breakdown</p>
                <div className="divide-y divide-slate-100 text-xs">
                  {preview.costBreakdown.map((item, idx) => (
                    <div key={idx} className="py-1.5 flex items-center justify-between">
                      <span className="text-[#64748B]">{item.label}</span>
                      <span className="font-semibold text-[#102A43] tabular-nums">
                        {formatINR(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day-by-Day Outline */}
            {preview.days && preview.days.length > 0 && (
              <div className="pt-3 border-t border-slate-200/70 space-y-2">
                <p className="text-xs font-semibold text-[#102A43]">Day-by-day itinerary outline</p>
                <ul className="space-y-1.5">
                  {preview.days.map((dayLine, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-[#172B4D] leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                      <span>{dayLine}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Refinement Actions */}
            <div className="pt-3 border-t border-slate-200/80 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onGenerateItinerary(preview)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Generate itinerary</span>
              </button>

              <button
                type="button"
                onClick={onQuickRefineBudget}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Wallet className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Change budget</span>
              </button>

              <button
                type="button"
                onClick={onQuickRefineDates}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Change travel dates</span>
              </button>

              {preview.recommendedActivity && (
                <button
                  type="button"
                  onClick={() => onAddRecommendedActivity(preview.recommendedActivity)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Add activity</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onCompareHotels(preview.destination)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Building2 className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Compare hotels</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
