import baliImg from '../assets/images/dest_bali_terraces_1793892735224.jpg';
import goaImg from '../assets/images/dest_goa_coast_1793892735993.jpg';
import kyotoImg from '../assets/images/dest_kyoto_pagoda_1793892735718.jpg';
import ladakhImg from '../assets/images/dest_ladakh_mountains_1793892736437.jpg';
import dubaiImg from '../assets/images/dest_dubai_marina_1793892736531.jpg';
import keralaImg from '../assets/images/dest_kerala_backwaters_1793892736725.jpg';
import santoriniImg from '../assets/images/dest_santorini_caldera_1793892737553.jpg';
import queenstownImg from '../assets/images/dest_queenstown_lake_1793892736851.jpg';
import tropicalResortImg from '../assets/images/hotel_tropical_resort_1793892737728.jpg';
import heritagePalaceImg from '../assets/images/hotel_heritage_palace_1793892737992.jpg';

export const mockDestinations = [
  {
    id: 'dest-1',
    name: 'Bali',
    country: 'Indonesia',
    type: 'International',
    category: 'Beaches',
    budget: 68000,
    bestSeason: 'Apr – Oct',
    rating: 4.9,
    reviews: 1420,
    image: baliImg,
    description:
      'Emerald volcanic rice terraces in Ubud, cliffside sea temples at Uluwatu, and serene coastal villas.',
    tags: ['Beaches', 'Culture', 'Relaxation'],
    highlights: [
      'Sunrise walk through Tegalalang UNESCO rice terraces',
      'Sacred Melukat water purification at Tirta Empul',
      'Sunset Kecak fire dance overlooking the Indian Ocean'
    ]
  },
  {
    id: 'dest-2',
    name: 'Goa',
    country: 'India',
    type: 'Domestic',
    category: 'Beaches',
    budget: 28000,
    bestSeason: 'Nov – Feb',
    rating: 4.8,
    reviews: 2890,
    image: goaImg,
    description:
      'Palm-fringed Arabian Sea coves, Indo-Portuguese heritage quarters in Fontainhas, and coastal spice farms.',
    tags: ['Beaches', 'Relaxation', 'Romantic'],
    highlights: [
      'Quiet sunset strolls along Agonda and Benaulim beaches',
      'Guided architectural walk through Fontainhas Latin Quarter',
      'Traditional Goan seafood tasting by the Mandovi river'
    ]
  },
  {
    id: 'dest-3',
    name: 'Kyoto',
    country: 'Japan',
    type: 'International',
    category: 'Culture',
    budget: 125000,
    bestSeason: 'Mar – May, Oct – Nov',
    rating: 4.94,
    reviews: 950,
    image: kyotoImg,
    description:
      'Centuries-old wooden pagodas, tranquil moss gardens, bamboo groves in Arashiyama, and lantern-lit machiya lanes.',
    tags: ['Culture', 'Romantic', 'Family'],
    highlights: [
      'Early morning walk through Fushimi Inari vermilion gates',
      'Private matcha tea ceremony in historic Gion',
      'Arashiyama bamboo grove and Katsura river boat ride'
    ]
  },
  {
    id: 'dest-4',
    name: 'Manali & Leh',
    country: 'India',
    type: 'Domestic',
    category: 'Mountains',
    budget: 38000,
    bestSeason: 'May – Sep',
    rating: 4.86,
    reviews: 1810,
    image: ladakhImg,
    description:
      'High-altitude Himalayan mountain passes, turquoise Pangong Lake, whitewashed monasteries, and alpine valleys.',
    tags: ['Mountains', 'Adventure', 'Culture'],
    highlights: [
      'Scenic drive across Khardung La into Nubra Valley',
      'Sunrise reflection at Pangong Tso alpine lake',
      'Morning prayer chant at Thiksey Monastery'
    ]
  },
  {
    id: 'dest-5',
    name: 'Dubai',
    country: 'United Arab Emirates',
    type: 'International',
    category: 'Family',
    budget: 85000,
    bestSeason: 'Nov – Mar',
    rating: 4.78,
    reviews: 3120,
    image: dubaiImg,
    description:
      'Architectural waterfront promenades, desert conservation safaris, historic Al Fahidi wind-towers, and family parks.',
    tags: ['Family', 'Adventure', 'Relaxation'],
    highlights: [
      'Evening dhow cruise along Dubai Marina skyline',
      'Conservation desert safari with stargazing dinner',
      'Abra water taxi ride across historic Dubai Creek'
    ]
  },
  {
    id: 'dest-6',
    name: 'Kerala Backwaters',
    country: 'India',
    type: 'Domestic',
    category: 'Relaxation',
    budget: 34000,
    bestSeason: 'Sep – Mar',
    rating: 4.89,
    reviews: 1670,
    image: keralaImg,
    description:
      'Tranquil network of palm-lined lagoons in Alleppey and Kumarakom, Ayurvedic wellness retreats, and Munnar tea hills.',
    tags: ['Relaxation', 'Romantic', 'Family'],
    highlights: [
      'Overnight private wooden kettuvallam houseboat cruise',
      'Authentic Sadhya feast served on fresh banana leaves',
      'Guided spice and tea estate walk in Munnar'
    ]
  },
  {
    id: 'dest-7',
    name: 'Santorini',
    country: 'Greece',
    type: 'International',
    category: 'Romantic',
    budget: 165000,
    bestSeason: 'May – Oct',
    rating: 4.95,
    reviews: 830,
    image: santoriniImg,
    description:
      'Whitewashed Cycladic cliffside villages in Oia and Imerovigli, cobalt domes, and volcanic caldera sunsets.',
    tags: ['Romantic', 'Beaches', 'Culture'],
    highlights: [
      'Scenic caldera rim hike from Fira to Oia',
      'Catamaran sail past the Red Beach and volcanic hot springs',
      'Cliffside Mediterranean dinner overlooking the Aegean'
    ]
  },
  {
    id: 'dest-8',
    name: 'Queenstown',
    country: 'New Zealand',
    type: 'International',
    category: 'Adventure',
    budget: 195000,
    bestSeason: 'Dec – Mar',
    rating: 4.92,
    reviews: 640,
    image: queenstownImg,
    description:
      'Glacial Lake Wakatipu framed by the Remarkables mountain range, alpine hiking trails, and fjord excursions.',
    tags: ['Adventure', 'Mountains', 'Relaxation'],
    highlights: [
      'TSS Earnslaw vintage steamship cruise across Lake Wakatipu',
      'Full-day excursion into Milford Sound fjord',
      'Skyline gondola ascent to Bob’s Peak alpine trails'
    ]
  },
  {
    id: 'dest-9',
    name: 'Udaipur',
    country: 'India',
    type: 'Domestic',
    category: 'Romantic',
    budget: 32000,
    bestSeason: 'Oct – Mar',
    rating: 4.87,
    reviews: 1540,
    image: heritagePalaceImg,
    description:
      'Sandstone lakeside palaces, serene boat rides on Lake Pichola, Aravalli hill viewpoints, and royal Rajasthani courtyards.',
    tags: ['Romantic', 'Culture', 'Relaxation'],
    highlights: [
      'Sunset boat cruise past Jag Mandir on Lake Pichola',
      'Guided tour of City Palace courtyards and museum',
      'Evening folk performance at Bagore Ki Haveli'
    ]
  },
  {
    id: 'dest-10',
    name: 'Coorg & Chikmagalur',
    country: 'India',
    type: 'Domestic',
    category: 'Mountains',
    budget: 24500,
    bestSeason: 'Oct – Apr',
    rating: 4.82,
    reviews: 1190,
    image: tropicalResortImg,
    description:
      'Misty Western Ghats coffee plantations, cascading Abbey Falls, forest trails, and heritage planters bungalows.',
    tags: ['Mountains', 'Relaxation', 'Adventure'],
    highlights: [
      'Single-estate Arabica coffee plantation walk and tasting',
      'Early morning trek to Tadiandamol peak',
      'Golden Temple visit at Bylakuppe Tibetan settlement'
    ]
  }
];

