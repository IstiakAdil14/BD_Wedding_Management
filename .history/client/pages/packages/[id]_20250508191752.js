import { useRouter } from "next/router";
import { useState } from "react";

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

  const pkg = packages.find((p) => p.id === parseInt(id, 10));

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    specialRequests: "",
  });

  if (!pkg) {
    return <div className="p-8 text-center">Loading package details...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Booking submitted for ${pkg.title}:\n` +
        JSON.stringify(bookingDetails, null, 2)
    );
    // Here you can add actual booking logic, e.g. API call
  };

  return (
    <section className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-pink-600">{pkg.title}</h1>
      <p className="mb-4 text-gray-700">{pkg.description}</p>
