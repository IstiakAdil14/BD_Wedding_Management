const express = require("express");
const router = express.Router();
const AdminUser = require("../../models/AdminUser");
const AdminOtp = require("../../models/AdminOtp");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Configure your email transporter here
const transporter = nodemailer.createTransport({
  // Example using Gmail SMTP
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
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

    // Set OTP expiration time (e.g., 10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP to DB, overwrite if exists
    let adminOtp = await AdminOtp.findOne({ email });
    if (adminOtp) {
      adminOtp.otp = otp;
      adminOtp.expiresAt = expiresAt;
      adminOtp.verified = false;
    } else {
      adminOtp = new AdminOtp({ email, otp, expiresAt });
    }
    await adminOtp.save();

    // Send OTP email
    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Your Admin Signup OTP",
      text: `Your OTP for admin signup is: ${otp}. It expires in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error in admin signup-start:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
