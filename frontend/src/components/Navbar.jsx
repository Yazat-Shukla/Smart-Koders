import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Bell,
  ChevronRight,
  ChevronDown,
  User,
  CalendarDays,
  TicketCheck,
  Wallet,
  Settings,
  Check
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenSidebar, isCollapsed, onToggleCollapse }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, showToast } = useTrip();
  const { currentUser, logout } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'Bali Flight Fare Estimate',
      msg: 'Mumbai to Denpasar roundtrip estimates updated at ₹24,890.',
      time: '12m ago',
      unread: true,
      route: '/flights-hotels'
    },
    {
      id: 'n-2',
      title: 'Itinerary Synchronized',
      msg: 'Maya Ubud Resort check-in added to Day 1 schedule.',
      time: '2h ago',
      unread: true,
      route: '/itinerary'
    },
    {
      id: 'n-3',
      title: 'Budget Tracking Active',
      msg: '7 logged trip expenses are within your ₹1,80,000 target.',
      time: '1d ago',
      unread: false,
      route: '/budget'
    }
  ]);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/assistant': 'AI Travel Assistant',
    '/explore': 'Explore Destinations',
    '/flights-hotels': 'Flights & Hotels',
    '/itinerary': 'My Itinerary',
    '/budget': 'My Budget',
    '/bookings': 'My Bookings',
    '/support': 'Trip Support',
    '/settings': 'Settings'
  };

  const currentPageTitle = pageTitles[location.pathname] || 'Dashboard';

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    } else {
      navigate('/explore');
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read.');
  };

  const initials = userProfile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left Zone: Drawer/Collapse Toggle + Breadcrumb + Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-[#102A43] hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#14B8A6] transition-colors shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden lg:inline-flex p-2 rounded-lg text-slate-500 hover:text-[#102A43] hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#14B8A6] transition-colors shrink-0"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>

        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1 text-xs text-[#64748B] font-medium">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="hover:text-[#102A43] transition-colors whitespace-nowrap"
            >
              TripPilot AI
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[#0F766E] font-semibold truncate">{currentPageTitle}</span>
          </nav>
          <h1 className="text-base sm:text-lg font-bold text-[#102A43] leading-tight truncate">
            {currentPageTitle}
          </h1>
        </div>
      </div>

      {/* Right Zone: Search + Notifications + Profile Menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <form onSubmit={handleGlobalSearch} className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="search"
            aria-label="Search destinations"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#F5F8FC] text-sm text-[#172B4D] placeholder:text-slate-400 pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#14B8A6] w-48 lg:w-60 transition-colors"
          />
        </form>

        <button
          type="button"
          onClick={() => navigate('/explore')}
          aria-label="Explore destinations"
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-[#102A43] hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#14B8A6] transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfileMenu(false);
            }}
            aria-label={`Notifications (${unreadCount} unread)`}
            aria-expanded={showNotifications}
            className="relative p-2 rounded-lg text-slate-600 hover:text-[#102A43] hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#14B8A6] transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#102A43] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-lg py-2 z-50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-[#102A43]">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#102A43] transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark read</span>
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      setNotifications((prev) =>
                        prev.map((item) => (item.id === n.id ? { ...item, unread: false } : item))
                      );
                      setShowNotifications(false);
                      navigate(n.route);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-[#F5F8FC] transition-colors block ${
                      n.unread ? 'bg-[#F5F8FC]/70' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#102A43]">{n.title}</span>
                      <span className="text-[11px] text-[#64748B] tabular-nums shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{n.msg}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu((prev) => !prev);
              setShowNotifications(false);
            }}
            aria-label="Open user profile menu"
            aria-expanded={showProfileMenu}
            className="flex items-center gap-2 p-1 pr-2 rounded-xl hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#14B8A6] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#102A43] text-white text-xs font-bold flex items-center justify-center shrink-0">
              {initials || 'TR'}
            </div>
            <span className="hidden xl:inline text-sm font-semibold text-[#102A43] whitespace-nowrap">
              {userProfile.name.split(' ')[0]}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:inline" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-slate-200 shadow-lg py-2 z-50">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-sm font-bold text-[#102A43] truncate">{currentUser?.username} · {currentUser?.role}</p>
                <p className="text-xs text-[#64748B] truncate">{userProfile.email}</p>
              </div>
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/itinerary');
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-[#172B4D] hover:bg-[#F5F8FC] flex items-center gap-2.5"
                >
                  <CalendarDays className="w-4 h-4 text-[#0F766E]" />
                  <span>My Itinerary</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/bookings');
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-[#172B4D] hover:bg-[#F5F8FC] flex items-center gap-2.5"
                >
                  <TicketCheck className="w-4 h-4 text-[#0F766E]" />
                  <span>My Bookings</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/budget');
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-[#172B4D] hover:bg-[#F5F8FC] flex items-center gap-2.5"
                >
                  <Wallet className="w-4 h-4 text-[#0F766E]" />
                  <span>My Budget</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-[#172B4D] hover:bg-[#F5F8FC] flex items-center gap-2.5"
                >
                  <Settings className="w-4 h-4 text-[#0F766E]" />
                  <span>Preferences & Settings</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setShowProfileMenu(false); logout(); navigate('/login', { replace: true }); }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-red-700 hover:bg-red-50"
                >Log out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
