import React, { useEffect, useState } from "react";

const Signup = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in by fetching current user info
    fetch("http://localhost:5000/api/current-user", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleGoogleSignIn = () => {
    // Redirect to backend Google OAuth login route
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
    }).then(() => {
      setUser(null);
    });
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome, {user.displayName || user.emails[0].value}!
          </h2>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Sign Up
        </h2>

        <button
          onClick={handleGoogleSignIn}
          style={{
            backgroundColor: "#4285F4",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
            width: "100%",
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
