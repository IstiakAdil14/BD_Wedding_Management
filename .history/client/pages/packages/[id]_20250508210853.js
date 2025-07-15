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
    features: [
      "Venue decoration",
      "Photography",
      "Catering for up to 100 guests",
      "Basic floral arrangements",
      "Standard music setup",
    ],
  },
  {
    id: 2,
    title: "Premium Wedding Package",
    description:
      "Includes all Basic features plus live music, bridal makeup, and luxury transport.",
    price: "BDT 1,20,000",
    features: [
      "All Basic Wedding Package features",
      "Live music performance",
      "Bridal makeup and hair styling",
      "Luxury transportation",
      "Premium floral arrangements",
      "Custom wedding cake",
    ],
  },
  {
    id: 3,
    title: "Ultimate Wedding Package",
    description:
      "Full wedding planning, premium venue, entertainment, and personalized services.",
    price: "BDT 2,50,000",
    features: [
      "Complete wedding planning and coordination",
      "Premium venue booking",
      "Entertainment including DJ and live band",
      "Personalized services and consultations",
      "Luxury transportation and accommodation",
      "Gourmet catering and custom menu",
    ],
  },
  {
    id: 4,
    title: "Customize Package",
    description: "",
    price: "",
    features: [],
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
      email: bookingEmail,
      phone: "",
      eventDate: "",
      specialRequests: "",
    });
  };

  return (
    <section className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-pink-600">{pkg.title}</h1>
      <div className="mb-4 p-4 bg-pink-50 border border-pink-200 rounded text-gray-700 italic">
        {pkg.description}
      </div>
      {pkg.features && pkg.features.length > 0 && (
        <ul className="mb-6 list-disc list-inside text-gray-700 space-y-1">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <p className="mb-8 text-2xl font-semibold text-pink-700">{pkg.price}</p>

      <h2 className="text-2xl font-semibold mb-4">Book this package</h2>

      {bookingSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
          Booking submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookingDetails.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          {isAuthenticated ? (
            <input
              type="email"
              id="email"
              name="email"
              value={authEmail}
              disabled
              className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          ) : (
            <input
              type="email"
              id="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={bookingDetails.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="eventDate" className="block font-semibold mb-1">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={bookingDetails.eventDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="specialRequests" className="block font-semibold mb-1">
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={bookingDetails.specialRequests}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Submit Booking
        </button>
      </form>
    </section>
  );
};

export default PackageDetails;
