const mongoose = require("mongoose");

const AdminProfileDetailsSchema = new mongoose.Schema({
  adminUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminUser",
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    default: "User",
  },
});

const AdminProfileDetails = mongoose.model(
  "AdminProfileDetails",
  AdminProfileDetailsSchema
);

module.exports = AdminProfileDetails;
