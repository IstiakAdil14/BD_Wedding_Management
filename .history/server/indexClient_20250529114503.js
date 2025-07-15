/* Removed manual dotenv config to rely on Next.js environment variable loading */

const dbConnect = require("./utils/dbConnect");
const ClientUser = require("./models/ClientUser");
const jwt = require("jsonwebtoken");
// Replaced nodemailer with sendEmail from emailService.js for better email sending reliability
const { sendEmail } = require("./utils/emailService");

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

  // Check if password is still the temporary one
  if (user.password === "temp_password") {
    throw new Error("Password not set. Please complete registration.");
  }

  console.log("Login attempt for email:", email);
  console.log("Entered password:", password);
  console.log("Stored hashed password:", user.password);

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    console.log("Password mismatch for email:", email);
    throw new Error("Invalid password");
  }

  // Validate JWT secrets
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET environment variable is not set");
  }
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET environment variable is not set");
  }

  // Generate JWT tokens
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return {
    accessToken,
    refreshToken,
  };
}

// Helper function to send OTP email
async function sendOtpEmail(email, otp) {
  try {
    if (
      !process.env.SENDGRID_USER ||
      !process.env.SENDGRID_PASS
    ) {
      throw new Error(
        "SendGrid environment variables are not properly set."
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }

    const mailOptions = {
      from: process.env.SENDGRID_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
    };

    console.log("Sending OTP email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await sendEmail(mailOptions);
    console.log("OTP email sent:", info.response);

    // Enhanced logging: log messageId and preview URL if available
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error(
      "Failed to send OTP email. Please check email configuration."
    );
  }
}

// Generate 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Signup start: generate OTP and send email
async function signupStart(email) {
  if (!email) {
    throw new Error("Email is required");
  }

  await dbConnect();

  let user = await ClientUser.findOne({ email });

  const otp = generateOtp();
  const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  if (user) {
    // Update OTP and expiration
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    user.isVerified = false;
  } else {
    // Create new user with OTP and unverified
    user = new ClientUser({
      email,
      password: "temp_password", // temporary password, to be updated after verification
      otp,
      otpExpiration,
      isVerified: false,
    });
  }

  await user.save();

  await sendOtpEmail(email, otp);

  return { message: "OTP sent to email" };
}

// Verify OTP
async function verifyOtp(email, otp) {
  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  await dbConnect();

  console.log("Starting OTP verification for email:", email);

  const user = await ClientUser.findOne({ email });

  if (!user) {
    console.log("User not found for email:", email);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    console.log("User already verified:", email);
    return { message: "User already verified" };
  }

  if (user.otp !== otp) {
    console.log("Invalid OTP for email:", email);
    throw new Error("Invalid OTP");
  }

  if (user.otpExpiration < new Date()) {
    console.log("OTP expired for email:", email);
    throw new Error("OTP expired");
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiration = null;

  try {
    await user.save();
    console.log("User verified and saved successfully:", email);
  } catch (error) {
    console.error("Error saving user verification status:", error);
    throw new Error("Failed to update verification status");
  }

  return { message: "User verified successfully" };
}

// Resend OTP
async function resendOtp(email) {
  if (!email) {
    throw new Error("Email is required");
  }

  await dbConnect();

  const user = await ClientUser.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const otp = generateOtp();
  const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  user.otp = otp;
  user.otpExpiration = otpExpiration;
  user.isVerified = false;

  await user.save();

  await sendOtpEmail(email, otp);

  return { message: "OTP resent to email" };
}

module.exports = {
  login,
  signupStart,
  verifyOtp,
  resendOtp,
};
