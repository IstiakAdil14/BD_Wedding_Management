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
