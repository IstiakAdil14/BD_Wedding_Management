const mongoose = require('mongoose');

const HighlightServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const HighlightService = mongoose.models.HighlightService || mongoose.model('HighlightService', HighlightServiceSchema);

module.exports = HighlightService;
