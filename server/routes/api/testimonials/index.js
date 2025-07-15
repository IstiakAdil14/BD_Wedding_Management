const express = require('express');
const router = express.Router();
const Testimonial = require('../../../models/Testimonial');

const uploadRouter = require('./upload');

router.use('/upload', uploadRouter);

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({});
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// POST create a new testimonial
router.post('/', async (req, res) => {
  try {
    const { clientName, email, message, clientImage, display } = req.body;
    const newTestimonial = new Testimonial({ clientName, email, message, clientImage, display });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// PUT update a testimonial by id
router.put('/:id', async (req, res) => {
  try {
    const { clientName, message, clientImage, display } = req.body;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { clientName, message, clientImage, display },
      { new: true }
    );
    if (!updatedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// DELETE a testimonial by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

module.exports = router;
