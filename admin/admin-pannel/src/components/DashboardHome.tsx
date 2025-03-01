"use client";

import { useAppContext } from "@/Context";
import { base_url } from "@/lib/Constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Total {
  totaApprovalLeft: number;
  totalRooms: number;
  totalUsers: number;
}

const DashboardHome = () => {
  const [values, setValues] = useState<Total | null>(null);
  const { token } = useAppContext();
  const getTotals = async () => {
    try {
      const response = await fetch(`${base_url}/get/Total`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setValues(data.message);
      }
    } catch (error: any) {
      if (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      getTotals();
    }
  }, [token]);

  console.log(values);

  return (
    <div className="mt-5 py-5 px-5 w-2/3">
      <h1 className="font-bold text-2xl text-black">
        Welcome To Admin Dashboard
      </h1>
      <div className="mt-10 flex gap-10">
        <div className="border border-gray-300 rounded-lg shadow-lg font-bold text-xl text-center py-10 px-16 cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ease-out">
          <p>Total Users</p>
          <p>{values && values.totalUsers}</p>
        </div>
        <div className="border border-gray-300 rounded-lg shadow-lg font-bold text-xl text-center py-10 px-16 cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ease-out">
          <p>Total Rooms</p>
          <p>{values && values.totalRooms}</p>
        </div>
        <div className="border border-gray-300 rounded-lg shadow-lg font-bold text-xl text-center text-xl py-10 px-16 cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ease-out">
          <p>Pending Rooms</p>
          <p>{values && values.totaApprovalLeft}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
