const dbConnect = require("../../../../server/utils/dbConnect");
const AdminUser = require("../../../../server/models/AdminUser");
const AdminProfileDetails = require("../../../../server/models/AdminProfileDetails");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", // Increase the body size limit to 5MB
    },
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, photo, email, role } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const adminUser = await AdminUser.findOne({ email: email.toLowerCase() });
      if (!adminUser) {
        return res.status(404).json({ message: "Admin user not found" });
      }

      let profile = await AdminProfileDetails.findOne({
        adminUserId: adminUser._id,
      });
      if (!profile) {
        profile = new AdminProfileDetails({ adminUserId: adminUser._id });
      }

      if (name !== undefined) profile.name = name;
      if (photo !== undefined) profile.photo = photo;
      if (role !== undefined) profile.role = role;

      await profile.save();

      console.log("Profile saved/updated:", profile);

      return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "GET") {
    const { email } = req.query;
    console.log("API GET /profile called with email:", email);

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email query parameter is required" });
    }

    try {
      const adminUser = await AdminUser.findOne({ email: email.toLowerCase() });
      console.log("Found adminUser:", adminUser);
      if (!adminUser) {
        return res.status(404).json({ message: "Admin user not found" });
      }

      const profile = await AdminProfileDetails.findOne({
        adminUserId: adminUser._id,
      });
      console.log("Found profile:", profile);

      return res.status(200).json({
        email: adminUser.email,
        name: profile?.name || "",
        photo: profile?.photo || "",
        role: profile?.role || "User",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
