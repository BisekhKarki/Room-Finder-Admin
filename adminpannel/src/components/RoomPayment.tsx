"use client";

import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { base_url } from "@/lib/Constants";
import { useAppContext } from "@/Context";

interface LandlordPayment {
  _id: string;
  landlord_id: string;
  room_id: string;
  payment_amount: string; // Use number if parsed
  payment_type: "Room_Post" | string;
  purchase_type: "Completed" | "Pending" | "Failed" | string;
  purchase_date: string; // ISO format; use Date if parsed
  __v: number;
}

const RoomPayment = () => {
  const { token } = useAppContext();
  const [payment, setPayment] = useState<Array<LandlordPayment> | []>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const payments = payment.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(payment.length / itemsPerPage);

  const totalAmount = payment.reduce(
    (sum, current) => sum + parseFloat(current.payment_amount),
    0
  );

  useEffect(() => {
    if (token) {
      fetchPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  console.log(payment);

  const fetchPayment = async () => {
    try {
      const response = await fetch(`${base_url}/getLandlordPayment`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success && response.status === 200) {
        setPayment(data.message);
      }
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  return (
    <>
      <p className="text-xl font-bold text-green-700 mb-2 border-b-2 border-t-2 py-2">
        Total Income:{" "}
        {totalAmount.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        })}
      </p>
      <Table className="overflow-y-auto">
        <TableCaption>A list of landlord room payments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.N.</TableHead>
            <TableHead className="w-[100px]">Room Id</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead>Payment Amount</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Payment Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments && payments.length > 0 ? (
            payments.map((p, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{index}</TableCell>
                <TableCell className="text-center">{p.room_id}</TableCell>
                <TableCell className="text-center">{p.payment_type}</TableCell>
                <TableCell className="text-center">
                  {p.payment_amount}
                </TableCell>
                <TableCell className="text-center">{p.purchase_type}</TableCell>
                <TableCell className="text-center">
                  {p.purchase_date.split("T")[0]}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-cenet">No payment Available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (page, index) => (
            <button
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? " bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              key={index}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default RoomPayment;
