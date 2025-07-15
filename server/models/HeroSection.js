const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeroSectionSchema = new Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroCTA: { type: String, required: true },
  backgroundVideoPath: { type: String, default: '' },
  heroImagePath: { type: String, default: '' },
}, { timestamps: true });

const HeroSection = mongoose.model('HeroSection', HeroSectionSchema);

module.exports = HeroSection;
