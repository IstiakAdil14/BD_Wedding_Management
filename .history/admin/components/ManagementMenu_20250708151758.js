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
  { label: "Testimonials", icon: <CommentIcon />, route: "/testimonials" },
  { label: "Team Members", icon: <GroupIcon />, route: "/team" },
  { label: "Contact Info", icon: <ContactMailIcon />, route: "/contact" },
  { label: "Orders Arrive", icon: <MessageIcon />, route: "/messages" },
  { label: "Settings", icon: <SettingsIcon />, route: "/settings" },
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
