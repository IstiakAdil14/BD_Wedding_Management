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
