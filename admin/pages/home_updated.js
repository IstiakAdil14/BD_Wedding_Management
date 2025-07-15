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
      setHeroImage(URL.createObjectURL(file));
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
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
      className="flex p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-1/4">
        <ManagementMenu /> {/* Use the ManagementMenu component */}
      </div>
      <div className="w-3/4">
        <motion.h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" variants={itemVariants}>
          Home Page Management
        </motion.h1>

        {/* Hero Section */}
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Hero Section</h2>
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Subtitle</label>
            <input
              type="text"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Call to Action Text</label>
            <input
              type="text"
              value={heroCTA}
              onChange={(e) => setHeroCTA(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Hero Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleHeroImageChange}
              className="block text-gray-700 dark:text-gray-300"
            />
            {heroImage && (
              <motion.img
                src={heroImage}
                alt="Hero"
                className="mt-2 max-h-48 object-cover rounded shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </div>
        </motion.section>

        {/* Highlight Services */}
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Highlight Services</h2>
          {highlightServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="flex items-center mb-3 space-x-3"
              variants={itemVariants}
            >
              <input
                type="text"
                value={service.icon}
                onChange={(e) => {
                  const newServices = [...highlightServices];
                  newServices[index].icon = e.target.value;
                  setHighlightServices(newServices);
                }}
                className="w-12 p-2 border rounded text-center focus:ring-2 focus:ring-purple-500 transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                maxLength={2}
              />
              <input
                type="text"
                value={service.description}
                onChange={(e) => {
                  const newServices = [...highlightServices];
                  newServices[index].description = e.target.value;
                  setHighlightServices(newServices);
                }}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-purple-500 transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </motion.div>
          ))}
        </motion.section>

        {/* Featured Portfolio / Events */}
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Featured Portfolio / Events</h2>
          {featuredPortfolio.map((item, index) => (
            <motion.div key={item.id} className="mb-4" variants={itemVariants}>
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const newPortfolio = [...featuredPortfolio];
                  newPortfolio[index].title = e.target.value;
                  setFeaturedPortfolio(newPortfolio);
                }}
                className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-purple-500 transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const newPortfolio = [...featuredPortfolio];
                    newPortfolio[index].image = URL.createObjectURL(file);
                    setFeaturedPortfolio(newPortfolio);
                  }
                }}
                className="block text-gray-700 dark:text-gray-300"
              />
              {item.image && (
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="mt-2 max-h-40 object-cover rounded shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.div>
          ))}
        </motion.section>

        {/* Banner / Background Image */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Banner / Background Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerImageChange}
            className="block text-gray-700 dark:text-gray-300"
          />
          {bannerImage && (
            <motion.img
              src={bannerImage}
              alt="Banner"
              className="mt-2 max-h-48 object-cover rounded shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </motion.section>
      </div>
    </motion.div>
  );
}
