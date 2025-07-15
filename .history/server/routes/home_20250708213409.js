const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const HomePage = require('../models/HomePage'); // Import HomePage model
const HeroSection = require('../models/HeroSection'); // Import HeroSection model
const EventGallery = require('../models/EventGallery');
const ServicePackage = require('../models/ServicePackage');

const uploadsDir = path.join(__dirname, '../client/public/uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB max video size

// Setup multer for file uploads with absolute path and file size limit
const upload = multer({
  dest: uploadsDir,
  limits: { fileSize: MAX_VIDEO_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'backgroundVideo') {
      // Accept only video files for backgroundVideo
      if (!file.mimetype.startsWith('video/')) {
        return cb(new Error('Only video files are allowed for backgroundVideo'));
      }
    }
    cb(null, true);
  },
});

function moveFile(file) {
  if (!file) {
    console.error('No file provided to moveFile');
    return '';
  }
  if (!fs.existsSync(file.path)) {
    console.error('File path does not exist:', file.path);
    return '';
  }
  // Rename file with timestamp + original extension to avoid collisions
  const timestamp = Date.now();
  const ext = path.extname(file.originalname);
  const newFileName = `${timestamp}${ext}`;
  const targetPath = path.join(__dirname, '../client/public/uploads', newFileName);
  try {
    fs.renameSync(file.path, targetPath);
    console.log(`File moved from ${file.path} to ${targetPath}`);
  } catch (err) {
    console.error('Error moving file:', err);
    return '';
  }
  return '/uploads/' + newFileName;
}

// GET home page data
router.get('/', async (req, res) => {
  try {
    let homePage = await HomePage.findOne({})
      .populate('highlightServices')
      .populate('featuredPortfolio')
      .populate('quickLinks')
      .populate('eventGallery');
    if (!homePage) {
      homePage = new HomePage();
      await homePage.save();
    }
    res.json({
      heroTitle: homePage.heroTitle,
      heroSubtitle: homePage.heroSubtitle,
      heroCTA: homePage.heroCTA,
      heroImage: homePage.heroImagePath,
      highlightServices: homePage.highlightServices,
      featuredPortfolio: homePage.featuredPortfolio,
      bannerImage: homePage.bannerImagePath,
      aboutUs: homePage.aboutUs,
      quickLinks: homePage.quickLinks,
      contactInfo: homePage.contactInfo,
      socialLinks: homePage.socialLinks,
      eventGallery: homePage.eventGallery,
      backgroundVideoPath: homePage.backgroundVideoPath,
    });
  } catch (error) {
    console.error('Error fetching home page data:', error);
    res.status(500).json({ error: 'Failed to fetch home page data' });
  }
});

// GET hero section data
router.get('/hero-section', async (req, res) => {
  try {
    let heroSection = await HeroSection.findOne({});
    if (!heroSection) {
      heroSection = new HeroSection();
      await heroSection.save();
    }
    res.json(heroSection);
  } catch (error) {
    console.error('Error fetching hero section data:', error);
    res.status(500).json({ error: 'Failed to fetch hero section data' });
  }
});

// POST update hero section data with file uploads
const heroSectionUpload = upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'backgroundVideo', maxCount: 1 },
]);

