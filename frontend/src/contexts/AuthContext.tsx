import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCurrentUser, logoutUser as apiLogout } from '@/services/authService';

export type AuthState = 'checking' | 'unauthenticated' | 'authenticated';

export interface User {
  id: string;
  email: string;
  role?: string;
  name?: string;
  profileCompleted?: boolean;
  onboardingCompleted?: boolean;
  socialLinks?: {
    instagramUsername?: string | null;
    instagramProfileUrl?: string | null;
    isInstagramLinked?: boolean;
  };
  gender?: string | null;
  dateOfBirth?: string | null;
  residentialAddress?: string | null;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

interface AuthContextType {
  authState: AuthState;
  user: User | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>('checking');
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    setAuthState('checking');
    try {
      const userData = await fetchCurrentUser();
      setUser(userData);
      setAuthState('authenticated');
    } catch (error) {
      setUser(null);
      setAuthState('unauthenticated');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    await apiLogout();
    setUser(null);
    setAuthState('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ authState, user, checkAuth, logout }}>
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
