const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroCTA: { type: String, required: true },
  highlightServices: [
    {
      icon: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  featuredPortfolio: [
    {
      title: { type: String, required: true },
      image: { type: String, required: true }, // Store image URL or path
    },
  ],
  featuredPortfolio: [FeaturedPortfolioSchema],
  bannerImagePath: { type: String, default: '' },
});

const HomePage = mongoose.model('HomePage', HomePageSchema);

module.exports = HomePage;
