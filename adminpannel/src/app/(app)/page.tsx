// "use client";

// import { useAppContext } from "@/Context";
// import { base_url } from "@/lib/Constants";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// interface Total {
//   totaApprovalLeft: number;
//   totalRooms: number;
//   totalUsers: number;
// }

// const Page = () => {
//   const [values, setValues] = useState<Total | null>(null);
//   const { token } = useAppContext();
//   const getTotals = async () => {
//     try {
//       const response = await fetch(`${base_url}/get/Total`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       if (response.status === 200) {
//         setValues(data.message);
//       }
//     } catch (error: unknown) {
//       if (error) {
//         toast.error(String(error));
//       }
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getTotals();
//     }
// }, [token]);

//   return (
//     <div className="mt-5 py-5 px-5 w-2/3">
//       <h1 className="font-bold text-2xl text-black">
//         Welcome To Admin Dashboard
//       </h1>
//       <div className="mt-10 flex gap-10 flex-wrap">
//         <div className="border border-gray-300 rounded-lg shadow-lg font-bold text-xl text-center py-10 px-16 cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ease-out">
//           <p>Total Users</p>
//           <p>{values && values.totalUsers}</p>
//         </div>
//         <div className="border border-gray-300 rounded-lg shadow-lg font-bold text-xl text-center py-10 px-16 cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ease-out">
//           <p>Landlords</p>
//           <p>{values && values.totalRooms}</p>
//         </div>
//         <div className="border border-gray-300 rounded-lg shadow-lg font-bold text-center text-xl py-10 px-16 cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ease-out">
//           <p>Tenants</p>
//           <p>{values && values.totaApprovalLeft}</p>
//         </div>
//         <div className="border border-gray-300 rounded-lg shadow-lg font-bold text-center text-xl py-10 px-16 cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ease-out">
//           <p>Total Rooms</p>
//           <p>{values && values.totaApprovalLeft}</p>
//         </div>
//         <div className="border border-gray-300 rounded-lg shadow-lg font-bold text-center text-xl py-10 px-16 cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ease-out">
//           <p>Pending Rooms</p>
//           <p>{values && values.totaApprovalLeft}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import { useAppContext } from "@/Context";
import { base_url } from "@/lib/Constants";
import { Bed, Clock, Home, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Users {
  Address: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Password: string;
  Phone: string;
  UserType: string;

  _id: string;
}

const Page = () => {
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalRooms, setTotalRooms] = useState<number>(0);
  const [totalPendingRooms, setTotalPendingRooms] = useState<number>(0);
  const [users, setUsers] = useState<Users[]>([]);
  const [tenant, setTenant] = useState<number>(0);
  const [landlord, setLandlord] = useState<number>(0);

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
        console.log(data.message);
        setUsers(data.message.users);
        setTotalUser(data.message.users.length);
        setTotalRooms(data.message.approvedRooms.length);
        setTotalPendingRooms(data.message.pendingRooms.length);
      }
    } catch (error: unknown) {
      if (error) {
        toast.error(String(error));
      }
    }
  };

  useEffect(() => {
    if (token) {
      getTotals();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (users) {
      const tenantUser = users.filter((p) => p.UserType === "Tenants").length;
      const landlordUsers = users.filter(
        (p) => p.UserType === "Landlord"
      ).length;
      setTenant(tenantUser);
      setLandlord(landlordUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your management portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {/* {values?.totalUsers ?? (
                  <span className="animate-pulse">...</span>
                )} */}
                <span className="animate-pulse">{totalUser}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Home className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Landlords</p>
              <p className="text-2xl font-bold text-gray-900">
                {/* {values?.totalRooms ?? (
                  <span className="animate-pulse">...</span>
                )} */}
                <span className="animate-pulse">{landlord}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tenants</p>
              <p className="text-2xl font-bold text-gray-900">
                {/* {values?.totaApprovalLeft ?? (
                  <span className="animate-pulse">...</span>
                )} */}
                <span className="animate-pulse">{tenant}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Bed className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">
                {/* {values?.totaApprovalLeft ?? (
                  <span className="animate-pulse">...</span>
                )} */}
                <span className="animate-pulse">{totalRooms}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Rooms</p>
              <p className="text-2xl font-bold text-gray-900">
                {/* {values?.totaApprovalLeft ?? (
                  <span className="animate-pulse">...</span>
                )} */}
                <span className="animate-pulse">{totalPendingRooms}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
