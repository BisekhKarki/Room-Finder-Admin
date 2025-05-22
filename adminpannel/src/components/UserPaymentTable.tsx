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
import { useAppContext } from "@/Context";
import { base_url } from "@/lib/Constants";

interface UserPayment {
  _id: string;
  buyer_id: string;
  buyer_name: string;
  landlord_id: string;
  seller_name: string;
  room_id: string;
  purchase_type: "Rent" | string;
  purchase_amount: string; // Or use number if parsed
  purchase_date: string; // ISO string; you can use Date if you parse it
  payment_method: "Online" | "Offline" | string;
  payment_status: "completed" | "pending" | "failed" | string;
  __v: number;
}

const UserPaymentTable = () => {
  const [payment, setPayment] = useState<Array<UserPayment> | []>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payment.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(payment.length / itemsPerPage);

  const { token } = useAppContext();

  const totalAmount = payment.reduce(
    (sum, current) => sum + parseFloat(current.purchase_amount || "0"),
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
      const response = await fetch(`${base_url}/getUserPayment`, {
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
        Total Amount:{" "}
        {totalAmount.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        })}
      </p>
      <Table className="overflow-y-auto">
        <TableCaption>A list of landlord room payments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.N.</TableHead>
            <TableHead>Name of User</TableHead>
            <TableHead>Payment Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Room ID</TableHead>
            <TableHead>Purchase Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPayments && currentPayments.length > 0 ? (
            currentPayments.map((p, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{index}</TableCell>
                <TableCell className="text-center">{p.buyer_name}</TableCell>
                <TableCell className="text-center">
                  {p.purchase_amount}
                </TableCell>
                <TableCell className="text-center">
                  {p.payment_method}
                </TableCell>
                <TableCell className="text-center">{p.room_id}</TableCell>
                <TableCell className="text-center">{p.purchase_type}</TableCell>
                <TableCell className="text-center">
                  {p.payment_status}
                </TableCell>
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
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UserPaymentTable;
