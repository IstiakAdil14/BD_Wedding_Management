import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import ProfileEditDialogNew from "../components/ProfileEditDialogNew";
import ResetPasswordDialog from "../components/ResetPasswordDialog";
import { DarkModeContext } from "../context/DarkModeContext";

function decodeJwt(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const payload = parts[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding if missing
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  const jsonPayload = decodeURIComponent(
    atob(paddedBase64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  const decoded = JSON.parse(jsonPayload);
  return decoded;
}

const STATIC_ORDERS = [
  {
    _id: "1",
    orderNumber: "ORD-001",
    orderDate: "2023-04-01T10:00:00Z",
    status: "Shipped",
    items: [
      { name: "Product A", quantity: 2 },
      { name: "Product B", quantity: 1 },
    ],
  },
  {
    _id: "2",
    orderNumber: "ORD-002",
    orderDate: "2023-04-15T14:30:00Z",
    status: "Processing",
    items: [{ name: "Product C", quantity: 3 }],
  },
];

export default function ClientDashboard() {
  const { darkMode } = useContext(DarkModeContext);
  const { isAuthenticated, accessToken, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  // Close menu if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const menuButton = document.getElementById("hamburger-menu-button");
      const menuDropdown = document.getElementById("hamburger-menu-dropdown");
      if (
        menuButton &&
        menuDropdown &&
        !menuButton.contains(event.target) &&
        !menuDropdown.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const fetchProfileData = async (email) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/client-personal-details?email=${encodeURIComponent(
          email
        )}`
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch profile data: ${errorText}`);
      }
      const data = await res.json();
      console.log("Fetched profile data:", data);
      setProfile(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setProfile(null);
      setError(error.message);
    }
  };

  const fetchBookings = async (email) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch bookings: ${errorText}`);
      }
      const data = await res.json();
      console.log("Fetched bookings:", data);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/");
      } else if (accessToken) {
        let email = null;
        try {
          const decoded = decodeJwt(accessToken);
          // Adjusted to check for 'email' or 'user_email' or 'sub' or 'username' fields
          email =
            decoded.email ||
            decoded.user_email ||
            decoded.sub ||
            decoded.username ||
            null;
        } catch (err) {
          console.error("Failed to decode token:", err);
        }
        // Only fetch profile if not on signup page and email is a Gmail address
        if (email && router.pathname !== "/signup") {
          if (email.toLowerCase().endsWith("@gmail.com")) {
            fetchProfileData(email);
            fetchBookings(email);
          } else {
            setProfile(null);
            setError("Profile data can only be fetched for Gmail addresses.");
          }
        } else {
          setProfile(null);
          setError(null);
        }
      }
    }
  }, [isAuthenticated, loading, router, accessToken]);

  if (loading) {
    return <p>Loading authentication...</p>;
  }

  console.log("Rendering profile:", profile);

  return (
    <>
      <main
        className={`p-4 max-w-4xl mx-auto ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        } min-h-screen transition-colors duration-300`}
        style={{ overflowX: "auto" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          {error && <p className="text-red-600 mb-4">Error: {error}</p>}
          {profile ? (
            <div
              className={`border p-4 rounded shadow ${
                darkMode
                  ? "border-gray-700 bg-gray-800 text-gray-100"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            >
              <div className="relative">
                <button
                  id="hamburger-menu-button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen}
                  aria-controls="hamburger-menu-dropdown"
                  aria-label="Menu"
                  className={`absolute top-0 p-2 rounded z-20 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isMenuOpen ? "right-2" : "right-2"
                  } ${
                    darkMode
                      ? "text-gray-100 hover:bg-gray-700 focus:ring-gray-500"
                      : "text-gray-900 hover:bg-gray-200 focus:ring-gray-700"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
                {isMenuOpen && (
                  <div
                    id="hamburger-menu-dropdown"
                    role="menu"
                    aria-labelledby="hamburger-menu-button"
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                    className={`absolute right-12 top-full w-30 rounded-md shadow-lg z-10 ${
                      darkMode
                        ? "bg-gray-800 text-gray-100"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setIsEditOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-600 hover:text-white"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsResetOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-600 hover:text-white"
                    >
                      Reset Password
                    </button>
                  </div>
                )}
              </div>
              {profile.profilePicture ? (
                <img
                  src={
                    profile.profilePicture.startsWith("/")
                      ? profile.profilePicture
                      : "/" + profile.profilePicture
                  }
                  alt="Profile Picture"
                  className="w-32 h-32 object-cover rounded mb-4"
                />
              ) : (
                <p className="italic text-gray-500 mb-4">
                  No profile picture available.
                </p>
              )}
              <p>
                <strong>Name:</strong> {profile.fullName || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phoneNumber || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {profile.address || "N/A"}
              </p>
            </div>
          ) : (
            !error && <p>No profile information available.</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Order Information</h2>
          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table
                className={`w-full border-collapse border text-sm sm:text-base ${
                  darkMode ? "border-gray-700" : "border-gray-300"
                }`}
                style={{ borderSpacing: "0 0.25rem" }}
              >
                <thead>
                  <tr>
                  <th
                    className={`border px-4 py-2 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    } hidden sm:table-cell`}
                    style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                  >
                    Package ID
                  </th>
                  <th
                    className={`border px-4 py-2 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                    style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                  >
                    Package Name
                  </th>
                  <th
                    className={`border px-4 py-2 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                    style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                  >
                    Event Date
                  </th>
                  <th
                    className={`border px-4 py-2 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                    style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                  >
                    Payment Method
                  </th>
                  <th
                    className={`border px-4 py-2 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                    style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                  >
                    Payment Account Number
                  </th>
                  <th
                    className={`border px-4 py-2 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                    style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                  >
                    Status
                  </th>
                  <th
                    className={`border px-4 py-2 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    } hidden sm:table-cell`}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td
                        className={`border px-4 py-2 ${
                          darkMode ? "border-gray-700" : "border-gray-300"
                        } hidden sm:table-cell`}
                      >
                        {booking.packageId || "-"}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          darkMode ? "border-gray-700" : "border-gray-300"
                        }`}
                      >
                        {booking.packageName}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          darkMode ? "border-gray-700" : "border-gray-300"
                        }`}
                      >
                        {new Date(booking.eventDate).toLocaleDateString()}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          darkMode ? "border-gray-700" : "border-gray-300"
                        }`}
                      >
                        {booking.paymentMethod || "-"}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          darkMode ? "border-gray-700" : "border-gray-300"
                        }`}
                      >
                        {booking.paymentAccountNumber || "-"}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          darkMode ? "border-gray-700" : "border-gray-300"
                        }`}
                      >
                        {booking.status}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          darkMode ? "border-gray-700" : "border-gray-300"
                        } hidden sm:table-cell`}
                      >
                        {new Date(booking.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No orders found.</p>
          )}
        </section>

        <ProfileEditDialogNew
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            if (profile && profile.email) {
              fetchProfileData(profile.email);
            }
          }}
          onSaveSuccess={() => {
            // Full page reload to refresh profile and Navbar
            window.location.reload();
          }}
          profile={profile}
          darkMode={darkMode} // Pass darkMode prop for styling
        />

        <ResetPasswordDialog
          isOpen={isResetOpen}
          onClose={() => setIsResetOpen(false)}
          email={profile?.email}
          darkMode={darkMode}
        />
      </main>
    </>
  );
}
