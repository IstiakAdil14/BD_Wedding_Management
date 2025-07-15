const express = require("express");
const router = express.Router();
const AdminUser = require("../../models/AdminUser");

router.post("/", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res
      .status(400)
      .json({ message: "Please provide both email and OTP." });
  }

  try {
    const user = await AdminUser.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "No account found with this email." });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "This account has already been verified." });
    }

    if (user.otp !== otp) {
      return res
        .status(400)
        .json({
          message: "The OTP you entered is incorrect. Please try again.",
        });
    }

    if (user.otpExpiration < new Date()) {
      return res
        .status(400)
        .json({ message: "Your OTP has expired. Please request a new one." });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiration = null;

    await user.save();

    res.json({
      message: "Verification successful! You may now set your password.",
    });
  } catch (error) {
    console.error("Error in admin verify-otp:", error);
    res
      .status(500)
      .json({
        message: "An unexpected error occurred. Please try again later.",
      });
  }
});

module.exports = router;
