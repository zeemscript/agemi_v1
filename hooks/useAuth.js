"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    const hardcodedUserInfo = {
      _id: "12345", // Hardcoded user ID
      name: "John Doe",
      email: "johndoe@example.com",
      role: "user",
    };

    if (token) {
      setUser(hardcodedUserInfo);
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

  const refreshUser = () => {
    // Simulate refreshing user data with hardcoded values
    const freshUser = {
      _id: "12345",
      name: "John Doe",
      email: "johndoe@example.com",
      role: "user",
    };
    setUser(freshUser);
    Cookies.set("userInfo", JSON.stringify(freshUser), { expires: 1 });
    setIsAuthenticated(true);
    return freshUser;
  };

  return { user, isAuthenticated, loading, logout, refreshUser };
};

// Export login function separately
export const login = async (email, password) => {
  // Hardcoded login logic
  const hardcodedEmail = "johndoe@example.com";
  const hardcodedPassword = "password123"; // Use a secure password in production

  if (email === hardcodedEmail && password === hardcodedPassword) {
    const token = "hardcodedAuthToken"; // Hardcoded token
    const user = {
      _id: "12345",
      name: "John Doe",
      email: hardcodedEmail,
      role: "user",
    };
    // Save token and user info in cookies
    Cookies.set("authToken", token, { expires: 1 });
    Cookies.set("userInfo", JSON.stringify(user), { expires: 1 });
    toast.success("Login successful");
    return user;
  } else {
    toast.error("Invalid email or password");
    throw new Error("Login failed");
  }
};

export const signup = async (name, email, password, role) => {
  // Hardcoded signup logic
  const user = {
    _id: "12345",
    name,
    email,
    role,
  };
  const token = "hardcodedAuthToken"; // Hardcoded token
  // Save token and user info in cookies
  Cookies.set("authToken", token, { expires: 7 }); // Expires in 7 days
  Cookies.set("userInfo", JSON.stringify(user), { expires: 7 });
  toast.success("Signup successful! Redirecting to dashboard...");
  return user; // Return user data if needed
};

export default useAuth;
