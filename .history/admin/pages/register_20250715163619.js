import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { DarkModeContext } from "../../context/DarkModeContext";

const Register = () => {
  const router = useRouter();
  const { email } = router.query;
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

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
    <div className={`max-w-md mx-auto mt-10 p-6 border rounded shadow
      ${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "Day Mode" : "Night Mode"}
        </button>
      </div>
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
