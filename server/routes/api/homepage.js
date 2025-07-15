const express = require('express');
const router = express.Router();
const HomePage = require('../../models/HomePage');

// GET HomePage contact info and social links
router.get('/', async (req, res) => {
  try {
    let homePage = await HomePage.findOne();
    if (!homePage) {
      // Create default if not exists
      homePage = new HomePage();
      await homePage.save();
    }
    res.json({
      contactInfo: homePage.contactInfo,
      socialLinks: homePage.socialLinks,
    });
  } catch (error) {
    console.error('Error fetching HomePage data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST update HomePage contact info and social links
router.post('/', async (req, res) => {
  try {
    const { contactInfo, socialLinks } = req.body;
    let homePage = await HomePage.findOne();
    if (!homePage) {
      homePage = new HomePage();
    }
    homePage.contactInfo = contactInfo || {};
    homePage.socialLinks = socialLinks || {};
    await homePage.save();
    res.json({ message: 'HomePage data updated successfully' });
  } catch (error) {
    console.error('Error updating HomePage data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
