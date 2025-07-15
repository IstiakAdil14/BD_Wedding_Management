import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { DarkModeContext } from "../../context/DarkModeContext";

const AdminVerifyOtp = () => {
  const router = useRouter();
  const { email } = router.query;
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

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
      console.log("API response data:", response.data);
      if (response.data.redirect) {
        console.log("Setting success message...");
        setMessage(
          response.data.message ||
            "Verification successful! You may now set your password."
        );
        // Store email in localStorage for later use only if not already set
        if (email && !localStorage.getItem("userEmail")) {
          localStorage.setItem("userEmail", email);
        }
        console.log("Message set. Email value:", email);
        console.log("Router ready status:", router.isReady);
        console.log("Attempting redirect to:", response.data.redirect);
        try {
          if (!router.isReady) {
            console.log("Router not ready, waiting...");
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
          console.log("Router ready, pushing route...");
          await router.push({
            pathname: response.data.redirect,
            query: { email: email },
          });
          console.log("Redirect successful");
        } catch (err) {
          console.error("Redirect failed:", err);
        }
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
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <p className="mb-4">Enter the 6-digit OTP sent to {email}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className={`w-full p-2 border rounded mb-4 text-center tracking-widest text-xl
            ${darkMode ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-600"}`}
          placeholder="Enter OTP"
          required
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      <button
        onClick={handleResend}
        disabled={loading}
        className="mt-4 w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
      >
        Resend OTP
      </button>
    </div>
  );
};

export default AdminVerifyOtp;
