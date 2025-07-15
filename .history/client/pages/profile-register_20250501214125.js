import React, { useState, useEffect } from "react";

export default function ProfileRegister() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/auth/profile");
        if (!response.ok) {
          setLoading(false);
          return;
        }
        const data = await response.json();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          photo: data.photo || "",
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  async function handleSaveProfile() {
    try {
      const response = await fetch("/api/auth/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      if (!response.ok) {
        alert("Failed to save profile");
        return;
      }
      alert("Profile saved successfully");
      // Redirect or update UI as needed
    } catch (error) {
      alert("An error occurred while saving profile");
    }
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create / Update Profile</h1>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Photo</label>
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
        {profile.photo && (
          <img
            src={profile.photo}
            alt="Profile"
            className="mt-2 w-32 h-32 object-cover rounded-full"
          />
        )}
      </div>
      <button
        onClick={handleSaveProfile}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Save Profile
      </button>
    </div>
  );
}
