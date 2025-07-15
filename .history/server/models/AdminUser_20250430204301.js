const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  passwordHash: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpiration: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// Method to set password and save the document

// Method to validate password
AdminUserSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

const AdminUser = mongoose.model("AdminUser", AdminUserSchema);

module.exports = AdminUser;
