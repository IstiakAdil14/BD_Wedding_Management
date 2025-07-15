import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/DarkModeContext";

import dynamic from "next/dynamic";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const PackageDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, email: authEmail, name: authName } = useAuth();
  const { darkMode } = useContext(DarkModeContext);

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for image slider

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    specialRequestsEditorState: EditorState.createEmpty(),
    sslcommerce: false,
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  // State for image slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Image slider effect: change image every 1 second
  useEffect(() => {
    if (!pkg || !pkg.image || pkg.image.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pkg.image.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [pkg]);

  // Fetch user profile to set name in booking form
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!authEmail) {
          throw new Error("No authenticated email available");
        }
        const res = await fetch(
          `http://localhost:5000/api/auth/client-personal-details?email=${encodeURIComponent(
            authEmail
          )}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const profileData = await res.json();
        if (profileData.email) {
          setBookingDetails((prev) => ({ ...prev, email: profileData.email }));
        }
        if (profileData.fullName) {
          setBookingDetails((prev) => ({
            ...prev,
            name: profileData.fullName,
          }));
        }
        if (profileData.phoneNumber) {
          setBookingDetails((prev) => ({
            ...prev,
            phone: profileData.phoneNumber,
          }));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated, authEmail]);

  // Initialize specialRequestsEditorState from bookingDetails.specialRequests string
  useEffect(() => {
    if (
      bookingDetails.specialRequests &&
      typeof bookingDetails.specialRequests === "string"
    ) {
      try {
        const contentState = convertFromRaw(
          JSON.parse(bookingDetails.specialRequests)
        );
        setBookingDetails((prev) => ({
          ...prev,
          specialRequestsEditorState:
            EditorState.createWithContent(contentState),
        }));
      } catch {
        setBookingDetails((prev) => ({
          ...prev,
          specialRequestsEditorState: EditorState.createEmpty(),
        }));
      }
    }
  }, [bookingDetails.specialRequests]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialRequestsChange = (editorState) => {
    setBookingDetails((prev) => ({
      ...prev,
      specialRequestsEditorState: editorState,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Redirect to login with redirect back to this page
      router.push(`/login?redirect=/packages/${id}`);
      return;
    }
    try {
      const bookingEmail = authEmail || bookingDetails.email;
      const specialRequestsRaw = JSON.stringify(
        convertToRaw(
          bookingDetails.specialRequestsEditorState.getCurrentContent()
        )
      );
      const response = await fetch(
        `http://localhost:5000/api/services/${id}/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageName: pkg.title,
            name: bookingDetails.name,
            email: bookingEmail,
            phone: bookingDetails.phone,
            eventDate: bookingDetails.eventDate,
            specialRequests: specialRequestsRaw,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit booking");
      }
      setBookingSuccess(true);
      setBookingDetails({
        name: "",
        email: bookingEmail,
        phone: "",
        eventDate: "",
        specialRequestsEditorState: EditorState.createEmpty(),
      });
    } catch (error) {
      console.error("Booking submission error:", error);
      alert(`Booking failed: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div
        className={`p-8 text-center ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Loading package details...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`p-8 text-center ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Error: {error}
      </div>
    );
  }

  if (!pkg) {
    return (
      <div
        className={`p-8 text-center ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
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
      {pkg.image && pkg.image.length > 0 && (
        <div className="mb-6">
          <img
            src={pkg.image[currentImageIndex]}
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
          <label
            htmlFor="name"
            className="block font-semibold mb-1 text-black dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookingDetails.name}
            readOnly
            required
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block font-semibold mb-1 text-black dark:text-white"
          >
            Email
          </label>
          {isAuthenticated ? (
            <input
              type="email"
              id="email"
              name="email"
              value={authEmail}
              disabled
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white cursor-not-allowed"
            />
          ) : (
            <input
              type="email"
              id="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
            />
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block font-semibold mb-1 text-black dark:text-white"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={bookingDetails.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="eventDate"
            className="block font-semibold mb-1 text-black dark:text-white"
          >
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={bookingDetails.eventDate}
            onChange={handleChange}
            required
            min={
              new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .split("T")[0]
            }
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="specialRequests"
            className="block font-semibold mb-1 text-black dark:text-white"
          >
            Special Requests
          </label>
          <div
            style={{
              minHeight: "150px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "4px",
              backgroundColor: darkMode ? "#374151" : "white",
            }}
          >
            <div
              style={{
                minHeight: "150px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                backgroundColor: darkMode ? "#374151" : "white",
                cursor: "text",
              }}
            >
              <Editor
                editorState={bookingDetails.specialRequestsEditorState}
                onEditorStateChange={handleSpecialRequestsChange}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "list",
                    "textAlign",
                    "link",
                    "emoji",
                    "image",
                    "remove",
                    "history",
                  ],
                  inline: {
                    options: ["bold", "italic", "underline", "strikethrough"],
                  },
                  blockType: {
                    options: [
                      "Normal",
                      "H1",
                      "H2",
                      "H3",
                      "H4",
                      "H5",
                      "H6",
                      "Blockquote",
                      "Code",
                    ],
                  },
                  list: {
                    options: ["unordered", "ordered"],
                  },
                }}
                placeholder="Enter special requests here..."
              />
            </div>{" "}
          </div>
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
