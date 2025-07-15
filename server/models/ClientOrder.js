const mongoose = require("mongoose");

const ClientOrderSchema = new mongoose.Schema(
  {
    clientUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientUser",
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    orderDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    items: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ClientOrder ||
  mongoose.model("ClientOrder", ClientOrderSchema);
