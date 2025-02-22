"use client";

import { base_url } from "@/lib/Constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const [showOrHide, setShowOrHide] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !username || !password) {
      toast.error("Fill all the inputs");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email");
      return;
    }
    try {
      const response = await axios.post(
        `${base_url}/api/admin/register`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      if (data.success) {
        toast.success(data.message);
        router.push("/login");
        return;
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Something went wrong");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center py-7">
      <div className="w-1/3 border px-10 py-10 border-gray-300 rounded-lg shadow-md">
        <h1 className="text-center mb-5 text-3xl font-bold">Signup as Admin</h1>
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-2">
            <label>Enter username</label>
            <input
              type="text"
              placeholder="username"
              className="border border-gray-500 px-2 py-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>Enter you email</label>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-500 px-2 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2 relative ">
            <label>Enter you email</label>
            <input
              type={showOrHide ? "text" : "password"}
              placeholder="********"
              className="border border-gray-500 rounded px-2 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute top-10 right-2">
              {showOrHide ? (
                <BsEye
                  className="cursor-pointer"
                  type="button"
                  onClick={() => setShowOrHide(false)}
                />
              ) : (
                <BsEyeSlash
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setShowOrHide(true)}
                />
              )}
            </div>
          </div>
          <p className="text-center">
            Already have an account?
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
          <button
            type="submit"
            className="border border-gray-400 hover:border-gray-500 bg-blue-400 text-white w-full py-2 rounded-md shadow-md hover:bg-blue-500 transition-all duration-300 ease-in-out"
          >
            Submit
          </button>
          <button
            type="button"
            className=" flex items-center bg-gray-50 hover:bg-gray-100 justify-center gap-2 border border-gray-300 hover:border-gray-400  w-full py-2 rounded-md shadow-md transition-all duration-300 ease-in-out"
          >
            <FcGoogle />
            Login with Google
          </button>
        </form>
        <p className="text-center mt-5 text-blue-500 underline">
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default Page;
