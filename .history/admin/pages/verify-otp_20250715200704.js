import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { DarkModeContext } from "../context/DarkModeContext";

const AdminVerifyOtp = () => {
  const router = useRouter();
  const { email } = router.query;
  const { darkMode } = useContext(DarkModeContext);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateOtp = (otp) => {
    const otpTrimmed = otp.trim();
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otpTrimmed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateOtp(otp)) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/verify-otp`,
        {
          email,
          otp,
        }
      );
      if (response.data.redirect) {
        setMessage(
          response.data.message ||
            "Verification successful! You may now set your password."
        );
        if (email && !localStorage.getItem("userEmail")) {
          localStorage.setItem("userEmail", email);
        }
        if (!router.isReady) {
          await new Promise((resolve) => {
            const checkReady = () => {
              if (router.isReady) {
                resolve();
              } else {
                setTimeout(checkReady, 50);
              }
            };
            checkReady();
          });
        }
        await router.push({
          pathname: response.data.redirect,
          query: { email: email },
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/resend-otp`,
        { email }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100 flex items-center justify-center p-4`}>
      <div className="max-w-md w-full p-6 border rounded shadow bg-white dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <p className="mb-4">Enter the 6-digit OTP sent to {email}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mb-4 text-center tracking-widest text-xl bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Enter OTP"
            required
          />
          {error && <p className="text-red-600 dark:text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-600 dark:text-green-500 mb-4">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 dark:bg-green-700 text-white p-2 rounded hover:bg-green-700 dark:hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <button
          onClick={handleResend}
          disabled={loading}
          className="mt-4 w-full bg-gray-600 dark:bg-gray-700 text-white p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-800 disabled:opacity-50"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default AdminVerifyOtp;
