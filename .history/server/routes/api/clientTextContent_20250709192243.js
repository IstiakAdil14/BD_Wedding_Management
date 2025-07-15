const express = require('express');
const router = express.Router();
const dbConnect = require('../../utils/dbConnect');
const ClientTextContent = require('../../models/ClientTextContent');

dbConnect();

// GET client text content
router.get('/', async (req, res) => {
  try {
    const contentDoc = await ClientTextContent.findOne();
    if (contentDoc) {
      res.json({ content: contentDoc.content });
    } else {
      res.json({ content: null });
    }
  } catch (error) {
    console.error('Error fetching client text content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST save or update client text content
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    let contentDoc = await ClientTextContent.findOne();
    if (contentDoc) {
      contentDoc.content = content;
      await contentDoc.save();
    } else {
      contentDoc = new ClientTextContent({ content });
      await contentDoc.save();
    }
    res.json({ message: 'Content saved successfully' });
  } catch (error) {
    console.error('Error saving client text content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
