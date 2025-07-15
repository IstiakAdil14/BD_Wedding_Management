const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Create uploads/videos directory if it doesn't exist
const uploadDir = path.join(__dirname, '../../../uploads/videos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use original filename with timestamp prefix to avoid collisions
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
  fileFilter: function (req, file, cb) {
    // Accept only video files
    if (!file.mimetype.startsWith('video/')) {
      return cb(new Error('Only video files are allowed!'), false);
    }
    cb(null, true);
  }
});

// POST /api/uploadVideo - upload a video file
router.post('/', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video file uploaded' });
  }
  // Return the relative path or URL to the uploaded video
  const videoUrl = `/uploads/videos/${req.file.filename}`;
  res.status(201).json({ videoUrl });
});

module.exports = router;
