const dbConnect = require("./utils/dbConnect");
const ClientUser = require("./models/ClientUser");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
      !process.env.EMAIL_SERVICE ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      throw new Error(
        "Email service environment variables are not properly set."
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }

    // Configure nodemailer transporter (using environment variables or defaults)
    // Note: For Gmail accounts with 2FA enabled, use an App Password instead of the account password.
    // To generate an App Password, visit: https://support.google.com/accounts/answer/185833
    // Alternatively, consider using OAuth2 authentication for better security.
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
    };

    console.log("Sending OTP email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.response);

    // Enhanced logging: log messageId and preview URL if available
    console.log("Message ID:", info.messageId);
    if (nodemailer.getTestMessageUrl) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log("Preview URL:", previewUrl);
      }
    }
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

  const user = await ClientUser.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    return { message: "User already verified" };
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (user.otpExpiration < new Date()) {
    throw new Error("OTP expired");
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiration = null;

  await user.save();

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
