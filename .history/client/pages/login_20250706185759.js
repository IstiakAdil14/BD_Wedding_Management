import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-transparent animate-fadeIn">
      <div className="bg-white bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-30 p-12 rounded-3xl shadow-[0_0_20px_rgba(124,58,237,0.7)] w-full max-w-md text-center transition-transform transform hover:scale-105">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 dark:border-gray-700 h-20 w-20 mb-8 animate-spin border-purple-600 dark:border-purple-400 shadow-lg"></div>
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-wider flex items-center justify-center">
            Loading
            <span className="dots ml-3 text-purple-600 dark:text-purple-400 font-extrabold text-4xl animate-pulse">
              ...
            </span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg font-medium">
            Please wait while we log you in.
          </p>
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 dark:bg-purple-500 animate-progressBar"></div>
          </div>
        </div>
        <style jsx>{`
          .loader {
            border-top-color: #7c3aed; /* Tailwind purple-600 */
            box-shadow: 0 0 15px #7c3aed;
          }
          .dots {
            animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
          }
          @keyframes progressBar {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
          .animate-progressBar {
            animation: progressBar 2s linear forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

const Login = () => {
  const router = useRouter();
  const { login, setPasswordSet } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set email and password from query params if available
    if (router.query.email) {
      setEmail(router.query.email);
    }
    if (router.query.password) {
      setPassword(router.query.password);
    }
  }, [router.query]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === "/login") {
        setEmail("");
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const startTime = Date.now();
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        // Set profileRegistered flag after successful login
        localStorage.setItem("profileRegistered", "true");
        login(response.data.accessToken, email); // Pass token and email to update context state immediately
        if (typeof response.data.passwordSet === "boolean") {
          localStorage.setItem(
            "passwordSet",
            response.data.passwordSet ? "true" : "false"
          );
          setPasswordSet(response.data.passwordSet);
        }
        const elapsed = Date.now() - startTime;
        const delay = Math.max(3000 - elapsed, 0);
        setTimeout(() => {
          setLoading(false);
          const redirectPath = router.query.redirect || "/";
          router.replace(redirectPath);
        }, delay);
      } else {
        setError("Login failed. Please try again.");
        setLoading(false);
      }

export default Login;
