const mongoose = require('mongoose');

const EventGallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  imagePath: { type: String, required: true },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.models.EventGallery || mongoose.model('EventGallery', EventGallerySchema);
