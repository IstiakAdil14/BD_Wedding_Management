const dbConnect = require("../../../../server/utils/dbConnect");
const AdminUser = require("../../../../server/models/AdminUser");
const AdminProfileDetails = require("../../../../server/models/AdminProfileDetails");

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Aggregate admin profiles with user emails
      const adminProfiles = await AdminProfileDetails.aggregate([
        {
          $lookup: {
            from: "adminusers", // collection name in MongoDB (usually plural lowercase)
            localField: "adminUserId",
            foreignField: "_id",
            as: "adminUser",
          },
        },
        { $unwind: "$adminUser" },
        {
          $project: {
            _id: 1,
            name: 1,
            photo: 1,
            role: 1,
            email: "$adminUser.email",
          },
        },
      ]);

      return res.status(200).json(adminProfiles);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
