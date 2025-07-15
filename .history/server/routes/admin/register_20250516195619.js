const express = require("express");
const router = express.Router();
const dbConnect = require("../../utils/dbConnect");
const AdminUser = require("../../models/AdminUser");
const nodemailer = require("nodemailer");

const AdminProfileDetails = require("../../models/AdminProfileDetails");

router.post("/", async (req, res) => {
  await dbConnect();

  const { email, name, password, adminType, requesterEmail } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Verify requester has Full Access role
    if (!requesterEmail) {
      return res.status(401).json({ message: "Requester email is required" });
    }
    const requesterUser = await AdminUser.findOne({ email: requesterEmail.toLowerCase() });
    if (!requesterUser) {
      return res.status(401).json({ message: "Requester user not found" });
    }
    const requesterProfile = await AdminProfileDetails.findOne({ adminUserId: requesterUser._id });
    if (!requesterProfile || requesterProfile.role !== "Full Access") {

module.exports = router;