export const mockFlights = [
  {
    id: 'FL-601',
    airline: 'IndiGo',
    flightNumber: '6E-2041',
    from: 'Delhi (DEL)',
    to: 'Goa (GOI)',
    departTime: '06:15 AM',
    arrivalTime: '08:45 AM',
    duration: '2h 30m',
    durationMinutes: 150,
    stops: 'Non-stop',
    cabin: 'Economy',
    price: 6499
  },
  {
    id: 'FL-602',
    airline: 'Air India',
    flightNumber: 'AI-883',
    from: 'Mumbai (BOM)',
    to: 'Bali (DPS)',
    departTime: '01:20 AM',
    arrivalTime: '11:40 AM',
    duration: '7h 50m',
    durationMinutes: 470,
    stops: '1 Stop (SIN)',
    cabin: 'Economy',
    price: 24890
  },
  {
    id: 'FL-603',
    airline: 'Singapore Airlines',
    flightNumber: 'SQ-423',
    from: 'Mumbai (BOM)',
    to: 'Bali (DPS)',
    departTime: '11:45 PM',
    arrivalTime: '10:15 AM',
    duration: '8h 00m',
    durationMinutes: 480,
    stops: '1 Stop (SIN)',
    cabin: 'Economy',
    price: 31200
  },
  {
    id: 'FL-604',
    airline: 'Vistara',
    flightNumber: 'UK-994',
    from: 'Delhi (DEL)',
    to: 'Dubai (DXB)',
    departTime: '09:30 AM',
    arrivalTime: '12:15 PM',
    duration: '4h 15m',
    durationMinutes: 255,
    stops: 'Non-stop',
    cabin: 'Premium Economy',
    price: 18450
  },
  {
    id: 'FL-605',
    airline: 'Emirates',
    flightNumber: 'EK-511',
    from: 'Delhi (DEL)',
    to: 'Dubai (DXB)',
    departTime: '10:55 AM',
    arrivalTime: '01:25 PM',
    duration: '3h 50m',
    durationMinutes: 230,
    stops: 'Non-stop',
    cabin: 'Business',
    price: 46900
  },
  {
    id: 'FL-606',
    airline: 'Air India',
    flightNumber: 'AI-310',
    from: 'Delhi (DEL)',
    to: 'Tokyo / Kyoto (NRT)',
    departTime: '08:00 PM',
    arrivalTime: '07:30 AM',
    duration: '8h 00m',
    durationMinutes: 480,
    stops: 'Non-stop',
    cabin: 'Economy',
    price: 49500
  },
  {
    id: 'FL-607',
    airline: 'Akasa Air',
    flightNumber: 'QP-1342',
    from: 'Bengaluru (BLR)',
    to: 'Goa (GOI)',
    departTime: '07:40 AM',
    arrivalTime: '08:55 AM',
    duration: '1h 15m',
    durationMinutes: 75,
    stops: 'Non-stop',
    cabin: 'Economy',
    price: 4850
  },
  {
    id: 'FL-608',
    airline: 'IndiGo',
    flightNumber: '6E-5108',
    from: 'Mumbai (BOM)',
    to: 'Kochi / Kerala (COK)',
    departTime: '10:15 AM',
    arrivalTime: '12:20 PM',
    duration: '2h 05m',
    durationMinutes: 125,
    stops: 'Non-stop',
    cabin: 'Economy',
    price: 5920
  }
];

