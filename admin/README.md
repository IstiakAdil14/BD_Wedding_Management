# 🛠️ BD Wedding Admin Panel

Welcome to the **BD Wedding Admin Panel**! 🎉 This is the administrative dashboard for managing the BD Wedding website content and services. Built with modern web technologies, this panel allows admins to efficiently manage wedding-related content, services, portfolios, testimonials, team members, and more.

---

## 🚀 Project Overview

The BD Wedding Admin Panel is a **Next.js** application designed to provide a seamless and interactive experience for administrators. It features:

- 🌗 **Dark Mode Support** with persistent user preference
- 🖥️ Responsive and animated UI powered by **Framer Motion**
- ✍️ Rich text editing with **CKEditor 5**, **Draft.js**, and **Slate**
- 📊 Data visualization using **Recharts**
- 📧 Email sending capabilities via **Nodemailer**
- 🔄 API proxy setup for backend communication
- 🎨 Styling with **Tailwind CSS** and **Material UI** components/icons

---

## 📁 Folder Structure

```
admin/
├── components/          # Reusable React components (menus, dialogs, etc.)
├── context/             # React context providers (e.g., DarkModeContext)
├── hooks/               # Custom React hooks
├── pages/               # Next.js pages (routes)
├── public/              # Static assets and uploads
├── styles/              # Global and component-specific styles (Tailwind CSS)
├── .env.local           # Environment variables (local)
├── next.config.js       # Next.js configuration (rewrites, proxies)
├── package.json         # Project metadata and dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md            # This file
```

---

## ⚙️ Setup & Installation

1. **Clone the repository** and navigate to the `admin` folder:

   ```bash
   git clone <repo-url>
   cd admin
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create a `.env.local` file in the `admin` directory to set any required environment variables (e.g., API URLs, email credentials).

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the admin panel.

---

## 🛠️ Features

- **Management Menu**: Sidebar navigation to manage Home Page sections, Services, Portfolio, Testimonials, Team Members, Contact Info, Orders, and Admin Users.
- **Dark Mode**: Toggle between light and dark themes with saved preferences.
- **Rich Text Editors**: Create and edit content with CKEditor 5, Draft.js, and Slate editors.
- **Animated UI**: Smooth transitions and animations using Framer Motion.
- **API Proxy**: Backend API requests are proxied to `http://localhost:5000/api` for seamless integration.
- **Email Integration**: Send emails using Nodemailer (backend).
- **Charts & Data Visualization**: Display data insights with Recharts.

---

## 📚 Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- [CKEditor 5](https://ckeditor.com/ckeditor-5/)
- [Draft.js](https://draftjs.org/)
- [Slate](https://docs.slatejs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Axios](https://axios-http.com/)
- [Nodemailer](https://nodemailer.com/)
- [Recharts](https://recharts.org/)

---

## 📌 Notes

- The admin panel expects a backend API running on `http://localhost:5000` for data fetching and mutations.
- API routes are proxied via `next.config.js` for convenience during development.
- Dark mode preference is saved in `localStorage` and respects system preferences on first load.
- The Management Menu provides quick access to various content management dialogs and pages.

---

## 🤝 Contribution

Feel free to contribute by opening issues or submitting pull requests. Please follow the existing code style and conventions.

---

## 📞 Contact

For any questions or support, please contact the development team.

---

Thank you for using the BD Wedding Admin Panel! 🎊
