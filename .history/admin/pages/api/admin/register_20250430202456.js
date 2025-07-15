import dbConnect from "../../../utils/dbConnect";
import AdminUser from "../../../models/AdminUser";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the admin user by email
    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Update the name
    admin.name = name;

    // Use setPassword method to hash and set the password
    await admin.setPassword(password);

    await admin.save();

    return res.status(200).json({ message: "Admin registration successful" });
  } catch (error) {
    console.error("Error in admin registration:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
}
