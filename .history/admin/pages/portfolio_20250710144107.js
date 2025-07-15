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
    <div className="flex">
      <div className="hidden md:block">
        <ManagementMenu />
      </div>
      <div className="block md:hidden">
        <HamburgerMenu />
      </div>
      <div className="flex-1 p-4">
        <button
          onClick={handleOpenDialog}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Category
        </button>

        <PortfolioCategoryDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveCategory}
        />

        {/* Render categories list */}
        <ul>
          {categories.map((cat) => (
            <li key={cat._id}>
              <strong>{cat.name}</strong>: {cat.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PortfolioPage;
