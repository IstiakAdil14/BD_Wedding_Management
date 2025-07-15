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
    try {
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setOtpSent(true);
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      alert('Error sending OTP: ' + error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setVerified(true);
        alert(data.message);
      } else {
        alert(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      alert('Error verifying OTP: ' + error.message);
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
