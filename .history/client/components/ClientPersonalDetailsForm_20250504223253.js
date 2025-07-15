import React, { useState } from "react";
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
    profilePicture: "", // added profile picture field
  });
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
      // Store the File object directly instead of base64 string
      setDetails({ ...details, profilePicture: file });
    }
  };

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
      let profilePictureUrl = details.profilePicture;

      // If profilePicture is a File object, upload it first
      if (details.profilePicture && details.profilePicture instanceof File) {
        const formData = new FormData();
        formData.append("profilePicture", details.profilePicture);

        const uploadRes = await fetch("/api/auth/upload-profile-picture", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json();
          throw new Error(
            errorData.error || "Failed to upload profile picture"
          );
        }

        const uploadData = await uploadRes.json();
        profilePictureUrl = uploadData.url;
      }

      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch("/api/auth/client-personal-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...details, profilePicture: profilePictureUrl }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save personal details");
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
          allowEmptyFormatting={false}
          isNumericString
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
        {details.profilePicture && (
          <img
            src={details.profilePicture}
            alt="Profile Preview"
            className="mt-2 object-cover rounded-full max-w-full max-h-96"
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
