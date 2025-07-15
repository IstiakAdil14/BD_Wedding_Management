import React, { useState } from "react";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";

export default function ClientPersonalDetailsForm({ email }) {
  const router = useRouter();
  const [details, setDetails] = useState({
    email: email || "",
    fullName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
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
      router.push("/");
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
