import React, { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }
    // Simulate sending OTP to email
    // In real app, call backend API to send OTP
    alert(`OTP sent to ${email}`);
    setOtpSent(true);
  };

  const verifyOtp = () => {
    // Simulate OTP verification
    // In real app, call backend API to verify OTP
    if (otp === '123456') { // For demo, OTP is hardcoded as 123456
      setVerified(true);
      alert('Email verified successfully!');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!verified) {
      alert('Please verify your email first');
      return;
    }
    // Implement signup logic here
    alert('Signup successful!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Sign Up</h2>
        {!otpSent ? (
          <form onSubmit={(e) => { e.preventDefault(); sendOtp(); }} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold transition"
            >
              Send OTP
            </button>
          </form>
        ) : !verified ? (
          <form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-gray-700 dark:text-gray-300">Enter OTP</label>
              <input
                type="text"
                id="otp"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold transition"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <p className="text-green-600 font-semibold">Email verified! You can now complete signup.</p>
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold transition"
            >
              Complete Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
