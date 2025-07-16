
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NumericFormat } from "react-number-format";
import { DarkModeContext } from "../context/DarkModeContext";

const countryCodes = [
  { code: "+1", name: "United States", length: 10 },
  { code: "+44", name: "United Kingdom", length: 10 },
  { code: "+91", name: "India", length: 10 },
  { code: "+61", name: "Australia", length: 9 },
  { code: "+81", name: "Japan", length: 10 },
  { code: "+49", name: "Germany", length: 11 },
  { code: "+33", name: "France", length: 9 },
  { code: "+880", name: "Bangladesh", length: 10 },
  { code: "+86", name: "China", length: 11 },
  { code: "+7", name: "Russia", length: 10 },
  // Add more country codes as needed
];

export default function ModernPersonalProfileRegistration() {
  const router = useRouter();
  const { email, password } = router.query;
  const { darkMode } = useContext(DarkModeContext);

  const [details, setDetails] = useState({
    email: email || "",
    password: password || "",
    fullName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "", // added gender field
    profilePicture: "", // added profilePicture field
  });

  const [selectedCountryCode, setSelectedCountryCode] = useState("+880");
  const [phoneNumberLength, setPhoneNumberLength] = useState(10);

  const [showPassword, setShowPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  useEffect(() => {
    if (email) {
      setDetails((prev) => ({ ...prev, email }));
    }
  }, [email]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (e) => {
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
            htmlFor="countryCode"
            className="block text-sm font-semibold mb-1"
          >
            Country Code
          </label>
          <select
            id="countryCode"
            name="countryCode"
            value={selectedCountryCode}
            onChange={handleCountryCodeChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countryCodes.map(({ code, name }) => (
              <option key={code} value={code}>
                {name} ({code})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-semibold mb-1"
          >
            Phone Number
          </label>
          <NumericFormat
            key={phoneNumberLength}
            id="phoneNumber"
            name="phoneNumber"
            value={details.phoneNumber}
            onValueChange={(values) => {
              let { value } = values;
              setDetails({ ...details, phoneNumber: value });
              // Live validation
              const fullPhone = selectedCountryCode + value;
              if (!validatePhoneNumber(fullPhone, selectedCountryCode, phoneNumberLength)) {
                setPhoneError(`Phone number must be exactly ${phoneNumberLength} digits after the country code.`);
              } else {
                setPhoneError(null);
              }
            }}
            isAllowed={(values) => {
              const { value } = values;
              return value.length <= phoneNumberLength;
            }}
            format={"#".repeat(phoneNumberLength)}
            mask="_"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={Array(phoneNumberLength).fill("0").join("")}
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
          <label className="block text-sm font-semibold mb-1">Gender</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={details.gender === "Male"}
                onChange={handleChange}
                className="form-radio"
                required
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={details.gender === "Female"}
                onChange={handleChange}
                className="form-radio"
                required
              />
              <span className="ml-2">Female</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={details.gender === "Other"}
                onChange={handleChange}
                className="form-radio"
                required
              />
              <span className="ml-2">Other</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              if (file.size > 10 * 1024 * 1024) {
                alert("File size must be less than 10MB");
                return;
              }
              const formData = new FormData();
              formData.append("profilePicture", file);
              try {
                const accessToken = localStorage.getItem("accessToken");
                const res = await fetch("/api/auth/upload-profile-picture", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: formData,
                });
                if (!res.ok) {
                  const errorData = await res.json();
                  alert(
                    "Upload failed: " + (errorData.message || res.statusText)
                  );
                  return;
                }
                const data = await res.json();
                setDetails((prev) => ({
                  ...prev,
                  profilePicture: data.filePath,
                }));
              } catch (err) {
                alert("Upload error: " + err.message);
              }
            }}
            className="w-full"
          />
          {details.profilePicture && (
            <img
              src={details.profilePicture}
              alt="Profile Preview"
              className="mt-2 max-h-40 rounded"
            />
          )}
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
          disabled={saving || phoneError !== null}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {saving ? "Saving..." : "Save Personal Details"}
        </button>
        {phoneError && <p className="text-red-600 mt-2 text-center">{phoneError}</p>}
        {success && (
          <p className="text-green-600 mt-4 text-center">{success}</p>
        )}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
