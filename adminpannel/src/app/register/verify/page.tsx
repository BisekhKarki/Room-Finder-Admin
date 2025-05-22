"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// import axios from "axios";

// import toast from "react-hot-toast";
// import { base_url } from "@/lib/Constants";

const Page = () => {
  const [code, setCode] = useState<string>("");
  const router = useRouter();

  //   const onSubmit = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${base_url}/user/register`,
  //         {
  //           code,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         toast.success("User registered successfully");
  //         router.push("/login");
  //       } else {
  //         toast.error("Failed to register account, please try again");
  //       }
  //     } catch (error: unknown) {
  //       toast.error(String(error) || "An error occurred");
  //     }
  //   };

  return (
    <div className="flex justify-center py-20 md:py-40 px-4">
      <div className="flex flex-col gap-4 md:gap-6 border border-gray-200 py-6 px-6 md:py-8 md:px-8 items-center rounded-lg shadow-lg w-full max-w-md bg-white">
        <h1 className="font-bold text-xl md:text-2xl text-center">
          Verify Your Account
        </h1>

        <p className="text-gray-500 text-sm md:text-base text-center">
          A verification code has been sent to your email
          <br className="hidden sm:block" />
          Enter the code below
        </p>

        <Input
          className="w-full max-w-xs"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push("/register/verify")}
          >
            Next
          </Button>

          <Button
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
            onClick={() => router.push("/signup")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
