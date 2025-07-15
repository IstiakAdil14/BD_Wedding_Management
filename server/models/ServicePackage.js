const mongoose = require('mongoose');

const ServicePackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: String, default: '' },
});

const ServicePackage = mongoose.model('ServicePackage', ServicePackageSchema);

module.exports = ServicePackage;
