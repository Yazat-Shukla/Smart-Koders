import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  ArrowRight,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { mockDestinations, mockActivities } from '../data/mockData';
import { useTrip } from '../context/TripContext';
import { formatINR } from '../services/mockApi';
import DestinationCard from '../components/DestinationCard';
import BudgetCard from '../components/BudgetCard';
import ImageWithFallback from '../components/ImageWithFallback';

export default function Dashboard() {
  const navigate = useNavigate();
  const { activeTrip, trips, selectSavedTrip, expenses, addActivity } = useTrip();
  const [promptInput, setPromptInput] = useState('');
  const [experienceTab, setExperienceTab] = useState('All');

  const suggestedPrompts = [
    'Plan a 5-day trip to Bali.',
    'Find budget-friendly destinations.',
    'Plan a romantic weekend getaway.',
    'Find adventure destinations under ₹50,000.'
  ];

  const experienceTabs = ['All', 'Activities', 'Hotels', 'Sightseeing', 'Travel experiences'];

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    navigate(`/assistant?prompt=${encodeURIComponent(promptInput.trim())}`);
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + Number(e.amount);
  });
  const categoryBreakdown = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key]
  }));

  const miniChartData = [
    { name: 'Planned', amount: activeTrip.budgetTotal },
    { name: 'Estimated', amount: totalSpent },
    { name: 'Remaining', amount: Math.max(activeTrip.budgetTotal - totalSpent, 0) }
  ];

  const filteredExperiences =
    experienceTab === 'All'
      ? mockActivities.slice(0, 4)
      : mockActivities.filter((item) => item.type === experienceTab).slice(0, 4);

  const handleQuickAddExperience = (exp) => {
    addActivity(0, {
      time: '10:30 AM',
      name: exp.title,
      location: exp.location,
      description: exp.description,
      cost: exp.price,
      duration: exp.duration,
      category: exp.type === 'Hotels' ? 'Hotel' : exp.type === 'Sightseeing' ? 'Sightseeing' : 'Activity'
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      {/* Top Greeting & Conversational AI Search Panel */}
      <section className="bg-[#0B1F33] text-white rounded-3xl p-6 sm:p-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold text-[#14B8A6]">
            Good morning, Traveller!
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Where would you like to go next?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            TripPilot AI helps you compare destinations, build day-by-day itineraries, estimate flights and stays in Indian Rupees, and track your trip budget in one workspace.
          </p>

          <form onSubmit={handlePromptSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white rounded-2xl p-2">
              <input
                type="text"
                aria-label="Describe your dream trip"
                placeholder="Describe your dream trip..."
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2.5 text-sm sm:text-base text-[#172B4D] placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#14B8A6]"
              >
                <span>Plan with AI</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="pt-2 space-y-2">
            <p className="text-xs font-medium text-slate-300">Suggested prompts</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => navigate(`/assistant?prompt=${encodeURIComponent(prompt)}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#102A43] hover:bg-[#163859] text-slate-100 text-xs font-medium transition-colors text-left"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Trips & Budget Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Upcoming Trips List */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
              <div>
                <h2 className="text-lg font-bold text-[#102A43]">Upcoming trips</h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Demonstration trip plans saved in your workspace
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/itinerary')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#102A43] transition-colors whitespace-nowrap"
              >
                <span>Open itinerary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-200/80">
              {trips.map((trip) => {
                const isSelected = trip.destination === activeTrip.destination;
                return (
                  <div
                    key={trip.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <ImageWithFallback
                          src={trip.image}
                          alt={trip.destination}
                          title={trip.destination}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#102A43] truncate">
                            {trip.destination}
                          </h3>
                          {isSelected && (
                            <span className="text-xs font-semibold text-[#0F766E]">
                              (Active)
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] mt-1 tabular-nums">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#0F766E]" />
                            {trip.dates}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-[#0F766E]" />
                            {trip.travellers} {trip.travellers > 1 ? 'travellers' : 'traveller'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>Budget {formatINR(trip.budgetTotal)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          trip.status === 'Confirmed' ? 'text-[#16A34A]' : 'text-[#B45309]'
                        }`}
                      >
                        {trip.status === 'Confirmed' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>{trip.status}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          selectSavedTrip(trip.id);
                          navigate('/itinerary');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#102A43] hover:bg-[#0F766E] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        View itinerary
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Small Visual Budget Chart */}
          <div className="pt-4 mt-2 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#102A43]">
                Active trip budget snapshot ({activeTrip.destination})
              </span>
              <span className="text-xs text-[#64748B] tabular-nums">
                Planned vs. Estimated
              </span>
            </div>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={miniChartData} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={72}
                    tick={{ fontSize: 12, fill: '#64748B' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [formatINR(value), 'Amount']}
                    contentStyle={{
                      backgroundColor: '#0B1F33',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#FFFFFF',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="amount" fill="#14B8A6" radius={[0, 6, 6, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Budget Overview Card */}
        <BudgetCard
          totalBudget={activeTrip.budgetTotal}
          totalSpent={totalSpent}
          categoryBreakdown={categoryBreakdown}
          onOpenFullBudget={() => navigate('/budget')}
        />
      </section>

      {/* Popular Destinations */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-[#102A43]">Popular destinations</h2>
            <p className="text-sm text-[#64748B] mt-0.5">
              Curated domestic and international routes with estimated per-person budgets in INR
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F766E] hover:text-[#102A43] transition-colors self-start sm:self-auto whitespace-nowrap"
          >
            <span>Explore all {mockDestinations.length} destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDestinations.slice(0, 4).map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onExplore={(selected) =>
                navigate(`/explore?search=${encodeURIComponent(selected.name)}`)
              }
            />
          ))}
        </div>
      </section>

      {/* Recommended Experiences */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <h2 className="text-lg font-bold text-[#102A43]">Recommended experiences</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Activities, stays, sightseeing, and travel experiences you can add directly to your itinerary
            </p>
          </div>

          {/* Segmented Category Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#F5F8FC] rounded-xl overflow-x-auto">
            {experienceTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setExperienceTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  experienceTab === tab
                    ? 'bg-white text-[#102A43] shadow-xs'
                    : 'text-[#64748B] hover:text-[#102A43]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="flex flex-col sm:flex-row items-start gap-4 pb-5 border-b border-slate-100 last:border-b-0 sm:last:border-b"
            >
              <div className="w-full sm:w-28 h-36 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <ImageWithFallback
                  src={exp.image}
                  alt={exp.title}
                  title={exp.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <p className="text-xs text-[#64748B]">
                  {exp.type} · {exp.location} · {exp.duration}
                </p>
                <h3 className="text-sm font-bold text-[#102A43]">{exp.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {exp.description}
                </p>

                <div className="pt-1 flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[#102A43] tabular-nums">
                    {formatINR(exp.price)}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleQuickAddExperience(exp)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#102A43] transition-colors whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to itinerary</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
