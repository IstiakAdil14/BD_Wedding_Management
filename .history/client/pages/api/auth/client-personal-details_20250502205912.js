import dbConnect from "../../../../server/utils/dbConnect";
import ClientPersonalDetails from "../../../../server/models/ClientPersonalDetails";
import ClientUser from "../../../../server/models/ClientUser";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const clientUserId = decoded.userId;
  if (!clientUserId) {
    return res.status(401).json({ message: "Invalid token payload" });
  }

  const { email, fullName, phoneNumber, address, dateOfBirth, gender } =
    req.body;

  if (!email || !fullName) {
    return res.status(400).json({ message: "Email and fullName are required" });
  }

  try {
    // Verify client user exists
    const clientUser = await ClientUser.findById(clientUserId);
    if (!clientUser) {
      return res.status(404).json({ message: "Client user not found" });
    }

    // Find existing personal details by email or create new
    let personalDetails = await ClientPersonalDetails.findOne({ email });

    if (personalDetails) {
      // Update existing
      personalDetails.fullName = fullName;
      personalDetails.phoneNumber = phoneNumber;
      personalDetails.address = address;
      personalDetails.dateOfBirth = dateOfBirth;
      personalDetails.gender = gender;
    } else {
      // Create new
      personalDetails = new ClientPersonalDetails({
        clientUserId,
        email,
        fullName,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
      });
    }

    await personalDetails.save();

    return res
      .status(200)
      .json({ message: "Personal details saved successfully" });
  } catch (error) {
    console.error("Error saving personal details:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
