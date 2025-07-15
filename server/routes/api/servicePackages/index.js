const express = require('express');
const router = express.Router();
const ServicePackage = require('../../../models/ServicePackage');

// GET all service packages
router.get('/', async (req, res) => {
  try {
    const packages = await ServicePackage.find({});
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service packages' });
  }
});

module.exports = router;
