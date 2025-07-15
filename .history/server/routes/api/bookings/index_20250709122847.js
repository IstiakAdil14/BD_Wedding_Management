const express = require('express');
const router = express.Router();
const Booking = require('../../../models/Booking');

// GET all bookings or bookings filtered by email
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { email } : {};
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// POST create a new booking
router.post('/', async (req, res) => {
  try {
    const {
      packageId,
      packageName,
      name,
      email,
      phone,
      eventDate,
      specialRequests,
      paymentMethod,
      paymentAccountNumber,
    } = req.body;

    if (!packageName || !name || !email || !phone || !eventDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const booking = new Booking({
      packageId: packageId || null,
      packageName,
      name,
      email,
      phone,
      eventDate,
      specialRequests: specialRequests || '',
      paymentMethod: paymentMethod || '',
      paymentAccountNumber: paymentAccountNumber || '',
      status: 'pending',
    });

    const savedBooking = await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
  } catch (error) {
    console.error('Failed to create booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// PATCH update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;
    console.log(`PATCH /api/bookings/${bookingId}/status called with status: ${status}`);
    if (!['pending', 'received', 'cancelled', 'completed'].includes(status)) {
      console.log(`Invalid status value: ${status}`);
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    if (!updatedBooking) {
      console.log(`Booking not found: ${bookingId}`);
      return res.status(404).json({ error: 'Booking not found' });
    }
    console.log(`Booking status updated: ${updatedBooking._id} to ${updatedBooking.status}`);
    res.json({ message: 'Booking status updated', booking: updatedBooking });
  } catch (error) {
    console.error('Failed to update booking status:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

module.exports = router;
