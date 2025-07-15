const express = require('express');
const router = express.Router();
const EventGallery = require('../../../models/EventGallery');

// GET all event gallery items
router.get('/', async (req, res) => {
  try {
    const items = await EventGallery.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event gallery items' });
  }
});

// POST create a new event gallery item
router.post('/', async (req, res) => {
  try {
    const { title, imagePath, description } = req.body;
    const newItem = new EventGallery({ title, imagePath, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event gallery item' });
  }
});

// PUT update an event gallery item by id
router.put('/:id', async (req, res) => {
  try {
    const { title, imagePath, description } = req.body;
    const updatedItem = await EventGallery.findByIdAndUpdate(
      req.params.id,
      { title, imagePath, description },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Event gallery item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event gallery item' });
  }
});

// DELETE an event gallery item by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await EventGallery.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Event gallery item not found' });
    }
    res.json({ message: 'Event gallery item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event gallery item' });
  }
});

module.exports = router;
