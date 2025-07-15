const mongoose = require('mongoose');

const customizeServiceSchema = new mongoose.Schema({
  category: { type: String, required: true },
  categoryDescription: { type: String, required: true },
  eventType: { type: String, required: true },
  ratePerGuest: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

const CustomizeService = mongoose.model('CustomizeService', customizeServiceSchema);

module.exports = CustomizeService;
