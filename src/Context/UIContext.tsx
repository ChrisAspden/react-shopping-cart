import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  showLogin: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  showSignup: boolean;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const closeLogin = () => setShowLogin(false);

  return (
    <UIContext.Provider
      value={{ showLogin, openLogin, closeLogin, showSignup, setShowSignup }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
};

