import React, { createContext, useContext, useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:8000'; 


  const register = async (userData) => {
    try {
      const response = await fetch(`${backendUrl}/register.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/profile');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Backend not available, saving registration data in local storage', error);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/profile');
    }
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
