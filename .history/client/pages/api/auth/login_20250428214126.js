import { login } from "../../../../server/indexClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.error(`Method not allowed: ${req.method}`);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    console.error("Email and password are required");
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const tokens = await login(email, password);
    res.status(200).json(tokens);
  } catch (error) {
    console.error("Login error:", error.message);
    // Improve error response with specific status codes
    if (
      error.message === "User not found" ||
      error.message === "Invalid password"
    ) {
      return res.status(401).json({ message: error.message });
    } else if (error.message === "User not verified") {
      return res.status(403).json({ message: error.message });
    } else if (
      error.message === "Password not set. Please complete registration."
    ) {
      return res.status(403).json({ message: error.message });
    } else {
      return res.status(400).json({ message: error.message });
    }
  }
}
