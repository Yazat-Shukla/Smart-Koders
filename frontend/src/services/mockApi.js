import { mockFlights, mockHotels, mockDestinations } from '../data/mockData';

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(amount) || 0);
}

export function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function simulateFlightSearch({ from = '', to = '', cabinClass = 'All', stops = 'All', sortBy = 'priceAsc', shouldFail = false }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Simulated airline fare feed timeout. Please retry your search.'));
        return;
      }

      const fromQuery = from.trim().toLowerCase();
      const toQuery = to.trim().toLowerCase();

      let results = mockFlights.filter((flight) => {
        const matchesFrom = !fromQuery || flight.from.toLowerCase().includes(fromQuery);
        const matchesTo = !toQuery || flight.to.toLowerCase().includes(toQuery);
        const matchesCabin = cabinClass === 'All' || flight.cabin === cabinClass;
        const matchesStops =
          stops === 'All' ||
          (stops === 'Non-stop' && flight.stops === 'Non-stop') ||
          (stops === '1 Stop' && flight.stops !== 'Non-stop');
        return matchesFrom && matchesTo && matchesCabin && matchesStops;
      });

      if (sortBy === 'priceAsc') {
        results = [...results].sort((a, b) => a.price - b.price);
      } else if (sortBy === 'priceDesc') {
        results = [...results].sort((a, b) => b.price - a.price);
      } else if (sortBy === 'duration') {
        results = [...results].sort((a, b) => a.durationMinutes - b.durationMinutes);
      }

      resolve(results);
    }, 280);
  });
}

export function simulateHotelSearch({ destination = '', minRating = 0, maxPrice = 50000, sortBy = 'recommended', shouldFail = false }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Simulated property availability check failed. Please retry.'));
        return;
      }

      const destQuery = destination.trim().toLowerCase();

      let results = mockHotels.filter((hotel) => {
        const matchesDest =
          !destQuery ||
          hotel.location.toLowerCase().includes(destQuery) ||
          hotel.name.toLowerCase().includes(destQuery);
        const matchesRating = hotel.rating >= Number(minRating);
        const matchesPrice = hotel.pricePerNight <= Number(maxPrice);
        return matchesDest && matchesRating && matchesPrice;
      });

      if (sortBy === 'priceAsc') {
        results = [...results].sort((a, b) => a.pricePerNight - b.pricePerNight);
      } else if (sortBy === 'priceDesc') {
        results = [...results].sort((a, b) => b.pricePerNight - a.pricePerNight);
      } else if (sortBy === 'rating') {
        results = [...results].sort((a, b) => b.rating - a.rating);
      }

      resolve(results);
    }, 280);
  });
}

