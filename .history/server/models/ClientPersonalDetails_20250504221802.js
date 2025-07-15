const mongoose = require("mongoose");

const ClientPersonalDetailsSchema = new mongoose.Schema(
  {
    clientUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientUser",
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      required: true,
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ClientPersonalDetails ||
  mongoose.model("ClientPersonalDetails", ClientPersonalDetailsSchema);
