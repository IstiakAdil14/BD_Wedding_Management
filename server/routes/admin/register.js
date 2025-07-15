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
      return res.status(403).json({ message: "Only Full Access admins can add new admins" });
    }

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
        console.error("Error sending password email:", err);
      } else {
        console.log("Password email sent:", info.response);
      }
    });

    return res.status(200).json({ message: "Admin registration successful, password email sent" });
  } catch (error) {
    console.error("Error in admin registration:", error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
