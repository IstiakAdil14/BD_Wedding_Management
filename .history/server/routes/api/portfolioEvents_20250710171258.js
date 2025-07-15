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
router.post('/', upload.single('video'), async (req, res) => {
  try {
    const { title, category, description } = req.body;
    let images = req.body.images || [];
    if (typeof images === 'string') {
      images = [images];
    }
    let videoPath = '';
    if (req.file) {
      videoPath = req.file.path;
    }
    if (!title || !category || !description) {
      return res.status(400).json({ error: 'Title, category, and description are required' });
    }
    const newEvent = new PortfolioEvent({
      title,
      category,
      images,
      video: videoPath,
      description,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating portfolio event:', error);
    res.status(500).json({ error: 'Failed to create portfolio event' });
  }
});

// PUT update a portfolio event by id
router.put('/:id', upload.single('video'), async (req, res) => {
  try {
    const { title, category, description } = req.body;
    let images = req.body.images || [];
    if (typeof images === 'string') {
      images = [images];
    }
    let videoPath = req.body.video || '';
    if (req.file) {
      videoPath = req.file.path;
    }
    const updatedEvent = await PortfolioEvent.findByIdAndUpdate(
      req.params.id,
      { title, category, images, video: videoPath, description },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Portfolio event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
