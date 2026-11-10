import React from 'react';
import { ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../services/mockApi';

export default function BudgetCard({
  totalBudget,
  totalSpent,
  categoryBreakdown = [],
  onOpenFullBudget
}) {
  const remaining = totalBudget - totalSpent;
  const utilization = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  const isOverBudget = remaining < 0;

  return (
    <section className="bg-white rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-[#102A43]">Budget overview</h3>
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold ${
              isOverBudget ? 'text-[#B45309]' : 'text-[#16A34A]'
            }`}
          >
            {isOverBudget ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Over budget</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>On track</span>
              </>
            )}
          </span>
        </div>

        <div>
          <p className="text-2xl font-extrabold text-[#102A43] tabular-nums">
            {formatINR(totalSpent)}
          </p>
          <p className="text-xs text-[#64748B] mt-0.5 tabular-nums">
            Estimated expenses out of {formatINR(totalBudget)} planned budget
          </p>
        </div>

        <div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isOverBudget ? 'bg-[#F59E0B]' : 'bg-[#14B8A6]'
              }`}
              style={{ width: `${Math.min(utilization, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-[#64748B] mt-2 tabular-nums">
            <span>{utilization}% utilized</span>
            <span className={isOverBudget ? 'font-semibold text-[#B45309]' : 'font-semibold text-[#102A43]'}>
              {isOverBudget
                ? `${formatINR(Math.abs(remaining))} over limit`
                : `${formatINR(remaining)} remaining`}
            </span>
          </div>
        </div>

        {categoryBreakdown.length > 0 && (
          <div className="pt-3 border-t border-slate-200/80 divide-y divide-slate-100 text-xs">
            {categoryBreakdown.slice(0, 4).map((item) => (
              <div key={item.name} className="py-2 flex items-center justify-between">
                <span className="text-[#64748B]">{item.name}</span>
                <span className="font-semibold text-[#102A43] tabular-nums">
                  {formatINR(item.value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {onOpenFullBudget && (
        <button
          type="button"
          onClick={onOpenFullBudget}
          className="mt-5 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-bold transition-colors"
        >
          <span>Open budget planner</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </section>
  );
}
