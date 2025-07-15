const express = require('express');
const router = express.Router();
const Service = require('../../../models/Service');

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET a service by id
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// POST create a new service
router.post('/', async (req, res) => {
  try {
    const { title, description, price, iconName, image, features, enabled, category, eventType } = req.body;
    const newService = new Service({ title, description, price, iconName, image, features, enabled, category, eventType });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// PUT update a service by id
router.put('/:id', async (req, res) => {
  try {
    const { title, description, price, iconName, image, features, enabled, category, eventType } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, price, iconName, image, features, enabled, category, eventType },
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE a service by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

const Booking = require('../../../models/Booking');

// POST /api/services/:id/book - Create a new booking for a service package
router.post('/:id/book', async (req, res) => {
  try {
    const packageId = req.params.id;
    const { packageName, name, email, phone, eventDate, specialRequests } = req.body;

    if (!name || !email || !phone || !eventDate || !packageName) {
      return res.status(400).json({ error: 'Missing required booking fields' });
    }

    const booking = new Booking({
      packageId,
      packageName,
      name,
      email,
      phone,
      eventDate,
      specialRequests,
    });

    await booking.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
