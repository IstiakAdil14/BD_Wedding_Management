import React, { useState } from "react";
import { useRouter } from "next/router";
import { NumericFormat as NumberFormat } from "react-number-format";
import { useAuth } from "../context/AuthContext";
import ProfilePictureUpload from "./ProfilePictureUpload";

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
    profilePicture: "", // will hold URL string
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
