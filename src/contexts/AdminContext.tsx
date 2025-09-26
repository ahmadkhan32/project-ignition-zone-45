import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminUser: any;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const savedAdmin = localStorage.getItem('evolutionev_admin');
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin);
        setAdminUser(adminData);
        setIsAdminLoggedIn(true);
      } catch (error) {
        localStorage.removeItem('evolutionev_admin');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await (supabase as any)
        .from('admin_users')
        .select('id, username')
        .eq('username', username)
        .eq('password_hash', `crypt('${password}', password_hash)`)
        .single();

      if (error || !data) {
        return false;
      }

      setAdminUser(data);
      setIsAdminLoggedIn(true);
      localStorage.setItem('evolutionev_admin', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAdminUser(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('evolutionev_admin');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};