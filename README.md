# TripPilot AI — Your Intelligent Travel Companion

TripPilot AI is a virtual travel agent and travel planning web application built with React, JavaScript, Vite, Tailwind CSS, React Router, Lucide React, and Recharts.

## Features

- **Dashboard Overview**: Conversational trip prompt input, suggested prompts, upcoming sample trips, active budget snapshot with Recharts mini-chart, popular destinations, and filterable recommended experiences.
- **AI Travel Assistant**: Multi-thread chat history sidebar, trip preference controls (destination, departure city, dates, travellers, budget in INR, interests, travel style), simulated AI itinerary proposals with cost breakdowns, and interactive refinement actions (`Generate itinerary`, `Change budget`, `Change travel dates`, `Add activity`, `Compare hotels`).
- **Explore Destinations**: Search, domestic/international filter, category filters (`Adventure`, `Relaxation`, `Romantic`, `Family`, `Culture`, `Beaches`, `Mountains`), budget slider, sorting, and destination detail modal.
- **Flights & Hotels**: Separate Flight and Hotel search tabs with filters, sorting, loading skeletons, estimated INR fares/stay totals, and simulated reservation confirmation modals.
- **My Itinerary**: Switch between 3 sample trips or custom AI-generated plans, view day-by-day vertical timelines, add/edit/remove/reorder activities, add new days, and download a formatted itinerary summary.
- **My Budget**: JavaScript-calculated budget metrics (total planned budget, estimated expenditure, remaining balance, utilization percentage), over-budget warning banner, Recharts Expense Pie Chart and Budget Comparison Bar Chart across all 7 categories (`Flights`, `Hotels`, `Food`, `Transport`, `Activities`, `Shopping`, `Other`), and an interactive expense ledger.
- **My Bookings**: Demonstration booking records across Flights, Hotels, Activities, and Transfers with category filters, details modal, electronic voucher viewer, and downloadable voucher files.
- **Trip Support**: AI support chat, booking reference lookup, travel disruption monitoring, 2-step simulated cancellation/modification/rebooking request workflow, and FAQ accordion.
- **Settings**: Editable traveller profile, personal travel preferences, currency, language, notification toggles, travel interests, and `localStorage` persistence with demo reset.

## Local Development

```bash
npm install
npm run dev
```
