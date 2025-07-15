import dbConnect from "../../../../server/utils/dbConnect";
import AdminUser from "../../../../server/models/AdminUser";

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
    console.log("Saved admin user:", savedAdmin);

    return res.status(200).json({ message: "Admin registration successful" });
  } catch (error) {
    console.error("Error in admin registration:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
}
