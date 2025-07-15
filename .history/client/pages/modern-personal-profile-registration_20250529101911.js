
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NumericFormat } from "react-number-format";

const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+91", name: "India" },
  { code: "+61", name: "Australia" },
  { code: "+81", name: "Japan" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+880", name: "Bangladesh" },
  { code: "+86", name: "China" },
  { code: "+7", name: "Russia" },
  // Add more country codes as needed
];

export default function ModernPersonalProfileRegistration() {
  const router = useRouter();
  const { email } = router.query;

  const [details, setDetails] = useState({
    email: email || "",
    password: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "", // added gender field
    profilePicture: "", // added profilePicture field
  });

  const [selectedCountryCode, setSelectedCountryCode] = useState("+880");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (email) {
      setDetails((prev) => ({ ...prev, email }));
    }
  }, [email]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };

  const validatePhoneNumber = (phone, countryCode) => {
    // Validate phone number: country code + exactly 10 digits
    const regex = new RegExp("^\\\\" + countryCode + "\\\\d{10}$");
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Remove previous email login token when signup processing starts
    localStorage.removeItem("accessToken");
    // Set registration processing flag
    localStorage.setItem("registrationProcessing", "true");

    setSaving(true);
    setError(null);
    setSuccess(null);

    // Prepend selected country code if missing for validation and submission
    let phoneNumberToValidate = details.phoneNumber;
    if (!phoneNumberToValidate.startsWith(selectedCountryCode)) {
      phoneNumberToValidate = selectedCountryCode + phoneNumberToValidate;
    }

    if (!validatePhoneNumber(phoneNumberToValidate, selectedCountryCode)) {
      setError(
        `Please enter a valid phone number starting with ${selectedCountryCode} and exactly 10 digits after the country code.`
      );
      setSaving(false);
      // Clear registration processing flag on error
      localStorage.setItem("registrationProcessing", "false");
      return;
    }

    try {
      // accessToken removed above, so no token sent here
      // Prepare details with full phone number including selected country code
      const detailsToSubmit = {
        ...details,
        phoneNumber: phoneNumberToValidate,
      };

      const res = await fetch("http://localhost:5000/api/modernPersonalDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // No Authorization header since token removed
        },
        body: JSON.stringify(detailsToSubmit),
      });

      if (!res.ok) {
        let errorText;
        try {
          const errorData = await res.clone().json();
          errorText = errorData.message || JSON.stringify(errorData);
        } catch {
          try {
            errorText = await res.clone().text();
          } catch {
            errorText = "Failed to save personal details";
          }
        }
        throw new Error(errorText || "Failed to save personal details");
      }
      setSuccess("Personal details saved successfully");
      localStorage.setItem("profileRegistered", "true");
      // Clear registration processing flag after success
      localStorage.setItem("registrationProcessing", "false");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
      // Clear registration processing flag on error
      localStorage.setItem("registrationProcessing", "false");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Personal Details</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={details.email}
            readOnly
            className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={details.password}
            onChange={handleChange}
