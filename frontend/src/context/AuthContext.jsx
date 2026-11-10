import React, { createContext, useContext, useMemo, useState } from 'react';

// Frontend-only demo authentication. Replace this provider with API-backed
// sessions when the FastAPI authentication endpoints are available.
const AuthContext = createContext(null);
const DEMO_ACCOUNTS = {
  admin: { id: 'admin_001', username: 'admin', name: 'TripPilot Administrator', role: 'admin', password: '123' },
  user: { id: 'user_001', username: 'user', name: 'Demo User', role: 'user', password: '321' }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('tripPilot_session') || 'null');
    } catch {
      return null;
    }
  });

  const login = async (username, password, remember = false) => {
    const account = DEMO_ACCOUNTS[username.trim().toLowerCase()];
    if (!account || account.password !== password) return { success: false, message: 'Incorrect username or password.' };
    const session = { id: account.id, username: account.username, name: account.name, role: account.role };
    setCurrentUser(session);
    sessionStorage.setItem('tripPilot_session', JSON.stringify(session));
    if (remember) localStorage.setItem('tripPilot_rememberedUser', account.username);
    else localStorage.removeItem('tripPilot_rememberedUser');
    return { success: true, user: session };
  };

  const logout = () => {
    sessionStorage.removeItem('tripPilot_session');
    setCurrentUser(null);
  };

  const value = useMemo(() => ({
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isAdmin: currentUser?.role === 'admin',
    login,
    logout
  }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
