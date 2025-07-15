const express = require("express");
const router = express.Router();
const AdminUser = require("../../models/AdminUser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Configure your email transporter here using environment variables
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if admin user already exists
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Admin user already exists" });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Set OTP expiration time (e.g., 5 minutes)
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    // Create new admin user with OTP and unverified
    const newUser = new AdminUser({
      email,
      passwordHash: "", // password to be set later
      otp,
      otpExpiration,
      isVerified: false,
    });

    await newUser.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Admin Signup OTP",
      text: `Your OTP for admin signup is: ${otp}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error in admin signup-start:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
