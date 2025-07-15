const express = require("express");
const router = express.Router();
const { resendOtp } = require("../../../indexClient");

// POST /api/auth/resend-otp
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const result = await resendOtp(email);
    res.json(result);
  } catch (error) {
    console.error("Error in client resend-otp:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
