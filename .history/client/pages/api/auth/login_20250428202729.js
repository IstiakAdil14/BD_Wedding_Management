import { login } from "../../../../server/indexClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const tokens = await login(email, password);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
