const mongoose = require('mongoose');
const PortfolioEvent = require('../models/PortfolioEvent');
const dbConnect = require('../utils/dbConnect');

async function createTestEvent() {
  try {
    await dbConnect();
    console.log('Connected to DB');

    const testEvent = new PortfolioEvent({
      title: 'Test Event',
      category: 'Test Category',
      images: ['https://example.com/image1.jpg'],
      video: 'https://example.com/video.mp4',
      description: 'This is a test event to create the collection.',
    });

    const savedEvent = await testEvent.save();
    console.log('Test event saved:', savedEvent);

    process.exit(0);
  } catch (error) {
    console.error('Error creating test event:', error);
    process.exit(1);
  }
}

createTestEvent();
