const express = require("express");
const router = express.Router();
const { verifyOtp } = require("../../../indexClient");

// POST /api/auth/verify-otp
router.post("/", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  try {
    const result = await verifyOtp(email, otp);
    res.json(result);
  } catch (error) {
    console.error("Error in client verify-otp:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
