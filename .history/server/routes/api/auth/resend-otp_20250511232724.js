const express = require("express");
const router = express.Router();
const ClientUser = require("../../../models/ClientUser");

// POST /api/auth/resend-otp
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await ClientUser.findOne({ email: req.body.email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpCreatedAt = new Date();
    await user.save();

    // TODO: Send OTP to user's email (email sending logic not implemented)

    res.json({ message: "OTP resent to email" });
  } catch (error) {
    console.error("Error in client resend-otp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
