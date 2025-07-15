export default function handler(req, res) {
  res
    .status(301)
    .json({
      message:
        "Moved permanently. Use server backend API at /api/client/signup",
    });
}
