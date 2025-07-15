const express = require('express');
const router = express.Router();
const PortfolioEvent = require('../../../models/PortfolioEvent');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await PortfolioEvent.find({});
    res.json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST create a new event
router.post('/', async (req, res) => {
  try {
    const { title, category, images, video, description } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ error: 'Title, category, and description are required' });
    }
    const newEvent = new PortfolioEvent({ title, category, images, video, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Failed to create event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT update an event by id
router.put('/:id', async (req, res) => {
  try {
    const { title, category, images, video, description } = req.body;
    const updatedEvent = await PortfolioEvent.findByIdAndUpdate(
      req.params.id,
      { title, category, images, video, description },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error('Failed to update event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE an event by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await PortfolioEvent.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Failed to delete event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
