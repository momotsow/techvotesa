import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
}

export default ProtectedRoute;
