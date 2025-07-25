const mongoose = require("mongoose");
const AdminUser = require("./models/AdminUser");

const mongoURI = "mongodb://localhost:27017/bdwedding";

async function createOrUpdateAdminUser() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = "admin@example.com";
    const password = "password123";

    let user = await AdminUser.findOne({ email });
    if (user) {
      console.log("Admin user already exists. Updating password...");
      await user.setPassword(password);
      await user.save();
      console.log(`Admin user password updated for email: ${email}`);
      process.exit(0);
    }

    user = new AdminUser({ email });
    await user.setPassword(password);
    await user.save();

    console.log(
      `Admin user created with email: ${email} and password: ${password}`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error creating or updating admin user:", error);
    process.exit(1);
  }
}

createOrUpdateAdminUser();
