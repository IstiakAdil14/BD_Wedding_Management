const mongoose = require("mongoose");

const AdminOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const AdminOtp = mongoose.model("AdminOtp", AdminOtpSchema);

module.exports = AdminOtp;
