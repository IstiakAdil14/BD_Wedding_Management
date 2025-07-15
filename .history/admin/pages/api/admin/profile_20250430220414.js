const dbConnect = require("../../../../server/utils/dbConnect");
const AdminUser = require("../../../../server/models/AdminUser");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  const { name, photo, email, role } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const adminUser = await AdminUser.findOne({ email: email.toLowerCase() });
    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Update fields if provided
    if (name !== undefined) adminUser.name = name;
    if (photo !== undefined) adminUser.photo = photo;
    if (role !== undefined) adminUser.role = role;

    await adminUser.save();

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
