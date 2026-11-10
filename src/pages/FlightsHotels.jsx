import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PlaneTakeoff,
  Hotel,
  Search,
  AlertCircle,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import {
  simulateFlightSearch,
  simulateHotelSearch,
  formatINR
} from '../services/mockApi';
import FlightCard from '../components/FlightCard';
import HotelCard from '../components/HotelCard';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import ImageWithFallback from '../components/ImageWithFallback';

export default function FlightsHotels() {
  const [searchParams] = useSearchParams();
  const { addBooking } = useTrip();

  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') === 'hotels' ? 'hotels' : 'flights'
  );

  // Flight Search Controls
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');
  const [departDate, setDepartDate] = useState('2026-10-14');
  const [returnDate, setReturnDate] = useState('2026-10-19');
  const [passengers, setPassengers] = useState(2);
  const [cabinClass, setCabinClass] = useState('All');
  const [stopsFilter, setStopsFilter] = useState('All');
  const [flightSort, setFlightSort] = useState('priceAsc');

  // Hotel Search Controls
  const [hotelDest, setHotelDest] = useState(
    searchParams.get('destination') || ''
  );
  const [checkIn, setCheckIn] = useState('2026-10-14');
  const [checkOut, setCheckOut] = useState('2026-10-19');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [minRating, setMinRating] = useState(0);
  const [hotelSort, setHotelSort] = useState('recommended');

  // Async State
  const [flightResults, setFlightResults] = useState([]);
  const [hotelResults, setHotelResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Modal Selection State
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);

  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 5;
  };

  const stayNights = calculateNights();

  const runFlightSearch = async (shouldFail = false) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await simulateFlightSearch({
        from: flightFrom,
        to: flightTo,
        cabinClass,
        stops: stopsFilter,
        sortBy: flightSort,
        shouldFail
      });
      setFlightResults(data);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const runHotelSearch = async (shouldFail = false) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await simulateHotelSearch({
        destination: hotelDest,
        minRating,
        sortBy: hotelSort,
        shouldFail
      });
      setHotelResults(data);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'flights') {
      runFlightSearch();
    } else {
      runHotelSearch();
    }
  }, [activeTab, stopsFilter, flightSort, cabinClass, minRating, hotelSort]);

  const handleConfirmBooking = () => {
    if (!selectedBookingItem) return;

    if (selectedBookingItem.category === 'flight') {
      const { flight, totalEstimatedFare } = selectedBookingItem;
      addBooking({
        type: 'Flight',
        title: `${flight.airline}: ${flight.from} to ${flight.to}`,
        provider: flight.airline,
        destination: flight.to,
        reference: `${flight.flightNumber}-${Math.floor(100 + Math.random() * 900)}`,
        dates: `${departDate} – ${returnDate}`,
        price: totalEstimatedFare,
        details: `${flight.cabin} · ${passengers} passenger${passengers > 1 ? 's' : ''} · ${flight.stops}`
      });
    } else {
      const { hotel, totalPrice } = selectedBookingItem;
      addBooking({
        type: 'Hotel',
        title: hotel.name,
        provider: 'TripPilot Stays (Demo)',
        destination: hotel.location,
        reference: `HT-${Math.floor(10000 + Math.random() * 90000)}`,
        dates: `${checkIn} – ${checkOut} (${stayNights} Nights)`,
        price: totalPrice,
        details: `${hotel.roomType} · ${rooms} room${rooms > 1 ? 's' : ''}, ${guests} guests`
      });
    }

    setSelectedBookingItem(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Search Panel */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#102A43]">Flights & hotels</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              All fares and room rates shown are simulated demonstration estimates in Indian Rupees (₹)
            </p>
          </div>

          {/* Segmented Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#F5F8FC] rounded-xl border border-slate-200/80 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('flights')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                activeTab === 'flights'
                  ? 'bg-[#102A43] text-white'
                  : 'text-[#64748B] hover:text-[#102A43]'
              }`}
            >
              <PlaneTakeoff className="w-4 h-4" />
              <span>Flights</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hotels')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                activeTab === 'hotels'
                  ? 'bg-[#102A43] text-white'
                  : 'text-[#64748B] hover:text-[#102A43]'
              }`}
            >
              <Hotel className="w-4 h-4" />
              <span>Hotels</span>
            </button>
          </div>
        </div>

        {/* Flight Search Form */}
        {activeTab === 'flights' ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runFlightSearch();
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-200/80"
          >
            <div>
              <label htmlFor="fl-from" className="text-xs font-medium text-[#64748B] block mb-1">
                From city
              </label>
              <input
                id="fl-from"
                type="text"
                placeholder="e.g. Mumbai, Delhi"
                value={flightFrom}
                onChange={(e) => setFlightFrom(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label htmlFor="fl-to" className="text-xs font-medium text-[#64748B] block mb-1">
                To city
              </label>
              <input
                id="fl-to"
                type="text"
                placeholder="e.g. Bali, Goa, Dubai"
                value={flightTo}
                onChange={(e) => setFlightTo(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label htmlFor="fl-depart" className="text-xs font-medium text-[#64748B] block mb-1">
                Departure date
              </label>
              <input
                id="fl-depart"
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label htmlFor="fl-return" className="text-xs font-medium text-[#64748B] block mb-1">
                Return date
              </label>
              <input
                id="fl-return"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="fl-pax" className="text-xs font-medium text-[#64748B] block mb-1">
                  Passengers
                </label>
                <input
                  id="fl-pax"
                  type="number"
                  min="1"
                  max="9"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-2.5 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
                />
              </div>

              <div>
                <label htmlFor="fl-cabin" className="text-xs font-medium text-[#64748B] block mb-1">
                  Cabin
                </label>
                <select
                  id="fl-cabin"
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-2 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
                >
                  <option value="All">All</option>
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white text-xs font-bold transition-colors whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search flights</span>
              </button>
            </div>
          </form>
        ) : (
          /* Hotel Search Form */
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runHotelSearch();
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-200/80"
          >
            <div className="lg:col-span-2">
              <label htmlFor="ht-dest" className="text-xs font-medium text-[#64748B] block mb-1">
                Destination
              </label>
              <input
                id="ht-dest"
                type="text"
                placeholder="e.g. Bali, Goa, Kyoto, Udaipur"
                value={hotelDest}
                onChange={(e) => setHotelDest(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label htmlFor="ht-checkin" className="text-xs font-medium text-[#64748B] block mb-1">
                Check-in
              </label>
              <input
                id="ht-checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label htmlFor="ht-checkout" className="text-xs font-medium text-[#64748B] block mb-1">
                Check-out
              </label>
              <input
                id="ht-checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="ht-guests" className="text-xs font-medium text-[#64748B] block mb-1">
                  Guests
                </label>
                <input
                  id="ht-guests"
                  type="number"
                  min="1"
                  max="12"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-2.5 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
                />
              </div>

              <div>
                <label htmlFor="ht-rooms" className="text-xs font-medium text-[#64748B] block mb-1">
                  Rooms
                </label>
                <input
                  id="ht-rooms"
                  type="number"
                  min="1"
                  max="6"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-2.5 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white text-xs font-bold transition-colors whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search hotels</span>
              </button>
            </div>
          </form>
        )}

        {/* Filter & Sort Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
          {activeTab === 'flights' ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#64748B]">Stops:</span>
                {['All', 'Non-stop', '1 Stop'].map((stop) => (
                  <button
                    key={stop}
                    type="button"
                    onClick={() => setStopsFilter(stop)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      stopsFilter === stop
                        ? 'bg-[#102A43] text-white'
                        : 'bg-[#F5F8FC] text-[#64748B] hover:text-[#102A43]'
                    }`}
                  >
                    {stop}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="fl-sort" className="text-xs font-medium text-[#64748B]">
                  Sort by:
                </label>
                <select
                  id="fl-sort"
                  value={flightSort}
                  onChange={(e) => setFlightSort(e.target.value)}
                  className="text-xs font-semibold bg-[#F5F8FC] border border-slate-200 rounded-lg px-3 py-1.5 text-[#102A43] focus:outline-none focus:border-[#14B8A6]"
                >
                  <option value="priceAsc">Lowest estimated fare</option>
                  <option value="priceDesc">Highest estimated fare</option>
                  <option value="duration">Shortest duration</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#64748B]">Minimum rating:</span>
                {[
                  { label: 'All', val: 0 },
                  { label: '4.8+ Stars', val: 4.8 },
                  { label: '4.9+ Stars', val: 4.9 }
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setMinRating(opt.val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      minRating === opt.val
                        ? 'bg-[#102A43] text-white'
                        : 'bg-[#F5F8FC] text-[#64748B] hover:text-[#102A43]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="ht-sort" className="text-xs font-medium text-[#64748B]">
                  Sort by:
                </label>
                <select
                  id="ht-sort"
                  value={hotelSort}
                  onChange={(e) => setHotelSort(e.target.value)}
                  className="text-xs font-semibold bg-[#F5F8FC] border border-slate-200 rounded-lg px-3 py-1.5 text-[#102A43] focus:outline-none focus:border-[#14B8A6]"
                >
                  <option value="recommended">Recommended</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Results Area: Error, Loading, Empty, or Populated */}
      {errorMsg ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center max-w-md mx-auto space-y-3">
          <AlertCircle className="w-8 h-8 text-[#B45309] mx-auto" />
          <h3 className="text-base font-bold text-[#102A43]">Unable to load results</h3>
          <p className="text-xs text-[#64748B]">{errorMsg}</p>
          <button
            type="button"
            onClick={() =>
              activeTab === 'flights' ? runFlightSearch(false) : runHotelSearch(false)
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry search</span>
          </button>
        </div>
      ) : isLoading ? (
        <Loading
          variant={activeTab === 'flights' ? 'rows' : 'cards'}
          count={activeTab === 'flights' ? 4 : 3}
        />
      ) : activeTab === 'flights' ? (
        flightResults.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center max-w-md mx-auto space-y-3">
            <h3 className="text-base font-bold text-[#102A43]">No matching flights found</h3>
            <p className="text-xs text-[#64748B]">
              Try clearing your origin or destination filter to view all available routes.
            </p>
            <button
              type="button"
              onClick={() => {
                setFlightFrom('');
                setFlightTo('');
                setCabinClass('All');
                setStopsFilter('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-semibold"
            >
              Show all flights
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-medium text-[#64748B] px-1 tabular-nums">
              {flightResults.length} estimated flight options · Includes standard cabin and check-in baggage
            </p>
            {flightResults.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                passengers={passengers}
                onSelect={(fl, totalEstimatedFare) =>
                  setSelectedBookingItem({
                    category: 'flight',
                    flight: fl,
                    totalEstimatedFare
                  })
                }
              />
            ))}
          </div>
        )
      ) : hotelResults.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center max-w-md mx-auto space-y-3">
          <h3 className="text-base font-bold text-[#102A43]">No matching properties found</h3>
          <p className="text-xs text-[#64748B]">
            Try searching another city or resetting the minimum star rating filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setHotelDest('');
              setMinRating(0);
            }}
            className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-semibold"
          >
            Show all hotels
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs font-medium text-[#64748B] px-1 tabular-nums">
            {hotelResults.length} properties · Calculated for {stayNights} night{stayNights > 1 ? 's' : ''}, {rooms} room{rooms > 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelResults.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                nights={stayNights}
                rooms={rooms}
                onViewDetails={(ht, totalPrice) =>
                  setSelectedBookingItem({
                    category: 'hotel',
                    hotel: ht,
                    totalPrice
                  })
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Flight / Hotel Details & Simulated Reservation Modal */}
      <Modal
        isOpen={Boolean(selectedBookingItem)}
        onClose={() => setSelectedBookingItem(null)}
        title={
          selectedBookingItem?.category === 'flight'
            ? 'Flight Selection & Simulated Reservation'
            : 'Property Details & Stay Estimate'
        }
      >
        {selectedBookingItem && (
          <div className="space-y-4">
            {selectedBookingItem.category === 'hotel' && (
              <div className="h-44 rounded-xl overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={selectedBookingItem.hotel.image}
                  alt={selectedBookingItem.hotel.name}
                  title={selectedBookingItem.hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-1.5 pb-3 border-b border-slate-200/80">
              <p className="text-xs font-semibold text-[#0F766E]">
                {selectedBookingItem.category === 'flight'
                  ? `${selectedBookingItem.flight.airline} · ${selectedBookingItem.flight.flightNumber}`
                  : selectedBookingItem.hotel.location}
              </p>
              <h4 className="text-base font-bold text-[#102A43]">
                {selectedBookingItem.category === 'flight'
                  ? `${selectedBookingItem.flight.from} to ${selectedBookingItem.flight.to}`
                  : selectedBookingItem.hotel.name}
              </h4>
              <p className="text-xs text-[#64748B]">
                {selectedBookingItem.category === 'flight'
                  ? `${selectedBookingItem.flight.departTime} – ${selectedBookingItem.flight.arrivalTime} · ${selectedBookingItem.flight.duration} · ${selectedBookingItem.flight.stops}`
                  : `${selectedBookingItem.hotel.roomType} · ${stayNights} nights, ${rooms} room(s)`}
              </p>
            </div>

            {selectedBookingItem.category === 'hotel' && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#102A43]">Included facilities</p>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-[#64748B]">
                  {selectedBookingItem.hotel.facilities.map((fac) => (
                    <span key={fac} className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                      {fac}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 text-sm">
              <span className="text-[#64748B] font-medium">Estimated total (INR)</span>
              <span className="text-lg font-extrabold text-[#102A43] tabular-nums">
                {formatINR(
                  selectedBookingItem.category === 'flight'
                    ? selectedBookingItem.totalEstimatedFare
                    : selectedBookingItem.totalPrice
                )}
              </span>
            </div>

            <p className="text-xs text-[#64748B] bg-[#F5F8FC] p-3 rounded-xl">
              Demonstration mode: Confirming adds this item to My Bookings and My Budget locally. No real ticket or payment is processed.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedBookingItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-slate-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white transition-colors"
              >
                {selectedBookingItem.category === 'flight'
                  ? 'Add flight to bookings'
                  : 'Reserve stay (Demo)'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
