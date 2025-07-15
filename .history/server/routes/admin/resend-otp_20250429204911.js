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
    // Generate new 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Set OTP expiration time (e.g., 5 minutes)
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    // Update OTP in DB
    let user = await AdminUser.findOne({ email });
    if (user) {
      user.otp = otp;
      user.otpExpiration = otpExpiration;
      user.isVerified = false;
      await user.save();
    } else {
      user = new AdminUser({ email, otp, otpExpiration, isVerified: false });
      await user.save();
    }

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Admin Signup OTP - Resend",
      text: `Your new OTP for admin signup is: ${otp}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP resent to email" });
  } catch (error) {
    console.error("Error in admin resend-otp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
