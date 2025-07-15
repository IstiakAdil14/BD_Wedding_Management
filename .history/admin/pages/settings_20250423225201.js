import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../context/DarkModeContext';
import ManagementMenu from '../components/ManagementMenu';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 10 },
  },
};

export default function Settings() {
  const { darkMode } = useContext(DarkModeContext);

  const [settings, setSettings] = useState({
    darkModeEnabled: true,
    logo: null,
    favicon: null,
    siteTitle: 'My Wedding Site',
    seoMetaTitle: 'Best Wedding Planning Services',
    seoMetaDescription: 'We provide the best wedding planning services for your special day.',
    adminPassword: '',
  });

  const [newLogo, setNewLogo] = useState(null);
  const [newFavicon, setNewFavicon] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewLogo(imageUrl);
      setSettings((prev) => ({ ...prev, logo: imageUrl }));
    }
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewFavicon(imageUrl);
      setSettings((prev) => ({ ...prev, favicon: imageUrl }));
    }
  };

  const handlePasswordChange = (e) => {
    setSettings((prev) => ({ ...prev, adminPassword: e.target.value }));
  };

  const handleSaveSettings = () => {
    alert('Settings saved (mock implementation).');
  };

  return (
    <motion.div
      className={`flex h-fullscreen ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Side Navbar */}
      <motion.nav
        className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
          darkMode
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </section>

      <section className="mb-6">
        <label className="block font-semibold mb-1">SEO Meta Title</label>
        <input
          type="text"
          name="seoMetaTitle"
          value={settings.seoMetaTitle}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </section>

      <section className="mb-6">
        <label className="block font-semibold mb-1">SEO Meta Description</label>
        <textarea
          name="seoMetaDescription"
          value={settings.seoMetaDescription}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </section>

      <section className="mb-6">
        <label className="block font-semibold mb-1">Admin Password Reset</label>
        <input
          type="password"
          name="adminPassword"
          value={settings.adminPassword}
          onChange={handlePasswordChange}
          className="w-full p-2 border rounded"
          placeholder="Enter new password"
        />
      </section>

      <button
        onClick={handleSaveSettings}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Save Settings
      </button>
    </div>
  );
}
