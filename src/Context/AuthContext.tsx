import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  email: string;
}


interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // { email } or null

  const login = (email:string) => {
    setUser({ email });
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userEmail');
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setUser({ email: savedEmail });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

