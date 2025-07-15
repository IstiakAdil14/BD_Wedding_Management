const express = require("express");
const router = express.Router();
const ClientUser = require("../../../models/ClientUser");

// POST /api/auth/verify-otp
router.post("/", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  try {
    const user = await ClientUser.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    // Optionally, check OTP expiration (e.g., 10 minutes)
    const otpAge = (new Date() - user.otpCreatedAt) / 1000 / 60; // minutes
    if (otpAge > 10) {
      return res.status(400).json({ message: "OTP expired" });
    }
    // Mark user as verified (e.g., set a verified flag)
    user.verified = true;
    user.otp = null;
    user.otpCreatedAt = null;
    await user.save();

    res.json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error in client verify-otp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
