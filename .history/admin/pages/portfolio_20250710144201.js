import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext"; // Import DarkModeContext
import ManagementMenu from "../components/ManagementMenu"; // Import ManagementMenu
import HamburgerMenu from "../components/HamburgerMenu"; // Import HamburgerMenu
import PortfolioCategoryDialog from "../components/PortfolioCategoryDialog"; // Import PortfolioCategoryDialog

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
  }, []);

  return width;
}

const PortfolioPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  return (

export default PortfolioPage;
