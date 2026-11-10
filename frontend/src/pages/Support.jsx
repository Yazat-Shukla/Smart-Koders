import React, { useState } from 'react';
import {
  Send,
  Bot,
  User,
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { formatINR } from '../services/mockApi';
import Modal from '../components/Modal';

export default function Support() {
  const { bookings, updateBookingStatus } = useTrip();

  // AI Support Chat
  const [messages, setMessages] = useState([
    {
      id: 'sup-1',
      sender: 'bot',
      text: 'Hello! I am the TripPilot AI Support Assistant. Ask about baggage rules, flight schedule monitoring, or use the self-service request panel to simulate a booking modification, rebooking, or cancellation.',
      time: '10:00 AM'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Booking Lookup
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState(bookings[0] || null);

  // Simulated Request Workflow Modal
  // step: 'select' | 'confirm'
  const [requestModal, setRequestModal] = useState(null); // { type: 'Cancellation' | 'Modification' | 'Rebooking', step: 'select' | 'confirm' }
  const [selectedBookingId, setSelectedBookingId] = useState(bookings[0]?.id || '');
  const [requestNote, setRequestNote] = useState('');

  // FAQ Accordion
  const [expandedFaq, setExpandedFaq] = useState(0);

  const faqs = [
    {
      q: 'How do simulated cancellations and modifications work in TripPilot AI?',
      a: 'TripPilot AI demonstrates post-booking traveller assistance locally. When you submit a cancellation, modification, or rebooking request, you can review the booking details and confirmation screen, and only the demonstration status in your interface updates. No real airline or hotel transaction occurs.'
    },
    {
      q: 'What is the standard baggage allowance for international flights?',
      a: 'Most full-service international carriers on the India–Bali and India–Japan corridors include 25 kg to 30 kg check-in baggage plus 7 kg cabin hand luggage per adult traveller.'
    },
    {
      q: 'How does travel disruption assistance monitor active trips?',
      a: 'For active demonstration trips, TripPilot AI tracks schedule status and weather advisories and surfaces alternate airport transfer or rebooking workflows if a delay is simulated.'
    },
    {
      q: 'Can I request early check-in or dietary preferences for hotel stays?',
      a: 'Yes. Use the Modification Request workflow on this page to log an early check-in or dietary note against any hotel booking in your demonstration account.'
    }
  ];

  const handleSendSupportChat = (textToSend) => {
    const clean = (textToSend ?? chatInput).trim();
    if (!clean) return;
    if (textToSend === undefined) setChatInput('');

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: clean,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const lower = clean.toLowerCase();
      let reply =
        'I have noted your inquiry. You can also use the Booking Lookup or Self-Service Request buttons on this page to inspect or simulate updates to any demonstration reservation.';

      if (lower.includes('cancel')) {
        reply =
          'To test a simulated cancellation, click "Cancellation request" in the Self-Service panel. You will see full booking details and a confirmation screen before any mock status changes.';
      } else if (lower.includes('baggage')) {
        reply =
          'Your Bali flight (Singapore Airlines SQ-BALI-89241) includes 25 kg check-in luggage and 7 kg cabin baggage per traveller.';
      } else if (lower.includes('delay') || lower.includes('status') || lower.includes('disruption')) {
        reply =
          'All active flights in your demonstration itinerary are currently showing On-Time status with no weather advisories.';
      } else if (lower.includes('modify') || lower.includes('rebook') || lower.includes('check-in')) {
        reply =
          'You can simulate date changes, early check-in notes, or rebooking via the Modification or Rebooking request buttons on the right.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 450);
  };

  const handleLookupBooking = (e) => {
    e.preventDefault();
    const q = lookupQuery.trim().toLowerCase();
    if (!q) {
      setLookupResult(bookings[0] || null);
      return;
    }
    const found = bookings.find(
      (b) =>
        b.reference.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.title.toLowerCase().includes(q)
    );
    setLookupResult(found || null);
  };

  const openRequestWorkflow = (type) => {
    setSelectedBookingId(bookings[0]?.id || '');
    setRequestNote('');
    setRequestModal({ type, step: 'select' });
  };

  const selectedBooking = bookings.find((b) => b.id === selectedBookingId);

  const handleConfirmSimulatedRequest = () => {
    if (!selectedBooking || !requestModal) return;

    if (requestModal.type === 'Cancellation') {
      updateBookingStatus(selectedBooking.id, 'Cancelled');
    } else if (requestModal.type === 'Modification') {
      updateBookingStatus(selectedBooking.id, 'Modification Requested');
    } else {
      updateBookingStatus(selectedBooking.id, 'Rebooked (Simulated)');
    }

    if (lookupResult && lookupResult.id === selectedBooking.id) {
      setLookupResult((prev) => ({
        ...prev,
        status:
          requestModal.type === 'Cancellation'
            ? 'Cancelled'
            : requestModal.type === 'Modification'
            ? 'Modification Requested'
            : 'Rebooked (Simulated)'
      }));
    }

    setRequestModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80">
        <h2 className="text-xl font-bold text-[#102A43]">Trip support & assistance</h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          AI support chat, booking lookup, travel disruption advisories, and simulated post-booking requests (all actions update only local demonstration state)
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: AI Support Chat & FAQs */}
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white rounded-2xl border border-slate-200/80 flex flex-col h-[480px] overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#102A43] text-[#14B8A6] flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102A43]">AI Support Chat</h3>
                  <p className="text-xs text-[#64748B]">
                    Simulated concierge assistance · Instant answers
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#F5F8FC]/60">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${
                    m.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      m.sender === 'user'
                        ? 'bg-[#102A43] text-white'
                        : 'bg-[#14B8A6] text-[#0B1F33]'
                    }`}
                  >
                    {m.sender === 'user' ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#102A43] text-white rounded-tr-xs'
                        : 'bg-white text-[#172B4D] border border-slate-200/80 rounded-tl-xs'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span
                      className={`text-[10px] block mt-1 tabular-nums ${
                        m.sender === 'user' ? 'text-slate-300' : 'text-[#64748B]'
                      }`}
                    >
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
              {[
                'Check flight status',
                'Baggage allowance',
                'Request early check-in',
                'How do cancellations work?'
              ].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleSendSupportChat(topic)}
                  className="px-3 py-1 rounded-lg bg-[#F5F8FC] hover:bg-slate-200/70 text-xs font-medium text-[#102A43] whitespace-nowrap shrink-0"
                >
                  {topic}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendSupportChat();
              }}
              className="p-3.5 bg-white border-t border-slate-200/80 flex items-center gap-2.5"
            >
              <input
                type="text"
                aria-label="Ask support assistant"
                placeholder="Ask a support question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              />
              <button
                type="submit"
                aria-label="Send support message"
                className="px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#0F766E] text-white text-xs font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </section>

          {/* Frequently Asked Questions */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-3">
            <h3 className="text-base font-bold text-[#102A43]">Frequently asked questions</h3>
            <div className="divide-y divide-slate-200/80">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div key={faq.q} className="py-3">
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#102A43] hover:text-[#0F766E]"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#0F766E] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Booking Lookup, Disruption Assistance & Self-Service Requests */}
        <div className="lg:col-span-5 space-y-6">
          {/* Booking Lookup */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
            <h3 className="text-base font-bold text-[#102A43]">Booking lookup</h3>
            <form onSubmit={handleLookupBooking} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  aria-label="Booking reference lookup"
                  placeholder="Enter reference (e.g. SQ-BALI-89241)..."
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F5F8FC] border border-slate-200 rounded-xl text-xs text-[#172B4D] font-mono focus:outline-none focus:border-[#14B8A6]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#0F766E] text-white text-xs font-semibold transition-colors whitespace-nowrap"
              >
                Lookup
              </button>
            </form>

            {lookupResult ? (
              <div className="pt-3 border-t border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold text-[#0F766E] tabular-nums">
                    {lookupResult.reference}
                  </span>
                  <span className="font-bold text-[#102A43]">{lookupResult.status}</span>
                </div>
                <p className="text-sm font-bold text-[#102A43]">{lookupResult.title}</p>
                <p className="text-[#64748B]">
                  {lookupResult.provider} · {lookupResult.dates}
                </p>
                <p className="text-[#64748B]">{lookupResult.details}</p>
              </div>
            ) : (
              <p className="text-xs text-[#64748B] pt-2">
                No demonstration booking found matching "{lookupQuery}".
              </p>
            )}
          </section>

          {/* Travel Disruption Assistance */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-3">
            <h3 className="text-base font-bold text-[#102A43]">
              Travel disruption assistance
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Live-simulated operational monitoring for your active itinerary:
            </p>
            <div className="pt-2 border-t border-slate-200/80 divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="font-medium text-[#102A43]">
                  Singapore Airlines SQ-423 (BOM to DPS)
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#16A34A] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  On schedule
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="font-medium text-[#102A43]">
                  Denpasar Airport Pickup & Weather
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#16A34A] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Clear · 28°C
                </span>
              </div>
            </div>
          </section>

          {/* Self-Service Request Triggers */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#102A43]">
                Simulated post-booking requests
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Test cancellation, modification, or rebooking workflows on demonstration records
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => openRequestWorkflow('Modification')}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span>Modification request (Dates / Room / Notes)</span>
                <span className="text-[#0F766E]">Open</span>
              </button>

              <button
                type="button"
                onClick={() => openRequestWorkflow('Rebooking')}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F8FC] hover:bg-slate-200/70 text-[#102A43] text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span>Rebooking request (Alternate Flight / Stay)</span>
                <span className="text-[#0F766E]">Open</span>
              </button>

              <button
                type="button"
                onClick={() => openRequestWorkflow('Cancellation')}
                className="w-full px-4 py-3 rounded-xl bg-rose-50 hover:bg-rose-100/80 text-rose-800 text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span>Cancellation request</span>
                <span>Open</span>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* 2-Step Simulated Request Modal */}
      <Modal
        isOpen={Boolean(requestModal)}
        onClose={() => setRequestModal(null)}
        title={
          requestModal
            ? `Simulated ${requestModal.type} Request`
            : 'Simulated Request'
        }
      >
        {requestModal && (
          <div className="space-y-5">
            {requestModal.step === 'select' ? (
              <>
                <div>
                  <label
                    htmlFor="req-booking-select"
                    className="text-xs font-semibold text-[#102A43] block mb-1.5"
                  >
                    Select demonstration booking
                  </label>
                  <select
                    id="req-booking-select"
                    value={selectedBookingId}
                    onChange={(e) => setSelectedBookingId(e.target.value)}
                    className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
                  >
                    {bookings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title} ({b.reference}) — {b.status}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedBooking && (
                  <div className="pt-3 border-t border-slate-200/80 space-y-1.5 text-xs">
                    <p className="font-bold text-[#102A43]">{selectedBooking.title}</p>
                    <p className="text-[#64748B]">
                      Reference: <span className="font-mono">{selectedBooking.reference}</span> ·{' '}
                      {selectedBooking.provider}
                    </p>
                    <p className="text-[#64748B] tabular-nums">
                      Schedule: {selectedBooking.dates} · Amount: {formatINR(selectedBooking.price)}
                    </p>
                    <p className="text-[#64748B]">Current status: {selectedBooking.status}</p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="req-note"
                    className="text-xs font-semibold text-[#102A43] block mb-1.5"
                  >
                    {requestModal.type === 'Cancellation'
                      ? 'Reason for simulated cancellation (optional)'
                      : 'Requested changes or preferred dates'}
                  </label>
                  <input
                    id="req-note"
                    type="text"
                    placeholder={
                      requestModal.type === 'Cancellation'
                        ? 'e.g. Change in travel schedule'
                        : 'e.g. Shift check-in by 1 day or request early check-in'
                    }
                    value={requestNote}
                    onChange={(e) => setRequestNote(e.target.value)}
                    className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 text-[#92400E] p-3.5 rounded-xl flex items-start gap-2.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <span>
                    Simulated Request Notice: Proceeding will show a confirmation summary and update only the local demonstration status. No real booking, cancellation, or refund occurs.
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRequestModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-slate-100"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    disabled={!selectedBooking}
                    onClick={() =>
                      setRequestModal((prev) => ({ ...prev, step: 'confirm' }))
                    }
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#102A43] hover:bg-[#0F766E] text-white transition-colors"
                  >
                    Review confirmation
                  </button>
                </div>
              </>
            ) : (
              /* Step 2: Confirmation Screen */
              <>
                <div className="space-y-2 pb-3 border-b border-slate-200/80 text-xs">
                  <p className="font-semibold text-[#0F766E]">
                    Step 2 of 2 · Confirm Simulated {requestModal.type}
                  </p>
                  <h4 className="text-base font-bold text-[#102A43]">
                    {selectedBooking?.title}
                  </h4>
                  <p className="text-[#64748B] font-mono">
                    Reference: {selectedBooking?.reference}
                  </p>
                  {requestNote && (
                    <p className="text-[#172B4D]">Note: {requestNote}</p>
                  )}
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2 flex justify-between">
                    <span className="text-[#64748B]">Original booking amount</span>
                    <span className="font-bold text-[#102A43] tabular-nums">
                      {formatINR(selectedBooking?.price || 0)}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-[#64748B]">Simulated processing fee</span>
                    <span className="font-semibold text-[#102A43] tabular-nums">
                      {requestModal.type === 'Cancellation' ? formatINR(1500) : formatINR(0)}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-[#64748B]">New mock interface status</span>
                    <span className="font-bold text-[#0F766E]">
                      {requestModal.type === 'Cancellation'
                        ? 'Cancelled'
                        : requestModal.type === 'Modification'
                        ? 'Modification Requested'
                        : 'Rebooked (Simulated)'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] bg-[#F5F8FC] p-3 rounded-xl leading-relaxed">
                  Reminder: This is a simulated demonstration request. Confirming updates only the mock interface status in your browser.
                </p>

                <div className="flex justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setRequestModal((prev) => ({ ...prev, step: 'select' }))
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#102A43] bg-[#F5F8FC] hover:bg-slate-200/70"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Go back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmSimulatedRequest}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      requestModal.type === 'Cancellation'
                        ? 'bg-rose-700 hover:bg-rose-800 text-white'
                        : 'bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white'
                    }`}
                  >
                    Confirm simulated {requestModal.type.toLowerCase()}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
