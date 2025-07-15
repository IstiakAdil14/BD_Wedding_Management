const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  iconName: { type: String, required: true }, // store icon name like 'FaPaintBrush'
  image: { type: [String], default: [] }, // changed to array of strings for multiple images
  features: { type: [String], default: [] }, // added features array field
  enabled: { type: Boolean, default: true }, // new field to indicate if service is enabled
}, { timestamps: true });

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
