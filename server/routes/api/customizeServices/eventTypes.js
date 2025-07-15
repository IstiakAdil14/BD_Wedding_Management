const express = require('express');
const router = express.Router();
const CustomizeService = require('../../../models/CustomizeService');

// GET distinct event types from CustomizeService
router.get('/', async (req, res) => {
  try {
    const eventTypes = await CustomizeService.distinct('eventType');
    res.json(eventTypes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event types from CustomizeService' });
  }
});

module.exports = router;
