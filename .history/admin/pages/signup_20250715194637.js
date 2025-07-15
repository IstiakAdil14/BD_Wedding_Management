import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { DarkModeContext } from "../context/DarkModeContext";

const AdminSignup = () => {
  const router = useRouter();
  const { darkMode } = useContext(DarkModeContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const requestUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL + "/api/admin/signup-start";
      console.log("Request URL:", requestUrl);
      const response = await axios.post(requestUrl, { email });
      if (response.data.message) {
        router.push({
          pathname: "/admin/verify-otp",
          query: { email },
        });
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      if (err.response?.data?.message === "Admin user already exists") {
        setError("admin exist");
      } else {
        setError(err.response?.data?.message || "Error sending OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100 min-h-screen" : "bg-white text-gray-900 min-h-screen"}`}>
};

export default AdminSignup;
