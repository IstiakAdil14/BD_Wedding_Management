const mongoose = require("mongoose");
const AdminUser = require("../server/models/AdminUser");

const mongoURI = "mongodb://localhost:27017/bdwedding"; // Update with your MongoDB URI

async function updateAdminUsers() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Update all admin users that do not have the 'name' field set
    const result = await AdminUser.updateMany(
