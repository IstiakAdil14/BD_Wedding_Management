import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: signup form, 2: otp form
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/signup", { email, password });
      if (res.data.message) {
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      if (res.data.accessToken) {
        // Save tokens to localStorage or cookies
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        router.push("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      {step === 1 && (
        <form onSubmit={handleSignup}>
          <h2 className="text-2xl font-bold mb-4">Signup</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <label className="block mb-2">
            Email:
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <label className="block mb-4">
            Enter OTP sent to your email:
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Signup;
