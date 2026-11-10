import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  if (role === 'admin' && !isAdmin) return <Navigate to="/dashboard" replace />;
  if (role === 'user' && isAdmin) return <Navigate to="/admin" replace />;
  return children;
}
