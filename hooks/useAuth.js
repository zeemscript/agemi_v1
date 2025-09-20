"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/config/axios.config";
import config from "@/lib/config/req.head.config";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userInfo = Cookies.get("userInfo")
      ? JSON.parse(Cookies.get("userInfo"))
      : null;

    if (token && userInfo) {
      // Normalize user object to always have _id
      if (userInfo.id && !userInfo._id) userInfo._id = userInfo.id;
      setUser(userInfo);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userInfo");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  // Add a function to refresh user data from backend after profile update
  const refreshUser = async (userId) => {
    try {
      const res = await axiosInstance.get(`/api/users/${userId}`, config);
      if (res.data && (res.data.user || res.data)) {
        let freshUser = res.data.user || res.data;
        // Normalize user object to always have _id
        if (freshUser.id && !freshUser._id) freshUser._id = freshUser.id;
        console.log("User data refreshed:", freshUser);
        // Update user state and cookies
        setUser(freshUser);
        Cookies.set("userInfo", JSON.stringify(freshUser), { expires: 1 });
        setIsAuthenticated(true);
        window.reload();
        return freshUser;
      }
    } catch (error) {
      console.log("Failed to refresh user:", error);
      toast.error("Failed to refresh user info");
    }
  };

  return { user, isAuthenticated, loading, logout, refreshUser };
};

// Export login function separately
export const login = async (email, password) => {
  try {
    const res = await axiosInstance.post("/auth/signin", {
      email,
      password,
    });
    const { token, user } = res.data;
    // Normalize user object to always have _id
    if (user.id && !user._id) user._id = user.id;
    // Save token and user info in cookies
    Cookies.set("authToken", token, { expires: 1 });
    Cookies.set("userInfo", JSON.stringify(user), { expires: 1 });
    toast.success("Login successful");
    return user;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "Login failed";
      console.log("Login failed:", errorMessage);
      toast.error(errorMessage);
    } else {
      // Network or other unexpected errors
      console.log("Login failed:", error.message);
      toast.error("An unexpected error occurred. Please try again.");
    }
    throw error; // Re-throw error for handling in the component
  }
};
export const signup = async (name, email, password, role) => {
  try {
    const res = await axiosInstance.post("/auth/signup", {
      company_name,
      email,
      password,
    });

    const { token, user } = res.data;
    // Normalize user object to always have _id
    if (user.id && !user._id) user._id = user.id;
    // Save token and user info in cookies
    Cookies.set("authToken", token, { expires: 7 }); // Expires in 1 day
    Cookies.set("userInfo", JSON.stringify(user), { expires: 7 });
    toast.success("Signup successful! Redirecting to dashboard...");
    return user; // Return user data if needed
  } catch (error) {
    if (error.response) {
      // Handle backend error response
      const errorMessage = error.response.data?.message || "Signup failed";
      console.log("Signup failed:", errorMessage);
      toast.error(errorMessage); // Show the error message from the backend
    } else {
      // Handle network or unexpected errors
      console.log("Signup failed:", error.message);
      toast.error("An unexpected error occurred. Please try again.");
    }
    throw error; // Re-throw error for handling in the component
  }
};
export default useAuth;
