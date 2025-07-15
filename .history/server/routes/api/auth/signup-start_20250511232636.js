const express = require("express");
const router = express.Router();
const ClientUser = require("../../../models/ClientUser");

// POST /api/auth/signup-start
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP and email to ClientUser collection (upsert)
    const filter = { email: email.trim().toLowerCase() };
    const update = { otp, otpCreatedAt: new Date() };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    await ClientUser.findOneAndUpdate(filter, update, options);

    // TODO: Send OTP to user's email (email sending logic not implemented)

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error in client signup-start:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
