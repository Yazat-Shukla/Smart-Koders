import React, { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Activity, BarChart3, CalendarDays, LayoutDashboard, LogOut, Map, Plane, Settings, Users, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const demoUsers = [
  { id: 'user_001', username: 'user', name: 'Demo User', role: 'user', email: 'user@trippilot.example', city: 'Jodhpur' },
  { id: 'user_002', username: 'anotheruser', name: 'Another Traveller', role: 'user', email: 'traveller@trippilot.example', city: 'Singapore' }
];
export const demoTrips = [
  { id: 'TR-1042', username: 'user', destination: 'Bali, Indonesia', dates: '14–19 Oct 2026', budget: 180000, status: 'Planning' },
  { id: 'TR-1043', username: 'user', destination: 'Goa, India', dates: '20–24 Nov 2026', budget: 65000, status: 'Confirmed' },
  { id: 'TR-2091', username: 'anotheruser', destination: 'Kyoto, Japan', dates: '3–9 Apr 2027', budget: 220000, status: 'Planning' }
];
export const demoBookings = [
  { id: 'BK-8901', username: 'user', item: 'Bali return flights', type: 'Flight', amount: 62400, status: 'Confirmed' },
  { id: 'BK-8902', username: 'user', item: 'Maya Ubud Resort', type: 'Hotel', amount: 49000, status: 'Confirmed' },
  { id: 'BK-9921', username: 'anotheruser', item: 'Kyoto city hotel', type: 'Hotel', amount: 78500, status: 'Pending' }
];
const demoItineraries = [
  { username: 'user', destination: 'Bali, Indonesia', days: 6, activities: 18, updated: 'Today' },
  { username: 'user', destination: 'Goa, India', days: 5, activities: 12, updated: 'Yesterday' },
  { username: 'anotheruser', destination: 'Kyoto, Japan', days: 7, activities: 21, updated: '2 days ago' }
];
const links = [
  ['Admin Dashboard', '/admin', LayoutDashboard], ['Manage Users', '/admin/users', Users],
  ['All Trips', '/admin/trips', Map], ['All Bookings', '/admin/bookings', CalendarDays],
  ['Travel Analytics', '/admin/analytics', BarChart3], ['Settings', '/admin/settings', Settings]
];
const titleFor = (path) => links.find(([, href]) => href === path)?.[0] || 'Admin Dashboard';
const money = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

export function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  return <div className="min-h-screen bg-[#F5F8FC] lg:flex">
    <aside className="bg-[#0B1F33] text-white lg:fixed lg:inset-y-0 lg:w-64 flex flex-col">
      <div className="h-16 px-5 flex items-center gap-3 border-b border-white/10"><span className="w-9 h-9 rounded-xl bg-[#14B8A6] grid place-items-center text-[#0B1F33]"><Plane className="w-5 h-5 -rotate-45" /></span><b>TripPilot <span className="text-teal-300">Admin</span></b></div>
      <nav className="flex-1 p-3 space-y-1">{links.map(([label, path, Icon]) => <NavLink key={path} to={path} end={path === '/admin'} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold ${isActive ? 'bg-[#14B8A6] text-[#0B1F33]' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}><Icon className="w-4 h-4" />{label}</NavLink>)}</nav>
      <div className="p-4 border-t border-white/10"><p className="text-sm font-semibold">{currentUser.name}</p><p className="text-xs text-slate-400">Administrator</p><button onClick={() => { logout(); navigate('/login', { replace: true }); }} className="mt-4 flex items-center gap-2 text-sm text-slate-300 hover:text-white"><LogOut className="w-4 h-4" />Log out</button></div>
    </aside>
    <div className="flex-1 lg:ml-64"><header className="h-16 bg-white border-b border-slate-200 px-5 sm:px-8 flex justify-between items-center"><div><span className="text-xs text-slate-500">TripPilot AI / Admin</span><h1 className="font-bold text-[#102A43]">{titleFor(useLocation().pathname)}</h1></div><span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800">ADMIN · {currentUser.username}</span></header><main className="p-4 sm:p-8 max-w-7xl mx-auto"><Outlet /></main><footer className="px-8 py-5 text-xs text-slate-500">Demonstration analytics · Frontend only</footer></div>
  </div>;
}

