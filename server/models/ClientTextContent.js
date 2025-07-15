const mongoose = require('mongoose');

const ClientTextContentSchema = new mongoose.Schema({
  content: { type: String, required: true }, // draft.js raw content JSON string
}, { timestamps: true });

module.exports = mongoose.models.ClientTextContent || mongoose.model('ClientTextContent', ClientTextContentSchema);
