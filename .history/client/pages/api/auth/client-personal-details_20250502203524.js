import dbConnect from "../../../../server/utils/dbConnect";
import ClientProfile from "../../../../server/models/ClientProfile";
import ClientUser from "../../../../server/models/ClientUser";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "PUT") {
    try {
      const { name, phone, address, email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Find the ClientUser by email
      const clientUser = await ClientUser.findOne({ email: email.trim() });
      if (!clientUser) {
        return res.status(404).json({ message: "Client user not found" });
      }

      // Find existing ClientProfile by clientUserId
      let profile = await ClientProfile.findOne({
        clientUserId: clientUser._id,
      });

      if (profile) {
        profile.name = name || profile.name;
        profile.phone = phone || profile.phone;
        profile.address = address || profile.address;
        await profile.save();
      } else {
        profile = new ClientProfile({
          clientUserId: clientUser._id,
          name,
          phone,
          address,
        });
        await profile.save();
      }

      return res.status(200).json(profile);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
