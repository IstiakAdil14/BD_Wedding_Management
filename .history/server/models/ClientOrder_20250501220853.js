const mongoose = require("mongoose");

const ClientOrderSchema = new mongoose.Schema(
  {
    clientUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientUser",
      required: true,
    },
    orderNumber: {
