import nc from "next-connect";
import dbConnect from "../../../server/utils/dbConnect";
import ClientPersonalDetails from "../../../server/models/ClientPersonalDetails";
import ClientUser from "../../../server/models/ClientUser";

const handler = nc();

handler.post(async (req, res) => {
  await dbConnect();

  const {
    email,
    fullName,
    phoneNumber,
    address,
    dateOfBirth,
    gender,
    profilePicture,
  } = req.body;

  if (!email || !fullName) {
    return res.status(400).json({ message: "Email and fullName are required" });
  }

  try {
    // Find client user by email
    const clientUser = await ClientUser.findOne({ email });
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
      personalDetails.profilePicture = profilePicture;
    } else {
      // Create new
      personalDetails = new ClientPersonalDetails({
        clientUserId: clientUser._id,
        email,
        fullName,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
        profilePicture,
      });
    }

    await personalDetails.save();

    return res
      .status(200)
      .json({ message: "Personal details saved successfully" });
  } catch (error) {
    console.error("Error saving personal details:", error);
