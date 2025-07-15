const dbConnect = require("./utils/dbConnect");
const ClientUser = require("./models/ClientUser");
const jwt = require("jsonwebtoken");

async function login(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  await dbConnect();

  const user = await ClientUser.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isVerified) {
    throw new Error("User not verified");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // Generate JWT tokens
