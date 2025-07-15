const mongoose = require('mongoose');

const CustomizeServiceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  categoryDescription: {
    type: String,
    default: '',
  },
  eventType: {
    type: String,
    required: true,
  },
  ratePerGuest: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('CustomizeService', CustomizeServiceSchema);
