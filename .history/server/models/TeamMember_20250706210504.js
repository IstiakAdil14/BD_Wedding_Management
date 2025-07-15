const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  visible: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const TeamMember = mongoose.model("TeamMember", TeamMemberSchema);

module.exports = TeamMember;
