import dbConnect from "../../../../server/utils/dbConnect";
import AdminUser from "../../../../server/models/AdminUser";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, name, password } = req.body;

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

    // Use setPassword method to hash and set the password
    await admin.setPassword(password);

    const savedAdmin = await admin.save();
