const mongoose = require('mongoose');

const EventGallerySchema = new mongoose.Schema({
  src: { type: String, required: true },
  category: { type: String, default: 'Uncategorized' },
});

const EventGallery = mongoose.model('EventGallery', EventGallerySchema);

module.exports = EventGallery;