export const mockHotels = [
  {
    id: 'HT-101',
    name: 'Maya Ubud Resort & Spa',
    location: 'Ubud, Bali',
    rating: 4.9,
    reviews: 642,
    pricePerNight: 9800,
    roomType: 'Superior Valley View Suite',
    image: tropicalResortImg,
    facilities: ['Infinity Pool', 'Free Breakfast', 'Valley View', 'Full Spa', 'Yoga Studio']
  },
  {
    id: 'HT-102',
    name: 'Taj Exotica Resort & Spa',
    location: 'Benaulim, South Goa',
    rating: 4.85,
    reviews: 1240,
    pricePerNight: 16500,
    roomType: 'Garden Villa with Verandah',
    image: goaImg,
    facilities: ['Private Beach', 'Golf Course', 'Fine Dining', 'Kids Club', 'Airport Transfer']
  },
  {
    id: 'HT-103',
    name: 'Kyoto Machiya Heritage Villa',
    location: 'Gion, Kyoto',
    rating: 4.92,
    reviews: 310,
    pricePerNight: 18200,
    roomType: 'Traditional Cedar Tatami Suite',
    image: kyotoImg,
    facilities: ['Traditional Tatami', 'Private Onsen', 'Garden View', 'Tea Ceremony', 'High-Speed Wi-Fi']
  },
  {
    id: 'HT-104',
    name: 'The Grand Leh Palace Resort',
    location: 'Leh, Ladakh',
    rating: 4.75,
    reviews: 420,
    pricePerNight: 7200,
    roomType: 'Himalayan Panorama Room',
    image: ladakhImg,
    facilities: ['Oxygen-Enriched Rooms', 'Mountain View', 'Heated Lounge', 'Buffet Breakfast', 'Evening Bonfire']
  },
  {
    id: 'HT-105',
    name: 'Address Downtown Dubai',
    location: 'Downtown, Dubai',
    rating: 4.88,
    reviews: 1840,
    pricePerNight: 28400,
    roomType: 'Premier Fountain View King',
    image: dubaiImg,
    facilities: ['Skyline View', 'Rooftop Pool', 'Direct Promenade Access', 'Concierge', 'Full Spa']
  },
  {
    id: 'HT-106',
    name: 'Kumarakom Lake Luxury Resort',
    location: 'Kumarakom, Kerala',
    rating: 4.91,
    reviews: 890,
    pricePerNight: 14500,
    roomType: 'Heritage Lakefront Cottage',
    image: keralaImg,
    facilities: ['Meandering Pool', 'Ayurvedic Spa', 'Sunset Cruise', 'Heritage Architecture', 'Coastal Dining']
  },
  {
    id: 'HT-107',
    name: 'Taj Lake Palace Courtyard',
    location: 'Lake Pichola, Udaipur',
    rating: 4.94,
    reviews: 980,
    pricePerNight: 22000,
    roomType: 'Royal Heritage Courtyard Room',
    image: heritagePalaceImg,
    facilities: ['Courtyard Pool', 'Lake Boat Transfer', 'Heritage Walk', 'Fine Dining', 'Butler Service']
  },
  {
    id: 'HT-108',
    name: 'Canaves Oia Cliffside Suites',
    location: 'Oia, Santorini',
    rating: 4.96,
    reviews: 515,
    pricePerNight: 34000,
    roomType: 'Caldera Plunge Pool Suite',
    image: santoriniImg,
    facilities: ['Caldera View', 'Private Plunge Pool', 'Champagne Breakfast', 'Concierge', 'Airport Shuttle']
  }
];

