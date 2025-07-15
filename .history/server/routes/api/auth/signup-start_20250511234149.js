const express = require("express");
const router = express.Router();
const { signupStart } = require("../../../indexClient");

// POST /api/auth/signup-start
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const result = await signupStart(email);
    res.json(result);
  } catch (error) {
    console.error("Error in client signup-start:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
