
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
