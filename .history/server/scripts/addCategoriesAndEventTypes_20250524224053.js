const mongoose = require('mongoose');
const Category = require('../models/Category');
const EventType = require('../models/EventType');
const dbConnect = require('../utils/dbConnect');

const categoriesToAdd = [
  { name: "Venue Decoration", description: "Services related to venue decoration" },
  { name: "Premium Features", description: "Premium service features" },
  { name: "Full Planning", description: "Complete event planning services" },
];

const eventTypesToAdd = [
  { name: "WEDDING", ratePerGuest: 1500 },
  { name: "reception", ratePerGuest: 1200 },
  { name: "Engagement", ratePerGuest: 1000 },
  { name: "OTHER", ratePerGuest: 800 },
];

async function addCategories() {
  for (const category of categoriesToAdd) {
    const exists = await Category.findOne({ name: category.name });
    if (!exists) {
      const newCategory = new Category(category);
      await newCategory.save();
      console.log(`Added category: ${category.name}`);
    } else {
      console.log(`Category already exists: ${category.name}`);
    }
  }
}

async function addEventTypes() {
  for (const eventType of eventTypesToAdd) {
    const exists = await EventType.findOne({ name: eventType.name });
    if (!exists) {
      const newEventType = new EventType(eventType);
      await newEventType.save();
      console.log(`Added event type: ${eventType.name}`);
    } else {
      console.log(`Event type already exists: ${eventType.name}`);
    }
  }
}

async function main() {
  try {
    await dbConnect();
    await addCategories();
    await addEventTypes();
    console.log('Categories and Event Types update complete.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating categories and event types:', error);
    mongoose.connection.close();
  }
}

main();
