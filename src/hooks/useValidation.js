import { useState, useCallback } from 'react';
import { 
  validateEmail, 
  validatePassword, 
  validateUsername,
  validatePhoneNumber,
  validateCreditCard 
} from '../utils/validation';

export const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value) 
          ? null 
          : 'Please enter a valid email address';
      
      case 'password':
        return validatePassword(value)
          ? null
          : 'Password must be at least 6 characters long';
      
      case 'username':
        return validateUsername(value)
          ? null
          : 'Username must be at least 3 characters long';
      
      case 'phone':
        return validatePhoneNumber(value)
          ? null
          : 'Please enter a valid phone number';
      
      case 'creditCard':
        return validateCreditCard(value)
          ? null
          : 'Please enter a valid credit card number';
      
      default:
        return value ? null : `${name} is required`;
    }
  }, []);

  const validateForm = useCallback((formData) => {
    const newErrors = {};

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const handleFieldValidation = useCallback((name, value) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    return !error;
  }, [validateField]);

  return {
    errors,
    validateForm,
    validateField: handleFieldValidation,
    clearErrors
  };
};