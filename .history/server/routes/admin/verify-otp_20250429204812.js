const express = require("express");
const router = express.Router();
const AdminUser = require("../../models/AdminUser");

router.post("/", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await AdminUser.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiration < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiration = null;

    await user.save();

    res.json({ message: "Admin verified successfully" });
  } catch (error) {
    console.error("Error in admin verify-otp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
