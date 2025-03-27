import React, { createContext, useState, useContext, useEffect } from 'react';
import { validateEmail, validatePassword, validateUsername } from '../utils/validation';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: false,
  error: null,
  validateForm: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate checking existing user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.username && !validateUsername(formData.username)) {
      errors.username = 'Username must be at least 3 characters';
    }

    return errors;
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate form data
      const formErrors = validateForm({ email, password });
      if (Object.keys(formErrors).length > 0) {
        throw new Error(Object.values(formErrors)[0]);
      }

      // Simulate checking against stored users
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = storedUsers.find(u => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Remove password before storing
      const { password: _, ...userWithoutPassword } = user;
      
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate form data
      const formErrors = validateForm(userData);
      if (Object.keys(formErrors).length > 0) {
        throw new Error(Object.values(formErrors)[0]);
      }

      // Retrieve existing users
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      // Check if email already exists
      if (storedUsers.some(u => u.email === userData.email)) {
        throw new Error('Email already registered');
      }

      // Create new user object
      const newUser = {
        ...userData,
        id: Date.now().toString(), // Simple unique ID
        registeredAt: new Date().toISOString()
      };

      // Store users
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      // Remove password before storing in user state
      const { password: _, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      loading,
      error,
      validateForm
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);