export function generateAiTravelResponse({
  prompt,
  destination = 'Bali, Indonesia',
  departureCity = 'Mumbai (BOM)',
  travelDates = '14 Oct – 19 Oct 2026',
  travellers = 2,
  budget = 80000,
  interests = ['Beaches', 'Culture'],
  travelStyle = 'Relaxed & Scenic'
}) {
  const lower = (prompt || '').toLowerCase();
  const numericBudget = Number(budget) || 80000;
  const pax = Number(travellers) || 2;
  const interestSummary = interests && interests.length > 0 ? interests.join(', ') : travelStyle;

  if (lower.includes('bali') || (!lower.includes('goa') && !lower.includes('kyoto') && !lower.includes('ladakh') && !lower.includes('budget') && destination.toLowerCase().includes('bali'))) {
    const flightCost = Math.round(numericBudget * 0.42);
    const stayCost = Math.round(numericBudget * 0.34);
    const activityFoodCost = Math.max(numericBudget - flightCost - stayCost, 8000);

    return {
      text: `I understood your request for a 5-day trip to Bali for ${pax} traveller${pax > 1 ? 's' : ''} departing from ${departureCity} (${travelDates}) within a target budget of ${formatINR(numericBudget)}. Focusing on ${interestSummary}, here is a balanced itinerary and estimated cost breakdown (demonstration estimates):`,
      itineraryPreview: {
        destination: 'Bali, Indonesia',
        duration: '5 Days / 4 Nights',
        estimatedTotal: numericBudget,
        flightEstimate: `${formatINR(Math.round(flightCost / pax))} / traveller (Air India / Singapore Airlines)`,
        hotelRecommendation: 'Maya Ubud Resort & Spa (4.9 ★) or Boutique Ubud Villa',
        costBreakdown: [
          { label: 'Return Flights', amount: flightCost },
          { label: '4 Nights Boutique Stay', amount: stayCost },
          { label: 'Transfers, Dining & Temples', amount: activityFoodCost }
        ],
        days: [
          'Day 1: Denpasar arrival, Ubud check-in & Campuhan Ridge sunset walk',
          'Day 2: Tegalalang Rice Terraces, organic valley lunch & Tibumana Waterfall',
          'Day 3: Tirta Empul holy spring ritual & Uluwatu cliff Kecak dance',
          'Day 4: Nusa Dua coastal morning & Jimbaran Bay seafood dinner',
          'Day 5: Ubud Art Market souvenir browsing & airport transfer'
        ],
        recommendedActivity: {
          time: '04:30 PM',
          name: 'Uluwatu Cliff Sunset & Kecak Performance',
          location: 'Uluwatu Temple, Bali',
          description: 'Clifftop cultural dance performance overlooking the Indian Ocean at sunset.',
          cost: 2400,
          duration: '3h',
          category: 'Activity'
        },
        activitiesData: [
          {
            day: 1,
            title: 'Arrival & Ubud Ridge Walk',
            date: 'Day 1',
            activities: [
              {
                id: 'ai-b1',
                time: '11:30 AM',
                name: 'Airport Pickup & Ubud Transfer',
                location: 'Denpasar to Ubud',
                description: 'Private air-conditioned transfer to your resort.',
                cost: 2200,
                duration: '1h 30m',
                category: 'Transport'
              },
              {
                id: 'ai-b2',
                time: '04:30 PM',
                name: 'Campuhan Ridge Sunset Walk',
                location: 'Ubud Ridge',
                description: 'Scenic hilltop walk through lush tropical valleys.',
                cost: 0,
                duration: '2h',
                category: 'Sightseeing'
              }
            ]
          },
          {
            day: 2,
            title: 'Rice Terraces & Secret Waterfall',
            date: 'Day 2',
            activities: [
              {
                id: 'ai-b3',
                time: '08:30 AM',
                name: 'Tegalalang Rice Terraces Walk',
                location: 'Gianyar, Bali',
                description: 'Explore UNESCO-recognized terraced rice paddies.',
                cost: 1800,
                duration: '2h 30m',
                category: 'Activity'
              },
              {
                id: 'ai-b4',
                time: '02:30 PM',
                name: 'Tibumana Jungle Waterfall',
                location: 'Bangli, Bali',
                description: 'Refreshing swim beneath a secluded forest waterfall.',
                cost: 600,
                duration: '2h',
                category: 'Sightseeing'
              }
            ]
          },
          {
            day: 3,
            title: 'Sacred Springs & Cliffside Sunset',
            date: 'Day 3',
            activities: [
              {
                id: 'ai-b5',
                time: '09:00 AM',
                name: 'Tirta Empul Water Temple Visit',
                location: 'Tampaksiring',
                description: 'Experience Balinese spring water purification.',
                cost: 1200,
                duration: '2h',
                category: 'Culture'
              },
              {
                id: 'ai-b6',
                time: '05:00 PM',
                name: 'Uluwatu Temple & Kecak Fire Dance',
                location: 'South Kuta, Bali',
                description: 'Traditional sunset performance on the southern cliffs.',
                cost: 2400,
                duration: '3h',
                category: 'Activity'
              }
            ]
          },
          {
            day: 4,
            title: 'Southern Coast & Jimbaran Bay',
            date: 'Day 4',
            activities: [
              {
                id: 'ai-b7',
                time: '10:30 AM',
                name: 'Padang Padang & Nusa Dua Coast',
                location: 'Bukit Peninsula',
                description: 'Relaxed coastal morning by turquoise coves.',
                cost: 1000,
                duration: '3h',
                category: 'Sightseeing'
              },
              {
                id: 'ai-b8',
                time: '07:30 PM',
                name: 'Jimbaran Beachfront Dinner',
                location: 'Jimbaran Bay',
                description: 'Freshly grilled coastal dinner right on the sand.',
                cost: 3500,
                duration: '2h',
                category: 'Food'
              }
            ]
          },
          {
            day: 5,
            title: 'Ubud Art Market & Departure',
            date: 'Day 5',
            activities: [
              {
                id: 'ai-b9',
                time: '10:00 AM',
                name: 'Ubud Traditional Art Market',
                location: 'Central Ubud',
                description: 'Browse handwoven textiles, woodwork, and local coffee.',
                cost: 2500,
                duration: '2h',
                category: 'Shopping'
              }
            ]
          }
        ]
      }
    };
  }

  if (lower.includes('budget') || lower.includes('50,000') || lower.includes('50000') || lower.includes('cheap')) {
    const budgetPick = mockDestinations.filter((d) => d.budget <= 40000);
    return {
      text: `For a trip under ₹50,000 from ${departureCity}, I recommend three high-value domestic destinations: Goa (${formatINR(28000)}), Kerala Backwaters (${formatINR(34000)}), and Manali & Leh (${formatINR(38000)}). Here is a ready-to-import 4-day South Goa & coastal plan:`,
      itineraryPreview: {
        destination: 'Goa, India',
        duration: '4 Days / 3 Nights',
        estimatedTotal: 44000,
        flightEstimate: '₹6,499 / traveller (IndiGo Non-stop)',
        hotelRecommendation: 'Boutique South Goa Heritage Resort (4.8 ★)',
        costBreakdown: [
          { label: 'Return Flights (2 Pax)', amount: 18500 },
          { label: '3 Nights Boutique Stay', amount: 16500 },
          { label: 'Transfers, Spice Farm & Dining', amount: 9000 }
        ],
        days: [
          'Day 1: Arrival, South Goa check-in & Benaulim sunset walk',
          'Day 2: Panjim Fontainhas Latin Quarter walk & local bakery tasting',
          'Day 3: Ponda spice plantation tour & Palolem bay kayaking',
          'Day 4: Relaxed coastal breakfast & airport transfer'
        ],
        recommendedActivity: {
          time: '09:30 AM',
          name: 'Fontainhas Latin Quarter Heritage Walk',
          location: 'Panjim, Goa',
          description: 'Guided architectural walk through Goa’s historic Portuguese quarter.',
          cost: 950,
          duration: '2h',
          category: 'Culture'
        },
        activitiesData: [
          {
            day: 1,
            title: 'South Goa Coastal Arrival',
            date: 'Day 1',
            activities: [
              {
                id: 'ai-g1',
                time: '11:00 AM',
                name: 'Airport Transfer to Benaulim',
                location: 'South Goa',
                description: 'Direct cab transfer to your boutique hotel.',
                cost: 1500,
                duration: '1h 30m',
                category: 'Transport'
              },
              {
                id: 'ai-g2',
                time: '05:00 PM',
                name: 'Benaulim Beach Sunset Walk',
                location: 'Benaulim',
                description: 'Unwind along quiet palm-lined sands.',
                cost: 600,
                duration: '2h',
                category: 'Sightseeing'
              }
            ]
          },
          {
            day: 2,
            title: 'Heritage Quarters & Spice Groves',
            date: 'Day 2',
            activities: [
              {
                id: 'ai-g3',
                time: '09:30 AM',
                name: 'Fontainhas Heritage Walk',
                location: 'Panjim, Goa',
                description: 'Guided tour of colorful heritage lanes.',
                cost: 950,
                duration: '2h',
                category: 'Culture'
              },
              {
                id: 'ai-g4',
                time: '01:00 PM',
                name: 'Spice Plantation Tour & Lunch',
                location: 'Ponda, Goa',
                description: 'Organic spice farm walk with traditional lunch.',
                cost: 2200,
                duration: '3h',
                category: 'Food'
              }
            ]
          }
        ],
        budgetOptionsCount: budgetPick.length
      }
    };
  }

  if (lower.includes('romantic') || lower.includes('weekend') || lower.includes('udaipur') || lower.includes('kyoto')) {
    const isKyoto = lower.includes('kyoto');
    const chosenDest = isKyoto ? 'Kyoto, Japan' : 'Udaipur, India';
    const estTotal = isKyoto ? Math.max(numericBudget, 125000) : Math.min(numericBudget, 58000);

    return {
      text: `I have designed a romantic getaway to ${chosenDest} for ${pax} traveller${pax > 1 ? 's' : ''} (${travelDates}), balancing serene architecture, scenic boat rides, and curated dining within ${formatINR(estTotal)}:`,
      itineraryPreview: {
        destination: chosenDest,
        duration: isKyoto ? '5 Days / 4 Nights' : '3 Days / 2 Nights',
        estimatedTotal: estTotal,
        flightEstimate: isKyoto ? '₹49,500 / traveller (Non-stop)' : '₹7,200 / traveller (Direct)',
        hotelRecommendation: isKyoto ? 'Kyoto Machiya Heritage Villa (4.92 ★)' : 'Taj Lake Palace Courtyard (4.94 ★)',
        costBreakdown: [
          { label: 'Return Flights', amount: Math.round(estTotal * 0.35) },
          { label: 'Heritage Suite Stay', amount: Math.round(estTotal * 0.45) },
          { label: 'Boat Cruises & Dining', amount: Math.round(estTotal * 0.2) }
        ],
        days: isKyoto
          ? [
              'Day 1: Kyoto arrival, Gion lantern walk & kaiseki dinner',
              'Day 2: Arashiyama bamboo grove & Katsura river boat ride',
              'Day 3: Fushimi Inari morning trail & private matcha tea ceremony',
              'Day 4: Philosopher’s Path temples & Nishiki market tasting',
              'Day 5: Morning garden stroll & departure'
            ]
          : [
              'Day 1: Udaipur arrival, Lake Pichola sunset boat cruise & lakeside dinner',
              'Day 2: City Palace courtyards, Saheliyon-ki-Bari & Sajjangarh Monsoon Palace',
              'Day 3: Fateh Sagar morning promenade & artisan market'
            ],
        recommendedActivity: {
          time: '05:15 PM',
          name: isKyoto ? 'Gion Evening Matcha & Lantern Walk' : 'Lake Pichola Sunset Boat Cruise',
          location: chosenDest,
          description: isKyoto
            ? 'Private tea ceremony followed by twilight walk in historic Gion.'
            : 'Scenic boat ride past Jag Mandir and sandstone ghats at dusk.',
          cost: isKyoto ? 5400 : 2800,
          duration: '2h',
          category: 'Culture'
        },
        activitiesData: [
          {
            day: 1,
            title: isKyoto ? 'Gion Lanterns & Heritage Stay' : 'Lake Pichola Sunset Arrival',
            date: 'Day 1',
            activities: [
              {
                id: 'ai-r1',
                time: '05:15 PM',
                name: isKyoto ? 'Gion Evening Lantern Walk' : 'Lake Pichola Sunset Boat Cruise',
                location: chosenDest,
                description: 'Atmospheric twilight experience for two.',
                cost: isKyoto ? 3200 : 2800,
                duration: '2h',
                category: 'Sightseeing'
              }
            ]
          },
          {
            day: 2,
            title: isKyoto ? 'Arashiyama Bamboo & Tea Ceremony' : 'Royal Courtyards & Hilltop Views',
            date: 'Day 2',
            activities: [
              {
                id: 'ai-r2',
                time: '09:30 AM',
                name: isKyoto ? 'Arashiyama Bamboo Grove & Tea Ceremony' : 'City Palace Guided Courtyard Tour',
                location: chosenDest,
                description: 'Unhurried morning exploring iconic heritage landmarks.',
                cost: isKyoto ? 5400 : 1800,
                duration: '3h',
                category: 'Culture'
              }
            ]
          }
        ]
      }
    };
  }

  // Generic tailored response for any destination/parameters
  const matchedDest = mockDestinations.find(
    (d) =>
      lower.includes(d.name.toLowerCase()) ||
      destination.toLowerCase().includes(d.name.toLowerCase())
  );
  const resolvedDestName = matchedDest ? `${matchedDest.name}, ${matchedDest.country}` : destination;

  return {
    text: `I have prepared a tailored plan for ${resolvedDestName} departing from ${departureCity} (${travelDates}) for ${pax} traveller${pax > 1 ? 's' : ''}, aligned with your ${travelStyle} style and ${formatINR(numericBudget)} budget:`,
    itineraryPreview: {
      destination: resolvedDestName,
      duration: '4 Days / 3 Nights',
      estimatedTotal: numericBudget,
      flightEstimate: `${formatINR(Math.round((numericBudget * 0.38) / pax))} / traveller (Estimated)`,
      hotelRecommendation: matchedDest ? `Top-rated 4.8★ stay in ${matchedDest.name}` : 'Curated 4-Star Boutique Hotel',
      costBreakdown: [
        { label: 'Flights & Airport Transfers', amount: Math.round(numericBudget * 0.4) },
        { label: '3 Nights Accommodation', amount: Math.round(numericBudget * 0.38) },
        { label: 'Guided Experiences & Dining', amount: Math.round(numericBudget * 0.22) }
      ],
      days: matchedDest
        ? [
            `Day 1: Arrival in ${matchedDest.name}, hotel check-in & evening orientation walk`,
            `Day 2: ${matchedDest.highlights[0]}`,
            `Day 3: ${matchedDest.highlights[1]} & ${matchedDest.highlights[2]}`,
            'Day 4: Local artisan market & return transfer'
          ]
        : [
            `Day 1: Arrival in ${resolvedDestName} & evening promenade`,
            'Day 2: Guided heritage landmarks & regional culinary tasting',
            'Day 3: Full-day scenic nature excursion & sunset viewpoint',
            'Day 4: Morning leisure & airport departure'
          ],
      recommendedActivity: {
        time: '10:00 AM',
        name: matchedDest ? matchedDest.highlights[0] : `Guided Highlights Tour of ${resolvedDestName}`,
        location: resolvedDestName,
        description: `Curated ${interestSummary} experience tailored to your trip pace.`,
        cost: 2200,
        duration: '3h',
        category: 'Sightseeing'
      },
      activitiesData: [
        {
          day: 1,
          title: `Arrival in ${resolvedDestName}`,
          date: 'Day 1',
          activities: [
            {
              id: 'ai-c1',
              time: '12:00 PM',
              name: 'Airport Transfer & Hotel Check-in',
              location: resolvedDestName,
              description: 'Private transfer to your hotel.',
              cost: 1800,
              duration: '1h 30m',
              category: 'Transport'
            }
          ]
        },
        {
          day: 2,
          title: 'Signature Landmarks & Local Cuisine',
          date: 'Day 2',
          activities: [
            {
              id: 'ai-c2',
              time: '09:30 AM',
              name: matchedDest ? matchedDest.highlights[0] : 'City Landmarks Walk',
              location: resolvedDestName,
              description: 'Guided morning exploration.',
              cost: 2200,
              duration: '3h',
              category: 'Sightseeing'
            }
          ]
        }
      ]
    }
  };
}
