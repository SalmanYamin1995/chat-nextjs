const bcrypt = require("bcrypt");

// Function to hash a password
export async function hashPassword(password) {
  try {
    const saltRounds = 10; // Cost factor
    console.log("HERE");
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}
export async function verifyPassword(plainPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword); // returns true if passwords match, false otherwise
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
}
