import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserDataContext } from './UserContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserDataContext);

  // Wait for auth check to complete
  if (loading) return <div>Loading...</div>;

  // Not logged in
  if (!user || !user.email) {
    return <Navigate to="/userlogin" replace />;
  }

  return children;
};
