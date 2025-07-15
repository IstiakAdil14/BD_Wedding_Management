import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import PortfolioCategoryDialog from "../components/PortfolioCategoryDialog";
import useWindowWidth from "../hooks/useWindowWidth";
import draftToHtml from "draftjs-to-html";

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
            onClick={handleOpenDialog}
            className={`mt-20 mb-4 px-4 py-2 rounded hover:bg-blue-700 ${
              darkMode ? "bg-blue-800 text-white" : "bg-blue-600 text-white"
            }`}
          >
            Add New Category
          </button>

          <PortfolioCategoryDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onSave={handleSaveCategory}
          />

          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td className="border border-gray-300 px-4 py-2">{cat.name}</td>
                  <td
                    className="border border-gray-300 px-4 py-2"
                    dangerouslySetInnerHTML={{ __html: convertDescriptionToHtml(cat.description) }}
                  />
                  <td className="border border-gray-300 px-4 py-2 space-x-2 flex">
                    <button
                      onClick={() => alert(`Edit category: ${cat.name}`)}
                      className="text-yellow-400 hover:text-yellow-500 px-2 py-1 rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5h2M12 7v10m-7-5h14" />
                      </svg>
                    </button>
                    <button
                      onClick={() => alert(`Delete category: ${cat.name}`)}
                      className="text-red-600 hover:text-red-700 px-2 py-1 rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.main>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
