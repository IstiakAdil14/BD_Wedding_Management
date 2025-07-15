const express = require('express');
const router = express.Router();
const EventType = require('../../../models/EventType');

// GET all event types
router.get('/', async (req, res) => {
  try {
    const eventTypes = await EventType.find({});
    res.json(eventTypes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event types' });
  }
});

// POST create a new event type
router.post('/', async (req, res) => {
  try {
    const { name, ratePerGuest } = req.body;
    if (!name || ratePerGuest === undefined) {
      return res.status(400).json({ error: 'Name and ratePerGuest are required' });
    }
    const newEventType = new EventType({ name, ratePerGuest });
    await newEventType.save();
    res.status(201).json(newEventType);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event type' });
  }
});

// PUT update an event type by id
router.put('/:id', async (req, res) => {
  try {
    const { name, ratePerGuest } = req.body;
    const updatedEventType = await EventType.findByIdAndUpdate(
      req.params.id,
      { name, ratePerGuest },
      { new: true }
    );
    if (!updatedEventType) {
      return res.status(404).json({ error: 'Event type not found' });
    }
    res.json(updatedEventType);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event type' });
  }
});

// DELETE an event type by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedEventType = await EventType.findByIdAndDelete(req.params.id);
    if (!deletedEventType) {
      return res.status(404).json({ error: 'Event type not found' });
    }
    res.json({ message: 'Event type deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event type' });
  }
});

module.exports = router;
