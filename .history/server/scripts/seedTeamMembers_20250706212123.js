const mongoose = require("mongoose");
const TeamMember = require("../models/TeamMember");
require("dotenv").config({ path: "../.env.local" });

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/bdwedding";

const seedTeamMembers = [
  {
    name: "Alice Johnson",
    role: "Wedding Planner",
    bio: "Experienced planner with a passion for perfection.",
    image: null,
    facebook: "",
    instagram: "",
    visible: true,
  },
  {
    name: "Bob Smith",
    role: "Event Coordinator",
    bio: "Expert in managing large scale events with ease.",
    image: null,
    facebook: "",
    instagram: "",
    visible: true,
  },
  {
    name: "Carol Lee",
    role: "Creative Director",
    bio: "Bringing innovative ideas to life for every event.",
    image: null,
    facebook: "",
    instagram: "",
    visible: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await TeamMember.deleteMany({});
    console.log("Cleared existing team members");

    await TeamMember.insertMany(seedTeamMembers);
    console.log("Seeded team members successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding team members:", error);
    process.exit(1);
  }
}

seed();
