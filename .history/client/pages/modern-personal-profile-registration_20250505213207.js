import React, { useState } from "react";
import { useRouter } from "next/router";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import { useAuth } from "../context/AuthContext";

export default function ModernPersonalProfileRegistration() {
  const router = useRouter();
  const { login, setClientDetailsSaved, forceUpdate } = useAuth();

  const [details, setDetails] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    profilePictureUrl: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleProfilePictureUpload = (url) => {
    setDetails({ ...details, profilePictureUrl: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch("/api/auth/client-personal-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(details),
      });

      if (!res.ok) {
        let errorText;
        try {
          const errorData = await res.clone().json();
          errorText = errorData.message || JSON.stringify(errorData);
        } catch {
          try {
            errorText = await res.clone().text();
          } catch {
            errorText = "Failed to save personal details";
          }
        }
        throw new Error(errorText || "Failed to save personal details");
      }

      setSuccess("Personal details saved successfully");
      if (accessToken) {
        login(accessToken);
        setClientDetailsSaved(true);
        forceUpdate();
      }
      router.replace("/").then(() => {
        window.location.reload();
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Modern Personal Profile Registration
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={details.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="fullName" className="block font-semibold mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={details.fullName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block font-semibold mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={details.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="+8801704080389"
          />
        </div>
        <div>
          <label htmlFor="address" className="block font-semibold mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={details.address}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter your address"
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block font-semibold mb-1">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={details.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block font-semibold mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={details.gender}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
            <option value="preferNotToSay">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Profile Picture</label>
          <ProfilePictureUpload onUploadSuccess={handleProfilePictureUpload} />
          {details.profilePictureUrl && (
            <img
              src={details.profilePictureUrl}
              alt="Profile"
              className="mt-2 h-24 w-24 object-cover rounded-full"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Register"}
        </button>
        {success && <p className="text-green-600 mt-2">{success}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}
