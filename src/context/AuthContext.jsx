import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultMockUser } from '../mocks/mockUser';

const AuthContext = createContext(null);

const STORAGE_KEY = 'ai_resume_auth_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultMockUser; // pre-populated with default mock user for smooth preview, or user can log out
    } catch (e) {
      return defaultMockUser;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state with localStorage', e);
    }
  }, [user]);

  const login = async (email, password) => {
    setIsLoading(true);
    // Simulate realistic network latency
    await new Promise((res) => setTimeout(res, 600));

    // Simple mock validation rule: accept any valid format, reject if password is 'wrongpassword'
    if (password === 'wrongpassword') {
      setIsLoading(false);
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    const loggedInUser = {
      ...defaultMockUser,
      email: email,
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Alex Johnson',
    };

    setUser(loggedInUser);
    setIsLoading(false);
    return loggedInUser;
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 700));

    const newUser = {
      ...defaultMockUser,
      id: `usr_${Date.now()}`,
      name: name,
      email: email,
    };

    setUser(newUser);
    setIsLoading(false);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
