"use client";

import DashboardHome from "@/components/DashboardHome";
import Landlord from "@/components/Landlord";
import PendingRooms from "@/components/PendingRooms";
import Rooms from "@/components/Rooms";
import Sidebar from "@/components/Sidebar";
import Tenants from "@/components/Tenants";
import User from "@/components/User";
import { useAppContext } from "@/Context";
import { base_url } from "@/lib/Constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [getToken, setGetToken] = useState<string>("");
  const router = useRouter();

  const { index } = useAppContext();

  useEffect(() => {
    const getUserToken = localStorage.getItem("Token");
    if (getUserToken) {
      // const validToken = getUserToken;
      setGetToken(getUserToken);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (getToken) {
      fetchDetails();
    }
  }, [getToken]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${base_url}/getuser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });

      const data = response.data;
      if (data && response.status === 200) {
        setUser(data.message);
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

  return (
    <div className="flex h-screen gap-20">
      <Sidebar details={user} />
      {index === 1 && <DashboardHome />}
      {index === 2 && <User />}
      {index === 3 && <Tenants />}

      {index === 4 && <Landlord />}
      {index === 5 && <Rooms />}
      {index === 6 && <PendingRooms />}
    </div>
  );
}
