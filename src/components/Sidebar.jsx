import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Compass,
  PlaneTakeoff,
  CalendarDays,
  Wallet,
  TicketCheck,
  Headset,
  Settings as SettingsIcon,
  Plane,
  X,
  LogOut
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose, isCollapsed }) {
  const { userProfile } = useTrip();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Travel Assistant', path: '/assistant', icon: Sparkles },
    { name: 'Explore Destinations', path: '/explore', icon: Compass },
    { name: 'Flights & Hotels', path: '/flights-hotels', icon: PlaneTakeoff },
    { name: 'My Itinerary', path: '/itinerary', icon: CalendarDays },
    { name: 'My Budget', path: '/budget', icon: Wallet },
    { name: 'My Bookings', path: '/bookings', icon: TicketCheck },
    { name: 'Trip Support', path: '/support', icon: Headset },
    { name: 'Settings', path: '/settings', icon: SettingsIcon }
  ];

  const initials = userProfile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#0B1F33]/55 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        aria-label="Primary sidebar navigation"
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#0B1F33] text-slate-200 flex flex-col justify-between transition-all duration-200 border-r border-slate-800/90 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div>
          {/* Clean Brand Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
            <NavLink
              to="/"
              onClick={() => onClose && onClose()}
              className="flex items-center gap-3 min-w-0 focus-visible:outline-2 focus-visible:outline-[#14B8A6] rounded-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-[#14B8A6] flex items-center justify-center shrink-0">
                <Plane className="w-5 h-5 text-[#0B1F33] -rotate-45" />
              </div>
              {!isCollapsed && (
                <span className="text-lg font-extrabold text-white tracking-tight whitespace-nowrap shrink-0">
                  TripPilot AI
                </span>
              )}
            </NavLink>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation drawer"
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-[#14B8A6]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-144px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  title={isCollapsed ? item.name : undefined}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center ${
                      isCollapsed ? 'lg:justify-center px-3' : 'px-3.5'
                    } py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#14B8A6] ${
                      isActive
                        ? 'bg-[#14B8A6] text-[#0B1F33] font-bold'
                        : 'text-slate-300 font-medium hover:text-white hover:bg-[#102A43]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-[#102A43]/50">
            <NavLink
              to="/settings"
            onClick={() => onClose && onClose()}
            title={isCollapsed ? `${userProfile.name} · ${userProfile.homeCity}` : undefined}
            className={`flex items-center ${
              isCollapsed ? 'lg:justify-center p-1.5' : 'gap-3 p-2'
            } rounded-xl hover:bg-[#102A43] transition-colors focus-visible:outline-2 focus-visible:outline-[#14B8A6]`}
          >
            <div className="w-9 h-9 rounded-full bg-[#14B8A6] text-[#0B1F33] font-bold flex items-center justify-center text-xs shrink-0">
              {initials || 'TR'}
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">
                  {userProfile.name}
                </p>
                <p className="text-xs text-slate-300 truncate">
                  {userProfile.homeCity}
                </p>
              </div>
            )}
          </NavLink>
          <div className="px-2 pt-2">
            {!isCollapsed && <p className="px-1 text-[10px] uppercase tracking-wider text-slate-400">{currentUser?.username} · {currentUser?.role}</p>}
            <button type="button" onClick={() => { logout(); navigate('/login', { replace: true }); }} title={isCollapsed ? 'Log out' : undefined} className={`mt-2 w-full flex items-center ${isCollapsed ? 'lg:justify-center' : 'gap-2'} rounded-lg px-2 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white`}><LogOut className="w-4 h-4" />{!isCollapsed && 'Log out'}</button>
          </div>
        </div>
      </aside>
    </>
  );
}
