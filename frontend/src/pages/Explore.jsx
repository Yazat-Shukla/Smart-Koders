import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, CheckCircle2, ArrowRight } from 'lucide-react';
import { mockDestinations } from '../data/mockData';
import { useTrip } from '../context/TripContext';
import { formatINR } from '../services/mockApi';
import DestinationCard from '../components/DestinationCard';
import Modal from '../components/Modal';
import ImageWithFallback from '../components/ImageWithFallback';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setActiveTrip, showToast } = useTrip();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All'
  );
  const [filterType, setFilterType] = useState('All');
  const [maxBudget, setMaxBudget] = useState(200000);
  const [sortBy, setSortBy] = useState('Popularity');
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearchTerm(q);
  }, [searchParams]);

  const categories = [
    'All',
    'Adventure',
    'Relaxation',
    'Romantic',
    'Family',
    'Culture',
    'Beaches',
    'Mountains'
  ];

  const filteredDestinations = useMemo(() => {
    return mockDestinations
      .filter((dest) => {
        const q = searchTerm.trim().toLowerCase();
        const matchesSearch =
          !q ||
          dest.name.toLowerCase().includes(q) ||
          dest.country.toLowerCase().includes(q) ||
          dest.description.toLowerCase().includes(q);
        const matchesCategory =
          selectedCategory === 'All' ||
          dest.category === selectedCategory ||
          dest.tags.includes(selectedCategory);
        const matchesType = filterType === 'All' || dest.type === filterType;
        const matchesBudget = dest.budget <= maxBudget;
        return matchesSearch && matchesCategory && matchesType && matchesBudget;
      })
      .sort((a, b) => {
        if (sortBy === 'PriceLow') return a.budget - b.budget;
        if (sortBy === 'PriceHigh') return b.budget - a.budget;
        return b.rating - a.rating;
      });
  }, [searchTerm, selectedCategory, filterType, maxBudget, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setFilterType('All');
    setMaxBudget(200000);
    setSortBy('Popularity');
  };

  const handlePlanDestination = (dest) => {
    setActiveTrip((prev) => ({
      ...prev,
      destination: `${dest.name}, ${dest.country}`,
      budgetTotal: dest.budget * 2
    }));
    setSelectedDestination(null);
    showToast(`Selected ${dest.name}, ${dest.country} for planning.`);
    navigate(
      `/assistant?prompt=${encodeURIComponent(
        `Plan a trip to ${dest.name}, ${dest.country}`
      )}`
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header & Filter Controls */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-[#102A43]">Explore destinations</h2>
            <p className="text-sm text-[#64748B] mt-0.5">
              Compare {mockDestinations.length} curated domestic and international destinations with estimated budgets in INR
            </p>
          </div>
          <span className="text-xs font-medium text-[#64748B] tabular-nums">
            Showing {filteredDestinations.length} of {mockDestinations.length} destinations
          </span>
        </div>

        {/* 4-Column Filter Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="search"
              aria-label="Search destinations by city or country"
              placeholder="Search city or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F8FC] border border-slate-200 rounded-xl text-xs font-medium text-[#172B4D] placeholder:text-slate-400 focus:outline-none focus:border-[#14B8A6]"
            />
          </div>

          <div>
            <select
              aria-label="Filter by domestic or international"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full py-2.5 px-3.5 bg-[#F5F8FC] border border-slate-200 rounded-xl text-xs font-medium text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
            >
              <option value="All">All regions (Domestic & International)</option>
              <option value="Domestic">Domestic (India)</option>
              <option value="International">International</option>
            </select>
          </div>

          <div className="bg-[#F5F8FC] px-3.5 py-2 rounded-xl border border-slate-200 flex flex-col justify-center">
            <div className="flex justify-between text-xs font-medium text-[#64748B] mb-1 tabular-nums">
              <span>Max budget</span>
              <span className="font-bold text-[#102A43]">{formatINR(maxBudget)}</span>
            </div>
            <input
              type="range"
              aria-label="Maximum estimated budget"
              min="25000"
              max="200000"
              step="5000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-[#14B8A6] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <select
              aria-label="Sort destinations"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3.5 bg-[#F5F8FC] border border-slate-200 rounded-xl text-xs font-medium text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
            >
              <option value="Popularity">Sort: Popularity</option>
              <option value="PriceLow">Sort: Lowest budget</option>
              <option value="PriceHigh">Sort: Highest budget</option>
            </select>
          </div>
        </div>

        {/* Interactive Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#102A43] text-white'
                  : 'bg-[#F5F8FC] text-[#64748B] hover:text-[#102A43]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results Grid or Empty State */}
      {filteredDestinations.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200/80 text-center max-w-md mx-auto space-y-3">
          <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-[#102A43]">
            No destinations match these filters
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Try increasing your maximum budget slider or clearing your search query.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#0F766E] text-white text-xs font-semibold transition-colors"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onExplore={(item) => setSelectedDestination(item)}
            />
          ))}
        </div>
      )}

      {/* Destination Details Modal */}
      <Modal
        isOpen={Boolean(selectedDestination)}
        onClose={() => setSelectedDestination(null)}
        title={
          selectedDestination
            ? `${selectedDestination.name}, ${selectedDestination.country}`
            : 'Destination Details'
        }
        maxWidth="max-w-xl"
      >
        {selectedDestination && (
          <div className="space-y-5">
            <div className="h-52 rounded-xl overflow-hidden bg-slate-100">
              <ImageWithFallback
                src={selectedDestination.image}
                alt={selectedDestination.name}
                title={selectedDestination.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
              <span>
                {selectedDestination.type} · {selectedDestination.category} · Best season:{' '}
                <strong className="text-[#102A43]">{selectedDestination.bestSeason}</strong>
              </span>
              <span className="font-bold text-[#102A43] tabular-nums">
                Estimated {formatINR(selectedDestination.budget)} / traveller
              </span>
            </div>

            <p className="text-sm text-[#172B4D] leading-relaxed">
              {selectedDestination.description}
            </p>

            {selectedDestination.highlights && (
              <div className="pt-3 border-t border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-[#102A43]">Recommended highlights</h4>
                <ul className="space-y-1.5">
                  {selectedDestination.highlights.map((hl, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-[#64748B]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200/80 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const city = selectedDestination.name;
                  setSelectedDestination(null);
                  navigate(`/flights-hotels?destination=${encodeURIComponent(city)}`);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-semibold transition-colors"
              >
                Check flights & hotels
              </button>
              <button
                type="button"
                onClick={() => handlePlanDestination(selectedDestination)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white text-xs font-bold transition-colors"
              >
                <span>Plan trip with AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
