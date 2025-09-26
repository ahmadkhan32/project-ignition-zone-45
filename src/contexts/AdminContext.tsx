import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { setupAdminUser } from '@/lib/setupAdmin';

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
    const initializeAdmin = async () => {
      // Setup admin user if needed
      await setupAdminUser();
      
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
    };

    initializeAdmin();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Check for brute force attempts
      const clientIP = '127.0.0.1'; // In production, get real client IP
      
      const { data: canAttempt } = await (supabase as any).rpc('check_login_attempts', {
        ip_addr: clientIP,
        username_input: username
      });

      if (!canAttempt) {
        console.error('Too many failed login attempts. Please try again later.');
        return false;
      }

      // Verify password using secure function
      const { data, error } = await (supabase as any).rpc('verify_admin_password', {
        username_input: username,
        password_input: password
      });

      const success = data && data.length > 0;

      // Log the attempt
      await (supabase as any).rpc('log_login_attempt', {
        ip_addr: clientIP,
        username_input: username,
        success_flag: success
      });

      if (!success) {
        return false;
      }

      const adminData = data[0];
      setAdminUser(adminData);
      setIsAdminLoggedIn(true);
      localStorage.setItem('evolutionev_admin', JSON.stringify(adminData));
      
      // Set session timeout (30 minutes)
      setTimeout(() => {
        logout();
      }, 30 * 60 * 1000);
      
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