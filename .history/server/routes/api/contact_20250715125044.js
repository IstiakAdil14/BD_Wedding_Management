const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ContactMessage = require('../../models/ContactMessage');
require('dotenv').config();

// Create transporter using environment variables for email service credentials
let transporter;

function createTransporter() {
  if (process.env.EMAIL_HOST && process.env.EMAIL_PORT) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // Fallback to service if host/port not provided
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
}

transporter = createTransporter();

console.log('Email transporter config:', {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  user: process.env.EMAIL_USER ? '***' : null,
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  // Save message to database
  try {
    const contactMessage = new ContactMessage({ name, email, message });
    await contactMessage.save();
  } catch (dbError) {
    console.error('Error saving contact message:', dbError);
    return res.status(500).json({ success: false, message: 'Failed to save message to database.' });
  }

  const mailOptions = {
    from: `"BD Wedding Planner Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER,
    subject: `New Contact Form Message from ${name}`,
    text: `You have received a new message from the contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    html: `<p>You have received a new message from the contact form:</p>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Full error details:', error);
    return res.status(500).json({ success: false, message: `Failed to send message. Error: ${error.message}` });
  }
});

module.exports = router;
