import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AdminVerifyOtp = () => {
  const router = useRouter();
  const { email } = router.query;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post("/api/admin/verify-otp", { email, otp });
      if (response.data.message === "Admin verified successfully") {
        setMessage("Verification successful! Please set your password.");
        setTimeout(() => {
          router.push({
            pathname: "/admin/set-password",
            query: { email: email },
          });
        }, 2000);
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
      const response = await axios.post("/api/admin/resend-otp", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
