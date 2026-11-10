import React, { useState } from 'react';
import { CalendarDays, Plus, Download } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { formatINR, downloadTextFile } from '../services/mockApi';
import ItineraryCard from '../components/ItineraryCard';
import Modal from '../components/Modal';

export default function Itinerary() {
  const {
    itinerary,
    activeTrip,
    trips,
    selectSavedTrip,
    addActivity,
    updateActivity,
    removeActivity,
    reorderActivity,
    addNewDay,
    showToast
  } = useTrip();

  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const [actName, setActName] = useState('');
  const [actLocation, setActLocation] = useState('');
  const [actTime, setActTime] = useState('10:00 AM');
  const [actDuration, setActDuration] = useState('2h');
  const [actCost, setActCost] = useState('1500');
  const [actDesc, setActDesc] = useState('');
  const [actCategory, setActCategory] = useState('Sightseeing');

  const safeDayIndex = activeDayIndex < itinerary.length ? activeDayIndex : 0;
  const currentDay = itinerary[safeDayIndex] || itinerary[0];

  const openAddModal = () => {
    setEditingActivity(null);
    setActName('');
    setActLocation(activeTrip.destination);
    setActTime('10:00 AM');
    setActDuration('2h');
    setActCost('1500');
    setActDesc('');
    setActCategory('Sightseeing');
    setIsModalOpen(true);
  };

  const openEditModal = (activity) => {
    setEditingActivity(activity);
    setActName(activity.name);
    setActLocation(activity.location);
    setActTime(activity.time);
    setActDuration(activity.duration);
    setActCost(String(activity.cost));
    setActDesc(activity.description);
    setActCategory(activity.category);
    setIsModalOpen(true);
  };

  const handleSaveActivity = (e) => {
    e.preventDefault();
    if (!actName.trim()) return;

    const payload = {
      name: actName.trim(),
      location: actLocation.trim() || activeTrip.destination,
      time: actTime.trim() || '10:00 AM',
      duration: actDuration.trim() || '2h',
      cost: Math.max(0, Number(actCost) || 0),
      description: actDesc.trim() || 'Planned trip activity.',
      category: actCategory
    };

    if (editingActivity) {
      updateActivity(safeDayIndex, editingActivity.id, payload);
    } else {
      addActivity(safeDayIndex, payload);
    }

    setIsModalOpen(false);
    setEditingActivity(null);
  };

  const handleDownloadItinerary = () => {
    const lines = [
      `TRIPPILOT AI — TRAVEL ITINERARY SUMMARY`,
      `Destination: ${activeTrip.destination}`,
      `Dates: ${activeTrip.dates}`,
      `Travellers: ${activeTrip.travellers}`,
      `Estimated Activity Cost: ${formatINR(totalItineraryCost)}`,
      `==========================================`,
      ''
    ];

    itinerary.forEach((day) => {
      lines.push(`DAY ${day.day}: ${day.title} (${day.date})`);
      if (day.activities.length === 0) {
        lines.push('  No activities scheduled.');
      } else {
        day.activities.forEach((act, i) => {
          lines.push(
            `  ${i + 1}. [${act.time} | ${act.duration}] ${act.name} — ${act.location} (${
              act.cost === 0 ? 'Complimentary' : formatINR(act.cost)
            })`
          );
          lines.push(`     ${act.description}`);
        });
      }
      lines.push('');
    });

    const slug = activeTrip.destination.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    downloadTextFile(`trippilot-itinerary-${slug}.txt`, lines.join('\n'));
    showToast('Itinerary summary downloaded.');
  };

  const totalItineraryCost = itinerary.reduce(
    (sum, day) =>
      sum + day.activities.reduce((dSum, act) => dSum + (Number(act.cost) || 0), 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header Summary Card */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#0F766E]">
            Day-by-day trip planner
          </p>
          <h2 className="text-2xl font-extrabold text-[#102A43]">
            {activeTrip.destination}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] tabular-nums">
            <span>{activeTrip.dates}</span>
            <span aria-hidden="true">·</span>
            <span>
              {activeTrip.travellers} {activeTrip.travellers > 1 ? 'travellers' : 'traveller'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Total estimated activities cost:{' '}
              <strong className="text-[#102A43]">{formatINR(totalItineraryCost)}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            aria-label="Switch sample trip"
            value={
              trips.find((t) => t.destination === activeTrip.destination)?.id || ''
            }
            onChange={(e) => {
              if (e.target.value) {
                selectSavedTrip(e.target.value);
                setActiveDayIndex(0);
              }
            }}
            className="text-xs font-semibold bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#102A43] focus:outline-none focus:border-[#14B8A6]"
          >
            <option value="" disabled>
              Switch sample trip...
            </option>
            {trips.map((t) => (
              <option key={t.id} value={t.id}>
                {t.destination} ({t.dates})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              addNewDay();
              setActiveDayIndex(itinerary.length);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add a new day</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadItinerary}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0F766E] text-white text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download itinerary</span>
          </button>
        </div>
      </section>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {itinerary.map((d, index) => {
          const isSelected = safeDayIndex === index;
          return (
            <button
              key={d.day}
              type="button"
              onClick={() => setActiveDayIndex(index)}
              className={`px-4 py-2.5 rounded-xl text-left transition-colors whitespace-nowrap shrink-0 border ${
                isSelected
                  ? 'bg-[#102A43] text-white border-[#102A43]'
                  : 'bg-white text-[#64748B] border-slate-200/80 hover:text-[#102A43]'
              }`}
            >
              <span className="text-[11px] font-medium opacity-80 block tabular-nums">
                Day {d.day} · {d.date}
              </span>
              <span className="text-xs font-bold block mt-0.5">{d.title}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Vertical Timeline */}
      {currentDay && (
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
            <div>
              <h3 className="text-lg font-bold text-[#102A43]">
                Day {currentDay.day}: {currentDay.title}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5 tabular-nums">
                {currentDay.date} · {currentDay.activities.length} scheduled{' '}
                {currentDay.activities.length === 1 ? 'activity' : 'activities'}
              </p>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white text-xs font-bold transition-colors self-start sm:self-auto whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add activity</span>
            </button>
          </div>

          {currentDay.activities.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <CalendarDays className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-[#102A43]">
                No activities scheduled for Day {currentDay.day} yet
              </p>
              <p className="text-xs text-[#64748B]">
                Add sightseeing stops, dining reservations, or transfers to build out this day.
              </p>
              <button
                type="button"
                onClick={openAddModal}
                className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-semibold"
              >
                Add first activity
              </button>
            </div>
          ) : (
            <div className="pt-2">
              {currentDay.activities.map((act, index) => (
                <ItineraryCard
                  key={act.id}
                  activity={act}
                  index={index}
                  totalCount={currentDay.activities.length}
                  onEdit={() => openEditModal(act)}
                  onRemove={() => removeActivity(safeDayIndex, act.id)}
                  onMoveUp={() => reorderActivity(safeDayIndex, index, 'up')}
                  onMoveDown={() => reorderActivity(safeDayIndex, index, 'down')}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Add / Edit Activity Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingActivity(null);
        }}
        title={
          editingActivity
            ? `Edit Activity (Day ${currentDay?.day || 1})`
            : `Add Activity to Day ${currentDay?.day || 1}`
        }
      >
        <form onSubmit={handleSaveActivity} className="space-y-4">
          <div>
            <label htmlFor="act-name" className="text-xs font-semibold text-[#102A43] block mb-1">
              Activity name
            </label>
            <input
              id="act-name"
              type="text"
              required
              placeholder="e.g. Tegalalang Rice Terrace Walk"
              value={actName}
              onChange={(e) => setActName(e.target.value)}
              className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="act-time" className="text-xs font-semibold text-[#102A43] block mb-1">
                Start time
              </label>
              <input
                id="act-time"
                type="text"
                placeholder="10:00 AM"
                value={actTime}
                onChange={(e) => setActTime(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label htmlFor="act-duration" className="text-xs font-semibold text-[#102A43] block mb-1">
                Duration
              </label>
              <input
                id="act-duration"
                type="text"
                placeholder="2h 30m"
                value={actDuration}
                onChange={(e) => setActDuration(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="act-cost" className="text-xs font-semibold text-[#102A43] block mb-1">
                Estimated cost (₹)
              </label>
              <input
                id="act-cost"
                type="number"
                min="0"
                value={actCost}
                onChange={(e) => setActCost(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label htmlFor="act-cat" className="text-xs font-semibold text-[#102A43] block mb-1">
                Category
              </label>
              <select
                id="act-cat"
                value={actCategory}
                onChange={(e) => setActCategory(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="Sightseeing">Sightseeing</option>
                <option value="Food">Food</option>
                <option value="Activity">Activity</option>
                <option value="Culture">Culture</option>
                <option value="Hotel">Hotel</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="act-loc" className="text-xs font-semibold text-[#102A43] block mb-1">
              Location
            </label>
            <input
              id="act-loc"
              type="text"
              placeholder="e.g. Ubud, Bali"
              value={actLocation}
              onChange={(e) => setActLocation(e.target.value)}
              className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
            />
          </div>

          <div>
            <label htmlFor="act-desc" className="text-xs font-semibold text-[#102A43] block mb-1">
              Description
            </label>
            <textarea
              id="act-desc"
              rows="3"
              placeholder="Notes, entry timings, or booking details..."
              value={actDesc}
              onChange={(e) => setActDesc(e.target.value)}
              className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl p-3.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingActivity(null);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white transition-colors"
            >
              {editingActivity ? 'Save changes' : 'Add activity'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
