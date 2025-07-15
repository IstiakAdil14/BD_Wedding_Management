import React, { useState, useEffect } from "react";

export default function ProfileForm() {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/auth/profile", {
          headers: {
            "Content-Type": "application/json",
            // Add auth headers if needed
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        setProfile({
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
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add auth headers if needed
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        throw new Error("Failed to save profile");
      }
      setSuccess("Profile saved successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={profile.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block font-semibold mb-1">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={profile.phone}
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
          value={profile.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={3}
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}
