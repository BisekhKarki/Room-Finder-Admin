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
    <aside className="bg-white ">
      <div className=" text-gray-700 h-full border px-20 py-5 ">
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

// "use client";

// // import { ArrowBigLeft } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import userAvatar from "../assets/user.png";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { base_url } from "@/lib/Constants";
// import toast from "react-hot-toast";
// import { AiOutlineDashboard } from "react-icons/ai";
// import { FaUser } from "react-icons/fa";
// import { FaHouse } from "react-icons/fa6";
// import { IoIosLogOut } from "react-icons/io";
// import Navbar from "./Navbar";
// import { Settings } from "lucide-react";

// interface UserDetails {
//   id: string;
//   email: string;
//   username: string;
//   role: string;
// }

// const Sidebar = () => {
//   const [user, setUser] = useState<UserDetails | null>(null);
//   const [getToken, setGetToken] = useState<string>("");
//   const router = useRouter();

//   useEffect(() => {
//     const getUserToken = localStorage.getItem("Token");
//     if (getUserToken) {
//       // const validToken = getUserToken;
//       setGetToken(getUserToken);
//     } else {
//       router.push("/login");
//     }
//   }, [router]);

//   useEffect(() => {
//     if (getToken) {
//       fetchDetails();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [getToken]);

//   const fetchDetails = async () => {
//     try {
//       const response = await axios.get(`${base_url}/getuser`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken}`,
//         },
//       });

//       const data = response.data;
//       if (data && response.status === 200) {
//         setUser(data.message);
//       }
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.message || " Internal Server Error");
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error("Internal Server Error");
//       }
//     }
//   };

//   const logoutUser = () => {
//     localStorage.removeItem("Token");
//     router.push("/login");
//   };

//   return (
//     <aside className="bg-white h-screen w-64 border-r border-gray-200 flex flex-col">
//       <div className="p-6 pb-4">
//         <h1 className="text-xl font-bold text-gray-800 mb-2">Admin Panel</h1>
//         <div className="flex flex-col items-center gap-3 py-4 border-b border-gray-100">
//           <div className="relative">
//             <Image
//               src={userAvatar}
//               width={80}
//               height={80}
//               alt="user avatar"
//               className="rounded-full border-2 border-white shadow-sm"
//             />
//             <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
//           </div>
//           <div className="text-center">
//             <p className="font-medium text-gray-800">{user?.username}</p>
//             <p className="text-sm text-gray-500">{user?.role}</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col px-4 py-4 gap-1 overflow-y-auto">
//         <button
//           className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
//           onClick={() => router.push("/")}
//         >
//           <AiOutlineDashboard className="w-5 h-5" />
//           <span className="text-sm font-medium">Dashboard</span>
//         </button>

//         <Navbar
//           icon={<FaUser className="w-5 h-5" />}
//           title="Users"
//           subItems={[
//             { title: "Tenants", href: "/Users/Tenants" },
//             { title: "Landlords", href: "/Users/Landlord" },
//           ]}
//           // className="hover:bg-blue-50 text-gray-600 hover:text-blue-600"
//         />

//         <Navbar
//           icon={<FaHouse className="w-5 h-5" />}
//           title="Rooms"
//           subItems={[
//             { title: "Verified Rooms", href: "/Rooms" },
//             { title: "Unverified Rooms", href: "/Rooms/PendingRooms" },
//           ]}
//           // className="hover:bg-blue-50 text-gray-600 hover:text-blue-600"yyy
//         />

//         <button
//           className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
//           onClick={() => router.push("/settings")}
//         >
//           <Settings className="w-5 h-5" />
//           <span className="text-sm font-medium">Settings</span>
//         </button>

//         <div className="mt-auto pb-4">
//           <button
//             className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
//             onClick={logoutUser}
//           >
//             <IoIosLogOut className="w-5 h-5" />
//             <span className="text-sm font-medium">Logout</span>
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
