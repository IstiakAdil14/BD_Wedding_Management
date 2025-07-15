const express = require('express');
const router = express.Router();
const Service = require('../../../models/Service');

router.get('/', async (req, res) => {
  try {
    const servicesByCategory = await Service.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    // Format the response as array of { name: category, value: count }
    const result = servicesByCategory.map(item => ({
      name: item._id || "Uncategorized",
      value: item.count
    }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    res.status(500).json({ error: 'Failed to fetch services by category' });
  }
});

module.exports = router;
