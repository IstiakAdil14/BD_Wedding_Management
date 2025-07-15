const mongoose = require('mongoose');
const Footer = require('../models/Footer');
require('dotenv').config({ path: './.env.local' });

async function seedFooterData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const footerData = {
      aboutUs: "BD Wedding Planner is your trusted partner for creating unforgettable wedding experiences. We bring your dream wedding to life with passion and precision.",
      quickLinks: [
        { text: "About", url: "/about" },
        { text: "Services", url: "/services" },
        { text: "Portfolio", url: "/portfolio" },
        { text: "Contact", url: "/contact" }
      ],
      contactInfo: {
        address: "123 Wedding St, Dhaka, Bangladesh",
        email: "info@bdweddingplanner.com",
        phone: "+880 1234 567890"
      },
      socialLinks: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com"
      }
    };

    let footer = await Footer.findOne({});
    if (!footer) {
      footer = new Footer(footerData);
    } else {
      footer.aboutUs = footerData.aboutUs;
      footer.quickLinks = footerData.quickLinks;
      footer.contactInfo = footerData.contactInfo;
      footer.socialLinks = footerData.socialLinks;
    }

    await footer.save();
    console.log('Footer data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding footer data:', error);
    process.exit(1);
  }
}

seedFooterData();
