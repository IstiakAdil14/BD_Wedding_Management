const express = require("express");
const router = express.Router();
const dbConnect = require("../utils/dbConnect");
const ClientUser = require("../models/ClientUser");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/signup", async (req, res) => {
  try {
    await dbConnect();
  } catch (dbError) {
    console.error("Database connection error:", dbError);
    return res.status(500).json({ message: "Database connection error" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await ClientUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create OTP for verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const newUser = new ClientUser({
      email,
      password,
      otp,
      otpExpiration,
      isVerified: false,
    });

    await newUser.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error);
        // Consider notifying client of failure to send email
      } else {
        console.log("OTP email sent:", info.response);
      }
    });

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
