import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsOtpSent(true);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Redirect to dashboard on successful login
        router.push('/dashboard');
      } else {
        setError(data.error || 'OTP verification failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <form
        onSubmit={isOtpSent ? handleOtpSubmit : handleSubmit}
        className="bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-md"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white text-center tracking-wide">
          Admin Login
        </h2>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 mb-3 font-semibold"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            placeholder="you@example.com"
          />
        </div>
        {isOtpSent && (
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-gray-700 dark:text-gray-300 mb-3 font-semibold"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter the OTP"
            />
          </div>
        )}
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300 mb-3 font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
        >
          {isOtpSent ? 'Verify OTP' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
}
