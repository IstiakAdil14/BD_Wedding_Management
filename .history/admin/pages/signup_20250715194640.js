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
      <div className={`max-w-md mx-auto mt-10 p-6 border rounded shadow ${darkMode ? "bg-gray-900 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
        <h2 className="text-2xl font-bold mb-4">Admin Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
};

export default AdminSignup;
