"use client";

// import { ArrowBigLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import userAvatar from "../assets/user.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { base_url } from "@/lib/Constants";
import toast from "react-hot-toast";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import Navbar from "./Navbar";
import { Settings } from "lucide-react";

interface UserDetails {
  id: string;
  email: string;
  username: string;
  role: string;
}

const Sidebar = () => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [getToken, setGetToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getUserToken = localStorage.getItem("Token");
    if (getUserToken) {
      // const validToken = getUserToken;
      setGetToken(getUserToken);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (getToken) {
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${base_url}/getuser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });

      const data = response.data;
      if (data && response.status === 200) {
        setUser(data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message || " Internal Server Error");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Internal Server Error");
      }
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("Token");
    router.push("/login");
  };

  return (
    <aside className="bg-white">
      <div className=" text-gray-700 h-screen border px-20 py-5 ">
        <div>
          <h1 className="text-2xl text-center font-bold">Admin Pannel</h1>
          <div className="flex flex-col justify-center items-center gap-2 py-7">
            <Image src={userAvatar} width={70} height={70} alt="user avatar" />

            <p>{user?.username}</p>
            <p>{user?.role}</p>
          </div>
          {/* <button type="button">
          <ArrowBigLeft /> Close
        </button> */}
        </div>

        <div className="flex flex-col gap-5">
          <button
            className="flex  items-center gap-2"
            type="button"
            onClick={() => router.push("/")}
          >
            <AiOutlineDashboard /> Dashboard
          </button>
          <Navbar
            icon={<FaUser />}
            title="Users"
            subItems={[
              {
                title: "Tenants",
                href: "/Users/Tenants",
              },
              {
                title: "Landlords",
                href: "/Users//Landlord",
              },
            ]}
          />

          <Navbar
            icon={<FaHouse />}
            title="Rooms"
            subItems={[
              {
                title: "Verified Rooms",
                href: "/Rooms",
              },
              {
                title: "Unverified Rooms",
                href: "/Rooms/PendingRooms",
              },
            ]}
          />
          <button
            className="flex  items-center gap-2"
            type="button"
            onClick={() => router.push("/settings")}
          >
            <Settings /> Settings
          </button>
          <button
            className="flex  items-center gap-2"
            type="button"
            onClick={() => logoutUser()}
          >
            <IoIosLogOut /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
