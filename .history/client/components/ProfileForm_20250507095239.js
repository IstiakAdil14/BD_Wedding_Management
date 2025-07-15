import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { useAuth } from "../context/AuthContext";

export default function ProfileForm({ onSave, initialProfile }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { email, accessToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    console.log("Edit Profile dialog opened with email:", email);
    if (initialProfile) {
      reset({
        fullName: initialProfile.fullName || "",
        phoneNumber: initialProfile.phoneNumber || "",
        address: initialProfile.address || "",
        profilePicture: initialProfile.profilePicture || "",
      });
      setLoading(false);
      setError(null);
    } else {
      async function fetchProfile() {
        setLoading(true);
        setError(null);
        try {
          if (!email) {
            throw new Error("Email not found in AuthContext");
          }
          const res = await fetch(
            "/api/auth/client-personal-details?email=" +
              encodeURIComponent(email),
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (!res.ok) {
            throw new Error("Failed to fetch profile");
          }
          const data = await res.json();
      reset({
        fullName: data.fullName || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
        profilePicture: data.profilePicture || "",
      });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchProfile();
    }
  }, [reset, initialProfile, email, accessToken]);

  const onUpload = (filePath) => {
    setValue("profilePicture", filePath);
  };

  const onSubmit = async (data) => {
    setError(null);
    setSuccess(null);
    try {
      if (!email) {
        setError("Email not found in AuthContext. Please login again.");
        return;
      }
      const { dateOfBirth, gender, ...rest } = data;
      const body = { ...rest, email };
      const res = await fetch("/api/auth/client-personal-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to save profile");
      }
      setSuccess("Profile saved successfully");
      if (onSave) {
        onSave();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="fullName" className="block font-semibold mb-1">
          Full Name
        </label>
        <input
          id="fullName"
          {...register("fullName", { required: "Full Name is required" })}
          type="text"
          className={`w-full border rounded px-3 py-2 ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block font-semibold mb-1">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          {...register("phoneNumber")}
          type="tel"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block font-semibold mb-1">
          Address
        </label>
        <textarea
          id="address"
          {...register("address")}
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
          {...register("dateOfBirth", {
            required: "Date of Birth is required",
          })}
          type="date"
          className={`w-full border rounded px-3 py-2 ${
            errors.dateOfBirth ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block font-semibold mb-1">
          Gender
        </label>
        <select
          id="gender"
          {...register("gender", { required: "Gender is required" })}
          className={`w-full border rounded px-3 py-2 ${
            errors.gender ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Profile Picture</label>
        <ProfilePictureUpload onUpload={onUpload} />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "Saving..." : "Save Profile"}
      </button>
      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}
