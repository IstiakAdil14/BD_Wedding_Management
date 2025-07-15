import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";

const AdminSignup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18);
  }, []);

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
    <div
      className={`max-w-md mx-auto mt-10 p-6 border rounded shadow ${
        isDay ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
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
          className={`w-full p-2 border rounded mb-4 ${
            isDay ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
          placeholder="Enter your email"
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            isDay ? "bg-green-600 hover:bg-green-700" : "bg-green-800 hover:bg-green-900"
          } text-white p-2 rounded`}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
