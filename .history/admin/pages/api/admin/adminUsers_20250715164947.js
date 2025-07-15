const dbConnect = require("../../../../server/utils/dbConnect");
const AdminUser = require("../../../../server/models/AdminUser");
const AdminProfileDetails = require("../../../../server/models/AdminProfileDetails");

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Aggregate admin profiles with user emails
    const adminProfiles = await AdminUser.aggregate([
      {
        $lookup: {
          from: "adminprofiledetails", // collection name in MongoDB (usually plural lowercase)
          localField: "_id",
          foreignField: "adminUserId",
          as: "profileDetails",
        },
      },
      {
        $unwind: {
          path: "$profileDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          name: "$profileDetails.name",
          photo: "$profileDetails.photo",
          role: "$profileDetails.role",
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
