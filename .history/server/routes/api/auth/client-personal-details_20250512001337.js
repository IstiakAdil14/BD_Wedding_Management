const express = require("express");
const router = express.Router();
const ClientPersonalDetails = require("../../../models/ClientPersonalDetails");

// GET /api/auth/client-personal-details?email=...
router.get("/", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "Email query parameter is required" });
  }
  try {
    const clientDetails = await ClientPersonalDetails.findOne({ email: email.trim().toLowerCase() });
    if (!clientDetails) {
      return res.status(404).json({ error: "Client personal details not found" });
    }
    // Format the response data to match frontend expectations
    const formattedDetails = {
      id: clientDetails._id.toString(),
      clientUserId: clientDetails.clientUserId.toString(),
      email: clientDetails.email,
      fullName: clientDetails.fullName,
      phoneNumber: clientDetails.phoneNumber,
      address: clientDetails.address,
      dateOfBirth: clientDetails.dateOfBirth ? clientDetails.dateOfBirth.toISOString() : null,
      gender: clientDetails.gender,
      profilePicture: clientDetails.profilePicture,
      createdAt: clientDetails.createdAt ? clientDetails.createdAt.toISOString() : null,
      updatedAt: clientDetails.updatedAt ? clientDetails.updatedAt.toISOString() : null,
    };
    res.json(formattedDetails);
  } catch (error) {
    console.error("Error fetching client personal details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
