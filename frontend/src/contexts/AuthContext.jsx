// src/contexts/AuthContext.jsx
import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // No authentication, just provide the context for components that expect it
  const authValues = {
    isAuthenticated: true, // Always true since we're removing login
    currentUser: { username: 'User' },
    logout: () => {}
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};