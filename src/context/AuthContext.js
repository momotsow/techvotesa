import React, { createContext, useContext, useState } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email) {
      if (bcrypt.compareSync(password, storedUser.password)) {
        setUser(storedUser);
        return true;
      } else {
        return 'Incorrect password.';
      }
    } else {
      return 'No user found with this email address.';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const resetPassword = async (email, newPassword) => {
    if (user && user.email === email) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateProfile = async (profileData) => {
    
      setUser(profileData);
      localStorage.setItem('user', JSON.stringify(profileData));
    
  };

  const value = {
    user,
    register,
    login,
    logout,
    resetPassword, 
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
