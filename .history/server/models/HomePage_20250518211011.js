
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomePageSchema = new Schema({
  heroTitle: { type: String, default: '' },
  heroSubtitle: { type: String, default: '' },
  heroCTA: { type: String, default: '' },
  heroImagePath: { type: String, default: '' },
  bannerImagePath: { type: String, default: '' },
  backgroundVideoPath: { type: String, default: '' },
  aboutUs: { type: String, default: '' },
  contactInfo: { type: Object, default: {} },
  socialLinks: { type: Object, default: {} },
  // References to separate collections
  highlightServices: [{ type: Schema.Types.ObjectId, ref: 'HighlightService' }],
  featuredPortfolio: [{ type: Schema.Types.ObjectId, ref: 'FeaturedPortfolio' }],
  quickLinks: [{ type: Schema.Types.ObjectId, ref: 'QuickLink' }],
  eventGallery: [{ type: Schema.Types.ObjectId, ref: 'EventGallery' }],
});

const HomePage = mongoose.model('HomePage', HomePageSchema);

module.exports = HomePage;
