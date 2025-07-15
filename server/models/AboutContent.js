const mongoose = require("mongoose");

const AboutContentSchema = new mongoose.Schema({
  ourStory: {
    type: String,
    required: true,
  },
  missionAndValues: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const AboutContent = mongoose.model("AboutContent", AboutContentSchema);

module.exports = AboutContent;
