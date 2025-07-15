import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const packages = [
  {
    id: 1,
    title: "Basic Wedding Package",
    description:
      "Includes venue decoration, photography, and catering for up to 100 guests.",
    price: "BDT 50,000",
  },
  {
    id: 2,
    title: "Premium Wedding Package",
    description:
      "Includes all Basic features plus live music, bridal makeup, and luxury transport.",
    price: "BDT 1,20,000",
  },
  {
    id: 3,
    title: "Ultimate Wedding Package",
    description:
      "Full wedding planning, premium venue, entertainment, and personalized services.",
    price: "BDT 2,50,000",
  },
  {
    id: 4,
    title: "Customize Package",
    description: "",
    price: "",
  },
];

const PackageDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, email: authEmail } = useAuth();

  const pkg = packages.find((p) => p.id === parseInt(id, 10));

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    specialRequests: "",
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!pkg) {
    return <div className="p-8 text-center">Loading package details...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Redirect to login with redirect back to this page
      router.push(`/login?redirect=/packages/${id}`);
      return;
    }
    // Use authenticated email for booking
    const bookingEmail = authEmail || bookingDetails.email;
    // Simulate booking logic here, e.g. API call with bookingEmail
    setBookingSuccess(true);
    // Reset form except email to logged in email
    setBookingDetails({
      name: "",
