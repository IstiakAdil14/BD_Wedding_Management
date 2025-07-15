import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import ServiceDialog from "../components/ServiceDialog";
import CustomizeServiceDialog from "../components/CustomizeServiceDialog";
import HamburgerMenu from "../components/HamburgerMenu";
import ManagementMenu from "../components/ManagementMenu";
import useWindowWidth from "../hooks/useWindowWidth";
import { DarkModeContext } from "../context/DarkModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";
import AddBoxIcon from '@mui/icons-material/AddBox';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const ServicesPage = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [services, setServices] = useState([]);
  const [customizeServices, setCustomizeServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [customizeDialogOpen, setCustomizeDialogOpen] = useState(false);
  const [customizeEditData, setCustomizeEditData] = useState(null);

  const [showCustomizeServices, setShowCustomizeServices] = useState(false);

  const windowWidth = useWindowWidth();
  const [hasMounted, setHasMounted] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper function to truncate string to max length with ellipsis
  const truncateString = (str, maxLength = 6) => {
    if (!str) return "";
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "...";
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
    setLoading(false);
  };

  const fetchCustomizeServices = async () => {
    try {
      const res = await fetch("/api/customizeServices");
      if (res.ok) {
        const data = await res.json();
        setCustomizeServices(data);
      } else {
        console.error("Failed to fetch customized services");
      }
    } catch (error) {
      console.error("Error fetching customized services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchCustomizeServices();
  }, []);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  const handleAddClick = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const handleEditClick = (service) => {
    console.log("Editing service:", service);
    setEditData(service);
    setDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchServices();
      } else {
        console.error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleSave = async (data) => {
    console.log("handleSave called with data:", data);
    if (editData && !data._id) {
      console.warn(
        "Editing existing service but data._id is missing. This may cause creation of a new service."
      );
      data._id = editData._id; // Fix: assign _id from editData if missing
    }
    try {
      const method = data._id ? "PUT" : "POST";
      const url = data._id ? `/api/services/${data._id}` : "/api/services";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setDialogOpen(false);
        fetchServices();
      } else {
        console.error("Failed to save service");
      }
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleCustomizeServiceClick = (customizeService = null) => {
    console.log(
      "Opening CustomizeServiceDialog with service:",
      customizeService
    );
    setCustomizeEditData(customizeService);
    setCustomizeDialogOpen(true);
  };

  const handleCustomizeSave = async (data) => {
    try {
      if (data._id) {
        // Update existing entry
        const url = `/api/customizeServices/${data._id}`;
        const res = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setCustomizeDialogOpen(false);
          fetchCustomizeServices();
        } else {
          const errorData = await res.json();
          alert(
            `Failed to save customized service: ${
              errorData.error || "Unknown error"
            }`
          );
          console.error("Failed to save customized service:", errorData);
        }
      } else {
        // Create new entry
        const url = "/api/customizeServices";
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setCustomizeDialogOpen(false);
          fetchCustomizeServices();
        } else {
          const errorData = await res.json();
          alert(
            `Failed to create customized service: ${
              errorData.error || "Unknown error"
            }`
          );
          console.error("Failed to create customized service:", errorData);
        }
      }
    } catch (error) {
      console.error("Error saving customized service:", error);
    }
  };

  const handleAddCustomizeServiceClick = () => {
    setCustomizeEditData(null);
    setCustomizeDialogOpen(true);
  };
  if (!hasMounted) return null;

  return (
    <motion.div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-1 ">
        {windowWidth <= 768 ? (
          <HamburgerMenu />
        ) : (
          isMounted && (
            <nav
              className={`flex flex-col w-60 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
                darkMode
                  ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
                  : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
              }`}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <ManagementMenu />
            </nav>
          )
        )}
        <div className="flex-1 ml-12 p-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Service Packages</h1>
          </div>
          <div className="mb-4 flex items-center space-x-2">
            <button
              onClick={handleAddClick}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-1"
            >
              <AddBoxIcon />
              <span>Add New Service</span>
            </button>
            <button
              onClick={handleAddCustomizeServiceClick}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-1"
            >
              <CategoryIcon />
              <span>Service Category</span>
            </button>
            <button
              onClick={() => setShowCustomizeServices(!showCustomizeServices)}
              aria-label={
                showCustomizeServices
                  ? "Hide Customized Services"
                  : "Show Customized Services"
              }
              className="p-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              {showCustomizeServices ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : services.length === 0 ? (
            <p>No services found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="border rounded p-4 shadow hover:shadow-lg transition"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h2>
                    <p className="mb-2 text-gray-900 dark:text-gray-300">
                      {service.description}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(service)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
                        aria-label="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(service._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center"
                        aria-label="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {showCustomizeServices && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold">Customized Services</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded dark:border-gray-700">
                      <thead>
                        <tr className="bg-gray-300 dark:bg-gray-700">
                          <th className="border px-4 py-2 text-gray-900 dark:text-gray-300">
                            Category
                          </th>
                          <th className="border px-4 py-2 text-gray-900 dark:text-gray-300">
                            Event Type
                          </th>
                          <th className="border px-0 py-1 text-gray-900 dark:text-gray-300">
                            Category Description
                          </th>
                          <th className="border px-4 py-1 text-gray-900 dark:text-gray-300">
                            Rate Per Guest (BDT)
                          </th>
                          <th className="border px-4 py-2 text-gray-900 dark:text-gray-300">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {customizeServices.length === 0 ? (
                          <tr>
                            <td
                              colSpan="5"
                              className="text-center p-4 text-gray-900 dark:text-gray-300"
                            >
                              No customized services found.
                            </td>
                          </tr>
                        ) : null}
                        {customizeServices.length > 0 &&
                          customizeServices.map((cs) => (
                            <tr
                              key={cs._id}
                              className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <td className="border px-2 py-2 text-gray-900 dark:text-gray-300 truncate-cell">
                                {truncateString(cs.category)}
                              </td>
                              <td className="border px-2 py-2 text-gray-900 dark:text-gray-300 truncate-cell">
                                {truncateString(cs.eventType)}
                              </td>
                              <td className="border px-2 py-2 text-gray-900 dark:text-gray-300 truncate-cell">
                                {truncateString(cs.categoryDescription)}
                              </td>
                              <td className="border px-2 py-2 text-gray-900 dark:text-gray-300 truncate-cell">
                                {truncateString(String(cs.ratePerGuest))}
                              </td>
                              <td className="border px-2 py-2">
                              <button
                                onClick={() =>
                                  handleCustomizeServiceClick(cs)
                                }
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
                                aria-label="Edit"
                              >
                                <EditIcon />
                              </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
          <ServiceDialog
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onSave={handleSave}
            initialData={editData}
          />
          <CustomizeServiceDialog
            isOpen={customizeDialogOpen}
            onClose={() => setCustomizeDialogOpen(false)}
            onSave={handleCustomizeSave}
            service={customizeEditData}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;

<style jsx>{`
  /* Day/Night mode styles */
  :global(body) {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  :global(body) {
    background-color: white;
    color: black;
  }
  :global(.dark) body {
    background-color: #1f2937; /* Tailwind gray-800 */
    color: #d1d5db; /* Tailwind gray-300 */
  }
  /* Additional styles for the services page */
  .services-container {
    min-height: 100vh;
  }
  :global(.dark) .services-container {
    background-color: #111827; /* Tailwind gray-900 */
  }
  /* Add hover scale effect to sidebar buttons to match HamburgerMenu */
  nav button {
    transition-property: transform;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }
  nav button:hover {
    transform: scale(1.05);
  }
  /* Truncate table cell text to max 6 characters on small screens */
  @media (max-width: 640px) {
    .truncate-cell {
      max-width: 6ch;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      vertical-align: bottom;
    }
  }
`}</style>;
