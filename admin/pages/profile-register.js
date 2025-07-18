import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ProfileRegister() {
  const router = useRouter();
  // Removed usage of queryEmail from router.query
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User"); // default role
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Always use email from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Use logged-in user's email from localStorage, ignoring query param
    const loggedInEmail = localStorage.getItem("userEmail");
    if (!loggedInEmail || loggedInEmail.trim() === "") {
      setError("Logged-in user email not found. Please log in again.");
      return;
    }

    if (!password) {
      setError("Password is required to add a new admin.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call admin registration API to create new admin
      const registerResponse = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (!registerResponse.ok) {
        const data = await registerResponse.json();
        throw new Error(data.message || "Failed to register admin");
      }

      // Call profile API to save profile details
      const profileResponse = await fetch("/api/admin/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, photo, email, role }),
      });

      if (!profileResponse.ok) {
        const data = await profileResponse.json();
        throw new Error(data.message || "Failed to save profile");
      }

      setIsSubmitting(false);
          setSuccessMessage("Successfully added new admin.");
          // Store email and password in localStorage for auto-login
          // Removed to keep original logged-in user session
          // localStorage.setItem("userEmail", email);
          // localStorage.setItem("userPassword", password);
          // Redirect to dashboard after short delay to show success message
          setTimeout(() => {
            router.push("/dashboard");
          }, 1500);
    } catch (err) {
      setError(err.message || "Failed to add new admin. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Complete Your Profile
        </h2>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 text-green-600 font-semibold text-center">
            {successMessage}
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Your full name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Your email address"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter a password"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="photo-upload"
            className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
          >
            Profile Photo
          </label>
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full text-gray-700 dark:text-gray-300"
          />
          {photo && (
            <img
              src={photo}
              alt="Profile Preview"
              className="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
            />
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
          >
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="User">User</option>
            <option value="Full Access">Full Access</option>
            <option value="Read Only">Read Only</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded shadow transition duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 inline-block text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save Profile"
          )}
        </button>
      </form>
    </div>
  );
}
