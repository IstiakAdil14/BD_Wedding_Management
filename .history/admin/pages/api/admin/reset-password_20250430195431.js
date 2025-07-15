import dbConnect from "../../../utils/dbConnect";
import AdminUser from "../../../models/AdminUser";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { adminId, newPassword, name } = req.body;

  if (!adminId || !newPassword) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the admin user by id
    const admin = await AdminUser.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Update the name if provided
    if (name) {
      admin.name = name;
    }

    // Use setPassword method to hash and set the password
    await admin.setPassword(newPassword);

    await admin.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
