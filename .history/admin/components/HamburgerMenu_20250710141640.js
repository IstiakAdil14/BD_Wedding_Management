import React, { useState, useContext, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { DarkModeContext } from "../context/DarkModeContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import CommentIcon from "@mui/icons-material/Comment";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import ServiceDialog from "./ServiceDialog";
import EventGalleryDialog from "./EventGalleryDialog";
import TestimonialDialog from "./TestimonialDialog";
import WorkIcon from "@mui/icons-material/Work";

const managementItems = [
  { label: "Dashboard", icon: <BuildIcon />, route: "/dashboard" },
  {
    label: "Home Page",
    icon: <HomeIcon />,
    submenu: [
      { label: "Hero Section", route: "/home/hero-section" },
      { label: "Service Packages", route: "/home/service-packages" },
      { label: "Footer", route: "/home/footer" },
    ],
  },
  {
    label: "Packages",
    icon: <MiscellaneousServicesIcon />,
    route: "/services",
  },
  { label: "Portfolio", icon: <WorkIcon />, route: "/portfolio" },
  { label: "Testimonials", icon: <CommentIcon />, route: "/testimonials" },
  { label: "Team Members", icon: <GroupIcon />, route: "/team" },
  { label: "Contact Info", icon: <ContactMailIcon />, route: "/contact" },
  { label: "Orders Arrive", icon: <MessageIcon />, route: "/messages" },
  {
    label: "Admin Users",
    icon: <AdminPanelSettingsIcon />,
    route: "/adminUsers",
  },
];

const sidebarVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
};

