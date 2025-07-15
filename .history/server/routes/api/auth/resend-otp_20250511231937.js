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
    // TODO: Implement OTP resend logic for client user
    // For now, just respond with success message
    res.json({ message: "OTP resent to email (mock)" });
  } catch (error) {
    console.error("Error in client resend-otp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
