import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("signup"); // signup or verify
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("verify");
        setMessage("OTP sent to your email. Please check and verify.");
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("Signup failed: " + error.message);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Email verified successfully! You can now login.");
        setStep("done");
      } else {
        setMessage(data.message || "Verification failed");
      }
    } catch (error) {
      setMessage("Verification failed: " + error.message);
    }
  };

  if (step === "signup") {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    );
  } else if (step === "verify") {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Verify
          </button>
        </form>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    );
  } else {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Signup Complete</h2>
        <p>{message}</p>
      </div>
    );
  }
};

export default Signup;
