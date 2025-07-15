const express = require('express');
const router = express.Router();
const CustomizeBooking = require('../../../models/CustomizeBooking');

// GET all customize bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await CustomizeBooking.find({});
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customize bookings' });
  }
});

// POST create a new customize booking
router.post('/', async (req, res) => {
  try {
    const {
      category,
      categoryDescription,
      ratePerGuest,
      packageId,
      packageName,
      name,
      email,
      phone,
      eventDate,
      specialRequests,
    } = req.body;

    if (!category || !categoryDescription || ratePerGuest === undefined || !name || !email || !phone || !eventDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBooking = new CustomizeBooking({
      category,
      categoryDescription,
      ratePerGuest,
      packageId,
      packageName,
      name,
      email,
      phone,
      eventDate,
      specialRequests,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customize booking' });
  }
});

// PUT update a customize booking by id
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await CustomizeBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Customize booking not found' });
    }
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update customize booking' });
  }
});

// DELETE a customize booking by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await CustomizeBooking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Customize booking not found' });
    }
    res.json({ message: 'Customize booking deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customize booking' });
  }
});

module.exports = router;
