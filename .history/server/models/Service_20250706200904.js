const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
