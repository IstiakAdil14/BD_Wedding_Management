const express = require('express');
const router = express.Router();
const AuthEvent = require('../../../models/AuthEvent');

router.get('/', async (req, res) => {
  try {
    const stats = await AuthEvent.aggregate([
      {
        $match: {
          timestamp: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            eventType: "$eventType"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.eventType": 1
        }
      }
    ]);

    // Format data as { year, month, loginCount, signupCount }
    const formatted = [];
    const map = {};

    stats.forEach(item => {
      const key = `${item._id.year}-${item._id.month}`;
      if (!map[key]) {
        map[key] = { year: item._id.year, month: item._id.month, loginCount: 0, signupCount: 0 };
        formatted.push(map[key]);
      }
      if (item._id.eventType === 'login') {
        map[key].loginCount = item.count;
      } else if (item._id.eventType === 'signup') {
        map[key].signupCount = item.count;
      }
    });

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching auth event stats:', error);
    res.status(500).json({ error: 'Failed to fetch auth event stats' });
  }
});

module.exports = router;
