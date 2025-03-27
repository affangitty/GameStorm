import React, { createContext, useContext } from 'react';
import { useAdmin } from '../hooks/useAdmin';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const adminContext = useAdmin();

  return (
    <AdminContext.Provider value={adminContext}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};