import React, { useContext } from 'react';
import Link from 'next/link';
import { DarkModeContext } from '../context/DarkModeContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
