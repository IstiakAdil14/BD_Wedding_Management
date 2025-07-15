const mongoose = require("mongoose");
const ContactInfo = require("../models/ContactInfo");
require("dotenv").config();

async function updateContactInfo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await ContactInfo.updateMany(
      { mapIframeSrc: { $exists: false } },
      { $set: { mapIframeSrc: "" } }
    );

    console.log(`Updated ${result.modifiedCount} ContactInfo documents.`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error updating ContactInfo documents:", error);
    process.exit(1);
  }
}

updateContactInfo();
