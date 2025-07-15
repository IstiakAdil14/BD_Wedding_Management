import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const router = useRouter();
  const { email } = router.query;
  const { login, setPasswordSet } = useAuth();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      setError("Email is required to register.");
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/set-password", {
        email,
        password,
      });
      setMessage(response.data.message);
      // Use login function from AuthContext to set accessToken and update auth state
      if (response.data.accessToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
        login(response.data.accessToken);
        setPasswordSet(true);
      }
      setTimeout(() => {
        router.push({
          pathname: "/modern-personal-",
          query: { email },
        });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error setting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Set Your Password</h2>
      <p className="mb-4">
        Email: <strong>{email}</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your password"
          required
          minLength={6}
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Setting password..." : "Set Password"}
        </button>
      </form>
    </div>
  );
};

export default Register;
