const nextConnect = require("next-connect").default;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer storage to save files to /public/uploads
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("profilePicture"));

apiRoute.post((req, res) => {
  // Return the public URL of the uploaded file
  const filePath = `/uploads/${req.file.filename}`;
  res.status(200).json({ url: filePath });
});

module.exports = apiRoute;

module.exports.config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
