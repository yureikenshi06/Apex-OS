import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth-provider';
import { Logo } from '@/components/shared/logo';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid h-dvh w-screen place-items-center bg-void" role="status" aria-label="Loading">
        <div className="animate-fade flex flex-col items-center gap-4">
          <Logo size={44} className="animate-pulse" />
          <span className="text-xs font-semibold text-fg-subtle">Loading Apex OS…</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
