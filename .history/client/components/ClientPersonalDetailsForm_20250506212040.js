import React, { useState } from "react";
import { useRouter } from "next/router";
import { NumericFormat as NumberFormat } from "react-number-format";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { NumericFormat as NumberFormat } from "react-number-format";
import { useAuth } from "../context/AuthContext";

export default function ClientPersonalDetailsForm({ email }) {
  const router = useRouter();
  const { login, forceUpdate, setClientDetailsSaved } = useAuth();
  const [details, setDetails] = React.useState({
    email: email || "",
    fullName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    profilePicture: "", // will hold URL string
  });
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

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
        method: "POST",
