import React, { useState } from "react";
import { useRouter } from "next/router";

const VerifyOtp = () => {
  const router = useRouter();
  const { email } = router.query;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: Implement OTP verification API call
