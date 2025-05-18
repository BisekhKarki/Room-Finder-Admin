"use client";
import { useAppContext } from "@/Context";
import { base_url } from "@/lib/Constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Circles } from "react-loader-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface Property {
  basic: {
    name: string;
    type: string;
    description: string;
    price: string;
  };
  contact: {
    username: string;
    email: string;
    phone: string;
  };
  features: {
    parking: string;
    balcony: string;
    category: string;
    direction: string;
    floor: string;
  };
  images: string[];
  isVerified: boolean;
  landlordId: string;
  location: {
    street: string;
    zip: string;
    city: string;
    landmark: string;
    region: string;
  };
  payment: boolean;
  __v: number;
  _id: string;
}

const Page = () => {
  const [rooms, setRooms] = useState<Array<Property> | null>([]);
  const { token, loading, setLoading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      fetchDetails();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/room/all/approve`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      console.log(data);
      if (data && response.status === 200) {
        setRooms(data.message);
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

  const ApproveRooms = async (id: string) => {
    if (!token) {
      return toast.error("No Token provided");
    }
    setLoading(true);
    console.log(id);
    try {
      const response = await axios.patch(
        `${base_url}/room/verify/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);
      if (data && response.status === 200) {
        setLoading(false);
        toast.success(data.message);
        router.push("/Rooms");

        return;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
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
    <div className="flex justify-center items-center py-2">
      <div className="w-full">
        {
          <div className="border overflow-x-visible shadow-lg sm:rounded-lg overflow-y-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">S.N.</TableHead>
                  <TableHead className="">Room</TableHead>
                  <TableHead className="">Price</TableHead>
                  <TableHead className="text-center ">Email</TableHead>
                  <TableHead className="text-center ">Phone</TableHead>
                  <TableHead className="text-center ">Username</TableHead>
                  <TableHead className="text-center ">Payment</TableHead>
                  <TableHead className="text-center ">Verified</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms && rooms.length > 0 ? (
                  <>
                    {rooms.map((r, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium border-r-2">
                          {index + 1}
                        </TableCell>
                        <TableCell className="border-r-2">
                          {r.basic.name}
                        </TableCell>
                        <TableCell className="border-r-2">
                          {r.basic.price}
                        </TableCell>
                        <TableCell className="text-center border-r-2">
                          {r.contact.email}
                        </TableCell>
                        <TableCell className="text-center border-r-2">
                          {r.contact.phone}
                        </TableCell>
                        <TableCell className="text-center border-r-2">
                          {r.contact.username}
                        </TableCell>
                        <TableCell className="border-r-2">
                          {r.payment ? "Done" : "No payment"}
                        </TableCell>
                        <TableCell className="border-r-2">
                          {r.isVerified ? "Yes" : "No"}
                        </TableCell>
                        <TableCell className="flex flex-col gap-2">
                          {r.isVerified && r.payment ? (
                            <button
                              className="bg-red-600 px-2 py-1 text-white rounded-md text-base  shadow-xl"
                              type="button"
                            >
                              Delete
                            </button>
                          ) : (
                            <div>
                              <button
                                className={`bg-blue-600 px-2 py-1 text-white rounded-md text-base mb-2 shadow-xl ${
                                  loading ? "animate-spin" : ""
                                }`}
                                onClick={() => ApproveRooms(r._id)}
                                type="button"
                              >
                                {loading ? "O" : "Approve"}
                              </button>
                              <button
                                className="bg-red-600 px-2 py-1 text-white rounded-md text-base  shadow-xl"
                                type="button"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td className="py-2 px-6 text-center" colSpan={6}>
                      No roomss Available
                    </td>
                  </tr>
                )}
              </TableBody>
            </Table>
          </div>
        }
      </div>
    </div>
  );
};

export default Page;
