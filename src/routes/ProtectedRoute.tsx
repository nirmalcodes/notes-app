import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
