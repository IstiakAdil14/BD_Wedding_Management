const express = require('express');
const router = express.Router();
const CustomizeService = require('../../../models/CustomizeService');

// GET /api/customizeServices/eventTypesByCategory/:category
// Returns unique event types for the given category
router.get('/eventTypesByCategory/:category', async (req, res) => {
  try {
    const category = req.params.category;
    if (!category) {
      return res.status(400).json({ error: 'Category parameter is required' });
    }

    // Find all CustomizeService documents with the given category
    const services = await CustomizeService.find({ category }).select('eventType').lean();

    // Extract unique event types
    const uniqueEventTypes = [...new Set(services.map(s => s.eventType))];

    res.json(uniqueEventTypes);
  } catch (error) {
    console.error('Error fetching event types by category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
