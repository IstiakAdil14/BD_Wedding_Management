import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { DarkModeContext } from "../context/DarkModeContext";

const Register = () => {
  const router = useRouter();
  const { email } = router.query;
  const { darkMode } = useContext(DarkModeContext);

  const [password, setPassword] = useState("");
  const [adminType, setAdminType] = useState("User"); // default admin type
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    setPassword("");
    setMessage("");
    setError("");
    if (!email) {
      setError("Email is required to register.");
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const requestUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL + "/api/admin/register";
      console.log("Request URL:", requestUrl);
      // Get requesterEmail from email query param or localStorage if needed
      const requesterEmail = localStorage.getItem("userEmail") || email;

      const response = await axios.post(requestUrl, { email, password, adminType, requesterEmail });
      if (response.data.message) {
        setMessage(response.data.message);
        setIsRedirecting(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (err) {
      console.error("Error response status:", err.response?.status);
      console.error("Error response data:", err.response?.data);
      setError(err.response?.data?.message || "Error setting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100 flex items-center justify-center p-4`}>
      <div className="max-w-md w-full p-6 border rounded shadow bg-white dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Set Your Password</h2>
        <p className="mb-4">
          Email: <strong>{email}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="adminType" className="block font-semibold mb-2">
              Admin Type
            </label>
            <select
              id="adminType"
              value={adminType}
              onChange={(e) => setAdminType(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              <option value="User">User</option>
              <option value="Full Access">Full Access</option>
              <option value="Read Only">Read Only</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="Enter your password"
              required
              minLength={6}
              autoComplete="new-password"
              name="password"
            />
          </div>
          {error && <p className="text-red-600 dark:text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-600 dark:text-green-500 mb-4">{message}</p>}
          <button
            type="submit"
            disabled={loading || isRedirecting}
            className="w-full bg-blue-600 dark:bg-blue-700 text-white p-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
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
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
};

export default Register;
