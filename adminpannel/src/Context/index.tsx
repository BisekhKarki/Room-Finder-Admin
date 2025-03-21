"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AppContextType {
  token: string;
  setToken: (state: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getToken = localStorage.getItem("Token");
    if (getToken) {
      setToken(getToken);
    }
  }, [token]);

  const values = { token, setToken, loading, setLoading };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }

  return context;
}
