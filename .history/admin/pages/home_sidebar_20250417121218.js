import { useState } from 'react';
import { motion } from 'framer-motion';

import ManagementMenu from "../components/ManagementMenu"; // Import the ManagementMenu component

export default function HomeManagement() {
  // State for hero section
  const [heroTitle, setHeroTitle] = useState('Welcome to Our Wedding Services');
  const [heroSubtitle, setHeroSubtitle] = useState('Making your special day unforgettable');
  const [heroCTA, setHeroCTA] = useState('Book Now');
  const [heroImage, setHeroImage] = useState(null);

  // State for highlight services
  const [highlightServices, setHighlightServices] = useState([
    { id: 1, icon: '🎉', description: 'Event Planning' },
    { id: 2, icon: '📸', description: 'Photography' },
