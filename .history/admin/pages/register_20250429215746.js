import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const { email } = router.query;

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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/set-password`, {
        email,
        password,
      });
      setMessage(response.data.message);
      setTimeout(() => {
        router.push("/admin/login");
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
