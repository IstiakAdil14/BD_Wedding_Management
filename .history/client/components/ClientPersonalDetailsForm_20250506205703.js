import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NumericFormat as NumberFormat } from "react-number-format";
import { useAuth } from "../context/AuthContext";

export default function ClientPersonalDetailsForm({ email }) {
  const router = useRouter();
  const { login, forceUpdate, setClientDetailsSaved } = useAuth();
  const [details, setDetails] = useState({
    email: email || "",
    fullName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    profilePicture: null, // changed to null for File object
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // New handler for profile picture file input
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetails({ ...details, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Create preview URL when profilePicture changes
  useEffect(() => {
    if (!details.profilePicture) {
      setPreviewUrl(null);
      return;
    }
    setPreviewUrl(details.profilePicture);
  }, [details.profilePicture]);

  const handlePhoneChange = (values) => {
    const { value } = values;
    setDetails({ ...details, phoneNumber: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch("/api/auth/client-personal-details", {
        method: "POST",
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={details.email}
          readOnly
          className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fullName" className="block font-semibold mb-1">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={details.fullName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block font-semibold mb-1">
          Phone Number
        </label>
        <NumberFormat
          id="phoneNumber"
          name="phoneNumber"
          value={details.phoneNumber}
          onValueChange={handlePhoneChange}
          format="+880##########"
          mask="_"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="+8801704080389"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block font-semibold mb-1">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={details.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={3}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dateOfBirth" className="block font-semibold mb-1">
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={details.dateOfBirth}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          max={new Date().toISOString().split("T")[0]}
          title="Date of birth cannot be today or in the future"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="profilePicture" className="block font-semibold mb-1">
          Profile Picture
        </label>
        <input
          id="profilePicture"
          name="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="mt-2 h-24 w-24 object-cover rounded-full"
          />
        )}
      </div>
      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {saving ? "Saving..." : "Save Personal Details"}
      </button>
      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}