export const mockActivities = [
  {
    id: 'rec-1',
    type: 'Activities',
    title: 'Melukat Temple Water Cleansing',
    location: 'Tirta Empul, Bali',
    description: 'Guided sacred spring purification ritual at Tirta Empul temple with traditional sarong attire.',
    price: 1200,
    duration: '2h 30m',
    image: baliImg
  },
  {
    id: 'rec-2',
    type: 'Sightseeing',
    title: 'Uluwatu Cliff Sunset & Kecak Dance',
    location: 'South Kuta, Bali',
    description: 'Dramatic 70-meter clifftop amphitheater performance at golden hour followed by coastal dining.',
    price: 2400,
    duration: '3h',
    image: tropicalResortImg
  },
  {
    id: 'rec-3',
    type: 'Hotels',
    title: 'Maya Ubud Infinity Valley Stay',
    location: 'Ubud, Bali',
    description: 'Five-night boutique resort stay overlooking the Petanu river valley with daily breakfast.',
    price: 9800,
    duration: 'Per Night',
    image: tropicalResortImg
  },
  {
    id: 'rec-4',
    type: 'Travel experiences',
    title: 'Alleppey Private Wooden Houseboat',
    location: 'Kerala Backwaters, India',
    description: 'Full-day private kettuvallam cruise through emerald palm canals with freshly prepared Sadhya.',
    price: 8500,
    duration: '6h',
    image: keralaImg
  },
  {
    id: 'rec-5',
    type: 'Sightseeing',
    title: 'Fontainhas Latin Quarter Heritage Walk',
    location: 'Panjim, Goa',
    description: 'Guided architectural walk past pastel Portuguese villas, bakeries, and historic chapels.',
    price: 950,
    duration: '2h',
    image: goaImg
  },
  {
    id: 'rec-6',
    type: 'Activities',
    title: 'Pangong Lake Sunrise Expedition',
    location: 'Leh, Ladakh',
    description: 'High-altitude SUV excursion across Chang La pass to the shifting turquoise waters of Pangong.',
    price: 4200,
    duration: 'Full Day',
    image: ladakhImg
  },
  {
    id: 'rec-7',
    type: 'Travel experiences',
    title: 'Gion Evening Matcha & Lantern Walk',
    location: 'Kyoto, Japan',
    description: 'Private tea ceremony in a wooden machiya townhouse followed by a twilight stroll.',
    price: 5400,
    duration: '2h 30m',
    image: kyotoImg
  },
  {
    id: 'rec-8',
    type: 'Hotels',
    title: 'Lake Pichola Sandstone Heritage Suite',
    location: 'Udaipur, India',
    description: 'Courtyard suite with evening cultural performances and private boat jetty access.',
    price: 22000,
    duration: 'Per Night',
    image: heritagePalaceImg
  },
  {
    id: 'rec-9',
    type: 'Activities',
    title: 'Caldera Sunset Catamaran Cruise',
    location: 'Oia, Santorini',
    description: 'Sail past volcanic islands and Red Beach with freshly grilled Mediterranean lunch onboard.',
    price: 9200,
    duration: '5h',
    image: santoriniImg
  },
  {
    id: 'rec-10',
    type: 'Sightseeing',
    title: 'Lake Wakatipu Vintage Steamship',
    location: 'Queenstown, New Zealand',
    description: 'Cruise aboard the historic TSS Earnslaw coal-fired steamer to Walter Peak high-country farm.',
    price: 6100,
    duration: '3h 30m',
    image: queenstownImg
  }
];

