import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/DarkModeContext";

const PackageDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, email: authEmail , name: a } = useAuth();
  const { darkMode } = useContext(DarkModeContext);

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    specialRequests: "",
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchPackage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/services/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch package");
        }
        const data = await res.json();
        setPkg(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPkg(null);
      }
      setLoading(false);
    };
    fetchPackage();
  }, [id]);

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

  if (loading) {
    return (
      <div className={`p-8 text-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Loading package details...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-8 text-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Error: {error}
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className={`p-8 text-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Package not found.
      </div>
    );
  }

  return (
    <section
      className={`max-w-3xl mx-auto p-8 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } rounded-lg shadow-md`}
    >
      <h1
        className={`text-4xl font-bold mb-4 ${
          darkMode ? "text-pink-400" : "text-pink-600"
        }`}
      >
        {pkg.title}
      </h1>
      {pkg.image && (
        <div className="mb-6">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-auto rounded shadow-md object-cover"
          />
        </div>
      )}
      <div
        className={`mb-4 p-4 border rounded italic ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-gray-300"
            : "bg-pink-50 border-pink-200 text-gray-700"
        }`}
      >
        {pkg.description}
      </div>
      {pkg.features && pkg.features.length > 0 && (
        <ul
          className={`mb-6 list-disc list-inside space-y-1 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className={`w-5 h-5 mr-2 flex-shrink-0 ${
                  darkMode ? "text-pink-400" : "text-pink-600"
                }`}
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
      <p
        className={`mb-8 text-2xl font-semibold ${
          darkMode ? "text-pink-400" : "text-pink-700"
        }`}
      >
        {pkg.price}
      </p>

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
