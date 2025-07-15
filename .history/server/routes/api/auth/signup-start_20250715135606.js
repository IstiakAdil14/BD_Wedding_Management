const express = require("express");
const router = express.Router();
const { signupStart } = require("../../../indexClient");
const AuthEvent = require("../../../models/AuthEvent");

// POST /api/auth/signup-start
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const result = await signupStart(email);

    // Log signup event
    try {
      await AuthEvent.create({ eventType: "signup", userEmail: email });
    } catch (logError) {
      console.error("Failed to log signup event:", logError);
    }

    res.json(result);
  } catch (error) {
    console.error("Error in client signup-start:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
