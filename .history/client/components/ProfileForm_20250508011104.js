import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { useAuth } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

export default function ProfileForm({ onSave, initialProfile }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { email, accessToken } = useAuth();
  const { darkMode } = useContext(DarkModeContext);

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

}
}
