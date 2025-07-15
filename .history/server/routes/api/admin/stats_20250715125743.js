const express = require('express');
const router = express.Router();

const Category = require('../../../models/Category');
const Testimonial = require('../../../models/Testimonial');
const Service = require('../../../models/Service');
const ContactMessage = require('../../../models/ContactMessage');

router.get('/', async (req, res) => {
  try {
    const eventsCount = await Category.countDocuments();
    const testimonialsCount = await Testimonial.countDocuments();
    const packagesCount = await Service.countDocuments();
    const messagesCount = await ContactMessage.countDocuments();

    res.json({
      events: eventsCount,
      testimonials: testimonialsCount,
      packages: packagesCount,
      messages: messagesCount,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
