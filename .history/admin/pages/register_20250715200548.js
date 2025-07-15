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
};

export default Register;
