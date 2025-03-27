import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export const useAuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  const { login, register, loading, error } = useAuth();

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) 
      newErrors.email = 'Email is invalid';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) 
      newErrors.password = 'Password must be at least 6 characters';

    if (username && username.length < 3) 
      newErrors.username = 'Username must be at least 3 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password, username]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(email, password);
      } catch (err) {
        console.error('Login failed', err);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(username, email, password);
      } catch (err) {
        console.error('Registration failed', err);
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    errors,
    loading,
    error,
    handleLogin,
    handleRegister
  };
};