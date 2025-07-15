const express = require('express');
const router = express.Router();
const ContactInfo = require('../../../models/ContactInfo');
const dbConnect = require('../../../utils/dbConnect');

async function ensureContactInfoExists() {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      contactInfo = new ContactInfo({
        phoneNumbers: [],
        email: '',
        businessHours: '',
        officeLocation: '',
        faqs: [],
        socialLinks: {},
      });
      await contactInfo.save();
    }
  } catch (error) {
    console.error('Error ensuring contact info exists:', error);
  }
}

dbConnect().then(() => {
  ensureContactInfoExists();
});

router.get('/', async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    res.json(contactInfo);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({ message: 'Server error fetching contact info' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      contactInfo = new ContactInfo(data);
    } else {
      contactInfo.phoneNumbers = data.phoneNumbers || [];
      contactInfo.email = data.email || '';
      contactInfo.businessHours = data.businessHours || '';
      contactInfo.officeLocation = data.officeLocation || '';
      contactInfo.faqs = data.faqs || [];
      contactInfo.socialLinks = data.socialLinks || {};
    }
    await contactInfo.save();
    res.json({ message: 'Contact info saved successfully', contactInfo });
  } catch (error) {
    console.error('Error saving contact info:', error);
    res.status(500).json({ message: 'Server error saving contact info' });
  }
});

module.exports = router;
