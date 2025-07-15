import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ServicePackages = () => {
  const { isAuthenticated, accessToken } = useAuth();
  const router = useRouter();

  const [packages, setPackages] = useState([]);
  const [customizeServices, setCustomizeServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [showCustomizeForm, setShowCustomizeForm] = useState(false);
  const [customDetails, setCustomDetails] = useState({
    selectedCategory: "",
    selectedEventType: "",
    guestCount: "",
    specialRequests: "",
    ratePerGuest: 0,
    categoryDescription: "",
    totalPrice: 0,
  });

  const getTomorrowDateString = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: getTomorrowDateString(),
  });

  const [editorState, setEditorState] = useState(() =>
    customDetails.specialRequests
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(customDetails.specialRequests)))
      : EditorState.createEmpty()
  );

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();
        const packagesWithCustomize = [
          ...data,
          {
            _id: "customize",
            title: "Customize Package",
            description: "",
            price: "",
          },
        ];
        setPackages(packagesWithCustomize);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    const fetchCustomizeServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/customizeServices"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch customized services");
        }
        const data = await response.json();
        setCustomizeServices(data);

        // Derive unique categories from customizeServices data
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);

        // If a category is already selected, filter event types for that category
        if (customDetails.selectedCategory) {
          const filteredEventTypes = data
            .filter((item) => item.category === customDetails.selectedCategory)
            .map((item) => item.eventType);
          setEventTypes([...new Set(filteredEventTypes)]);
        } else {
          setEventTypes([]);
        }
      } catch (error) {
        console.error("Error fetching customized services:", error);
      }
    };

    fetchPackages();
    fetchCustomizeServices();
  }, []);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      const fetchProfileData = async () => {
        try {
          const decoded = JSON.parse(
            atob(
              accessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
            )
          );
          const email =
            decoded.email ||
            decoded.user_email ||
            decoded.sub ||
            decoded.username ||
            null;
          if (email) {
            const res = await fetch(
              `http://localhost:5000/api/auth/client-personal-details?email=${encodeURIComponent(
                email
              )}`
            );
            if (res.ok) {
              const profile = await res.json();
              setUserDetails((prev) => ({
                ...prev,
                name: profile.fullName || "",
                email: profile.email || "",
                phone: profile.phoneNumber || "",
              }));
            }
          }
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
        }
      };
      fetchProfileData();
    }
  }, [isAuthenticated, accessToken]);

  const handleOpenCustomize = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    const tomorrowStr = `${yyyy}-${mm}-${dd}`;
    setUserDetails((prev) => ({
      ...prev,
      eventDate: tomorrowStr,
    }));
    setShowCustomizeForm(true);
  };

  const handleCloseCustomize = () => {
    setShowCustomizeForm(false);
    setCustomDetails({
      selectedCategory: "",
      selectedEventType: "",
      guestCount: "",
      specialRequests: "",
      ratePerGuest: 0,
      categoryDescription: "",
      totalPrice: 0,
    });
    setUserDetails({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
    });
    setEventTypes([]); // Clear event types on close
  };

  const calculatePrice = (guestCount, ratePerGuest) => {
    const guests = parseInt(guestCount, 10);
    const rateGuest = parseFloat(ratePerGuest);
    if (isNaN(guests) || isNaN(rateGuest)) return 0;
    return guests * rateGuest;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedDetails = { ...customDetails, [name]: value };

    if (name === "selectedCategory") {
      // When category changes, update event types accordingly
      const filteredEventTypes = customizeServices
        .filter((item) => item.category === value)
        .map((item) => item.eventType);
      setEventTypes([...new Set(filteredEventTypes)]);

      // Reset selectedEventType when category changes
      updatedDetails.selectedEventType = "";
    }

    if (name === "selectedCategory" || name === "selectedEventType") {
      const matchedService = customizeServices.find(
        (cs) =>
          cs.category ===
            (name === "selectedCategory"
              ? value
              : customDetails.selectedCategory) &&
          cs.eventType ===
            (name === "selectedEventType"
              ? value
              : customDetails.selectedEventType)
      );
      if (matchedService) {
        updatedDetails.ratePerGuest = matchedService.ratePerGuest;
        updatedDetails.categoryDescription = matchedService.categoryDescription;
      } else {
        updatedDetails.ratePerGuest = 0;
        updatedDetails.categoryDescription = "";
      }
    }

    updatedDetails.totalPrice = calculatePrice(
      updatedDetails.guestCount,
      updatedDetails.ratePerGuest
    );

    setCustomDetails(updatedDetails);
  };

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    if (name === "eventDate") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (selectedDate < tomorrow) {
        alert("Event date must be from tomorrow onwards.");
        return;
      }
    }
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.phone ||
      !userDetails.eventDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const bookingData = {
      packageId: null,
      packageName: "Customize Package",
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      eventDate: userDetails.eventDate,
      specialRequests: customDetails.specialRequests,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Failed to submit booking: " + errorData.error);
        return;
      }

      alert("Booking submitted successfully!");
      handleCloseCustomize();
    } catch (error) {
      alert("Error submitting booking: " + error.message);
    }
  };

  const handlePackageClick = (pkg) => {
    if (pkg.title === "Customize Package") {
      handleOpenCustomize();
    } else {
      router.push(`/packages/${pkg._id}`);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-pink-300 to-purple-300 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold text-white mb-8">
          Our Service Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {packages
            .filter((pkg) => pkg.enabled === true || pkg._id === "customize")
            .map((pkg) => (
              <motion.div
                key={pkg._id}
                className={`bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${
                  pkg.title === "Customize Package"
                    ? "border-4 border-dashed border-pink-600"
                    : ""
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => handlePackageClick(pkg)}
              >
                <h3 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4">
                  {pkg.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {pkg.description ||
                    (pkg.title === "Customize Package"
                      ? "Click to customize your package"
                      : "")}
                </p>
                <p className="text-2xl font-semibold text-pink-700 dark:text-pink-400">
                  {pkg.price}
                </p>
              </motion.div>
            ))}
        </div>
      </div>

      {showCustomizeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-full w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg mx-auto relative"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              type="button"
              onClick={handleCloseCustomize}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Customize Your Package
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-gray-900 dark:text-white"
            >
              <div>
                <label
                  htmlFor="selectedCategory"
                  className="block font-semibold mb-1"
                >
                  Select Category
                </label>
                <select
                  id="selectedCategory"
                  name="selectedCategory"
                  value={customDetails.selectedCategory}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                  required
                >
                  <option value="" disabled>
                    -- Select a category --
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="selectedEventType"
                  className="block font-semibold mb-1"
                >
                  Select Event Type
                </label>
                <select
                  id="selectedEventType"
                  name="selectedEventType"
                  value={customDetails.selectedEventType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                  required
                >
                  <option value="" disabled>
                    -- Select an event type --
                  </option>
                  {eventTypes.map((et) => (
                    <option key={et} value={et}>
                      {et}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-2 font-semibold">Category Description:</p>
                <p className="mb-4">{customDetails.categoryDescription}</p>
              </div>
              <div>
                <label
                  htmlFor="guestCount"
                  className="block font-semibold mb-1"
                >
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={customDetails.guestCount}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                />
              </div>
              <div>
                <label
                  htmlFor="ratePerGuest"
                  className="block font-semibold mb-1"
                >
                  Rate Per Guest (BDT)
                </label>
                <input
                  type="number"
                  id="ratePerGuest"
                  name="ratePerGuest"
                  value={customDetails.ratePerGuest}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-200 dark:bg-gray-600 cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="specialRequests"
                  className="block font-semibold mb-1"
                >
                  Special Requests
                </label>
                <div
                  id="specialRequests"
                  name="specialRequests"
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 min-h-[100px]"
                >
                  <Editor
                    editorState={editorState}
                    onChange={(newState) => {
                      setEditorState(newState);
                      const contentState = newState.getCurrentContent();
                      setCustomDetails((prev) => ({
                        ...prev,
                        specialRequests: JSON.stringify(convertToRaw(contentState)),
                      }));
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleUserDetailsChange}
                  required
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleUserDetailsChange}
                  required
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block font-semibold mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleUserDetailsChange}
                  required
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
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
                  value={userDetails.eventDate}
                  onChange={handleUserDetailsChange}
                  min={getTomorrowDateString()}
                  required
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                />
              </div>

              <div className="text-lg font-semibold">
                Total Price: BDT {customDetails.totalPrice.toFixed(2)}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseCustomize}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ServicePackages;
