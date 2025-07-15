import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ClientPersonalDetailsForm() {
  const router = useRouter();
  const [details, setDetails] = useState({
    email: "",
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
        console.log("Fetching personal details with accessToken:", accessToken);
        const res = await fetch("/api/auth/client-personal-details", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Response status:", res.status);
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Failed to fetch personal details:", errorText);
          throw new Error("Failed to fetch personal details");
        }
        const data = await res.json();
        console.log("Fetched personal details data:", data);
        setDetails({
          email: data.email || "",
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : "",
          gender: data.gender || "",
        });
      } catch (err) {
        console.error("Error fetching personal details:", err);
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
        <label htmlFor="email" className="block font-semibold mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={details.email}
          readOnly
  );
}
