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
      { name: { $exists: false } },
      { $set: { name: "" } }
    );

    console.log(`Updated ${result.modifiedCount} admin user(s) to add 'name' field.`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error updating admin users:", error);
  }
}

updateAdminUsers();
