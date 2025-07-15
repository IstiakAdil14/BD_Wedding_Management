const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: false,
  },
  packageName: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventDate: { type: Date, required: true },
  specialRequests: { type: String },
  paymentMethod: { type: String, required: false },
  status: {
    type: String,
    enum: ['pending', 'received', 'cancelled', 'completed'],
    default: 'pending',
  },

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
