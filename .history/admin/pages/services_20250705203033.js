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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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

  const [isMounted, setIsMounted] = useState(false);

  const [categories, setCategories] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  const [newEventTypeName, setNewEventTypeName] = useState("");
  const [newEventTypeRate, setNewEventTypeRate] = useState("");
  const [newEventTypeCategory, setNewEventTypeCategory] = useState("");
  const [addingEventType, setAddingEventType] = useState(false);

  const [categories, setCategories] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  const [newEventTypeName, setNewEventTypeName] = useState("");
  const [newEventTypeRate, setNewEventTypeRate] = useState("");
  const [newEventTypeCategory, setNewEventTypeCategory] = useState("");
  const [addingEventType, setAddingEventType] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        setCategories([]);
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      setCategories([]);
      console.error("Error fetching categories:", error);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const res = await fetch("/api/eventTypes");
      if (res.ok) {
        const data = await res.json();
        setEventTypes(data);
      } else {
        setEventTypes([]);
        console.error("Failed to fetch event types");
      }
    } catch (error) {
      setEventTypes([]);
      console.error("Error fetching event types:", error);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchCustomizeServices();
    fetchCategories();
    fetchEventTypes();
  }, []);

  const handleAddClick = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const handleEditClick = (service) => {
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
      console.warn("Editing existing service but data._id is missing. This may cause creation of a new service.");
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
      // Always use PUT to update existing entry
      if (!data._id) {
        alert(
          "Cannot create new customized service entry. Only updates are allowed."
        );
        return;
      }
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
    } catch (error) {
      console.error("Error saving customized service:", error);

  // New code added below

  const [categories, setCategories] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  const [newEventTypeName, setNewEventTypeName] = useState("");
  const [newEventTypeRate, setNewEventTypeRate] = useState("");
  const [newEventTypeCategory, setNewEventTypeCategory] = useState("");
  const [addingEventType, setAddingEventType] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchEventTypes();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        setCategories([]);
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      setCategories([]);
      console.error("Error fetching categories:", error);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const res = await fetch("/api/eventTypes");
      if (res.ok) {
        const data = await res.json();
        setEventTypes(data);
      } else {
        setEventTypes([]);
        console.error("Failed to fetch event types");
      }
    } catch (error) {
      setEventTypes([]);
      console.error("Error fetching event types:", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Category name is required");
      return;
    }
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategoryName,
          description: newCategoryDescription,
        }),
      });
      if (res.ok) {
        setNewCategoryName("");
        setNewCategoryDescription("");
        setAddingCategory(false);
        fetchCategories();
      } else {
        alert("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category");
    }
  };

  const handleAddEventType = async () => {
    if (!newEventTypeName.trim()) {
      alert("Event type name is required");
      return;
    }
    if (!newEventTypeCategory) {
      alert("Please select a category for the event type");
      return;
    }
    const rate = parseFloat(newEventTypeRate);
    if (isNaN(rate) || rate < 0) {
      alert("Please enter a valid rate per guest");
      return;
    }
    try {
      const res = await fetch("/api/eventTypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newEventTypeName,
          category: newEventTypeCategory,
          ratePerGuest: rate,
        }),
      });
      if (res.ok) {
        setNewEventTypeName("");
        setNewEventTypeRate("");
        setNewEventTypeCategory("");
        setAddingEventType(false);
        fetchEventTypes();
      } else {
        alert("Failed to add event type");
      }
    } catch (error) {
      console.error("Error adding event type:", error);
      alert("Error adding event type");
    }
  };

  return (
    <>
      {/* Existing JSX code above */}
      <div className="mb-4">
        {addingCategory ? (
          <div className="space-y-2 p-4 border rounded bg-gray-200 dark:bg-gray-700">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Category Description"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Category
              </button>
              <button
                onClick={() => setAddingCategory(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAddingCategory(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add New Category
          </button>
        )}
      </div>

      <div className="mb-4">
        {addingEventType ? (
          <div className="space-y-2 p-4 border rounded bg-gray-200 dark:bg-gray-700">
            <input
              type="text"
              placeholder="Event Type Name"
              value={newEventTypeName}
              onChange={(e) => setNewEventTypeName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <select
              value={newEventTypeCategory}
              onChange={(e) => setNewEventTypeCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Rate Per Guest (BDT)"
              value={newEventTypeRate}
              onChange={(e) => setNewEventTypeRate(e.target.value)}
              className="w-full p-2 border rounded"
              min="0"
              step="0.01"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddEventType}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Event Type
              </button>
              <button
                onClick={() => setAddingEventType(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAddingEventType(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add New Event Type
          </button>
        )}
      </div>

      {/* Existing JSX code below */}
      <CustomizeServiceDialog
        isOpen={customizeDialogOpen}
        onClose={() => setCustomizeDialogOpen(false)}
        onSave={handleCustomizeSave}
        service={customizeEditData}
        categories={categories}
        eventTypes={eventTypes.filter(
          (et) => et.category === (customizeEditData ? customizeEditData.category : "")
        )}
      />
    </>
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
`}</style>;
