import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import PortfolioCategoryDialog from "../components/PortfolioCategoryDialog";
import useWindowWidth from "../hooks/useWindowWidth";
import draftToHtml from "draftjs-to-html";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import PortfolioEventDialog from "../components/PortfolioEventDialog";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const PortfolioPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const width = useWindowWidth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [showTable, setShowTable] = useState(false); // default hidden

  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [showEventTable, setShowEventTable] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchEvents();
  }, []);

  const handleOpenDialog = (category = null) => {
    console.log("Edit button clicked for category:", category);
    setEditCategory(category);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditCategory(null);
    setIsDialogOpen(false);
  };

  const handleSaveCategory = async (newCategory) => {
    // After adding, refetch categories to refresh the list
    await fetchCategories();
  };

  const handleUpdateCategory = async (updatedCategory) => {
    // After updating, refetch categories to refresh the list
    await fetchCategories();
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchCategories();
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const handleOpenEventDialog = (event = null) => {
    setEditEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleCloseEventDialog = () => {
    setEditEvent(null);
    setIsEventDialogOpen(false);
  };

  const handleSaveEvent = async (newEvent) => {
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (res.ok) {
        await fetchEvents();
        alert("Event saved successfully.");
      } else {
        alert("Failed to save event.");
        console.error("Failed to save event");
      }
    } catch (error) {
      alert("Error saving event.");
      console.error("Error saving event", error);
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {
    // After updating, refetch events to refresh the list
    await fetchEvents();
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchEvents();
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  // Utility to convert Draft.js raw content state to HTML string
  const convertDescriptionToHtml = (description) => {
    if (!description) return "";
    if (typeof description === "string") return description;
    try {
      return draftToHtml(description);
    } catch (error) {
      console.error("Failed to convert description to HTML", error);
      return "";
    }
  };

  // Utility to truncate text to maxLength characters with ellipsis
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <motion.div
      className={`flex h-fullscreen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-1">
        {width >= 580 ? (
          <motion.nav
            className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
              darkMode
                ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
                : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
            }`}
            variants={itemVariants}
          >
            <ManagementMenu />
          </motion.nav>
        ) : (
          <div className="p-4 sticky top-0 left-0">
            <HamburgerMenu />
          </div>
        )}

        <motion.main
          className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen"
          variants={itemVariants}
          style={{ marginLeft: "2rem" }}
        >
          <button
            onClick={() => handleOpenDialog()}
            className={`mt-20 mb-4 px-4 py-2 rounded hover:bg-blue-700 ${
              darkMode ? "bg-blue-800 text-white" : "bg-blue-600 text-white"
            }`}
          >
            <AddIcon
              style={{ verticalAlign: "middle", marginRight: "0.5rem" }}
            />
            New Category
          </button>
          <button
            onClick={() => setShowTable(!showTable)}
            className={`mt-20 mb-4 ml-4 px-4 py-2 rounded hover:bg-green-700 ${
              darkMode ? "bg-green-800 text-white" : "bg-green-600 text-white"
            }`}
          >
            Categories {showTable ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </button>

          <button
            onClick={() => handleOpenEventDialog()}
            className={`mt-20 mb-4 px-4 py-2 rounded hover:bg-purple-700 ${
              darkMode ? "bg-purple-800 text-white" : "bg-purple-600 text-white"
            }`}
          >
            Add Event
          </button>
          {/* Removed button to toggle event table display as per user request */}

          {console.log("Editing category passed to dialog:", editCategory)}
          <PortfolioCategoryDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onSave={(category) => {
              if (editCategory) {
                handleUpdateCategory(category);
              } else {
                handleSaveCategory(category);
              }
            }}
            category={editCategory}
          />

          {console.log("Editing event passed to dialog:", editEvent)}
          <PortfolioEventDialog
            isOpen={isEventDialogOpen}
            onClose={handleCloseEventDialog}
            onSave={(event) => {
              if (editEvent) {
                handleUpdateEvent(event);
              } else {
                handleSaveEvent(event);
              }
            }}
            event={editEvent}
          />

          {showTable && (
            <table className="min-w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                    >
                      No category available
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-200">
                      <td className="border border-gray-300 px-4 py-2">
                        {cat.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {truncateText(
                          typeof cat.description === "string"
                            ? cat.description
                            : convertDescriptionToHtml(cat.description).replace(
                                /<[^>]+>/g,
                                ""
                              ),
                          20
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 space-x-2 flex">
                        <button
                          onClick={() => handleOpenDialog(cat)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded flex items-center justify-center"
                          aria-label={`Edit category ${cat.name}`}
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded flex items-center justify-center"
                          aria-label={`Delete category ${cat.name}`}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {showEventTable && (
            <table className="min-w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Title
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Category
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                    >
                      No events available
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event._id} className="hover:bg-gray-200">
                      <td className="border border-gray-300 px-4 py-2">
                        {event.title}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {event.category}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {event.image}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {truncateText(
                          typeof event.description === "string"
                            ? convertDescriptionToHtml(JSON.parse(event.description)).replace(/<[^>]+>/g, "")
                            : convertDescriptionToHtml(event.description).replace(/<[^>]+>/g, ""),

                          20
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 space-x-2 flex">
                        <button
                          onClick={() => handleOpenEventDialog(event)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded flex items-center justify-center"
                          aria-label={`Edit event ${event.title}`}
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded flex items-center justify-center"
                          aria-label={`Delete event ${event.title}`}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </motion.main>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
