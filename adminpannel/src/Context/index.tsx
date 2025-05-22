"use client";

import { base_url } from "@/lib/Constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AppContextType {
  token: string;
  setToken: (state: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  checkToken: () => void;
  verified: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const checkToken = async () => {
    try {
      const response = await axios.get(`${base_url}/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (data && response.status === 200) {
        setVerified(true);
        return;
      }
      if (!verified) {
        router.push("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message || " Internal Server Error");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Internal Server Error");
      }
    }
  };

  useEffect(() => {
    const getToken = localStorage.getItem("Token");
    if (getToken) {
      setToken(getToken);
    }
  }, [token]);

  const values = { token, setToken, loading, setLoading, checkToken, verified };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }

  return context;
}
