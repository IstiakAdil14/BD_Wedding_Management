import React, { useContext, useState, useRef } from "react";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";
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

import EventGalleryDialog from "./EventGalleryDialog";
import TestimonialDialog from "./TestimonialDialog";
import ServiceDialog from "./ServiceDialog";

const managementItems = [
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
  { label: "Testimonials", icon: <CommentIcon />, route: "/testimonials" },
  { label: "Team Members", icon: <GroupIcon />, route: "/team" },
  { label: "Contact Info", icon: <ContactMailIcon />, route: "/contact" },
  { label: "Inquiries", icon: <MessageIcon />, route: "/messages" },
  {
    label: "Admin Users",
    icon: <AdminPanelSettingsIcon />,
    route: "/adminUsers",
  },
];

const ManagementMenu = () => {
  const router = useRouter();
  const { darkMode } = useContext(DarkModeContext);

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const submenuRef = useRef(null);

  const [editData, setEditData] = useState(null);

  // Dialog states
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [eventGalleryDialogOpen, setEventGalleryDialogOpen] = useState(false);
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);

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

  // Open dialogs based on submenu label
  const handleSubmenuClick = (label, route) => {
    switch (label) {
      case "Hero Section":
        router.push("/home/hero-section");
        setOpenSubmenu(null);
        break;
      case "Service Packages":
        setEditData(null);
        setServiceDialogOpen(true);
        break;
      case "Event Gallery":
        setEditData(null);
        setEventGalleryDialogOpen(true);
        break;
      case "Testimonials":
        setEditData(null);
        setTestimonialDialogOpen(true);
        break;
      case "Contact Form":
        router.push("/home/contact-form");
        break;
      case "Footer":
        router.push("/home/footer");
        break;
      default:
        if (route) {
          router.push(route);
        } else {
          router.push("/");
        }
        setOpenSubmenu(null);
    }
  };

  // Save handlers for dialogs
  const handleServiceSave = async (data) => {
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setServiceDialogOpen(false);
        // Optionally refresh data or show success message
      } else {
        console.error("Failed to save service");
      }
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleEventGallerySave = async (data) => {
    try {
      const res = await fetch("/api/eventGallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
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
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setTestimonialDialogOpen(false);
      } else {
        console.error("Failed to save testimonial");
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleKeyDown = (e, route) => {
    if (e.key === "Enter" || e.key === " ") {
      if (route) {
        router.push(route);
      }
    }
  };

  return (
    <>
      <motion.nav
        className={`management-menu flex flex-col w-56 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-visible rounded-r-lg ${
          darkMode
            ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
            : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
        }`}
      >
        <motion.div
          className={`flex items-center space-x-3 py-3 px-4 rounded-lg shadow-lg text-white text-base font-semibold cursor-pointer transition-transform transform ${
            darkMode
              ? "hover:scale-105 hover:bg-gray-700"
              : "hover:scale-105 hover:bg-blue-700"
          }`}
          onClick={() => router.push("/dashboard")}
          role="link"
          tabIndex={0}
          aria-label="Go to Dashboard"
          onKeyDown={(e) => handleKeyDown(e, "/dashboard")}
        >
          <div className="text-m">
            <BuildIcon />
          </div>
          <span>Dashboard</span>
        </motion.div>
        {managementItems.map(({ label, icon, route, submenu }) => (
          <div key={label} className={submenu ? "relative" : undefined}>
            {!submenu && (
              <motion.div
                className={`flex items-center space-x-3 py-3 px-4 rounded-lg shadow-lg text-white text-base font-semibold cursor-pointer transition-transform transform hover:scale-105 ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-blue-700"
                }`}
                aria-label={`Go to ${label}`}
                role="link"
                tabIndex={0}
                onClick={() => handleSubmenuClick(label, route)}
                onKeyDown={(e) => handleKeyDown(e, route)}
              >
                <div className="text-m mr-1">{icon}</div>
                <span>{label}</span>
              </motion.div>
            )}
            {submenu && (
              <>
                <motion.div
                  onClick={(e) =>
                    setOpenSubmenu(openSubmenu === label ? null : label)
                  }
                  onMouseEnter={(e) => handleSubmenuOpen(label, e)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                  className={`relative flex items-center justify-between py-3 px-4 rounded-lg shadow-lg text-white text-base font-semibold cursor-pointer transition-transform transform hover:scale-105 ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-blue-700"
                  }`}
                  aria-expanded={openSubmenu === label}
                  aria-controls={`${label}-submenu`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setOpenSubmenu(openSubmenu === label ? null : label);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-m mr-1">{icon}</div>
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
                </motion.div>
                {openSubmenu === label &&
                  typeof window !== "undefined" &&
                  createPortal(
                    <motion.div
                      ref={submenuRef}
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
                      className="flex flex-col space-y-1 bg-gray-700 rounded-lg shadow-lg p-2 w-48 max-w-xs"
                      onMouseEnter={() => setOpenSubmenu(label)}
                      onMouseLeave={() => setOpenSubmenu(null)}
                    >
                      {submenu.map(({ label: subLabel, route: subRoute }) => (
                        <motion.div
                          key={subLabel}
                          className={`text-sm text-white cursor-pointer py-2 px-4 rounded-lg transition-transform transform hover:scale-105 ${
                            darkMode ? "hover:bg-gray-800" : "hover:bg-blue-800"
                          }`}
                          role="link"
                          tabIndex={0}
                          aria-label={`Go to ${subLabel}`}
onClick={() => {
  if (subLabel === "Service Packages") {
    router.push("/home/service-packages");
  } else if (subLabel === "Event Gallery") {
    setEditData(null);
    setEventGalleryDialogOpen(true);
  } else if (subLabel === "Testimonials") {
    setEditData(null);
    setTestimonialDialogOpen(true);
  } else {
    router.push(subRoute);
  }
  // Close submenu only if screen width is phone size (e.g., <= 768px)
  if (window.innerWidth <= 768) {
    setOpenSubmenu(null);
  }
}}
onKeyDown={(e) => {
  if (e.key === "Enter" || e.key === " ") {
    if (subLabel === "Service Packages") {
      router.push("/home/service-packages");
    } else if (subLabel === "Event Gallery") {
      setEditData(null);
      setEventGalleryDialogOpen(true);
    } else if (subLabel === "Testimonials") {
      setEditData(null);
      setTestimonialDialogOpen(true);
    } else {
      router.push(subRoute);
    }
    // Close submenu only if screen width is phone size (e.g., <= 768px)
    if (window.innerWidth <= 768) {
      setOpenSubmenu(null);
    }
  }
}}
                        >
                          {subLabel}
                        </motion.div>
                      ))}
                    </motion.div>,
                    document.body
                  )}
              </>
            )}
          </div>
        ))}
      </motion.nav>

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

      <style jsx>{`
        .management-menu::-webkit-scrollbar {
          width: 12px;
        }
        .management-menu::-webkit-scrollbar-track {
          background: #e0e7ff;
          border-radius: 12px;
          margin: 8px 0;
        }
        .management-menu::-webkit-scrollbar-thumb {
          background-color: #6366f1;
          border-radius: 12px;
          border: 3px solid transparent;
          background-clip: content-box;
        }
        .management-menu::-webkit-scrollbar-thumb:hover {
          background-color: #4f46e5;
        }
        /* Dark mode */
        :global(.dark) .management-menu::-webkit-scrollbar-track {
          background: #111827;
        }
        :global(.dark) .management-menu::-webkit-scrollbar-thumb {
          background-color: #374151;
          border: 3px solid transparent;
          background-clip: content-box;
        }
        :global(.dark) .management-menu::-webkit-scrollbar-thumb:hover {
          background-color: #4b5563;
        }
        /* Firefox */
        .management-menu {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 #e0e7ff;
        }
        :global(.dark) .management-menu {
          scrollbar-color: #374151 #111827;
        }
      `}</style>
    </>
  );
};

export default ManagementMenu;
