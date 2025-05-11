import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://xzsqpebsioqpmosbomnz.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6c3FwZWJzaW9xcG1vc2JvbW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NjEwNzcsImV4cCI6MjA2MjQzNzA3N30.QDT3OrE7IIrDEowBQwPaVZJSjcF-naNHiSQlMxLYdIQ'
);

type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  preferences?: {
    language: string;
    darkMode: boolean;
    notifications: {
      email: boolean;
      app: boolean;
      results: boolean;
      appointments: boolean;
    };
  };
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (updates: Partial<User>) => Promise<void>;
};

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in Supabase session
    const session = supabase.auth.getSession();
    if (session) {
      // Get user data from database
      getUserData();
    }
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        getUserData();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setUser({
          id: user.id,
          name: profile.name,
          email: user.email!,
          profileImage: profile.profile_image,
          preferences: profile.preferences
        });
      }
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { data: { user: newUser }, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) throw error;
  if (newUser) {
  // Create profile in profiles table
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: newUser.id,
        name,
        email,
        profile_image: null,
        preferences: {
          language: 'en',
          darkMode: false,
          notifications: {
            email: true,
            app: true,
            results: true,
            appointments: true,
          },
        },
      },
    ]);
  if (profileError) throw profileError;
}

    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          profile_image: updates.profileImage,
          preferences: updates.preferences
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local user state
      setUser({ ...user, ...updates });
    } catch (error) {
      console.error('Update error:', error);
      throw new Error('Failed to update user');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};