router.post('/hero-section', heroSectionUpload, async (req, res) => {
  try {
    console.log('Received hero section req.body:', req.body);
    console.log('Received hero section req.files:', req.files);
    console.log('req.files keys:', Object.keys(req.files));

    const { heroTitle, heroSubtitle, heroCTA } = req.body;

    let heroSection = await HeroSection.findOne({});
    if (!heroSection) {
      heroSection = new HeroSection();
    }

    // Validate heroTitle and heroSubtitle are JSON strings
    try {
      JSON.parse(heroTitle);
      heroSection.heroTitle = heroTitle;
    } catch (e) {
      console.error('Invalid heroTitle JSON string:', e);
      heroSection.heroTitle = JSON.stringify({ blocks: [{ key: 'init', text: heroTitle || '', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {} }], entityMap: {} });
    }

    try {
      JSON.parse(heroSubtitle);
      heroSection.heroSubtitle = heroSubtitle;
    } catch (e) {
      console.error('Invalid heroSubtitle JSON string:', e);
      heroSection.heroSubtitle = JSON.stringify({ blocks: [{ key: 'init', text: heroSubtitle || '', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {} }], entityMap: {} });
    }

    heroSection.heroCTA = heroCTA || '';

    console.log('Saving hero section data:', {
      heroTitle: heroSection.heroTitle,
      heroSubtitle: heroSection.heroSubtitle,
      heroCTA: heroSection.heroCTA,
      heroImagePath: heroSection.heroImagePath,
      backgroundVideoPath: heroSection.backgroundVideoPath,
    });

    try {
      if (req.files['heroImage']) {
        const heroImagePath = moveFile(req.files['heroImage'][0]);
        console.log('moveFile returned heroImagePath:', heroImagePath);
        heroSection.heroImagePath = heroImagePath;
      }
    } catch (e) {
      console.error('Error moving heroImage file:', e);
    }

    try {
      if (req.files['backgroundVideo']) {
        console.log('Background video file received:', req.files['backgroundVideo'][0]);
        if (req.files['backgroundVideo'][0].size > MAX_VIDEO_SIZE) {
          return res.status(400).json({ error: 'Background video file size exceeds limit of 50MB' });
        }
        const videoPath = moveFile(req.files['backgroundVideo'][0]);
        console.log('moveFile returned videoPath:', videoPath);
        heroSection.backgroundVideoPath = videoPath;
        console.log('Background video saved at:', heroSection.backgroundVideoPath);
      } else {
        console.log('No backgroundVideo file found in req.files');
      }
    } catch (e) {
      console.error('Error moving backgroundVideo file:', e);
    }

    // Additional debug: check if uploadsDir and public/uploads exist and are writable
    const fs = require('fs');
    const path = require('path');
    const uploadsDir = path.join(__dirname, '../uploads');
    const publicUploadsDir = path.join(__dirname, '../public/uploads');

    try {
      const uploadsDirStats = fs.statSync(uploadsDir);
      console.log('Uploads directory stats:', uploadsDirStats);
    } catch (err) {
      console.error('Uploads directory does not exist or is not accessible:', err);
    }

    try {
      const publicUploadsDirStats = fs.statSync(publicUploadsDir);
      console.log('Public uploads directory stats:', publicUploadsDirStats);
    } catch (err) {
      console.error('Public uploads directory does not exist or is not accessible:', err);
    }

    console.log('HeroSection before save:', heroSection);
    await heroSection.save();
    console.log('HeroSection saved to database:', heroSection);

await heroSection.save();
console.log('HeroSection saved to database:', heroSection);

res.status(200).json({
  message: 'Hero section data updated successfully',
  heroSection: {
    heroTitle: heroSection.heroTitle,
    heroSubtitle: heroSection.heroSubtitle,
    heroCTA: heroSection.heroCTA,
    backgroundVideoPath: heroSection.backgroundVideoPath,
    heroImagePath: heroSection.heroImagePath,
  },
});
  } catch (error) {
    console.error('Error updating hero section data:', error);
    if (error.name === 'ValidationError') {
      // Return validation errors to client
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Failed to update hero section data' });
  }
});

// New route to get service packages
router.get('/packages', async (req, res) => {
  try {
    const packages = await ServicePackage.find({});
    res.json(packages);
  } catch (error) {
    console.error('Error fetching service packages:', error);
    res.status(500).json({ error: 'Failed to fetch service packages' });
  }
});

// New route to get event gallery images
router.get('/gallery', async (req, res) => {
  try {
    const galleryImages = await EventGallery.find({});
    res.json(galleryImages);
  } catch (error) {
    console.error('Error fetching event gallery:', error);
    res.status(500).json({ error: 'Failed to fetch event gallery' });
  }
});

// POST update home page data with file uploads
const cpUpload = upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'bannerImage', maxCount: 1 },
  { name: 'backgroundVideo', maxCount: 1 },
]);


