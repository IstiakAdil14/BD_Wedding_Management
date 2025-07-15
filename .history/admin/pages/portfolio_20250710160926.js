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
  const [showEventTable, setShowEventTable] = useState(false);

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
