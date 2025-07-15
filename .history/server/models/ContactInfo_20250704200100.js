const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const contactInfoSchema = new mongoose.Schema(
  {
    phoneNumbers: [{ type: String }],
    email: { type: String, required: true },
    businessHours: { type: String },
    officeLocation: { type: String },
    faqs: [faqSchema],
    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);

module.exports = ContactInfo;
