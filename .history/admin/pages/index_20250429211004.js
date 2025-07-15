import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  useEffect(() => {
    let timer;
    if (showLoadingScreen) {
      timer = setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showLoadingScreen, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setShowLoadingScreen(true);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showLoadingScreen) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <form
        onSubmit={handleSubmit}
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
            disabled={isLoading}
          />
        </div>
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
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
          disabled={isLoading}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
