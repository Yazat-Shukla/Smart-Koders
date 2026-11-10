import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Send,
  Bot,
  Plus,
  MessageSquare,
  SlidersHorizontal
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { generateAiTravelResponse, formatINR } from '../services/mockApi';
import ChatMessage from '../components/ChatMessage';
import Modal from '../components/Modal';

const INTEREST_OPTIONS = [
  'Beaches',
  'Mountains',
  'Culture',
  'Adventure',
  'Relaxation',
  'Romantic',
  'Culinary'
];

export default function Assistant() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    chatThreads,
    setChatThreads,
    setActiveTrip,
    setItinerary,
    addActivity,
    showToast
  } = useTrip();

  const [activeThreadId, setActiveThreadId] = useState(
    () => chatThreads[0]?.id || 'thread-1'
  );

  // Quick Preference Controls
  const [destination, setDestination] = useState('Bali, Indonesia');
  const [departureCity, setDepartureCity] = useState('Mumbai (BOM)');
  const [travelDates, setTravelDates] = useState('14 Oct – 19 Oct 2026');
  const [travellers, setTravellers] = useState(2);
  const [budget, setBudget] = useState(80000);
  const [interests, setInterests] = useState(['Beaches', 'Culture']);
  const [travelStyle, setTravelStyle] = useState('Relaxed & Scenic');

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Quick Refine Modal ('budget' | 'dates' | null)
  const [refineMode, setRefineMode] = useState(null);
  const [tempBudget, setTempBudget] = useState(80000);
  const [tempDates, setTempDates] = useState('14 Oct – 19 Oct 2026');

  const messagesEndRef = useRef(null);

  const activeThread =
    chatThreads.find((t) => t.id === activeThreadId) || chatThreads[0];

  const triggerSimulatedConversation = (
    userText,
    overrideParams = {},
    targetThreadId = activeThreadId
  ) => {
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      text: userText
    };

    setChatThreads((prev) =>
      prev.map((thread) =>
        thread.id === targetThreadId
          ? {
              ...thread,
              updatedAt: 'Just now',
              messages: [...thread.messages, userMsg]
            }
          : thread
      )
    );

    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiTravelResponse({
        prompt: userText,
        destination: overrideParams.destination || destination,
        departureCity: overrideParams.departureCity || departureCity,
        travelDates: overrideParams.travelDates || travelDates,
        travellers: overrideParams.travellers || travellers,
        budget: overrideParams.budget || budget,
        interests: overrideParams.interests || interests,
        travelStyle: overrideParams.travelStyle || travelStyle
      });

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        text: response.text,
        itineraryPreview: response.itineraryPreview
      };

      setIsTyping(false);
      setChatThreads((prev) =>
        prev.map((thread) =>
          thread.id === targetThreadId
            ? {
                ...thread,
                destination: response.itineraryPreview?.destination || thread.destination,
                updatedAt: 'Just now',
                messages: [...thread.messages, aiMsg]
              }
            : thread
        )
      );
    }, 650);
  };

  useEffect(() => {
    const urlPrompt = searchParams.get('prompt');
    if (urlPrompt) {
      setSearchParams({}, { replace: true });
      triggerSimulatedConversation(urlPrompt);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages?.length, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;
    const text = inputMessage.trim();
    setInputMessage('');
    triggerSimulatedConversation(text);
  };

  const handleToggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleStartNewChat = () => {
    const newId = `thread-${Date.now()}`;
    const newThread = {
      id: newId,
      title: `Trip Plan: ${destination.split(',')[0]}`,
      updatedAt: 'Just now',
      destination,
      messages: [
        {
          id: `welcome-${Date.now()}`,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          text: `New planning session started for ${destination}. Tell me your ideal pace, budget in INR, or specific places you want to include.`,
          itineraryPreview: null
        }
      ]
    };
    setChatThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newId);
  };

  const handleGenerateItineraryFromPreview = (preview) => {
    setActiveTrip({
      id: `trip-ai-${Date.now()}`,
      destination: preview.destination,
      dates: travelDates,
      travellers: Number(travellers) || 2,
      style: travelStyle,
      budgetTotal: Number(preview.estimatedTotal) || Number(budget)
    });

    if (preview.activitiesData && preview.activitiesData.length > 0) {
      setItinerary(preview.activitiesData);
    }

    showToast(`Generated itinerary for ${preview.destination}.`);
    navigate('/itinerary');
  };

  const handleAddRecommendedActivity = (recActivity) => {
    addActivity(0, recActivity);
  };

  const handleCompareHotels = (destName) => {
    const cityOnly = destName.split(',')[0].trim();
    navigate(`/flights-hotels?tab=hotels&destination=${encodeURIComponent(cityOnly)}`);
  };

  const handleSaveRefinement = (e) => {
    e.preventDefault();
    if (refineMode === 'budget') {
      const nextBudget = Number(tempBudget) || 80000;
      setBudget(nextBudget);
      setRefineMode(null);
      triggerSimulatedConversation(
        `Update my ${destination} trip plan for a ${formatINR(nextBudget)} budget.`,
        { budget: nextBudget }
      );
    } else if (refineMode === 'dates') {
      const nextDates = tempDates.trim() || travelDates;
      setTravelDates(nextDates);
      setRefineMode(null);
      triggerSimulatedConversation(
        `Update my ${destination} itinerary for travel dates ${nextDates}.`,
        { travelDates: nextDates }
      );
    }
  };

  const suggestedQuestions = [
    'Plan a 5-day trip to Bali for two people under ₹80,000.',
    'Find budget-friendly destinations under ₹50,000.',
    'Plan a romantic weekend getaway in Udaipur.',
    'Suggest a 5-day cultural itinerary in Kyoto.'
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#102A43] text-[#14B8A6] flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#102A43]">AI Travel Assistant</h2>
            <p className="text-xs text-[#64748B]">
              Simulated travel planning assistant · Estimates displayed in INR
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartNewChat}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#0F766E] text-white text-xs font-semibold transition-colors self-start sm:self-auto whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>New conversation</span>
        </button>
      </div>

      {/* Main 3-Column Workspace: Chat History + Preferences + Conversation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Chat History & Quick Preferences */}
        <div className="lg:col-span-4 space-y-6">
          {/* Chat History Sidebar */}
          <section className="bg-white rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <h3 className="text-sm font-bold text-[#102A43]">Conversation history</h3>
            <div className="divide-y divide-slate-100">
              {chatThreads.map((thread) => {
                const isActive = thread.id === activeThread?.id;
                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`w-full text-left py-2.5 px-3 rounded-xl transition-colors flex items-start gap-2.5 ${
                      isActive
                        ? 'bg-[#F5F8FC] text-[#102A43] font-semibold'
                        : 'text-[#64748B] hover:text-[#102A43] hover:bg-slate-50'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#102A43] truncate">
                        {thread.title}
                      </p>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        {thread.destination} · {thread.updatedAt}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Quick Preference Controls */}
          <section className="bg-white rounded-2xl p-5 border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#0F766E]" />
              <h3 className="text-sm font-bold text-[#102A43]">Trip preferences</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="pref-dest" className="text-xs font-medium text-[#64748B] block mb-1">
                  Destination
                </label>
                <input
                  id="pref-dest"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3 py-2 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="pref-city" className="text-xs font-medium text-[#64748B] block mb-1">
                    Departure city
                  </label>
                  <select
                    id="pref-city"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-2.5 py-2 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
                  >
                    <option value="Mumbai (BOM)">Mumbai (BOM)</option>
                    <option value="Delhi (DEL)">Delhi (DEL)</option>
                    <option value="Bengaluru (BLR)">Bengaluru (BLR)</option>
                    <option value="Chennai (MAA)">Chennai (MAA)</option>
                    <option value="Hyderabad (HYD)">Hyderabad (HYD)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pref-dates" className="text-xs font-medium text-[#64748B] block mb-1">
                    Travel dates
                  </label>
                  <input
                    id="pref-dates"
                    type="text"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-2.5 py-2 text-[#172B4D] focus:outline-none focus:border-[#14B8A6] tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="pref-travellers" className="text-xs font-medium text-[#64748B] block mb-1">
                    Travellers
                  </label>
                  <input
                    id="pref-travellers"
                    type="number"
                    min="1"
                    max="12"
                    value={travellers}
                    onChange={(e) => setTravellers(Number(e.target.value))}
                    className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3 py-2 text-[#172B4D] focus:outline-none focus:border-[#14B8A6] tabular-nums"
                  />
                </div>

                <div>
                  <label htmlFor="pref-budget" className="text-xs font-medium text-[#64748B] block mb-1">
                    Budget (₹)
                  </label>
                  <input
                    id="pref-budget"
                    type="number"
                    step="5000"
                    min="10000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3 py-2 text-[#172B4D] focus:outline-none focus:border-[#14B8A6] tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pref-style" className="text-xs font-medium text-[#64748B] block mb-1">
                  Travel style
                </label>
                <select
                  id="pref-style"
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full text-xs font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3 py-2 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
                >
                  <option value="Relaxed & Scenic">Relaxed & Scenic</option>
                  <option value="Romantic & Luxury">Romantic & Luxury</option>
                  <option value="Adventure & Trekking">Adventure & Trekking</option>
                  <option value="Culture & Food Heritage">Culture & Food Heritage</option>
                  <option value="Budget Smart">Budget Smart</option>
                </select>
              </div>

              <div>
                <span className="text-xs font-medium text-[#64748B] block mb-1.5">
                  Travel interests
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {INTEREST_OPTIONS.map((interest) => {
                    const selected = interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleToggleInterest(interest)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                          selected
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
            </div>

            <button
              type="button"
              onClick={() =>
                triggerSimulatedConversation(
                  `Plan a trip to ${destination} from ${departureCity} for ${travellers} travellers (${travelDates}) under ${formatINR(budget)}.`
                )
              }
              className="w-full py-2.5 px-4 rounded-xl bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white text-xs font-bold transition-colors"
            >
              Generate plan from preferences
            </button>
          </section>
        </div>

        {/* Right Main Conversation Panel */}
        <section className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 flex flex-col h-[680px] overflow-hidden">
          {/* Messages Stream */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 bg-[#F5F8FC]/60">
            {activeThread?.messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onGenerateItinerary={handleGenerateItineraryFromPreview}
                onQuickRefineBudget={() => {
                  setTempBudget(budget);
                  setRefineMode('budget');
                }}
                onQuickRefineDates={() => {
                  setTempDates(travelDates);
                  setRefineMode('dates');
                }}
                onAddRecommendedActivity={handleAddRecommendedActivity}
                onCompareHotels={handleCompareHotels}
              />
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#64748B] bg-white border border-slate-200/80 w-fit px-4 py-2.5 rounded-xl">
                <span>TripPilot AI is preparing a simulated travel plan...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Strip */}
          <div className="px-4 py-2.5 bg-white border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => triggerSimulatedConversation(q)}
                className="px-3 py-1.5 rounded-lg bg-[#F5F8FC] hover:bg-slate-200/70 text-xs font-medium text-[#102A43] transition-colors whitespace-nowrap shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-slate-200/80 flex items-center gap-3"
          >
            <input
              type="text"
              aria-label="Ask TripPilot AI"
              placeholder="Ask TripPilot AI (e.g., Plan a 5-day trip to Bali for two people under ₹80,000)..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-[#F5F8FC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#172B4D] placeholder:text-slate-400 focus:outline-none focus:border-[#14B8A6]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              aria-label="Send message"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0F766E] disabled:opacity-40 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </section>
      </div>

      {/* Refine Budget / Dates Modal */}
      <Modal
        isOpen={Boolean(refineMode)}
        onClose={() => setRefineMode(null)}
        title={refineMode === 'budget' ? 'Update Target Budget' : 'Update Travel Dates'}
      >
        <form onSubmit={handleSaveRefinement} className="space-y-4">
          {refineMode === 'budget' ? (
            <div>
              <label htmlFor="refine-budget-input" className="text-xs font-semibold text-[#102A43] block mb-1.5">
                Target Trip Budget in INR (₹)
              </label>
              <input
                id="refine-budget-input"
                type="number"
                min="10000"
                step="5000"
                required
                value={tempBudget}
                onChange={(e) => setTempBudget(e.target.value)}
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] tabular-nums focus:outline-none focus:border-[#14B8A6]"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="refine-dates-input" className="text-xs font-semibold text-[#102A43] block mb-1.5">
                Preferred Travel Dates
              </label>
              <input
                id="refine-dates-input"
                type="text"
                required
                value={tempDates}
                onChange={(e) => setTempDates(e.target.value)}
                placeholder="e.g. 20 Nov – 25 Nov 2026"
                className="w-full text-sm font-medium bg-[#F5F8FC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#172B4D] focus:outline-none focus:border-[#14B8A6]"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setRefineMode(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white transition-colors"
            >
              Apply & Regenerate
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
