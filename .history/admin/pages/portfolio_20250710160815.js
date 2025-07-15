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
