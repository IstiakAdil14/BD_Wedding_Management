const express = require('express');
const router = express.Router();
const CustomizeService = require('../../../models/CustomizeService');

// GET distinct categories from CustomizeService
router.get('/', async (req, res) => {
  try {
    const categories = await CustomizeService.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories from CustomizeService' });
  }
});

module.exports = router;
