import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AdminSignup = () => {
const router = useRouter();
const [email, setEmail] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
setError("");
setLoading(true);
try {
const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/admin/signup-start", { email });
if (response.data.message) {
router.push({
pathname: "/admin/verify-otp",
query: { email },
});
}
} catch (err) {
setError(err.response?.data?.message || "Error sending OTP");
} finally {
setLoading(false);
}
};

return (

Admin Sign Up


Email Address

<input
id="email"
type="email"
required
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full p-2 border rounded mb-4"
placeholder="Enter your email"
/>
{error && {error}}

{loading ? "Sending OTP..." : "Send OTP"}



);
};

export default AdminSignup;