export const initialItinerary = [
  {
    day: 1,
    title: 'Arrival & Ubud Valley Tranquility',
    date: '14 Oct 2026',
    activities: [
      {
        id: 'act-1',
        time: '11:30 AM',
        name: 'Ngurah Rai International Airport Pickup',
        location: 'Denpasar, Bali',
        description: 'Private air-conditioned transfer directly to your Ubud eco-resort.',
        cost: 2200,
        duration: '1h 30m',
        category: 'Transport'
      },
      {
        id: 'act-2',
        time: '02:00 PM',
        name: 'Resort Check-in & Welcome Herbal Elixir',
        location: 'Maya Ubud Resort',
        description: 'Unpack, refresh, and enjoy tropical river valley views from your suite.',
        cost: 0,
        duration: '1h',
        category: 'Hotel'
      },
      {
        id: 'act-3',
        time: '04:30 PM',
        name: 'Campuhan Ridge Walk at Sunset',
        location: 'Ubud Central Ridge',
        description: 'Scenic 2km paved walking trail through hillside grass and river gorges.',
        cost: 0,
        duration: '2h',
        category: 'Sightseeing'
      },
      {
        id: 'act-4',
        time: '07:30 PM',
        name: 'Balinese Feast at Bebek Bengil',
        location: 'Hanoman St, Ubud',
        description: 'Traditional Indonesian dinner overlooking illuminated lotus ponds.',
        cost: 2600,
        duration: '1h 45m',
        category: 'Food'
      }
    ]
  },
  {
    day: 2,
    title: 'Sacred Waterfalls & Ancient Terraces',
    date: '15 Oct 2026',
    activities: [
      {
        id: 'act-5',
        time: '08:30 AM',
        name: 'Tegalalang Rice Terraces & Morning Walk',
        location: 'Gianyar, Bali',
        description: 'UNESCO-heritage subak irrigation system and panoramic terrace photography.',
        cost: 1800,
        duration: '3h',
        category: 'Activity'
      },
      {
        id: 'act-6',
        time: '12:30 PM',
        name: 'Organic Farm-to-Table Lunch at Sari Organik',
        location: 'Ricefields Walkway',
        description: 'Fresh cold-pressed juices and local Indonesian Nasi Campur.',
        cost: 1400,
        duration: '1h 30m',
        category: 'Food'
      },
      {
        id: 'act-7',
        time: '03:00 PM',
        name: 'Tibumana Waterfall Dip',
        location: 'Bangli Regency',
        description: 'Secluded natural plunge pool surrounded by tropical ferns.',
        cost: 600,
        duration: '2h',
        category: 'Sightseeing'
      }
    ]
  },
  {
    day: 3,
    title: 'Temples & Ocean Sunsets',
    date: '16 Oct 2026',
    activities: [
      {
        id: 'act-8',
        time: '09:00 AM',
        name: 'Tirta Empul Holy Water Spring Cleansing',
        location: 'Tampaksiring',
        description: 'Participate in the traditional Melukat spiritual purification ritual.',
        cost: 1200,
        duration: '2h 30m',
        category: 'Culture'
      },
      {
        id: 'act-9',
        time: '04:30 PM',
        name: 'Uluwatu Cliff Temple & Kecak Fire Dance',
        location: 'South Kuta',
        description: '70-meter clifftop amphitheater performance at sunset.',
        cost: 2400,
        duration: '3h',
        category: 'Activity'
      },
      {
        id: 'act-10',
        time: '08:00 PM',
        name: 'Seaside Dinner on Jimbaran Bay',
        location: 'Jimbaran Beach',
        description: 'Grilled coastal platter and coconut sambal right on the shoreline.',
        cost: 3800,
        duration: '2h',
        category: 'Food'
      }
    ]
  }
];

