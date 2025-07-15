const express = require('express');
const router = express.Router();
const Footer = require('../../models/Footer');

// GET footer data
router.get('/', async (req, res) => {
  try {
    let footer = await Footer.findOne({});
    if (!footer) {
      // Return default footer data if none found in DB
      const defaultFooter = {
        aboutUs: JSON.stringify({
          blocks: [
            {
              key: "default",
              text: "BD Wedding Planner is your trusted partner for creating unforgettable wedding experiences. We bring your dream wedding to life with passion and precision.",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        }),
        quickLinks: [
          { text: "About", url: "/about" },
          { text: "Services", url: "/services" },
          { text: "Portfolio", url: "/portfolio" },
          { text: "Contact", url: "/contact" }
        ],
        contactInfo: {
          address: "123 Wedding St, Dhaka, Bangladesh",
          email: "info@bdweddingplanner.com",
          phone: "+880 1234 567890"
        },
        socialLinks: {
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          instagram: "https://instagram.com",
          linkedin: "https://linkedin.com"
        }
      };
      return res.json(defaultFooter);
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
