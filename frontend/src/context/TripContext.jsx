import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialItinerary,
  initialBookings,
  initialExpenses,
  mockTrips,
  initialChatThreads
} from '../data/mockData';
import { useAuth } from './AuthContext';

const TripContext = createContext(null);

const DEFAULT_ACTIVE_TRIP = {
  id: 'trip-1',
  destination: 'Bali, Indonesia',
  dates: '14 Oct – 19 Oct 2026',
  travellers: 2,
  style: 'Romantic & Cultural',
  budgetTotal: 180000
};

const DEFAULT_USER_PROFILE = {
  name: 'TripPilot',
  email: 'hello@trippilot.example',
  phone: 'Example: +91 90000 00000',
  homeCity: 'Bengaluru (BLR)',
  currency: 'INR (₹)',
  language: 'English',
  preferredStyle: 'Balanced Luxury',
  cabinPreference: 'Economy',
  seatPreference: 'Window',
  dietaryPreference: 'Vegetarian Friendly',
  interests: ['Beaches', 'Culture', 'Wellness', 'Culinary'],
  emailNotifications: true,
  priceAlerts: true,
  disruptionAlerts: true
};

export function TripProvider({ children }) {
  const { currentUser } = useAuth();
  const storageKey = (key) => `tripPilot_${currentUser?.id || 'anonymous'}_${key}`;
  const defaultProfile = {
    ...DEFAULT_USER_PROFILE,
    name: currentUser?.name || DEFAULT_USER_PROFILE.name,
    email: currentUser ? `${currentUser.username}@trippilot.example` : DEFAULT_USER_PROFILE.email
  };
  const [activeTrip, setActiveTrip] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey('activeTrip'));
      return saved ? JSON.parse(saved) : DEFAULT_ACTIVE_TRIP;
    } catch {
      return DEFAULT_ACTIVE_TRIP;
    }
  });

  const [trips, setTrips] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey('trips'));
      return saved ? JSON.parse(saved) : mockTrips;
    } catch {
      return mockTrips;
    }
  });

  const [itinerary, setItinerary] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey('itinerary'));
      return saved ? JSON.parse(saved) : initialItinerary;
    } catch {
      return initialItinerary;
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey('bookings'));
      return saved ? JSON.parse(saved) : initialBookings;
    } catch {
      return initialBookings;
    }
  });

  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey('expenses'));
      return saved ? JSON.parse(saved) : initialExpenses;
    } catch {
      return initialExpenses;
    }
  });

  const [chatThreads, setChatThreads] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey('chatThreads'));
      return saved ? JSON.parse(saved) : initialChatThreads;
    } catch {
      return initialChatThreads;
    }
  });

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey('user'));
      if (!saved) return defaultProfile;

      const savedProfile = JSON.parse(saved);
      // Replace the starter profile so existing browser data gets the same
      // generic demo details as a fresh install.
      if (savedProfile.name === 'Aarav Sharma' || savedProfile.name === 'Arnav Sharma') {
        return {
          ...savedProfile,
          name: defaultProfile.name,
          email: defaultProfile.email,
          phone: defaultProfile.phone,
          homeCity: defaultProfile.homeCity
        };
      }

      return savedProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(storageKey('activeTrip'), JSON.stringify(activeTrip));
  }, [activeTrip]);

  useEffect(() => {
    localStorage.setItem(storageKey('trips'), JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem(storageKey('itinerary'), JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    localStorage.setItem(storageKey('bookings'), JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(storageKey('expenses'), JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(storageKey('chatThreads'), JSON.stringify(chatThreads));
  }, [chatThreads]);

  useEffect(() => {
    localStorage.setItem(storageKey('user'), JSON.stringify(userProfile));
  }, [userProfile]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  const removeToast = () => setToast(null);

  const selectSavedTrip = (tripId) => {
    const found = trips.find((t) => t.id === tripId);
    if (!found) return;
    setActiveTrip({
      id: found.id,
      destination: found.destination,
      dates: found.dates,
      travellers: found.travellers,
      style: found.style,
      budgetTotal: found.budgetTotal
    });
    if (found.itinerary) {
      setItinerary(found.itinerary);
    }
    showToast(`Switched active itinerary to ${found.destination}`);
  };

  const addActivity = (dayIndex, newActivity) => {
    setItinerary((prev) => {
      const updated = prev.map((day, idx) => {
        if (idx !== dayIndex) return day;
        return {
          ...day,
          activities: [
            ...day.activities,
            { ...newActivity, id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}` }
          ]
        };
      });
      return updated;
    });
    showToast('Activity added to your itinerary.');
  };

  const updateActivity = (dayIndex, actId, updatedFields) => {
    setItinerary((prev) =>
      prev.map((day, idx) => {
        if (idx !== dayIndex) return day;
        return {
          ...day,
          activities: day.activities.map((act) =>
            act.id === actId ? { ...act, ...updatedFields } : act
          )
        };
      })
    );
    showToast('Activity updated.');
  };

  const removeActivity = (dayIndex, actId) => {
    setItinerary((prev) =>
      prev.map((day, idx) => {
        if (idx !== dayIndex) return day;
        return {
          ...day,
          activities: day.activities.filter((a) => a.id !== actId)
        };
      })
    );
    showToast('Activity removed from itinerary.', 'warning');
  };

  const reorderActivity = (dayIndex, actIndex, direction) => {
    setItinerary((prev) =>
      prev.map((day, idx) => {
        if (idx !== dayIndex) return day;
        const targetIndex = direction === 'up' ? actIndex - 1 : actIndex + 1;
        if (targetIndex < 0 || targetIndex >= day.activities.length) return day;
        const nextActivities = [...day.activities];
        const [moved] = nextActivities.splice(actIndex, 1);
        nextActivities.splice(targetIndex, 0, moved);
        return {
          ...day,
          activities: nextActivities
        };
      })
    );
  };

  const addNewDay = () => {
    const nextDayNum = itinerary.length + 1;
    const newDay = {
      day: nextDayNum,
      title: `Exploration & Local Discoveries`,
      date: `Day ${nextDayNum}`,
      activities: []
    };
    setItinerary((prev) => [...prev, newDay]);
    showToast(`Day ${nextDayNum} added to your itinerary.`);
  };

  const addExpense = (newExp) => {
    setExpenses((prev) => [{ ...newExp, id: `exp-${Date.now()}` }, ...prev]);
    showToast('Expense logged.');
  };

  const removeExpense = (expId) => {
    setExpenses((prev) => prev.filter((e) => e.id !== expId));
    showToast('Expense removed.', 'warning');
  };

  const updateTotalBudget = (newBudget) => {
    const val = Math.max(1000, Number(newBudget) || 0);
    setActiveTrip((prev) => ({ ...prev, budgetTotal: val }));
    showToast('Planned budget ceiling updated.');
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: bookingData.status || 'Confirmed'
    };
    setBookings((prev) => [newBooking, ...prev]);

    // Also log corresponding expense category automatically
    const categoryMap = {
      Flight: 'Flights',
      Hotel: 'Hotels',
      Activity: 'Activities',
      Transfer: 'Transport'
    };
    setExpenses((prev) => [
      {
        id: `exp-${Date.now()}`,
        name: bookingData.title,
        category: categoryMap[bookingData.type] || 'Other',
        amount: Number(bookingData.price) || 0,
        date: new Date().toISOString().split('T')[0]
      },
      ...prev
    ]);

    showToast(`Simulated booking confirmed: ${bookingData.title}`);
  };

  const updateBookingStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    showToast(`Simulated booking ${id} updated to ${newStatus}.`);
  };

  const resetDemoData = () => {
    ['activeTrip', 'trips', 'itinerary', 'bookings', 'expenses', 'chatThreads', 'user'].forEach((key) => localStorage.removeItem(storageKey(key)));
    setActiveTrip(DEFAULT_ACTIVE_TRIP);
    setTrips(mockTrips);
    setItinerary(initialItinerary);
    setBookings(initialBookings);
    setExpenses(initialExpenses);
    setChatThreads(initialChatThreads);
    setUserProfile(defaultProfile);
    showToast('Demonstration data restored to defaults.');
  };

  return (
    <TripContext.Provider
      value={{
        activeTrip,
        setActiveTrip,
        trips,
        selectSavedTrip,
        itinerary,
        setItinerary,
        addActivity,
        updateActivity,
        removeActivity,
        reorderActivity,
        addNewDay,
        bookings,
        addBooking,
        updateBookingStatus,
        expenses,
        addExpense,
        removeExpense,
        updateTotalBudget,
        chatThreads,
        setChatThreads,
        userProfile,
        setUserProfile,
        toast,
        showToast,
        removeToast,
        resetDemoData
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export const useTrip = () => useContext(TripContext);
