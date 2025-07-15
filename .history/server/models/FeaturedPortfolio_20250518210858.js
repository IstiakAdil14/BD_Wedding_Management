const mongoose = require('mongoose');

const FeaturedPortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

const FeaturedPortfolio = mongoose.models.FeaturedPortfolio || mongoose.model('FeaturedPortfolio', FeaturedPortfolioSchema);

module.exports = FeaturedPortfolio;
