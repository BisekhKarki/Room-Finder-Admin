"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/Context";
import { base_url } from "@/lib/Constants";
import toast from "react-hot-toast";

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const Page = () => {
  const { token } = useAppContext();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getUserProfile = async () => {
    try {
      const response = await fetch(`${base_url}/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        setUser(data.message);
      } else {
        toast.error(data.message || "Failed to fetch user info");
      }
    } catch (error: unknown) {
      toast.error("An error occurred while fetching user data");
      console.error("Fetch user error:", error);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${base_url}/changepassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error: unknown) {
      toast.error("An error occurred while changing password");
      console.error("Change password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 w-full ">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Account Settings
      </h2>

      {user ? (
        <div className="mb-8 p-6  w-full border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            User Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-1">Username</p>
              <p className="text-lg font-medium text-gray-800">
                {user.username}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Email</p>
              <p className="text-lg font-medium text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Role</p>
              <p className="text-lg font-medium text-gray-800">{user.role}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg w-full border border-gray-200">
          <p className="text-gray-600">Loading user information...</p>
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-6 text-gray-700">
          Change Password
        </h3>
        <form onSubmit={handleChangePassword} className="space-y-6 w-full">
          <div className="w-full">
            <label className="block text-gray-700 mb-2 text-lg">
              New Password
            </label>
            <input
              aria-label="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              style={{ minWidth: "100%" }}
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-700 mb-2 text-lg">
              Confirm New Password
            </label>
            <input
              aria-label="password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              style={{ minWidth: "100%" }}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-medium shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Processing...
              </span>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