export function AdminPage({ page = 'overview' }) {
  const [query, setQuery] = useState('');
  const filteredUsers = useMemo(() => demoUsers.filter((u) => `${u.username} ${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const pageTitle = { overview: 'Application overview', users: 'Registered users', trips: 'All trips', bookings: 'All bookings', analytics: 'Travel analytics', settings: 'Admin settings' }[page];
  const stats = [['Registered users', '3', '2 traveller accounts'], ['Trips created', '3', 'Across all users'], ['Total bookings', '3', '2 confirmed'], ['Estimated expenditure', money(465000), 'Combined trip budgets']];
  const table = (headers, rows) => <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{headers.map((h) => <th key={h} className="px-5 py-3.5">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row, i) => <tr key={i} className="text-slate-700">{row.map((cell, j) => <td key={j} className="px-5 py-4">{cell}</td>)}</tr>)}</tbody></table></div>;
  const userRows = filteredUsers.map((u) => [<><b>{u.name}</b><div className="text-xs text-slate-500">{u.id}</div></>, <span className="font-semibold">@{u.username}</span>, u.email, u.city, <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">User</span>]);
  const tripRows = demoTrips.map((t) => [t.id, t.username, t.destination, t.dates, money(t.budget), t.status]);
  const bookingRows = demoBookings.map((b) => [b.id, b.username, b.item, b.type, money(b.amount), b.status]);
  return <div className="space-y-7"><div><p className="text-sm text-slate-500">Administrator workspace</p><h2 className="mt-1 text-2xl font-extrabold text-[#102A43]">{pageTitle}</h2></div>
    {(page === 'overview' || page === 'analytics') && <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value, note], i) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex justify-between"><p className="text-sm font-semibold text-slate-500">{label}</p>{[Users, Map, CalendarDays, Wallet].map((I, j) => i === j && <I key={j} className="h-4 w-4 text-teal-700" />)}</div><p className="mt-3 text-2xl font-extrabold text-[#102A43]">{value}</p><p className="mt-1 text-xs text-slate-500">{note}</p></div>)}</div>}
    {(page === 'overview' || page === 'analytics') && <div className="grid gap-5 lg:grid-cols-2"><section className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold">Activity overview</h3><div className="mt-5 space-y-4 text-sm">{[['New trip planned', 'user · Bali, Indonesia', 'Today'], ['Booking confirmed', 'user · Return flights', 'Yesterday'], ['New user registered', 'anotheruser', '2 days ago']].map(([a,b,c])=><div key={a} className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-teal-500"/><div className="flex-1"><p className="font-semibold text-slate-800">{a}</p><p className="text-xs text-slate-500">{b}</p></div><span className="text-xs text-slate-400">{c}</span></div>)}</div></section><section className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold">Trip budget distribution</h3><div className="mt-5 space-y-4">{[['International trips', 78], ['Domestic trips', 44], ['Bookings confirmed', 66]].map(([label, n])=><div key={label}><div className="mb-1.5 flex justify-between text-xs"><span className="font-medium">{label}</span><span className="text-slate-500">{n}%</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-500" style={{ width: `${n}%` }} /></div></div>)}</div></section></div>}
    {(page === 'overview' || page === 'users') && <section className="space-y-4"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h3 className="font-bold">User profiles</h3><p className="text-xs text-slate-500">Demo accounts visible to administrators.</p></div><input aria-label="Search users" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by username or name" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-teal-500" /></div>{table(['User', 'Username', 'Email', 'City', 'Role'], userRows)}</section>}
    {(page === 'overview' || page === 'trips') && <section className="space-y-4"><div><h3 className="font-bold">{page === 'trips' ? 'All user trips' : 'Recent trips'}</h3><p className="text-xs text-slate-500">Trip ownership and budget overview.</p></div>{table(['Trip', 'Owner', 'Destination', 'Dates', 'Budget', 'Status'], tripRows)}</section>}
    {(page === 'overview' || page === 'analytics' || page === 'trips') && <section className="space-y-4"><div><h3 className="font-bold">All user itineraries</h3><p className="text-xs text-slate-500">Itinerary activity by account.</p></div>{table(['Owner', 'Destination', 'Days', 'Activities', 'Last updated'], demoItineraries.map((it) => [it.username, it.destination, it.days, it.activities, it.updated]))}</section>}
    {(page === 'overview' || page === 'analytics' || page === 'trips') && <section className="space-y-4"><div><h3 className="font-bold">Budget summaries</h3><p className="text-xs text-slate-500">Estimated trip budgets across all demonstration accounts.</p></div>{table(['Owner', 'Trip', 'Estimated budget', 'Estimated spend', 'Remaining'], demoTrips.map((t, i) => { const spent = [134500, 22100, 82500][i]; return [t.username, t.destination, money(t.budget), money(spent), money(t.budget - spent)]; }))}</section>}
    {(page === 'overview' || page === 'bookings') && <section className="space-y-4"><div><h3 className="font-bold">{page === 'bookings' ? 'All user bookings' : 'Recent bookings'}</h3><p className="text-xs text-slate-500">Demonstration booking records.</p></div>{table(['Reference', 'Owner', 'Item', 'Type', 'Amount', 'Status'], bookingRows)}</section>}
    {page === 'settings' && <section className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="font-bold">Administration settings</h3><p className="mt-2 text-sm text-slate-600">This demonstration dashboard uses static sample data. Connect server-side authentication and authorization before production use.</p><div className="mt-5 flex items-center gap-2 rounded-xl bg-amber-50 p-4 text-sm text-amber-900"><Activity className="h-4 w-4" />Frontend role checks are not a security boundary.</div></section>}
  </div>;
}
