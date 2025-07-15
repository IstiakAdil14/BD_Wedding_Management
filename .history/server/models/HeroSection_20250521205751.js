const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeroSectionSchema = new Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroCTA: { type: String, required: true },
