"use client";

// import { ArrowBigLeft } from "lucide-react";
import React from "react";
import userAvatar from "../assets/user.png";
import Image from "next/image";
import { useAppContext } from "@/Context";

interface UserDetails {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface Props {
  details: UserDetails | null;
}

const Sidebar = ({ details }: Props) => {
  const { setIndex } = useAppContext();

  return (
    <aside className="">
      <div className="bg-gray-200 text-black h-screen border border-r-gray-400 px-20 py-5 ">
        <div>
          <h1 className="text-2xl font-bold">Admin Pannel</h1>
          <div className="flex flex-col justify-center items-center gap-2 py-7">
            <Image src={userAvatar} width={70} height={70} alt="user avatar" />

            <p>{details?.username}</p>
            <p>{details?.role}</p>
          </div>
          {/* <button type="button">
          <ArrowBigLeft /> Close
        </button> */}
        </div>

        <div className="flex flex-col gap-5">
          <button
            className="bg-white text-black rounded-md py-3 shadow-xl"
            type="button"
            onClick={() => {
              localStorage.setItem("Index", JSON.stringify(1));
              setIndex(1);
            }}
          >
            Dashboard
          </button>
          <button
            className="bg-white text-black rounded-md py-3 shadow-xl"
            type="button"
            onClick={() => {
              localStorage.setItem("Index", JSON.stringify(2));
              setIndex(2);
            }}
          >
            Users
          </button>
          <button
            className="bg-white text-black rounded-md py-3 shadow-xl"
            type="button"
            onClick={() => {
              localStorage.setItem("Index", JSON.stringify(3));
              setIndex(3);
            }}
          >
            Tenants
          </button>
          <button
            className="bg-white text-black rounded-md py-3 shadow-xl"
            type="button"
            onClick={() => {
              localStorage.setItem("Index", JSON.stringify(4));
              setIndex(4);
            }}
          >
            Landlords
          </button>
          <button
            className="bg-white text-black rounded-md py-3 shadow-xl"
            type="button"
            onClick={() => {
              localStorage.setItem("Index", JSON.stringify(5));
              setIndex(5);
            }}
          >
            Verified Rooms
          </button>
          <button
            className="bg-white text-black rounded-md py-3 shadow-xl"
            type="button"
            onClick={() => {
              localStorage.setItem("Index", JSON.stringify(6));
              setIndex(6);
            }}
          >
            Unverified Rooms
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
