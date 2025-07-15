const mongoose = require('mongoose');

const HighlightServiceSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  description: { type: String, required: true },
});

const FeaturedPortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imagePath: { type: String, default: '' },
});

const HomePageSchema = new mongoose.Schema({
  heroTitle: { type: String, default: '' },
  heroSubtitle: { type: String, default: '' },
  heroCTA: { type: String, default: '' },
  heroImagePath: { type: String, default: '' },
  highlightServices: [HighlightServiceSchema],
  featuredPortfolio: [FeaturedPortfolioSchema],
  bannerImagePath: { type: String, default: '' },
});

const HomePage = mongoose.model('HomePage', HomePageSchema);

module.exports = HomePage;
