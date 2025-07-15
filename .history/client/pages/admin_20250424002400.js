import { useState } from 'react';
import HomeManagement from '../../admin/pages/home_updated';
import AdminUsers from '../../admin/pages/adminUsers';
import { motion } from 'framer-motion';

// Mock data for stats and recent activity (from dashboard.js)
const stats = {
  events: 12,
  testimonials: 8,
  packages: 5,
  messages: 20,
};

const recentActivities = [
  {
    id: 1,
    type: 'Portfolio',
    title: 'Spring Wedding Shoot',
    date: '2024-06-01',
  },
  {
    id: 2,
    type: 'Message',
    title: 'Inquiry from John Doe',
    date: '2024-05-30',
  },
  {
    id: 3,
    type: 'Testimonial',
    title: 'Feedback from Jane Smith',
    date: '2024-05-28',
  },
];

const activityTypeStyles = {
  Portfolio: {
    color: 'bg-gradient-to-r from-green-400 to-green-600',
  },
  Message: {
    color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
  },
  Testimonial: {
    color: 'bg-gradient-to-r from-blue-400 to-blue-600',
  },
};

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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <nav className="flex space-x-4 p-4 bg-white dark:bg-gray-800 shadow">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'home' ? 'bg-purple-600 text-white' : 'hover:bg-purple-500 hover:text-white'
          }`}
          onClick={() => setActiveTab('home')}
        >
          Home Management
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'stats' ? 'bg-purple-600 text-white' : 'hover:bg-purple-500 hover:text-white'
          }`}
          onClick={() => setActiveTab('stats')}
        >
          Stats & Activity
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'users' ? 'bg-purple-600 text-white' : 'hover:bg-purple-500 hover:text-white'
          }`}
          onClick={() => setActiveTab('users')}
        >
          Admin Users
        </button>
      </nav>

      <main className="p-6 max-w-6xl mx-auto">
        {activeTab === 'home' && <HomeManagement />}

        {activeTab === 'stats' && (
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.section className="grid grid-cols-1 md:grid-cols-4 gap-6" variants={itemVariants}>
              {Object.entries(stats).map(([key, value]) => (
                <motion.div
                  key={key}
                  className="p-6 rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <h2 className="text-lg font-semibold mb-2 capitalize">{key.replace('_', ' ')}</h2>
                  <p className="text-4xl font-bold">{value}</p>
                </motion.div>
              ))}
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <motion.ul className="flex space-x-6 overflow-x-auto max-h-96" variants={containerVariants}>
                {recentActivities.map((activity) => {
                  const style = activityTypeStyles[activity.type] || {
                    color: 'bg-gray-400',
                  };
                  return (
                    <motion.li
                      key={activity.id}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg cursor-pointer transition-colors duration-300 w-48 h-48 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700`}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.1,
