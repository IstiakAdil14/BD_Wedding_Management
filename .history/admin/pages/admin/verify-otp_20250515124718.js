import React, { useState } from "react";
import { useRouter } from "next/router";

const VerifyOtp = () => {
  const router = useRouter();
  const { email } = router.query;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: Implement OTP verification API call
      alert(`OTP submitted for email: ${email}, OTP: ${otp}`);
      // On success, redirect or show success message
    } catch (err) {
      setError("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <p className="mb-4">Enter the OTP sent to your email: {email}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-2 border rounded mb-4"
          required
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
