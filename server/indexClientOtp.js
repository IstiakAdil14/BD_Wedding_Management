const {
  signupStart: originalSignupStart,
  verifyOtp: originalVerifyOtp,
  resendOtp: originalResendOtp,
} = require("./indexClient");

async function signupStart(email) {
  try {
    const result = await originalSignupStart(email);
    return result;
  } catch (error) {
    console.error("Error in signupStart:", error);
    throw new Error("Failed to send OTP. Please try again later.");
  }
}

async function verifyOtp(email, otp) {
  try {
    const result = await originalVerifyOtp(email, otp);
    return result;
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    throw new Error(error.message || "OTP verification failed.");
  }
}

async function resendOtp(email) {
  try {
    const result = await originalResendOtp(email);
    return result;
  } catch (error) {
    console.error("Error in resendOtp:", error);
    throw new Error("Failed to resend OTP. Please try again later.");
  }
}

module.exports = {
  signupStart,
  verifyOtp,
  resendOtp,
};
