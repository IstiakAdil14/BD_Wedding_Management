import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ClientPersonalDetailsForm() {
  const router = useRouter();
  const [details, setDetails] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      setError(null);
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await fetch("/api/auth/client-personal-details", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch personal details");
        }
        const data = await res.json();
        setDetails({
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : "",
          gender: data.gender || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, []);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
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
        throw new Error("Failed to save personal details");
      }
      setSuccess("Personal details saved successfully");
      // Optionally redirect after save
      // router.push("/somepage");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading personal details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
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
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={details.phoneNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
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
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block font-semibold mb-1">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={details.gender}
          onChange={handleChange}
