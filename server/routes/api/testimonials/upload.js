const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = 'profilePicture-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  }
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

// POST /api/testimonials/upload - upload testimonial image
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Copy the uploaded file to admin/public/uploads/
  const sourcePath = req.file.path;
  const adminUploadsDir = 'admin/public/uploads/';
  if (!fs.existsSync(adminUploadsDir)) {
    fs.mkdirSync(adminUploadsDir, { recursive: true });
  }
  const destPath = adminUploadsDir + req.file.filename;
  fs.copyFile(sourcePath, destPath, (err) => {
    if (err) {
      console.error('Error copying file to admin uploads:', err);
      // We do not fail the request if copy fails, just log error
    }
  });
  // Return the filename to be saved in testimonial record
  res.json({ filename: req.file.filename });
});

module.exports = router;
