const express = require("express");
const router = express.Router();
const ClientPersonalDetails = require("../../../models/ClientPersonalDetails");

// GET /api/auth/client-personal-details?email=...
router.get("/", async (req, res) => {
  let email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "Email query parameter is required" });
  }
  try {
    // Normalize email to lowercase
    email = email.trim().toLowerCase();

    // Only allow Gmail addresses
    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ error: "Only Gmail addresses are allowed" });
    }

    const clientDetails = await ClientPersonalDetails.findOne({ email });
    if (!clientDetails) {
      return res.status(404).json({ error: "Client personal details not found" });
    }
    res.json(clientDetails);
  } catch (error) {
    console.error("Error fetching client personal details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
