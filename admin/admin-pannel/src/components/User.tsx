"use client";
import { useAppContext } from "@/Context";
import { base_url } from "@/lib/Constants";
import axios from "axios";
import { PencilIcon, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Circles } from "react-loader-spinner";

const User = () => {
  const [user, setUser] = useState<Array<any> | null>([]);
  const { token, loading, setLoading } = useAppContext();

  useEffect(() => {
    if (token) {
      fetchDetails();
    }
  }, [token]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/user/all/details`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (data && response.status === 200) {
        setUser(data.message);
        setLoading(false);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message || " Internal Server Error");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Internal Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(user);

  if (loading) {
    return (
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  }

  return (
    <div className="flex justify-center items-center py-5">
      <div className="w-full ">
        {
          <div className="border overflow-x-visible shadow-lg sm:rounded-lg overflow-y-scroll">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th className="px-6 py-3 ">S.N</th>
                  <th className="px-6 py-3 "> First Name</th>
                  <th className="px-6 py-3 ">Last Name</th>
                  <th className="px-6 py-3 ">Email</th>
                  <th className="px-6 py-3 ">Phone </th>
                  <th className="px-6 py-3 ">User Type</th>
                  <th className="px-6 py-3 ">Action</th>
                </tr>
              </thead>
              <tbody>
                {user && user.length > 0 ? (
                  <>
                    {user.map((u, index) => (
                      <tr
                        key={index}
                        className="border-b bg-white hover:bg-gray-50"
                      >
                        <td className="py-4 px-6">{index + 1}</td>
                        <td className="py-4 px-6">{u.FirstName}</td>
                        <td className="py-4 px-6">{u.LastName}</td>
                        <td className="py-4 px-6">{u.Email}</td>
                        <td className="py-4 px-6">{u.Phone}</td>
                        <td className="py-4 px-6">{u.UserType}</td>
                        <td className="flex items-center justify-center py-5 gap-5">
                          <PencilIcon className="cursor-pointer" />
                          <Trash className="text-red-600 cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td className="py-4 px-6 text-center" colSpan={6}>
                      No Users Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default User;
