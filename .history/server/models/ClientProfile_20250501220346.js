const mongoose = require("mongoose");

const ClientProfileSchema = new mongoose.Schema(
  {
    clientUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientUser",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ClientProfile ||
  mongoose.model("ClientProfile", ClientProfileSchema);
