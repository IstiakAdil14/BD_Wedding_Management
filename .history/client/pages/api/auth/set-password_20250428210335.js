import dbConnect from "../../../../server/utils/dbConnect";
import ClientUser from "../../../../server/models/ClientUser";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  try {
    await dbConnect();

    const user = await ClientUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Setting password for user:", email);
    console.log("Password to set:", password);

    // Save plain password and let pre-save hook hash it
    user.password = password;
    await user.save();

    console.log("Password set successfully for user:", email);

    return res.status(200).json({ message: "Password set successfully" });
  } catch (error) {
    console.error("Error setting password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
