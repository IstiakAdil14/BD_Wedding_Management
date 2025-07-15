const express = require('express');
const router = express.Router();
const Footer = require('../../models/Footer');

// GET footer data
router.get('/', async (req, res) => {
  try {
    let footer = await Footer.findOne({});
    if (!footer) {
      footer = new Footer();
      await footer.save();
    }
    res.json(footer);
  } catch (error) {
    console.error('Error fetching footer data:', error);
    res.status(500).json({ error: 'Failed to fetch footer data' });
  }
});

// POST update footer data
router.post('/', async (req, res) => {
  try {
    const { aboutUs, quickLinks, contactInfo, socialLinks } = req.body;

    let footer = await Footer.findOne({});
    if (!footer) {
      footer = new Footer();
    }

    footer.aboutUs = aboutUs || '';
    footer.quickLinks = Array.isArray(quickLinks) ? quickLinks : [];
    footer.contactInfo = contactInfo || {};
    footer.socialLinks = socialLinks || {};

    await footer.save();

    res.status(200).json({ message: 'Footer data updated successfully' });
  } catch (error) {
    console.error('Error updating footer data:', error);
    res.status(500).json({ error: 'Failed to update footer data' });
  }
});

module.exports = router;
