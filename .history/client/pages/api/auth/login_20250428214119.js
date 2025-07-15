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
