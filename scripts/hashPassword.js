const bcrypt = require("bcryptjs");

async function hashPassword(plainPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(plainPassword, salt);
    console.log("Hashed password:", hashed);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

// Replace 'YourNewPasswordHere' with the password you want to hash
hashPassword("$2b$10$1ndUdsZWhp3fVTS4EEGHC.1HibbWMfKV7gek5yEmi7jNzWWzcUZzm");
