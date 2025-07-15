const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuickLinkSchema = new Schema({
  text: { type: String, required: true },
  url: { type: String, required: true },
});

const FooterSchema = new Schema({
  aboutUs: { type: String, default: '' },
  quickLinks: [QuickLinkSchema],
  contactInfo: {
    address: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
  },
});

const Footer = mongoose.model('Footer', FooterSchema);

module.exports = Footer;
