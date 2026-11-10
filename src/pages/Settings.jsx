import React, { useState } from 'react';
import { Save, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import Modal from '../components/Modal';

const ALL_INTERESTS = [
  'Beaches',
  'Mountains',
  'Culture',
  'Adventure',
  'Wellness',
  'Culinary',
  'Wildlife',
  'Luxury Stays'
];

export default function Settings() {
  const { userProfile, setUserProfile, resetDemoData, showToast } = useTrip();

  const [formData, setFormData] = useState({ ...userProfile });
  const [savedNotice, setSavedNotice] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSavedNotice(false);
  };

  const toggleInterest = (interest) => {
    const current = formData.interests || [];
    const next = current.includes(interest)
      ? current.filter((i) => i !== interest)
      : [...current, interest];
    handleChange('interests', next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile(formData);
    setSavedNotice(true);
    showToast('Profile and travel preferences saved.');
  };

  const handleConfirmReset = () => {
    resetDemoData();
    setIsResetModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#102A43]">Settings & preferences</h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage your traveller profile, preferred currency, language, notifications, and travel interests (persisted in localStorage)
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsResetModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-semibold transition-colors self-start sm:self-auto whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset demo data</span>
        </button>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Profile */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-5">
          <h3 className="text-base font-bold text-[#102A43]">User profile</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="set-name" className="text-xs font-medium text-[#64748B] block mb-1">
                Full name
              </label>
              <input
                id="set-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label htmlFor="set-email" className="text-xs font-medium text-[#64748B] block mb-1">
                Email address
              </label>
              <input
                id="set-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label htmlFor="set-phone" className="text-xs font-medium text-[#64748B] block mb-1">
                Phone number
              </label>
              <input
                id="set-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label htmlFor="set-city" className="text-xs font-medium text-[#64748B] block mb-1">
                Home departure city
              </label>
              <input
                id="set-city"
                type="text"
                value={formData.homeCity}
                onChange={(e) => handleChange('homeCity', e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              />
            </div>
          </div>
        </section>

        {/* Personal Travel Preferences, Currency & Language */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-5">
          <h3 className="text-base font-bold text-[#102A43]">
            Personal travel preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="set-currency" className="text-xs font-medium text-[#64748B] block mb-1">
                Preferred currency
              </label>
              <select
                id="set-currency"
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="INR (₹)">Indian Rupee (₹ INR)</option>
                <option value="USD ($)">US Dollar ($ USD)</option>
                <option value="EUR (€)">Euro (€ EUR)</option>
                <option value="GBP (£)">British Pound (£ GBP)</option>
              </select>
            </div>

            <div>
              <label htmlFor="set-language" className="text-xs font-medium text-[#64748B] block mb-1">
                Language preference
              </label>
              <select
                id="set-language"
                value={formData.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Marathi">Marathi</option>
              </select>
            </div>

            <div>
              <label htmlFor="set-style" className="text-xs font-medium text-[#64748B] block mb-1">
                Default travel style
              </label>
              <select
                id="set-style"
                value={formData.preferredStyle}
                onChange={(e) => handleChange('preferredStyle', e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="Balanced Luxury">Balanced Luxury</option>
                <option value="Budget Smart">Budget Smart</option>
                <option value="Romantic Getaways">Romantic Getaways</option>
                <option value="Adventure & Trekking">Adventure & Trekking</option>
                <option value="Family Friendly">Family Friendly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="set-cabin" className="text-xs font-medium text-[#64748B] block mb-1">
                Cabin class preference
              </label>
              <select
                id="set-cabin"
                value={formData.cabinPreference || 'Economy'}
                onChange={(e) => handleChange('cabinPreference', e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div>
              <label htmlFor="set-seat" className="text-xs font-medium text-[#64748B] block mb-1">
                Seat preference
              </label>
              <select
                id="set-seat"
                value={formData.seatPreference || 'Window'}
                onChange={(e) => handleChange('seatPreference', e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="Window">Window</option>
                <option value="Aisle">Aisle</option>
                <option value="Extra Legroom">Extra Legroom</option>
              </select>
            </div>

            <div>
              <label htmlFor="set-diet" className="text-xs font-medium text-[#64748B] block mb-1">
                Dietary preference
              </label>
              <select
                id="set-diet"
                value={formData.dietaryPreference || 'Vegetarian Friendly'}
                onChange={(e) => handleChange('dietaryPreference', e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="Vegetarian Friendly">Vegetarian Friendly</option>
                <option value="Jain Vegetarian">Jain Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="No Preference">No Preference</option>
              </select>
            </div>
          </div>

          {/* Travel Interests */}
          <div className="pt-4 border-t border-slate-200/80 space-y-2.5">
            <span className="text-xs font-semibold text-[#102A43] block">
              Travel interests
            </span>
            <div className="flex flex-wrap gap-2">
              {ALL_INTERESTS.map((interest) => {
                const active = (formData.interests || []).includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-[#102A43] text-white'
                        : 'bg-[#F5F8FC] text-[#64748B] hover:text-[#102A43]'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-[#102A43]">Notification settings</h3>

          <div className="divide-y divide-slate-100">
            <label className="py-3 flex items-center justify-between gap-4 cursor-pointer">
              <div>
                <span className="text-sm font-semibold text-[#102A43] block">
                  Flight fare drop alerts
                </span>
                <span className="text-xs text-[#64748B]">
                  Notify when simulated airfare estimates fall within your target budget
                </span>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.emailNotifications)}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                className="w-4 h-4 accent-[#14B8A6] cursor-pointer shrink-0"
              />
            </label>

            <label className="py-3 flex items-center justify-between gap-4 cursor-pointer">
              <div>
                <span className="text-sm font-semibold text-[#102A43] block">
                  Smart itinerary schedule reminders
                </span>
                <span className="text-xs text-[#64748B]">
                  Receive daily activity timing and check-in reminders
                </span>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.priceAlerts)}
                onChange={(e) => handleChange('priceAlerts', e.target.checked)}
                className="w-4 h-4 accent-[#14B8A6] cursor-pointer shrink-0"
              />
            </label>

            <label className="py-3 flex items-center justify-between gap-4 cursor-pointer">
              <div>
                <span className="text-sm font-semibold text-[#102A43] block">
                  Travel disruption advisories
                </span>
                <span className="text-xs text-[#64748B]">
                  Surface simulated gate changes, weather updates, and transfer alerts
                </span>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.disruptionAlerts)}
                onChange={(e) => handleChange('disruptionAlerts', e.target.checked)}
                className="w-4 h-4 accent-[#14B8A6] cursor-pointer shrink-0"
              />
            </label>
          </div>
        </section>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-4">
          {savedNotice && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences saved</span>
            </span>
          )}
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white text-xs font-bold transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save preferences</span>
          </button>
        </div>
      </form>

      {/* Reset Demo Data Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset Demonstration Data"
      >
        <div className="space-y-4">
          <p className="text-xs text-[#64748B] leading-relaxed">
            This will restore the default sample trips, itinerary activities, bookings, budget expenses, and profile settings in localStorage.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsResetModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmReset}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#102A43] hover:bg-[#0F766E] text-white transition-colors"
            >
              Restore defaults
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
