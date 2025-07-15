const mongoose = require('mongoose');

const HighlightServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const FeaturedPortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
});

const QuickLinkSchema = new mongoose.Schema({
  text: { type: String, default: '' },
  url: { type: String, default: '' },
});

const ContactInfoSchema = new mongoose.Schema({
  address: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
});

const SocialLinksSchema = new mongoose.Schema({
  facebook: { type: String, default: '' },
  twitter: { type: String, default: '' },
  instagram: { type: String, default: '' },
  linkedin: { type: String, default: '' },
});

const HomePageSchema = new mongoose.Schema({
  heroTitle: { type: String, default: '' },
  heroSubtitle: { type: String, default: '' },
  heroCTA: { type: String, default: '' },
  heroImagePath: { type: String, default: '' },
  backgroundVideoPath: { type: String, default: '' },
  highlightServices: [HighlightServiceSchema],
  featuredPortfolio: [FeaturedPortfolioSchema],
  bannerImagePath: { type: String, default: '' },
  aboutUs: { type: String, default: '' },
  quickLinks: [QuickLinkSchema],
  contactInfo: ContactInfoSchema,
  socialLinks: SocialLinksSchema,
});

const HomePage = mongoose.model('HomePage', HomePageSchema);

module.exports = HomePage;
