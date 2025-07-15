import dbConnect from "../../../../server/utils/dbConnect";
import ClientPersonalDetails from "../../../../server/models/ClientPersonalDetails";
import jwt from "jsonwebtoken";

async function getUserIdFromRequest(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

export default async function handler(req, res) {
  await dbConnect();

  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const details = await ClientPersonalDetails.findOne({ clientUserId: userId });
      if (!details) {
        return res.status(404).json({ message: "Personal details not found" });
      }
      return res.status(200).json(details);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  } else if (req.method === "PUT") {
    try {
      const { fullName, phoneNumber, address, dateOfBirth, gender } = req.body;
      let details = await ClientPersonalDetails.findOne({ clientUserId: userId });
      if (details) {
        details.fullName = fullName || details.fullName;
        details.phoneNumber = phoneNumber || details.phoneNumber;
        details.address = address || details.address;
        details.dateOfBirth = dateOfBirth || details.dateOfBirth;
        details.gender = gender || details.gender;
        await details.save();
      } else {
        details = new ClientPersonalDetails({
          clientUserId: userId,
          fullName,
          phoneNumber,
          address,
          dateOfBirth,
          gender,
        });
        await details.save();
      }
      return res.status(200).json(details);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
