import React, { useState } from 'react';
import { Eye, EyeOff, Plane, ShieldCheck, Sparkles } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState(() => localStorage.getItem('tripPilot_rememberedUser') || '');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(Boolean(localStorage.getItem('tripPilot_rememberedUser')));
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} replace />;

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    const result = await login(username, password, remember);
    setLoading(false);
    if (!result.success) return setError(result.message);
    const requestedPath = location.state?.from?.pathname;
    navigate(requestedPath?.startsWith('/admin') && result.user.role !== 'admin' ? '/dashboard' : (result.user.role === 'admin' ? '/admin' : '/dashboard'), { replace: true });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#0B1F33]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33]/90 via-[#102A43]/75 to-[#0F766E]/50" />
      <div className="relative w-full max-w-5xl min-h-[620px] overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl grid md:grid-cols-[1.05fr_.95fr] animate-[fade-in_.5s_ease-out]">
        <section className="hidden md:flex flex-col justify-between p-12 text-white">
          <a href="/login" className="inline-flex items-center gap-3 text-xl font-extrabold"><span className="w-11 h-11 rounded-2xl bg-[#14B8A6] flex items-center justify-center text-[#0B1F33]"><Plane className="w-6 h-6 -rotate-45" /></span>TripPilot AI</a>
          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold"><Sparkles className="w-4 h-4 text-teal-300" /> Your intelligent travel companion</span>
            <h1 className="mt-7 text-5xl font-extrabold leading-tight text-white">Go further.<br /><span className="text-teal-300">Travel smarter.</span></h1>
            <p className="mt-5 text-base leading-7 text-white/80">Plan meaningful journeys with one calm, intelligent travel workspace.</p>
          </div>
          <p className="text-xs text-white/65">A frontend demonstration · Secure access is simulated</p>
        </section>
        <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-12">
          <div className="w-full max-w-sm">
            <div className="md:hidden mb-8 flex items-center gap-3 text-lg font-extrabold text-[#102A43]"><span className="w-10 h-10 rounded-xl bg-[#14B8A6] flex items-center justify-center"><Plane className="w-5 h-5 -rotate-45" /></span>TripPilot AI</div>
            <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#0F766E]">Welcome aboard</p><h2 className="mt-2 text-3xl font-extrabold">Sign in to TripPilot</h2><p className="mt-2 text-sm text-slate-500">Your next great trip starts here.</p></div>
            <form onSubmit={submit} className="space-y-5">
              <div><label htmlFor="username" className="mb-1.5 block text-sm font-semibold text-[#172B4D]">Username</label><input id="username" autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-teal-100" placeholder="Enter your username" /></div>
              <div><label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-[#172B4D]">Password</label><div className="relative"><input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-teal-100" placeholder="Enter your password" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 px-4 text-slate-500">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
              <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 accent-[#0F766E]" />Remember username</label>
              {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#102A43]/15 transition hover:bg-[#0F766E] disabled:opacity-70">{loading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Signing in…</> : 'Sign in'}</button>
            </form>
            <div className="mt-7 rounded-2xl border border-slate-100 bg-slate-50 p-4"><p className="mb-3 flex items-center gap-2 text-xs font-bold text-[#102A43]"><ShieldCheck className="h-4 w-4 text-[#0F766E]" />Demo access</p><div className="grid grid-cols-2 gap-3 text-xs text-slate-600"><p><b className="block text-[#102A43]">Admin</b>admin / 123</p><p><b className="block text-[#102A43]">Traveller</b>user / 321</p></div></div>
            <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">Demo credentials are for frontend presentation only. This login does not provide production security.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
