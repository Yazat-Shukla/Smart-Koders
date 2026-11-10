import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import Assistant from './pages/Assistant';
import Explore from './pages/Explore';
import FlightsHotels from './pages/FlightsHotels';
import Itinerary from './pages/Itinerary';
import Budget from './pages/Budget';
import Bookings from './pages/Bookings';
import Support from './pages/Support';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { AdminLayout, AdminPage } from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';

function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return <TripProvider key="trip-data"><div className="min-h-screen bg-[#F5F8FC] flex flex-col">
    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isCollapsed={sidebarCollapsed} />
    <div className={`flex flex-col flex-1 min-h-screen transition-all duration-200 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8"><Outlet /></main>
      <footer className="py-4 px-6 border-t border-slate-200/80 bg-white/60 text-xs text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-2"><span>TripPilot AI — Your intelligent travel companion.</span><span>Simulated travel planning demonstration · Estimates in INR (₹)</span></footer>
    </div>
    <Toast />
  </div></TripProvider>;
}

function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route element={<ProtectedRoute role="user"><UserLayout /></ProtectedRoute>}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/assistant" element={<Assistant />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/flights-hotels" element={<FlightsHotels />} />
      <Route path="/itinerary" element={<Itinerary />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/support" element={<Support />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
    <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
      <Route index element={<AdminPage />} />
      <Route path="users" element={<AdminPage page="users" />} />
      <Route path="trips" element={<AdminPage page="trips" />} />
      <Route path="bookings" element={<AdminPage page="bookings" />} />
      <Route path="analytics" element={<AdminPage page="analytics" />} />
      <Route path="settings" element={<AdminPage page="settings" />} />
    </Route>
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>;
}

export default function App() {
  return <AuthProvider><BrowserRouter><AppRoutes /></BrowserRouter></AuthProvider>;
}
