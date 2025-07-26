# EduCare – Service Sharing Platform (Client)

EduCare is a full-stack MERN application that enables users to share, explore, and book educational services. This client-side code handles the user interface, authentication, and interaction with the backend API.

---

## 🔧 Features

### 🧑‍🎓 User Features
- Browse and search educational services across multiple categories  
- Register and log in with Email/Password or Google OAuth  
- Book services with real-time status tracking and updates  
- Manage personal bookings and view booking history  
- Responsive UI with light/dark mode for seamless user experience  

### 👩‍🏫 Service Provider Features
- Add, update, and delete service listings with detailed descriptions  
- View booking requests and manage service availability  
- Dashboard to track service performance and user feedback  
- Role-based access control ensures data privacy and security  

### 🔐 Authentication & Security
- Firebase Authentication with email/password and social logins  
- Role-based protected routes for Customers and Service Providers  
- Strong password validation and error handling  
- Persistent login sessions with secure token management  

### 📊 Usability & UX
- Fully responsive design across all devices  
- Smooth animations using Framer Motion for enhanced experience  
- Toast notifications for user feedback on actions  
- Dark/light theme toggle with user preference persistence  

### 🧰 Developer Experience
- Clean codebase organized by feature  
- React Hook Form for form management and validation  
- React Router for seamless navigation and protected routes  
- Environment variables to securely manage Firebase and backend keys  

---

## 🛠 Tech Stack

### Frontend
- React.js  
- Tailwind CSS + DaisyUI  
- React Router  
- Firebase Authentication  
- Framer Motion  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- JWT  
- Stripe API (salary payments)  

### Tools & Services
- Firebase Auth  
- Imgbb (image upload)  
- Vite  
- Lottie animations  
- SweetAlert2  

---

## 🌐 Live Site  
🔗 [https://educare-9e09b.web.app](https://educare-9e09b.web.app)

---

## 📁 Repositories  
**Client:** [github.com/md-shafiqul-islam/educare-client](https://github.com/md-shafiqul-islam/educare-client)  
**Server:** [github.com/md-shafiqul-islam/educare-server](https://github.com/md-shafiqul-islam/educare-server)

---

## 📸 Screenshots

| Home | Booking | Dashboard |
|-------|-----------|--------|
| ![Home](https://i.ibb.co/vCg7DYYz/image1.png) | ![Booking](https://i.ibb.co/twbvcCTs/image5.png) | ![Services](https://i.ibb.co/twbvcCTs/image5.png) |

---

## 🧪 Getting Started

To run this project locally:

1. Clone the repositories
git clone https://github.com/md-shafiqul-islam/educare-client.git
git clone https://github.com/md-shafiqul-islam/educare-server.git

# 2. Install dependencies for both
cd educare-client
npm install

cd ../educare-server
npm install

# 3. Set up environment variables
# For client: create `.env` file inside `craftflow-client`
VITE_API_URL=https://server-nine-tau-39.vercel.app
VITE_FIREBASE:
API_KEY=VITE_apiKey
AUTH_ADMIN=VITE_authDomain
PROJECTID=projectId
STORAGEBUCKET=VITE_storageBucket
MESSAGING_SENDER_ID=VITE_messagingSenderId
APPID=VITE_appId

# For server: create `.env` inside `craftflow-server`
PORT=3000
DB_URL=MONGODB_URI
ACCESS_TOKEN_SECRET=FB_SERVICE_KEY

# 4. Run both servers
# In one terminal:
cd service-sharing
npm run dev

# In another terminal:
cd server
nodemon index.js

---

## 📄 License  
This project is open-source and available under the [MIT License](LICENSE).

---
