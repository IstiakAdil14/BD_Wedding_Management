require("dotenv").config({ path: "./.env.local" });


const express = require("express");
const cors = require("cors");
const AdminUser = require("./models/AdminUser");
const { login: clientLogin } = require("./indexClient");
const multer = require("multer");
const path = require('path');
const dbConnect = require("./utils/dbConnect");

const app = express();
const port = process.env.PORT || 5000;

// Add express.json() middleware globally at the top before other middleware
app.use(express.json({ limit: '20mb' }));

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow both frontend ports
  })
);

// Serve static files from uploads directory
const uploadsPath = path.resolve(__dirname, 'client/public/uploads');
console.log('Serving uploads from:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));




// Note: Do NOT use express.json() or express.urlencoded() globally before multer routes
// Instead, apply express.json() and express.urlencoded() after multer or only on routes without file uploads

// Connect to MongoDB
(async () => {
  try {
    await dbConnect();
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
})();

// Sample API endpoint
app.get("/api/status", (req, res) => {
  res.json({ status: "Server is running and connected to MongoDB" });
});

// Admin login endpoint
app.post("/api/admin/login", express.json(), async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await AdminUser.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Authentication successful
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Client login endpoint
app.post("/api/client/login", express.json(), async (req, res) => {
  const { email, password } = req.body;
  try {
    const tokens = await clientLogin(email, password);
    res.status(200).json({
      message: "Login successful",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    console.error("Client login error:", error.message);
    res.status(400).json({ message: error.message });
  }
});

const clientSignupStartRouter = require("./routes/api/auth/signup-start");
app.use("/api/auth/signup-start", clientSignupStartRouter);

// Admin signup-start endpoint
const adminSignupStartRouter = require("./routes/admin/signup-start");
app.use("/api/admin/signup-start", adminSignupStartRouter);

// Admin verify-otp endpoint
const adminVerifyOtpRouter = require("./routes/admin/verify-otp");
app.use("/api/admin/verify-otp", adminVerifyOtpRouter);

// Admin resend-otp endpoint
const clientVerifyOtpRouter = require("./routes/api/auth/verify-otp");
app.use("/api/auth/verify-otp", clientVerifyOtpRouter);

const clientResendOtpRouter = require("./routes/api/auth/resend-otp");
app.use("/api/auth/resend-otp", clientResendOtpRouter);

const modernPersonalDetailsRouter = require("./routes/api/modernPersonalDetails");
app.use("/api/modernPersonalDetails", modernPersonalDetailsRouter);

const clientPersonalDetailsRouter = require("./routes/api/auth/client-personal-details");
app.use("/api/auth/client-personal-details", clientPersonalDetailsRouter);

const adminResendOtpRouter = require("./routes/admin/resend-otp");
app.use("/api/admin/resend-otp", adminResendOtpRouter);

const registerRouter = require("./routes/admin/register");
app.use("/api/admin/register", registerRouter);

const contactRouter = require("./routes/api/contact");
app.use("/api/contact", contactRouter);

const contactInfoRouter = require("./routes/api/admin/contactInfo");
app.use("/api/admin/contactInfo", contactInfoRouter);

const homepageRouter = require("./routes/api/homepage");
app.use("/api/homepage", homepageRouter);

// Register the new API routes for services, eventGallery, and testimonials
const servicesRouter = require("./routes/api/services");
const eventGalleryRouter = require("./routes/api/eventGallery");
const testimonialsRouter = require("./routes/api/testimonials");
const servicePackagesRouter = require("./routes/api/servicePackages");
const bookingsRouter = require("./routes/api/bookings");
const categoriesRouter = require("./routes/api/categories");
const eventTypesRouter = require("./routes/api/eventTypes");
const customizeServicesRouter = require("./routes/api/customizeServices");

app.use("/api/services", servicesRouter);
app.use("/api/eventGallery", eventGalleryRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/servicePackages", servicePackagesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/eventTypes", eventTypesRouter);
app.use("/api/customizeServices", customizeServicesRouter);

const homeRouter = require("./routes/home");
const customizeBookingsRouter = require("./routes/api/customizeBookings");
const teamRouter = require("./routes/api/admin/team");
const footerRouter = require("./routes/api/footer");
const aboutRouter = require("./routes/api/admin/about");

app.use("/home", homeRouter);
app.use("/api/customizeBookings", customizeBookingsRouter);
app.use("/api/admin/team", teamRouter);
app.use("/api/admin/about", aboutRouter);
app.use("/api/footer", footerRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