export const mockTrips = [
  {
    id: 'trip-1',
    destination: 'Bali, Indonesia',
    dates: '14 Oct – 19 Oct 2026',
    travellers: 2,
    status: 'Confirmed',
    style: 'Romantic & Cultural',
    budgetTotal: 180000,
    image: baliImg,
    itinerary: initialItinerary
  },
  {
    id: 'trip-2',
    destination: 'Goa, India',
    dates: '20 Nov – 24 Nov 2026',
    travellers: 2,
    status: 'Confirmed',
    style: 'Relaxation & Beaches',
    budgetTotal: 65000,
    image: goaImg,
    itinerary: [
      {
        day: 1,
        title: 'South Goa Arrival & Sunset Cove',
        date: '20 Nov 2026',
        activities: [
          {
            id: 'goa-1',
            time: '10:30 AM',
            name: 'Mopa Airport Transfer to Benaulim',
            location: 'South Goa',
            description: 'Scenic coastal drive past coconut groves to your beachfront resort.',
            cost: 1600,
            duration: '1h 30m',
            category: 'Transport'
          },
          {
            id: 'goa-2',
            time: '05:00 PM',
            name: 'Benaulim Beach Golden Hour Walk',
            location: 'Benaulim Coast',
            description: 'Quiet shoreline walk and coastal refreshments.',
            cost: 1200,
            duration: '2h',
            category: 'Sightseeing'
          }
        ]
      },
      {
        day: 2,
        title: 'Fontainhas Heritage & Spice Plantation',
        date: '21 Nov 2026',
        activities: [
          {
            id: 'goa-3',
            time: '09:30 AM',
            name: 'Fontainhas Latin Quarter Guided Walk',
            location: 'Panjim, Goa',
            description: 'Explore heritage Indo-Portuguese lanes and traditional bakeries.',
            cost: 1900,
            duration: '2h 30m',
            category: 'Culture'
          },
          {
            id: 'goa-4',
            time: '01:00 PM',
            name: 'Sahakari Spice Farm & Traditional Lunch',
            location: 'Ponda, Goa',
            description: 'Guided tour of cardamom, vanilla, and cinnamon groves.',
            cost: 2200,
            duration: '3h',
            category: 'Food'
          }
        ]
      }
    ]
  },
  {
    id: 'trip-3',
    destination: 'Manali & Leh, India',
    dates: '12 Jun – 18 Jun 2027',
    travellers: 4,
    status: 'Planning',
    style: 'Adventure & Mountains',
    budgetTotal: 152000,
    image: ladakhImg,
    itinerary: [
      {
        day: 1,
        title: 'Leh Acclimatization & Shanti Stupa',
        date: '12 Jun 2027',
        activities: [
          {
            id: 'leh-1',
            time: '09:00 AM',
            name: 'Leh Airport Arrival & Rest',
            location: 'Leh, Ladakh',
            description: 'Morning rest and hydration for high-altitude acclimatization.',
            cost: 1500,
            duration: '4h',
            category: 'Transport'
          },
          {
            id: 'leh-2',
            time: '05:00 PM',
            name: 'Shanti Stupa Sunset Overlook',
            location: 'Chanspa, Leh',
            description: 'Panoramic views of the Indus Valley and Stok Kangri range.',
            cost: 400,
            duration: '1h 30m',
            category: 'Sightseeing'
          }
        ]
      },
      {
        day: 2,
        title: 'Nubra Valley via Khardung La',
        date: '13 Jun 2027',
        activities: [
          {
            id: 'leh-3',
            time: '08:00 AM',
            name: 'Drive Across Khardung La Pass',
            location: 'Ladakh Range',
            description: 'High-altitude mountain pass crossing into Nubra Valley.',
            cost: 4500,
            duration: '5h',
            category: 'Activity'
          },
          {
            id: 'leh-4',
            time: '03:30 PM',
            name: 'Diskit Monastery & Hunder Sand Dunes',
            location: 'Nubra Valley',
            description: 'Visit the 14th-century monastery and silver sand dunes.',
            cost: 1200,
            duration: '2h 30m',
            category: 'Culture'
          }
        ]
      }
    ]
  }
];

