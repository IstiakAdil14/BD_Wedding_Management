import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ProfilePictureUpload from "./ProfilePictureUpload";

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await fetch("/api/auth/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        reset({
          name: data.name || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    setError(null);
    setSuccess(null);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to save profile");
      }
      setSuccess("Profile saved successfully");
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold mb-1">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
          type="text"
          className={`w-full border rounded px-3 py-2 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block font-semibold mb-1">
          Phone
        </label>
        <input
          id="phone"
          {...register("phone")}
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
