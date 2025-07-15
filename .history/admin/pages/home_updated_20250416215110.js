import { useState } from 'react';
import { motion } from 'framer-motion';

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
    { id: 3, icon: '🍽️', description: 'Catering' },
  ]);

  // State for featured portfolio/events
  const [featuredPortfolio, setFeaturedPortfolio] = useState([
    { id: 1, title: 'Spring Wedding', image: null },
    { id: 2, title: 'Beach Ceremony', image: null },
  ]);

  // State for banner image
  const [bannerImage, setBannerImage] = useState(null);

  // Handlers for file uploads
  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroImage(file);
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('heroTitle', heroTitle);
    formData.append('heroSubtitle', heroSubtitle);
    formData.append('heroCTA', heroCTA);
    formData.append('highlightServices', JSON.stringify(highlightServices));
    formData.append('featuredPortfolio', JSON.stringify(featuredPortfolio));
    if (heroImage) {
      formData.append('heroImage', heroImage);
    }
    if (bannerImage) {
      formData.append('bannerImage', bannerImage);
    }

    try {
      const response = await fetch('/api/home', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
  };

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" variants={itemVariants}>
        Home Page Management
      </motion.h1>

      <form onSubmit={handleSubmit}>
