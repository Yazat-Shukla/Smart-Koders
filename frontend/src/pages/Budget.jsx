import React, { useState, useMemo } from 'react';
import {
  Plus,
  Trash2,
  AlertTriangle,
  Pencil,
  Check
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { useTrip } from '../context/TripContext';
import { formatINR } from '../services/mockApi';
import Modal from '../components/Modal';

const EXPENSE_CATEGORIES = [
  'Flights',
  'Hotels',
  'Food',
  'Transport',
  'Activities',
  'Shopping',
  'Other'
];

const CATEGORY_COLORS = {
  Flights: '#102A43',
  Hotels: '#14B8A6',
  Food: '#0F766E',
  Transport: '#3B82F6',
  Activities: '#F59E0B',
  Shopping: '#6366F1',
  Other: '#64748B'
};

const CATEGORY_WEIGHTS = {
  Flights: 0.35,
  Hotels: 0.28,
  Food: 0.12,
  Transport: 0.08,
  Activities: 0.07,
  Shopping: 0.06,
  Other: 0.04
};

export default function Budget() {
  const {
    activeTrip,
    expenses,
    addExpense,
    removeExpense,
    updateTotalBudget
  } = useTrip();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetDraft, setBudgetDraft] = useState(
    String(activeTrip.budgetTotal || 180000)
  );

  const [expName, setExpName] = useState('');
  const [expCategory, setExpCategory] = useState('Food');
  const [expAmount, setExpAmount] = useState('');

  const totalBudget = Number(activeTrip.budgetTotal) || 180000;

  const totalSpent = useMemo(
    () => expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    [expenses]
  );

  const remaining = totalBudget - totalSpent;
  const utilization = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  const isOverBudget = remaining < 0;

  const categorySummary = useMemo(() => {
    const spentMap = {};
    EXPENSE_CATEGORIES.forEach((cat) => {
      spentMap[cat] = 0;
    });
    expenses.forEach((item) => {
      const cat = EXPENSE_CATEGORIES.includes(item.category) ? item.category : 'Other';
      spentMap[cat] += Number(item.amount) || 0;
    });

    return EXPENSE_CATEGORIES.map((cat) => {
      const spent = spentMap[cat];
      const planned = Math.round(totalBudget * (CATEGORY_WEIGHTS[cat] || 0.05));
      return {
        name: cat,
        spent,
        planned,
        color: CATEGORY_COLORS[cat]
      };
    });
  }, [expenses, totalBudget]);

  const pieData = useMemo(
    () =>
      categorySummary
        .filter((c) => c.spent > 0)
        .map((c) => ({ name: c.name, value: c.spent, color: c.color })),
    [categorySummary]
  );

  const handleSaveBudgetCeiling = (e) => {
    e.preventDefault();
    updateTotalBudget(Number(budgetDraft));
    setIsEditingBudget(false);
  };

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!expName.trim() || !expAmount) return;

    addExpense({
      name: expName.trim(),
      category: expCategory,
      amount: Math.max(0, Number(expAmount) || 0),
      date: new Date().toISOString().split('T')[0]
    });

    setExpName('');
    setExpAmount('');
    setExpCategory('Food');
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header & 4 KPI Metrics */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#102A43]">My budget</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              JavaScript-calculated trip expenditure and category allocations in Indian Rupees (₹) for {activeTrip.destination}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white text-xs font-bold transition-colors self-start sm:self-auto whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add expense</span>
          </button>
        </div>

        {/* Budget Exceeded Warning Banner */}
        {isOverBudget && (
          <div
            role="alert"
            className="bg-amber-50 border border-amber-200 text-[#92400E] p-4 rounded-xl flex items-start gap-3 text-xs"
          >
            <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-[#78350F]">
                Spending exceeds planned budget by {formatINR(Math.abs(remaining))}
              </p>
              <p className="mt-0.5 leading-relaxed">
                Your estimated expenses ({formatINR(totalSpent)}) are above your planned ceiling ({formatINR(totalBudget)}). Adjust activity choices or increase your planned budget ceiling below.
              </p>
            </div>
          </div>
        )}

        {/* 4 Summary Metrics Separated by Hairlines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 pt-4 border-t border-slate-200/80">
          <div className="py-3 sm:py-0 sm:pr-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">Total budget</span>
              {!isEditingBudget && (
                <button
                  type="button"
                  onClick={() => {
                    setBudgetDraft(String(totalBudget));
                    setIsEditingBudget(true);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#102A43]"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {isEditingBudget ? (
              <form onSubmit={handleSaveBudgetCeiling} className="mt-1.5 flex items-center gap-2">
                <input
                  type="number"
                  aria-label="Edit total budget in INR"
                  min="5000"
                  step="5000"
                  value={budgetDraft}
                  onChange={(e) => setBudgetDraft(e.target.value)}
                  className="w-32 text-sm font-bold bg-[#F5F8FC] border border-slate-200 rounded-lg px-2.5 py-1 text-[#102A43] tabular-nums focus:outline-none focus:border-[#14B8A6]"
                />
                <button
                  type="submit"
                  aria-label="Save budget"
                  className="p-1.5 rounded-lg bg-[#102A43] text-white hover:bg-[#0F766E]"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <p className="text-2xl font-extrabold text-[#102A43] mt-1 tabular-nums">
                {formatINR(totalBudget)}
              </p>
            )}
          </div>

          <div className="py-3 sm:py-0 sm:px-6">
            <span className="text-xs font-medium text-[#64748B]">Estimated expenditure</span>
            <p className="text-2xl font-extrabold text-[#102A43] mt-1 tabular-nums">
              {formatINR(totalSpent)}
            </p>
          </div>

          <div className="py-3 sm:py-0 sm:px-6">
            <span className="text-xs font-medium text-[#64748B]">Remaining amount</span>
            <p
              className={`text-2xl font-extrabold mt-1 tabular-nums ${
                isOverBudget ? 'text-[#B45309]' : 'text-[#16A34A]'
              }`}
            >
              {isOverBudget ? `-${formatINR(Math.abs(remaining))}` : formatINR(remaining)}
            </p>
          </div>

          <div className="py-3 sm:py-0 sm:pl-6">
            <span className="text-xs font-medium text-[#64748B]">Budget utilization</span>
            <p className="text-2xl font-extrabold text-[#102A43] mt-1 tabular-nums">
              {utilization}%
            </p>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isOverBudget ? 'bg-[#F59E0B]' : 'bg-[#14B8A6]'
                }`}
                style={{ width: `${Math.min(utilization, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recharts Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Pie Chart */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
          <div className="pb-3 border-b border-slate-200/80">
            <h3 className="text-base font-bold text-[#102A43]">Expense distribution</h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Share of total expenditure across active categories
            </p>
          </div>

          {pieData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-xs text-[#64748B]">
              No expenses logged yet. Add an expense to view chart distribution.
            </div>
          ) : (
            <>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={88}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val) => [formatINR(val), 'Spent']}
                      contentStyle={{
                        backgroundColor: '#0B1F33',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#FFFFFF',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[#64748B] truncate">
                      <span
                        className="w-2.5 h-2.5 rounded-xs shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </span>
                    <span className="font-bold text-[#102A43] tabular-nums shrink-0">
                      {formatINR(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Planned vs Estimated Bar Chart */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
          <div className="pb-3 border-b border-slate-200/80">
            <h3 className="text-base font-bold text-[#102A43]">Budget comparison by category</h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Planned target allocation vs. logged expenses (₹ INR)
            </p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categorySummary}
                margin={{ top: 12, right: 12, left: 0, bottom: 16 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `₹${Math.round(val / 1000)}k`}
                />
                <Tooltip
                  formatter={(val) => formatINR(val)}
                  contentStyle={{
                    backgroundColor: '#0B1F33',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#FFFFFF',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar
                  dataKey="planned"
                  name="Planned"
                  fill="#CBD5E1"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="spent"
                  name="Estimated / Spent"
                  fill="#14B8A6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Category Breakdown & Logged Expense Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown */}
        <section className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
          <div className="pb-3 border-b border-slate-200/80">
            <h3 className="text-base font-bold text-[#102A43]">Category breakdown</h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              All 7 expense categories tracked against target shares
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {categorySummary.map((cat) => {
              const pct =
                cat.planned > 0 ? Math.round((cat.spent / cat.planned) * 100) : 0;
              return (
                <div key={cat.name} className="py-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#102A43]">{cat.name}</span>
                    <span className="text-[#64748B] tabular-nums">
                      <strong className="text-[#102A43]">{formatINR(cat.spent)}</strong> /{' '}
                      {formatINR(cat.planned)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(pct, 100)}%`,
                        backgroundColor: pct > 100 ? '#F59E0B' : cat.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Expense Ledger */}
        <section className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
            <div>
              <h3 className="text-base font-bold text-[#102A43]">Expense ledger</h3>
              <p className="text-xs text-[#64748B] mt-0.5 tabular-nums">
                {expenses.length} recorded {expenses.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs font-semibold text-[#0F766E] hover:text-[#102A43]"
            >
              + Log entry
            </button>
          </div>

          {expenses.length === 0 ? (
            <div className="py-10 text-center space-y-3">
              <p className="text-sm font-semibold text-[#102A43]">No expenses logged yet</p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-semibold"
              >
                Log first expense
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {expenses.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-[#F5F8FC]/60 px-2 rounded-lg transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#102A43] truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#64748B] tabular-nums">
                      {item.category} · {item.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-bold text-[#102A43] tabular-nums">
                      {formatINR(item.amount)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExpense(item.id)}
                      aria-label={`Delete ${item.name}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Trip Expense"
      >
        <form onSubmit={handleCreateExpense} className="space-y-4">
          <div>
            <label htmlFor="exp-name" className="text-xs font-semibold text-[#102A43] block mb-1">
              Expense description
            </label>
            <input
              id="exp-name"
              type="text"
              required
              placeholder="e.g. Ubud cooking class for two"
              value={expName}
              onChange={(e) => setExpName(e.target.value)}
              className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="exp-cat" className="text-xs font-semibold text-[#102A43] block mb-1">
                Category
              </label>
              <select
                id="exp-cat"
                value={expCategory}
                onChange={(e) => setExpCategory(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              >
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="exp-amt" className="text-xs font-semibold text-[#102A43] block mb-1">
                Amount (₹)
              </label>
              <input
                id="exp-amt"
                type="number"
                required
                min="1"
                placeholder="2500"
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white transition-colors"
            >
              Save expense
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
