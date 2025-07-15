const mongoose = require('mongoose');

const portfolioEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  video: { type: String }, // store video file path or URL
  description: { type: String, required: true },
}, { timestamps: true });

