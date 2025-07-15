import dbConnect from "../../../../server/utils/dbConnect";
import ClientPersonalDetails from "../../../../server/models/ClientPersonalDetails";
import ClientProfile from "../../../../server/models/ClientProfile";
import ClientUser from "../../../../server/models/ClientUser";
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

  if (req.method === "GET") {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const details = await ClientPersonalDetails.findOne({
        clientUserId: userId,
      });
      if (!details) {
        return res.status(404).json({ message: "Personal details not found" });
      }
      return res.status(200).json(details);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  } else if (req.method === "PUT") {
    try {
      const {
        fullName,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
        email,
        name,
        phone,
      } = req.body;

      // If email is provided without userId, update ClientProfile by email
      if (email && !userId) {
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
      }

      // Otherwise, require authorization and update ClientPersonalDetails by userId
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Validate required fields
      if (!fullName || !email) {
        return res
          .status(400)
          .json({ message: "Full name and email are required" });
      }

      // Validate phone number format for Bangladesh
      const phoneRegex = /^\+88\d{11}$/;
      if (phoneNumber && !phoneRegex.test(phoneNumber)) {
        return res
          .status(400)
          .json({
            message: "Phone number must start with +88 followed by 11 digits",
          });
      }

      // Validate dateOfBirth is before today
      if (dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (dob >= today) {
          return res
            .status(400)
            .json({
              message: "Date of birth cannot be today or in the future",
            });
        }
      }

      let details = await ClientPersonalDetails.findOne({
        clientUserId: userId,
      });
      if (details) {
        details.fullName = fullName;
        details.phoneNumber = phoneNumber || details.phoneNumber;
        details.address = address || details.address;
        details.dateOfBirth = dateOfBirth || details.dateOfBirth;
        details.gender = gender || details.gender;
        details.email = email;
        await details.save();
      } else {
        details = new ClientPersonalDetails({
          clientUserId: userId,
          fullName,
          phoneNumber,
          address,
          dateOfBirth,
          gender,
          email,
        });
        await details.save();
      }
      return res.status(200).json(details);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
