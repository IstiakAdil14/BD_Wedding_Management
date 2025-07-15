# 📦 BD Wedding Server

Welcome to the **BD Wedding Server**! This is the backend server for the BD Wedding application, built with Node.js, Express, and MongoDB. It handles API requests, authentication, file uploads, and serves data to the client applications.

---

## 🚀 Features

- RESTful API endpoints for managing services, events, bookings, testimonials, and more
- Admin and client authentication with JWT and password hashing
- File upload handling with Multer
- MongoDB database connection with Mongoose
- Email service integration using SendGrid and Nodemailer
- OTP verification for secure signup and login
- OAuth support with Google via Passport.js

---

## 🛠️ Installation & Setup

1. Clone the repository and navigate to the `server` directory:

   ```bash
   git clone <repository-url>
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the `server` directory with the following environment variables:

   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   SENDGRID_API_KEY=<your-sendgrid-api-key>
   EMAIL_FROM=<your-email-address>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server in development mode (with auto-reload):

   ```bash
   npm run dev
   ```

   Or start in production mode:

   ```bash
   npm start
   ```

---

## 📁 Folder Structure

- `client/` - Client-side code related to the server (e.g., public uploads)
- `models/` - Mongoose data models (AdminUser, Booking, Category, etc.)
- `routes/` - Express route handlers for API endpoints and admin routes
- `scripts/` - Utility scripts (e.g., create admin user)
- `uploads/` - Directory for storing uploaded files (videos, images)
- `utils/` - Utility functions (database connection, email service)
- `index.js` - Main server entry point
- `createAdminUser.js` - Script to create or update the admin user

---

## 🔑 Environment Variables

| Variable         | Description                          |
|------------------|------------------------------------|
| `PORT`           | Port number the server listens on  |
| `MONGODB_URI`    | MongoDB connection string           |
| `SENDGRID_API_KEY` | API key for SendGrid email service |
| `EMAIL_FROM`     | Email address used for sending emails |
| `JWT_SECRET`     | Secret key for JWT authentication  |

---

## ⚙️ Running the Server

- The server listens on the port specified in `PORT` (default 5000).
- Connects to MongoDB using the connection string in `MONGODB_URI`.
- Serves static files from `client/public/uploads` at `/uploads`.
- Provides API endpoints under `/api` and admin routes under `/api/admin`.

---

## 📜 API Routes Overview

- `/api/status` - Server health check
- `/api/admin/login` - Admin login
- `/api/client/login` - Client login
- `/api/auth/signup-start` - Client signup start
- `/api/auth/verify-otp` - OTP verification for clients
- `/api/auth/resend-otp` - Resend OTP for clients
- `/api/services` - Manage services
- `/api/eventGallery` - Event gallery management
- `/api/testimonials` - Testimonials management
- `/api/bookings` - Booking management
- `/api/categories` - Categories management
- `/api/eventTypes` - Event types management
- `/api/customizeServices` - Customized services
- `/api/clientTextContent` - Client text content
- `/api/events` - Events management
- `/api/uploadVideo` - Video upload endpoint
- `/api/admin/team` - Admin team management
- `/api/admin/about` - Admin about section
- `/api/footer` - Footer content management

---

## 🗄️ Database Connection

- Uses Mongoose to connect to MongoDB.
- Connection is cached to optimize performance during development.
- Connection string is read from `MONGODB_URI` environment variable.
- Connection events are logged to the console.

---

## 👤 Admin User Creation

To create or update the default admin user, run the script:

```bash
node createAdminUser.js
```

- Default admin email: `admin@example.com`
- Default password: `password123`
- The script connects to local MongoDB at `mongodb://localhost:27017/bdwedding` (adjust if needed).

---

## 📂 File Uploads

- Uploaded files (images, videos) are stored in the `uploads/` directory.
- These files are served statically at `/uploads` URL path.
- The uploads directory is located inside `client/public/uploads`.

---

## 📦 Dependencies

- Express.js - Web framework
- Mongoose - MongoDB ODM
- Multer - File uploads
- Bcryptjs - Password hashing
- JSON Web Token - Authentication tokens
- Passport.js - OAuth authentication
- Nodemailer & SendGrid - Email services
- Axios - HTTP client
- CORS - Cross-origin resource sharing
- Dotenv - Environment variable management

---

## 📞 Contact & Support

For any issues or questions, please contact the development team or open an issue in the repository.

---

Thank you for using BD Wedding Server! 🎉🎊
