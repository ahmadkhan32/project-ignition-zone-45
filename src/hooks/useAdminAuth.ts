import { useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  username: string;
}

export const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = () => {
      try {
        const storedAdmin = localStorage.getItem('admin_user');
        if (storedAdmin) {
          const admin = JSON.parse(storedAdmin);
          setAdminUser(admin);
        }
      } catch (error) {
        console.error('Error parsing admin user:', error);
        localStorage.removeItem('admin_user');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('admin_user');
    setAdminUser(null);
  };

  const isAuthenticated = !!adminUser;

  return {
    adminUser,
    loading,
    isAuthenticated,
    logout
  };
};