export const initialBookings = [
  {
    id: 'BK-8901',
    type: 'Flight',
    title: 'Roundtrip: BOM to DPS (Bali)',
    provider: 'Singapore Airlines',
    destination: 'Bali, Indonesia',
    reference: 'SQ-BALI-89241',
    dates: '14 Oct 2026 – 20 Oct 2026',
    price: 62400,
    status: 'Confirmed',
    details: 'Economy Class · 2 Passengers · 25kg check-in luggage included.'
  },
  {
    id: 'BK-8902',
    type: 'Hotel',
    title: 'Maya Ubud Resort & Spa',
    provider: 'Maya Hospitality Group',
    destination: 'Ubud, Bali',
    reference: 'HT-MY-99120',
    dates: '14 Oct 2026 – 19 Oct 2026 (5 Nights)',
    price: 49000,
    status: 'Confirmed',
    details: 'Superior Valley View Suite · Daily Buffet Breakfast included.'
  },
  {
    id: 'BK-8903',
    type: 'Activity',
    title: 'Uluwatu Kecak Dance Passes',
    provider: 'Bali Heritage Tours',
    destination: 'Uluwatu, Bali',
    reference: 'ACT-KECAK-441',
    dates: '16 Oct 2026 · 04:30 PM',
    price: 4800,
    status: 'Confirmed',
    details: 'Amphitheater seating + Sunset temple entry pass for 2 guests.'
  },
  {
    id: 'BK-8904',
    type: 'Transfer',
    title: 'Denpasar Airport Private Sedan',
    provider: 'Blue Bird Transfers',
    destination: 'Denpasar to Ubud',
    reference: 'TRF-BB-1039',
    dates: '14 Oct 2026 · 11:30 AM',
    price: 2200,
    status: 'Pending',
    details: 'Arrival hall meet and greet with direct transfer to Ubud.'
  },
  {
    id: 'BK-8905',
    type: 'Flight',
    title: 'Weekend Return: DEL to GOI (Goa)',
    provider: 'IndiGo Airlines',
    destination: 'Goa, India',
    reference: '6E-GOA-33109',
    dates: '20 Nov 2026 – 24 Nov 2026',
    price: 25996,
    status: 'Confirmed',
    details: 'Economy Flex · 2 Passengers · Non-stop morning departure.'
  },
  {
    id: 'BK-8906',
    type: 'Hotel',
    title: 'Old Harbour Heritage Boutique Stay',
    provider: 'CGH Earth',
    destination: 'Fort Kochi, Kerala',
    reference: 'HT-CGH-77412',
    dates: '05 Sep 2026 – 08 Sep 2026 (3 Nights)',
    price: 36000,
    status: 'Cancelled',
    details: 'Garden Verandah Room · Cancelled under flexible 7-day policy.'
  }
];

export const initialExpenses = [
  { id: 'exp-1', name: 'International Flights (2 Travellers)', category: 'Flights', amount: 62400, date: '2026-09-01' },
  { id: 'exp-2', name: 'Maya Ubud Resort (5 Nights)', category: 'Hotels', amount: 49000, date: '2026-09-03' },
  { id: 'exp-3', name: 'Dining & Coastal Cafes Reserve', category: 'Food', amount: 18500, date: '2026-10-14' },
  { id: 'exp-4', name: 'Airport & Day Excursion Private Car', category: 'Transport', amount: 9600, date: '2026-10-14' },
  { id: 'exp-5', name: 'Kecak Dance & Temple Entry Passes', category: 'Activities', amount: 6800, date: '2026-10-15' },
  { id: 'exp-6', name: 'Handicrafts & Ubud Art Market', category: 'Shopping', amount: 12000, date: '2026-10-16' },
  { id: 'exp-7', name: 'Travel Insurance & International eSIM', category: 'Other', amount: 4200, date: '2026-09-10' }
];

