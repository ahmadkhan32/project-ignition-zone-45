import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, phone: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithOAuth: (provider: 'google' | 'github' | 'facebook') => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  sendOTP: (phone: string) => Promise<{ error: AuthError | null }>;
  verifyOTP: (phone: string, token: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, phone: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            phone,
            full_name: fullName,
          }
        }
      });

      // If registration successful, create user profile in database
      if (data.user && !error) {
        try {
          // Try to create user profile - this will work once the table is created
          const { error: profileError } = await supabase
            .from('user_profiles' as any)
            .insert([
              {
                id: data.user.id,
                email: email,
                full_name: fullName,
                phone: phone,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ]);

          if (profileError) {
            console.log('Profile creation error (non-critical):', profileError);
            console.log('Note: user_profiles table may not exist yet. Run the SQL migration to create it.');
            // Don't fail registration if profile creation fails
          }
        } catch (profileError) {
          console.log('Profile creation error (non-critical):', profileError);
          console.log('Note: user_profiles table may not exist yet. Run the SQL migration to create it.');
          // Don't fail registration if profile creation fails
        }
      }

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signInWithOAuth = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const sendOTP = async (phone: string) => {
    try {
      // Use our custom API endpoint for SMS OTP
      const response = await fetch('/api/sendSMSOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { error: { message: data.error || 'Failed to send OTP' } as AuthError };
      }

      return { error: null };
    } catch (error) {
      return { error: { message: 'Network error' } as AuthError };
    }
  };

  const verifyOTP = async (phone: string, token: string) => {
    try {
      // Use our custom API endpoint for OTP verification
      const response = await fetch('/api/verifySMSOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phone, otp: token }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { error: { message: data.error || 'Invalid OTP' } as AuthError };
      }

      // If OTP is verified, we can create a session or redirect to login
      return { error: null };
    } catch (error) {
      return { error: { message: 'Network error' } as AuthError };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    resetPassword,
    sendOTP,
    verifyOTP,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
