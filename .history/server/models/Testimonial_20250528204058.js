const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: false },
  message: { type: String, required: true },
  clientImage: { type: String, default: '' },
  display: { type: Boolean, default: true }, // whether to display this testimonial or not
}, { timestamps: true });

module.exports = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
