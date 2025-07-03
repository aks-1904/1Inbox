# 1Inbox (Frontend)

**1Inbox** is a unified web-based email client that allows users to connect multiple email accounts (like Gmail and Outlook) and manage them from a single inbox. This is the frontend part of the application built using **React (Vite)**, **TypeScript**, and **TailwindCSS**.

---

## ✨ Features

- 🔐 Authentication (Login / Signup)
- 📬 Unified Inbox UI
- 🌐 Google & Microsoft OAuth Integration (planned)
- 🎨 Smooth UI/UX using TailwindCSS
- ⚙️ Scroll animations with `locomotive-scroll`
- 🪝 Custom React Hooks for authentication
- 📦 Clean folder structure and modular components

---

## 📁 Project Structure

```plaintext
client/
├── public/                  # Static files (favicon, etc.)
├── src/
│   ├── assets/              # Images, fonts
│   ├── components/          # Reusable components (Navbar, Footer, AuthCard, etc.)
│   ├── hooks/               # Custom React hooks (e.g., useAuth)
│   ├── pages/               # Route pages (Home, Login, Signup)
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # ReactDOM entry
│   ├── index.css            # Global CSS
│   └── vite-env.d.ts        # TypeScript environment config
├── .env                     # Environment variables
├── package.json             # Project metadata and dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aks-1904/1Inbox.git
cd 1Inbox/client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the `client/` directory:

```env
VITE_BACKEND_URL=http://localhost:5000/api/v1
```

### 4. Run the development server

```bash
npm run dev
```

---

## 📦 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run linter
```

---

## 🧠 Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/)
- [React Hot Toast](https://react-hot-toast.com/)

---

## 📁 Authentication Hook Example

Located in `src/hooks/useAuth.ts`:

- Handles login and signup
- Stores JWT token in `localStorage`
- Redirects on success and shows toast notifications

---

## 🔗 Backend

The backend server is built using:

- **Node.js**, **Express.js**, **MongoDB**, **TypeScript**
- API base URL: `${VITE_BACKEND_URL}`

---

## 📃 License

This project is for educational/demo purposes. MIT license can be added optionally.

---

## ✍️ Author

Made by **Akshay Sharma**  
[GitHub](https://github.com/aks-1904/) • [LinkedIn](https://www.linkedin.com/in/akshay-sharma-3a2478270/)