router.post('/', cpUpload, async (req, res) => {
  try {
    console.log('Received req.body:', req.body);
    console.log('Received req.files:', req.files);

    const {
      heroTitle,
      heroSubtitle,
      heroCTA,
      highlightServices,
      featuredPortfolio,
      aboutUs,
      quickLinks,
      contactInfo,
      socialLinks,
      eventGallery,
    } = req.body;

    let homePage = await HomePage.findOne({});
    if (!homePage) {
      homePage = new HomePage();
    }

    homePage.heroTitle = heroTitle || '';
    homePage.heroSubtitle = heroSubtitle || '';
    homePage.heroCTA = heroCTA || '';

    // Save heroImage, bannerImage, backgroundVideo files
    try {
      if (req.files['heroImage']) {
        homePage.heroImagePath = moveFile(req.files['heroImage'][0]);
      }
    } catch (e) {
      console.error('Error moving heroImage file:', e);
    }

    try {
      if (req.files['bannerImage']) {
        homePage.bannerImagePath = moveFile(req.files['bannerImage'][0]);
      }
    } catch (e) {
      console.error('Error moving bannerImage file:', e);
    }

    try {
      if (req.files['backgroundVideo']) {
        // Check file size limit
        if (req.files['backgroundVideo'][0].size > MAX_VIDEO_SIZE) {
          return res.status(400).json({ error: 'Background video file size exceeds limit of 50MB' });
        }
        homePage.backgroundVideoPath = moveFile(req.files['backgroundVideo'][0]);
      }
    } catch (e) {
      console.error('Error moving backgroundVideo file:', e);
    }

    homePage.aboutUs = aboutUs || '';
    homePage.contactInfo = contactInfo ? JSON.parse(contactInfo) : {};
    homePage.socialLinks = socialLinks ? JSON.parse(socialLinks) : {};

    // Parse arrays from JSON strings
    let highlightServicesArray = [];
    let featuredPortfolioArray = [];
    let quickLinksArray = [];
    let eventGalleryArray = [];

    try {
      highlightServicesArray = highlightServices ? JSON.parse(highlightServices) : [];
    } catch (e) {
      console.error('Error parsing highlightServices:', e);
    }

    try {
      featuredPortfolioArray = featuredPortfolio ? JSON.parse(featuredPortfolio) : [];
    } catch (e) {
      console.error('Error parsing featuredPortfolio:', e);
    }

    try {
      quickLinksArray = quickLinks ? JSON.parse(quickLinks) : [];
    } catch (e) {
      console.error('Error parsing quickLinks:', e);
    }

    try {
      eventGalleryArray = eventGallery ? JSON.parse(eventGallery) : [];
    } catch (e) {
      console.error('Error parsing eventGallery:', e);
    }

    // Clear existing referenced documents and insert new ones
    // For highlightServices
    await Promise.all(homePage.highlightServices.map(id => mongoose.model('HighlightService').findByIdAndDelete(id)));
    const newHighlightServices = await mongoose.model('HighlightService').insertMany(highlightServicesArray);
    homePage.highlightServices = newHighlightServices.map(doc => doc._id);

    // For featuredPortfolio
    await Promise.all(homePage.featuredPortfolio.map(id => mongoose.model('FeaturedPortfolio').findByIdAndDelete(id)));
    const newFeaturedPortfolio = await mongoose.model('FeaturedPortfolio').insertMany(featuredPortfolioArray);
    homePage.featuredPortfolio = newFeaturedPortfolio.map(doc => doc._id);

    // For quickLinks
    await Promise.all(homePage.quickLinks.map(id => mongoose.model('QuickLink').findByIdAndDelete(id)));
    const newQuickLinks = await mongoose.model('QuickLink').insertMany(quickLinksArray);
    homePage.quickLinks = newQuickLinks.map(doc => doc._id);

    // For eventGallery
    await Promise.all(homePage.eventGallery.map(id => mongoose.model('EventGallery').findByIdAndDelete(id)));
    const newEventGallery = await mongoose.model('EventGallery').insertMany(eventGalleryArray);
    homePage.eventGallery = newEventGallery.map(doc => doc._id);

    await homePage.save();

    res.status(200).json({ message: 'Home page data updated successfully' });
  } catch (error) {
    console.error('Error updating home page data:', error);
    res.status(500).json({ error: 'Failed to update home page data' });
  }
});

router.post('/save-packages', async (req, res) => {
  try {
    const { packages } = req.body;
    // Remove all existing packages and insert new ones
    await ServicePackage.deleteMany({});
    if (packages && packages.length > 0) {
      await ServicePackage.insertMany(packages);
    }
    res.status(200).json({ message: 'Service packages saved successfully' });
  } catch (error) {
    console.error('Error saving service packages:', error);
    res.status(500).json({ error: 'Failed to save service packages' });
  }
});

const galleryUpload = upload.array('galleryImages', 20);

router.post('/save-gallery', galleryUpload, async (req, res) => {
  try {
    console.log('Received req.body:', req.body);
    console.log('Received req.files:', req.files);

    // Remove all existing gallery images for the category if category is provided
    if (req.body.category) {
      await EventGallery.deleteMany({ category: req.body.category });
    } else {
      await EventGallery.deleteMany({});
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No gallery images uploaded' });
    }

    // Process uploaded files and save their paths
    const galleryImages = req.files.map(file => {
      const targetPath = path.join(__dirname, '../public/uploads', file.originalname);
      try {
        fs.renameSync(file.path, targetPath);
      } catch (err) {
        console.error('Error moving file:', err);
        throw err;
      }
      return {
        src: '/uploads/' + file.originalname,
        category: req.body.category || 'Uncategorized',
      };
    });

    // Insert new gallery images
    await EventGallery.insertMany(galleryImages);

    res.status(200).json({ message: 'Event gallery saved successfully' });
  } catch (error) {
    console.error('Error saving event gallery:', error);
    res.status(500).json({ error: 'Failed to save event gallery' });
  }
});

module.exports = router;