const HamburgerMenu = () => {
  const router = useRouter();
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  // Dialog state
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [eventGalleryDialogOpen, setEventGalleryDialogOpen] = useState(false);
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);

  // Data for editing
  const [editData, setEditData] = useState(null);

  const handleSubmenuOpen = (label, event) => {
    setOpenSubmenu(label);
    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      setSubmenuPosition({
        top: rect.top,
        left: rect.right + 8, // 8px gap
      });
    }
  };

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Disable background scroll
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      // Enable background scroll
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Ensure scroll is enabled on unmount
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Open dialogs based on submenu label
  const handleSubmenuClick = (label) => {
    switch (label) {
      case "Hero Section":
        router.push("/home/hero-section");
        setIsOpen(false);
        break;
      case "Service Packages":
        router.push("/home/service-packages");
        setIsOpen(false);
        break;
      case "Event Gallery":
        setEditData(null);
        setEventGalleryDialogOpen(true);
        break;
      case "Testimonials":
        setEditData(null);
        setTestimonialDialogOpen(true);
        break;
      default:
        router.push(label.route || "/");
        setIsOpen(false);
    }
  };

  // Function to open dialog with selected item for editing
  const openServiceDialogWithItem = (item) => {
    setEditData(item);
    setServiceDialogOpen(true);
  };

  const openEventGalleryDialogWithItem = (item) => {
    setEditData(item);
    setEventGalleryDialogOpen(true);
  };

  const openTestimonialDialogWithItem = (item) => {
    setEditData(item);
    setTestimonialDialogOpen(true);
  };

  // Function to handle edit button click for testimonials
  const handleEditTestimonial = (testimonial) => {
    openTestimonialDialogWithItem(testimonial);
  };

  // State for lists
  const [services, setServices] = useState([]);
  const [eventGalleryItems, setEventGalleryItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, eventGalleryRes, testimonialsRes] =
          await Promise.all([
            fetch("/api/services"),
            fetch("/api/eventGallery"),
            fetch("/api/testimonials"),
          ]);
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }
        if (eventGalleryRes.ok) {
          const eventGalleryData = await eventGalleryRes.json();
          setEventGalleryItems(eventGalleryData);
        }
        if (testimonialsRes.ok) {
          const testimonialsData = await testimonialsRes.json();
          setTestimonials(testimonialsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Save handlers for dialogs
  const handleServiceSave = async (data) => {
    try {
      let res;
      if (data._id) {
        res = await fetch(`/api/services/${data._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      if (res.ok) {
        const savedService = await res.json();
        setServices((prev) => {
          const index = prev.findIndex((s) => s._id === savedService._id);
          if (index !== -1) {
            const newServices = [...prev];
            newServices[index] = savedService;
            return newServices;
          } else {
            return [...prev, savedService];
          }
        });
        setServiceDialogOpen(false);
      } else {
        console.error("Failed to save service");
      }
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleEventGallerySave = async (data) => {
    try {
      let res;
      if (data._id) {
        res = await fetch(`/api/eventGallery/${data._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/eventGallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      if (res.ok) {
        const savedItem = await res.json();
        setEventGalleryItems((prev) => {
          const index = prev.findIndex((item) => item._id === savedItem._id);
          if (index !== -1) {
            const newItems = [...prev];
            newItems[index] = savedItem;
            return newItems;
          } else {
            return [...prev, savedItem];
          }
        });
        setEventGalleryDialogOpen(false);
      } else {
        console.error("Failed to save event gallery item");
      }
    } catch (error) {
      console.error("Error saving event gallery item:", error);
    }
  };

  const handleTestimonialSave = async (data) => {
    try {
      let res;
      if (data._id) {
        res = await fetch(`/api/testimonials/${data._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      if (res.ok) {
        const savedTestimonial = await res.json();
        setTestimonials((prev) => {
          const index = prev.findIndex((t) => t._id === savedTestimonial._id);
          if (index !== -1) {
            const newTestimonials = [...prev];
            newTestimonials[index] = savedTestimonial;
            return newTestimonials;
          } else {
            return [...prev, savedTestimonial];
          }
        });
        setTestimonialDialogOpen(false);
      } else {
        console.error("Failed to save testimonial");
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  return (
    <>
      <button
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          darkMode
            ? "bg-gray-800 text-white focus:ring-blue-500"
            : "bg-blue-600 text-white focus:ring-blue-300"
        } fixed top-24 left-4 z-50`}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              onClick={() => setIsOpen(false)}
              style={{ pointerEvents: isOpen ? "auto" : "none" }}
              aria-hidden="true"
            />
            <motion.nav
              className={`fixed top-0 left-0 h-full w-60 p-4 space-y-4 shadow-lg overflow-y-auto overflow-visible rounded-r-lg z-50 ${
                darkMode
                  ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 text-white"
                  : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-gray-900 text-white"
              }`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sidebarVariants}
              ref={menuRef}
            >
              <h2 className="text-2xl font-extrabold mb-6">Management</h2>
              <nav className="flex flex-col space-y-1">
                {managementItems.map(({ label, icon, route, submenu }) => (
                  <div key={label}>
                    {!submenu && (
                      <button
                        onClick={() => {
                          router.push(route);
                          setIsOpen(false);
                        }}
                        className={`flex items-center space-x-3 py-3 px-4 rounded-lg text-base font-semibold cursor-pointer transition-transform transform hover:scale-105 w-48 ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-blue-700"
                        }`}
                        aria-label={`Go to ${label}`}
                      >
                        <div className="text-m">{icon}</div>
                        <span>{label}</span>
                      </button>
                    )}
                    {submenu && (
                      <>
                        <button
                          onClick={(e) =>
                            openSubmenu === label
                              ? setOpenSubmenu(null)
                              : handleSubmenuOpen(label, e)
                          }
                          onMouseEnter={(e) => handleSubmenuOpen(label, e)}
                          onMouseLeave={() => setOpenSubmenu(null)}
                          className={`relative flex items-center justify-between py-3 px-4 rounded-lg text-base font-semibold cursor-pointer transition-transform transform hover:scale-105 w-full ${
                            darkMode ? "hover:bg-gray-700" : "hover:bg-blue-700"
                          }`}
                          aria-expanded={openSubmenu === label}
                          aria-controls={`${label}-submenu`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              openSubmenu === label
                                ? setOpenSubmenu(null)
                                : handleSubmenuOpen(label, e);
                            }
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-m">{icon}</div>
                            <span>{label}</span>
                          </div>
                          <svg
                            className={`w-4 h-4 transform transition-transform ${
                              openSubmenu === label ? "rotate-90" : ""
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
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </button>
                        {openSubmenu === label &&
                          typeof window !== "undefined" &&
                          createPortal(
                            <motion.div
                              id={`${label}-submenu`}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              style={{
                                position: "fixed",
                                top: submenuPosition.top,
                                left: submenuPosition.left,
                                zIndex: 9999,
                              }}
                              className={`flex flex-col space-y-1 rounded-lg shadow-lg p-2 w-48 max-w-xs ${
                                darkMode ? "bg-gray-800" : "bg-blue-900"
                              }`}
                              onMouseEnter={() => setOpenSubmenu(label)}
                              onMouseLeave={() => setOpenSubmenu(null)}
                            >
                              {submenu.map(
                                ({ label: subLabel, route: subRoute }) => (
                                  <button
                                    key={subLabel}
                                    onClick={() => {
                                      router.push(subRoute);
                                      setIsOpen(false);
                                    }}
                                    className={`text-sm text-left py-2 px-4 rounded-lg cursor-pointer transition-transform transform hover:scale-105 w-48 ${
                                      darkMode
                                        ? "text-white hover:bg-gray-600"
                                        : "text-gray-900 hover:bg-blue-400"
                                    }`}
                                    aria-label={`Go to ${subLabel}`}
                                  >
                                    {subLabel}
                                  </button>
                                )
                              )}
                            </motion.div>,
                            document.body
                          )}
                      </>
                    )}
                  </div>
                ))}
              </nav>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <ServiceDialog
        isOpen={serviceDialogOpen}
        onClose={() => setServiceDialogOpen(false)}
        onSave={handleServiceSave}
        initialData={editData}
      />
      <EventGalleryDialog
        isOpen={eventGalleryDialogOpen}
        onClose={() => setEventGalleryDialogOpen(false)}
        onSave={handleEventGallerySave}
        initialData={editData}
      />
      <TestimonialDialog
        isOpen={testimonialDialogOpen}
        onClose={() => setTestimonialDialogOpen(false)}
        onSave={handleTestimonialSave}
        initialData={editData}
      />
    </>
  );
};

export default HamburgerMenu;
