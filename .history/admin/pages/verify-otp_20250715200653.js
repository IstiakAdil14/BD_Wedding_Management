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
