const express = require("express");
const router = express.Router();
const dbConnect = require("../../utils/dbConnect");
const AdminUser = require("../../models/AdminUser");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  await dbConnect();

  const { email, name, password, adminType } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the admin user by email
    let admin = await AdminUser.findOne({ email });
    if (!admin) {
      // Create new admin user if not found
      admin = new AdminUser({ email });
    }

    // Set adminType if provided
    if (adminType) {
      admin.role = adminType;
    }

    // Use setPassword method to hash and set the password
    await admin.setPassword(password);

    const savedAdmin = await admin.save();
    console.log("Saved admin user:", savedAdmin);

    // Send email with password and adminType to the new admin
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Admin Account Password",
      text: `Hello,

Your admin account has been created with role: ${adminType || "User"}.
Your password is: ${password}

Please log in using this password.

Best regards,
Admin Team`,
    };

    // Send email with password to the new admin asynchronously
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
});

module.exports = router;
