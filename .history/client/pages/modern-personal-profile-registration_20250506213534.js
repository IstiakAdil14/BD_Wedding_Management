import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NumericFormat } from "react-number-format";

export default function ModernPersonalProfileRegistration() {
  const router = useRouter();
  const { email } = router.query;

  const [details, setDetails] = useState({
    email: email || "",
    fullName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
  });

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

  const handlePhoneChange = (values) => {
    const { value } = values;
    setDetails({ ...details, phoneNumber: value });
  };

  const validatePhoneNumber = (phone) => {
    // Validate Bangladeshi phone number: +880 followed by 10 digits
    const regex = /^\+880\d{10}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    if (!validatePhoneNumber(details.phoneNumber)) {
      setError(
        "Please enter a valid Bangladeshi phone number starting with +880."
      );
      setSaving(false);
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch("/api/auth/client-personal-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(details),
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
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
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
            htmlFor="fullName"
            className="block text-sm font-semibold mb-1"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={details.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-semibold mb-1"
          >
            Phone Number
          </label>
          <NumericFormat
            id="phoneNumber"
            name="phoneNumber"
            value={details.phoneNumber}
            onValueChange={handlePhoneChange}
            format="+880##########"
            mask="_"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+8801704080389"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-semibold mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={details.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-semibold mb-1"
          >
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={details.dateOfBirth}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            max={new Date().toISOString().split("T")[0]}
            title="Date of birth cannot be today or in the future"
            required
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {saving ? "Saving..." : "Save Personal Details"}
        </button>
        {success && (
          <p className="text-green-600 mt-4 text-center">{success}</p>
        )}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
