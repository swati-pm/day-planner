import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from './LoginPage';
import type { ProtectedRouteProps } from '../types';

export default function ProtectedRoute({ 
  children, 
  fallback 
}: ProtectedRouteProps): React.ReactElement {
  const { authState } = useAuth();

  // Show loading screen while checking authentication
  if (authState.isLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-content">
          <div className="loading-spinner"></div>
          <h2>Day Planner</h2>
          <p>Loading your workspace...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!authState.isAuthenticated) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <LoginPage />
    );
  }

  // Render protected content
  return <>{children}</>;
}

