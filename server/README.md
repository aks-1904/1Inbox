# 📬 1Inbox Backend

This is the backend server for **1Inbox** — a unified email web application where users can connect multiple email providers (like Gmail and Outlook) into one inbox. This server handles authentication, user management, and email integration logic (coming soon).

---

## ⚙️ Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** (with Mongoose ODM)
- **TypeScript**
- **JWT Authentication**
- **RESTful API Structure**

---

## 📁 Project Structure

```
src/
├── controllers/
│   └── auth.controller.ts      # Handles signup, login
├── models/
│   └── user.model.ts           # Mongoose schema for users
├── routes/
│   └── auth.routes.ts
├── middlewares/
│   └── auth.middleware.ts
├── config/
│   └── db.ts
└── index.ts                    # Entry point
```

---

## 🧪 API Endpoints

### 🔐 Auth Routes

Base URL: `BACKEND_URL/api/v1/auth`

#### ➕ POST `/register`

Registers a new user.

**Request Body:**
```json
{
  "name": "Akshay Sharma",
  "email": "akshay@example.com",
  "password": "yourSecurePassword"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "<jwt_token>",
  "user": {
    "_id": "60fbd...",
    "name": "Akshay Sharma",
    "email": "akshay@example.com"
  }
}
```

#### 🔑 POST `/login`

Logs in an existing user.

**Request Body:**
```json
{
  "email": "akshay@example.com",
  "password": "yourSecurePassword"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "<jwt_token>",
  "user": {
    "_id": "60fbd...",
    "name": "Akshay Sharma",
    "email": "akshay@example.com"
  }
}
```

**Failure Example (Invalid credentials):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 👤 User Model Overview

```ts
interface IUser {
  name: string;
  email: string;
  password: string;
  isGoogleConnected?: boolean;
  isOutlookConnected?: boolean;
  createdAt: Date;
}
```

Password is hashed using `bcrypt` before saving. Tokens are signed using JWT.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/aks-1904/1Inbox.git
cd 1Inbox-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup `.env`

Create a `.env` file in the root directory with the following values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/1inbox
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
```

### 4. Start the Development Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`.

---

## ✅ TODO (Upcoming Features)

- ✅ Email account linking (Gmail via OAuth2)
- ✅ Email inbox syncing
- 🔁 Outlook integration
- 📥 Read/mark/delete emails
- 🔐 Token refresh and middleware security

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---
