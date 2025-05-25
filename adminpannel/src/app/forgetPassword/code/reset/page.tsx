"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useAppContext } from "@/Context";
import { base_url } from "@/lib/Constants";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import { IoIosEyeOff } from "react-icons/io";

const Page = () => {
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  //   const { userEmail } = useAppContext();

  const changePassword = async () => {
    setLoading(true);
    if (confirmPass !== newPass) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${base_url}/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: newPass,
          //   email: userEmail,
        }),
      });

      const val = await response.json();
      if (!val.success) {
        toast.error(val.nessage);
      } else {
        toast.success(val?.message);
        router.push("/login");
      }
    } catch (error: unknown) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 md:mt-20 flex items-center justify-center mx-2 min-h-screen md:min-h-0">
      <div className="border border-gray-200 shadow-lg py-8 px-5 md:px-14 space-y-6 w-full max-w-md bg-white">
        <h1 className="text-black font-bold text-2xl md:text-3xl text-center">
          Reset Your Password
        </h1>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-gray-700 font-medium">New Password</label>
            <div className="relative">
              <Input
                type={showOldPassword ? "text" : "password"}
                className="w-full pr-10"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <BsEye className="h-5 w-5" />
                ) : (
                  <IoIosEyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-gray-700 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                className="w-full pr-10"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <BsEye className="h-5 w-5" />
                ) : (
                  <IoIosEyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={changePassword}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                "Change Password"
              )}
            </Button>

            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
