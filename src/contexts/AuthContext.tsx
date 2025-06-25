
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email?: string;
  displayName?: string;
  isAnonymous: boolean;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('zenwave_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate Firebase auth
    const newUser: User = {
      id: Date.now().toString(),
      email,
      displayName: email.split('@')[0],
      isAnonymous: false,
      isAdmin: email === 'admin@zenwave.com'
    };
    setUser(newUser);
    localStorage.setItem('zenwave_user', JSON.stringify(newUser));
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      displayName: displayName || email.split('@')[0],
      isAnonymous: false,
      isAdmin: false
    };
    setUser(newUser);
    localStorage.setItem('zenwave_user', JSON.stringify(newUser));
  };

  const signInAnonymously = async () => {
    const newUser: User = {
      id: 'anon_' + Date.now().toString(),
      isAnonymous: true,
      displayName: 'Guest User'
    };
    setUser(newUser);
    localStorage.setItem('zenwave_user', JSON.stringify(newUser));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('zenwave_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signIn,
      signUp,
      signInAnonymously,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};
