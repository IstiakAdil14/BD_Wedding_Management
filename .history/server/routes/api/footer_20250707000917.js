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
