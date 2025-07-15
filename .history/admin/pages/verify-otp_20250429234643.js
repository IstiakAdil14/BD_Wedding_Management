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
      console.log("API response message:", response.data.message);
      if (
        response.data.message &&
        response.data.message.toLowerCase().includes("verified")
      ) {
        setMessage("Verification successful! Please set your password.");
        router.push({
          pathname: "/admin/register",
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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <p className="mb-4">Enter the 6-digit OTP sent to {email}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-center tracking-widest text-xl"
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