export const initialChatThreads = [
  {
    id: 'thread-1',
    title: 'Bali 5-Day Couple Escape',
    updatedAt: 'Today, 10:01 AM',
    destination: 'Bali, Indonesia',
    messages: [
      {
        id: 'msg-1',
        sender: 'ai',
        timestamp: '10:00 AM',
        text: 'Hello! I am TripPilot AI, your travel planning assistant. Share your destination, dates, budget in INR, or travel preferences, and I will build a structured itinerary and cost estimate.',
        itineraryPreview: null
      },
      {
        id: 'msg-2',
        sender: 'ai',
        timestamp: '10:01 AM',
        text: 'You can type a request below or adjust the trip preference controls on the left to generate a tailored plan.',
        itineraryPreview: null
      }
    ]
  },
  {
    id: 'thread-2',
    title: 'Goa Weekend Beach Retreat',
    updatedAt: 'Yesterday',
    destination: 'Goa, India',
    messages: [
      {
        id: 't2-1',
        sender: 'user',
        timestamp: '04:15 PM',
        text: 'Find budget-friendly beach destinations in India for 4 days under ₹45,000.'
      },
      {
        id: 't2-2',
        sender: 'ai',
        timestamp: '04:15 PM',
        text: 'South Goa (Benaulim & Agonda) fits a 4-day coastal escape comfortably within ₹42,000 for two travellers, including direct IndiGo flights and a boutique stay.',
        itineraryPreview: {
          destination: 'Goa, India',
          duration: '4 Days / 3 Nights',
          estimatedTotal: 42000,
          flightEstimate: '₹6,499 per person (IndiGo Non-stop)',
          hotelRecommendation: 'Taj Exotica / Boutique South Goa Villa',
          days: [
            'Day 1: Arrival at Mopa, Benaulim beach sunset walk',
            'Day 2: Fontainhas Latin Quarter walk & Sahakari spice farm',
            'Day 3: Palolem bay kayaking & coastal seafood dinner',
            'Day 4: Leisure breakfast and return flight'
          ],
          activitiesData: [
            {
              day: 1,
              title: 'South Goa Arrival & Sunset Cove',
              date: 'Day 1',
              activities: [
                {
                  id: 'g-1',
                  time: '11:00 AM',
                  name: 'Airport Transfer to Benaulim',
                  location: 'South Goa',
                  description: 'Private cab transfer to coastal resort.',
                  cost: 1600,
                  duration: '1h 30m',
                  category: 'Transport'
                },
                {
                  id: 'g-2',
                  time: '05:00 PM',
                  name: 'Benaulim Sunset Shoreline Walk',
                  location: 'Benaulim Beach',
                  description: 'Evening walk along the Arabian Sea coast.',
                  cost: 800,
                  duration: '2h',
                  category: 'Sightseeing'
                }
              ]
            },
            {
              day: 2,
              title: 'Fontainhas Heritage & Spice Groves',
              date: 'Day 2',
              activities: [
                {
                  id: 'g-3',
                  time: '10:00 AM',
                  name: 'Fontainhas Latin Quarter Walk',
                  location: 'Panjim, Goa',
                  description: 'Guided architectural walk through pastel heritage streets.',
                  cost: 1500,
                  duration: '2h',
                  category: 'Culture'
                },
                {
                  id: 'g-4',
                  time: '01:30 PM',
                  name: 'Spice Plantation Tour & Lunch',
                  location: 'Ponda, Goa',
                  description: 'Organic spice walk and traditional Goan thali.',
                  cost: 2200,
                  duration: '3h',
                  category: 'Food'
                }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'thread-3',
    title: 'Himalayan Adventure Under ₹50k',
    updatedAt: '3 days ago',
    destination: 'Manali & Leh, India',
    messages: [
      {
        id: 't3-1',
        sender: 'user',
        timestamp: '11:20 AM',
        text: 'Find adventure destinations under ₹50,000.'
      },
      {
        id: 't3-2',
        sender: 'ai',
        timestamp: '11:20 AM',
        text: 'Manali & Leh (Ladakh) offers dramatic Himalayan mountain passes, alpine lakes, and monastery trails starting around ₹38,000 per traveller.',
        itineraryPreview: {
          destination: 'Manali & Leh, India',
          duration: '5 Days / 4 Nights',
          estimatedTotal: 46000,
          flightEstimate: '₹11,400 per person (Delhi to Leh)',
          hotelRecommendation: 'The Grand Leh Palace Resort (4.75 ★)',
          days: [
            'Day 1: Leh arrival, acclimatization & Shanti Stupa sunset',
            'Day 2: Khardung La pass drive into Nubra Valley sand dunes',
            'Day 3: Pangong Tso turquoise alpine lake excursion',
            'Day 4: Thiksey Monastery morning chant & Leh local market',
            'Day 5: Morning departure flight'
          ],
          activitiesData: [
            {
              day: 1,
              title: 'Leh Acclimatization & Shanti Stupa',
              date: 'Day 1',
              activities: [
                {
                  id: 'l-1',
                  time: '10:00 AM',
                  name: 'Leh Hotel Check-in & Hydration Rest',
                  location: 'Leh Town',
                  description: 'Acclimatize comfortably at 3,500m elevation.',
                  cost: 0,
                  duration: '4h',
                  category: 'Hotel'
                },
                {
                  id: 'l-2',
                  time: '05:00 PM',
                  name: 'Shanti Stupa Sunset Viewpoint',
                  location: 'Chanspa, Leh',
                  description: 'Panoramic Himalayan valley vista at dusk.',
                  cost: 500,
                  duration: '1h 30m',
                  category: 'Sightseeing'
                }
              ]
            },
            {
              day: 2,
              title: 'Nubra Valley & Khardung La',
              date: 'Day 2',
              activities: [
                {
                  id: 'l-3',
                  time: '08:00 AM',
                  name: 'Khardung La Mountain Pass Crossing',
                  location: 'Ladakh Range',
                  description: 'Scenic high-altitude drive into Nubra Valley.',
                  cost: 4200,
                  duration: '5h',
                  category: 'Activity'
                }
              ]
            }
          ]
        }
      }
    ]
  }
];
