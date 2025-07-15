const mongoose = require('mongoose');

const AuthEventSchema = new mongoose.Schema({
  eventType: { type: String, enum: ['login', 'signup'], required: true },
  userEmail: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.models.AuthEvent || mongoose.model('AuthEvent', AuthEventSchema);
