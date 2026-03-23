'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useWallet } from '@/hooks/useWallet';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { connection, isConnected, connectWallet, disconnectWallet, isLoading } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isConnected);
  }, [isConnected]);

  const login = async () => {
    await connectWallet();
  };

  const logout = async () => {
    await disconnectWallet();
  };

  const value = {
    isAuthenticated,
    isLoading,
    user: connection,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}