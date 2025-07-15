import React, { useEffect, useState } from "react";

const Signup = () => {
  const [user, setUser] = useState(null);
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(true);

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
    // Open Google OAuth login in a popup window
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      "http://localhost:5000/auth/google",
      "GoogleSignIn",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Polling to check if popup is closed
    const timer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(timer);
        // After popup closes, check if user is logged in
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
      }
    }, 500);
  };

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
    }).then(() => {
      setUser(null);
      setShowGoogleSignIn(true);
    });
  };

  const handleCancel = () => {
    setShowGoogleSignIn(false);
  };

  const handleSwitch = () => {
    setShowGoogleSignIn(true);
  };

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
    }).then(() => {
      setUser(null);
      setShowGoogleSignIn(true);
    });
  };

  const handleCancel = () => {
    setShowGoogleSignIn(false);
  };

  const handleSwitch = () => {
    setShowGoogleSignIn(true);
  };

  if (user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow text-center z-60">
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
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-0 z-50 pointer-events-none"></div>

      {/* Modal dialog box */}
      <div className="fixed inset-0 flex items-center justify-center z-60 pointer-events-auto">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded shadow-lg z-70 pointer-events-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Sign Up
          </h2>

          {showIframe ? (
            <>
              <div className="relative" style={{ height: "600px" }}>
                <iframe
                  src="http://localhost:5000/auth/google"
                  title="Google Sign In"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="fullscreen"
                ></iframe>
                <button
                  onClick={handleIframeClose}
                  className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                >
                  Close
                </button>
              </div>
            </>
          ) : showGoogleSignIn ? (
            <>
              <button
                onClick={handleGoogleSignIn}
                className="w-full mt-5 py-3 rounded bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                Sign in with Google
              </button>
              <button
                onClick={handleCancel}
                className="w-full mt-3 py-3 rounded bg-gray-300 text-gray-800 text-lg font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleSwitch}
              className="w-full mt-5 py-3 rounded bg-gray-700 text-white text-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            >
              Switch to Google Sign In
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
