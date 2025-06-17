# EduCare - Service Sharing Platform

**Live Site URL:**  
🌐 [https://educare-9e09b.web.app](https://educare-9e09b.web.app)  
🔗 Alternative: [https://edu-care978.netlify.app](https://edu-care978.netlify.app)

## 📂 Project Category

Service Sharing Web Application

## 🚀 Project Description

**EduCare** is a full-stack web application that allows users to share and book various educational services. Service providers can post their services, while users can explore, book, and manage services securely using Firebase Authentication and JWT-based route protection.

## 🔥 Key Features

- ✅ **User Authentication (Email & Google)**

  - Users can sign up and sign in using email/password or Google login with Firebase Authentication.

- 🔐 **JWT-Protected Private Routes**

  - JWT token is generated upon login and used to access protected endpoints and dashboard routes.

- 📢 **Add & Manage Services**

  - Logged-in service providers can post new services, update or delete their own services from a secure dashboard.

- 🛒 **Book & Track Services**

  - Users can book any service and keep track of the services they’ve booked or provided.

- 🎨 **Modern UI/UX with Animations**
  - Sleek design using TailwindCSS, DaisyUI, Swiper.js, and framer-motion animations.

## 🧰 Tech Stack

### Frontend:

- React 19
- React Router 7
- Firebase Authentication
- TailwindCSS + DaisyUI
- Axios + SweetAlert2
- Framer Motion + Swiper
- Hosted on Firebase & Netlify

### Backend:

- Node.js + Express
- Firebase Admin SDK (JWT token validation)
- MongoDB (Hosted via MongoDB Atlas)
- CORS, dotenv
- Hosted on Vercel

## 🛡️ Security

- JWT token stored in `localStorage` and sent via Axios interceptor.
- All sensitive routes protected with Firebase Admin SDK's `verifyIdToken`.
- 401 and 403 error handling implemented with auto logout on token expiry.

---

### 📁 Folder Structure

- `frontend/` — React application with pages, components, layouts, routing
- `backend/` — Node + Express REST API with MongoDB and Firebase Admin

---

### 👨‍💻 Author

Developed by Md. Shafiqul Islam

---

Feel free to fork, clone, or contribute!
