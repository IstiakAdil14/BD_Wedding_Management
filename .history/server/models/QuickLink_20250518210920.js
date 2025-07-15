const mongoose = require('mongoose');

const QuickLinkSchema = new mongoose.Schema({
  text: { type: String, required: true },
  url: { type: String, required: true },
}, { timestamps: true });

const QuickLink = mongoose.models.QuickLink || mongoose.model('QuickLink', QuickLinkSchema);

module.exports = QuickLink;
