const mongoose = require('mongoose');

const eventTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ratePerGuest: { type: Number, required: true, min: 0 },
});

const EventType = mongoose.model('EventType', eventTypeSchema);

module.exports = EventType;
