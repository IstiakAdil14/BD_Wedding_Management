import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AdminSignup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const requestUrl = "/api/admin/signup-start";
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
      setError(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
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
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your email"
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
