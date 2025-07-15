import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ProfileForm() {
  const router = useRouter();
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
