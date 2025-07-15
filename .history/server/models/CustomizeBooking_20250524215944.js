const mongoose = require('mongoose');

const customizeBookingSchema = new mongoose.Schema({
  category: { type: String, required: true },
  categoryDescription: { type: String, required: true },
  ratePerGuest: { type: Number, required: true, min: 0 },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', default: null },
  packageName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventDate: { type: Date, required: true },
  specialRequests: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const CustomizeBooking = mongoose.model('CustomizeBooking', customizeBookingSchema);

module.exports = CustomizeBooking;
