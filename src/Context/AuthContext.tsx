import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: number;
  email: string;
}


interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  user: User | null;
  login: (id: number, email: string) => void;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // { email } or null

  const login = (id:number, email:string) => {
    setUser({ id,email });
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userId', String(id));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userEmail');
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const savedId = localStorage.getItem('userId');
    if (savedEmail && savedId) {
      setUser({ id:Number(savedId), email: savedEmail });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

