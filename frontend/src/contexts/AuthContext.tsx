import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCurrentUser, logoutUser as apiLogout } from '@/services/authService';

export type AuthState = 'checking' | 'unauthenticated' | 'authenticated';

export interface User {
  id: string;
  uid?: string;
  email: string;
  role?: string;
  name?: string;
  profileCompleted?: boolean;
  onboardingCompleted?: boolean;
  onboardingProgress?: number;
  activity?: any[];
  travelerProfile?: any;
  organizationProfile?: any;
  guideProfile?: any;
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
  checkAuth: () => Promise<User | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>('checking');
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async (): Promise<User | null> => {
    setAuthState('checking');
    try {
      const userData = await fetchCurrentUser();
      setUser(userData);
      setAuthState('authenticated');
      return userData;
    } catch (error) {
      setUser(null);
      setAuthState('unauthenticated');
      return null;
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
