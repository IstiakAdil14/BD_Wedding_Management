const express = require("express");
const router = express.Router();
const AdminUser = require("../../models/AdminUser");
const AdminOtp = require("../../models/AdminOtp");

router.post("/", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const adminOtp = await AdminOtp.findOne({ email, otp });
    if (!adminOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (adminOtp.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (adminOtp.verified) {
      return res.status(400).json({ message: "OTP already verified" });
    }

    // Mark OTP as verified
    adminOtp.verified = true;
    await adminOtp.save();

    // Check if admin user exists, create if not
    let adminUser = await AdminUser.findOne({ email });
    if (!adminUser) {
      adminUser = new AdminUser({ email, passwordHash: "" }); // password to be set later
      await adminUser.save();
    }

    res.json({ message: "Admin verified successfully" });
  } catch (error) {
    console.error("Error in admin verify-otp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
