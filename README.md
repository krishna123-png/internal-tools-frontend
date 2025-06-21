
---

## 🎨 `internal-tools-frontend/README.md`

```markdown
# AI-Powered Internal Tools Platform – Frontend

This is the frontend for the AI-Powered Internal Tools Platform, a real-world SaaS-style productivity app providing access to several AI-powered tools under one clean, user-friendly dashboard.

## 🖼️ Live Demo

➡️ [Deployed on Vercel](https://your-app-name.vercel.app)

---

## ✨ Features

- 🔐 **Authentication**
  - Login/Register
  - Global auth context with JWT
  - Protected routes

- 🧠 **AI-Powered Tools**
  - Assistant Chat Interface
  - Code Generator & Debugger
  - Document Summarizer (text/PDF)
  - Resume Analyzer

- 📊 **Usage Dashboard (Admin)**
  - View tool usage logs per user

- 📱 **Fully Responsive UI**
  - Mobile, Tablet, and Desktop support

---

## ⚙️ Technologies Used

- React.js + Vite
- Axios
- React Router DOM
- Context API
- Tailwind / Custom CSS

---

## 📁 Folder Structure

/src
/pages
/components
/context
/utils
App.jsx
main.jsx


---

## 🔐 AuthContext

Handles global login state using JWT stored in localStorage. Automatically redirects unauthorized users to login.

---

## 📦 Setup Instructions

```bash
# Install dependencies
npm install

# Create .env file
VITE_API_BASE_URL=https://your-backend.onrender.com

# Start development server
npm run dev

🧪 Available Pages
Route	Description
/	Landing Page
/login	Login Form
/register	Registration Form
/dashboard	Tool selection dashboard
/tools/assistant	AI Assistant Interface
/tools/codegen	Code Generator / Debugger
/tools/summarize	Summarize PDF or text input
/tools/resume	Resume Analyzer
/admin/usage	Admin-only usage analytics view
