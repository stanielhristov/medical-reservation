import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredRoles = [], 
  fallbackPath = '/login' 
}) => {
  const { user, loading, hasRole } = useAuth();
  const isAuthenticated = !!user;
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  if (requiredRole || requiredRoles.length > 0) {
    const hasRequiredRole = requiredRole 
      ? hasRole(requiredRole)
      : requiredRoles.some(role => hasRole(role));

    if (!hasRequiredRole) {
      
      if (hasRole('ADMIN')) {
        return <Navigate to="/admin/dashboard" replace />;
      } else if (hasRole('DOCTOR')) {
        return <Navigate to="/doctor/dashboard" replace />;
      } else {
        return <Navigate to="/patient/dashboard" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;
