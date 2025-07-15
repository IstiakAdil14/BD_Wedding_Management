const express = require('express');
const router = express.Router();
const PortfolioEvent = require('../../../models/PortfolioEvent');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/videos';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// GET all portfolio events
router.get('/', async (req, res) => {
  try {
    const events = await PortfolioEvent.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio events' });
  }
});

const express = require('express');
const router = express.Router();
const PortfolioEvent = require('../../../models/PortfolioEvent');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/videos';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// GET all portfolio events
router.get('/', async (req, res) => {
  try {
    const events = await PortfolioEvent.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio events' });
  }
});

// POST create a new portfolio event
