# 📚 StudyNotion - Full Stack EdTech Platform

StudyNotion is a full-stack MERN-based e-learning platform that enables instructors to create and manage courses while allowing students to explore, purchase, and learn through an intuitive and responsive interface.

---

# ✨ Features

## 🔐 Authentication & Security

* JWT Authentication
* OTP Email Verification
* Password Reset via Email
* Role-Based Access Control (Student/Instructor/Admin)

## 👨‍🏫 Instructor Features

* Create and Publish Courses
* Add Sections and Subsections
* Upload Course Thumbnails
* Manage Course Content
* Instructor Dashboard

## 🎓 Student Features

* Browse Courses
* Purchase Courses
* Enroll and Learn
* Track Course Progress
* User Profile Management

## 💳 Payment Integration

* Razorpay Payment Gateway
* Secure Course Enrollment
* Payment Confirmation Emails

## ☁️ Cloud Storage

* Cloudinary Image Upload
* Optimized Media Management

## 📧 Email Services

* OTP Verification
* Password Reset Emails
* Enrollment Confirmation
* Contact Form Responses

---

# 🛠 Tech Stack

### Frontend

* React.js
* JavaScript
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT
* Bcrypt
* OTP Verification

### Third-Party Services

* Razorpay
* Cloudinary
* Nodemailer

---

# 📂 Project Structure

```
Study_notion
│
├── src
│   ├── components
│   ├── pages
│   ├── assets
│   ├── data
│   └── services
│
├── Server
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── mails
│   └── utils
│
└── public
```

---

# 🚀 Key Highlights

* Full MERN Stack Architecture
* RESTful API Design
* Secure Authentication & Authorization
* Course Management System
* Payment Gateway Integration
* Cloud Media Uploads
* Responsive User Interface
* Modular and Scalable Codebase

---

# ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd Server
npm install
```

### Configure Environment Variables

Create a `.env` file with:

* MongoDB URI
* JWT Secret
* Cloudinary Credentials
* Razorpay Keys
* Email Credentials

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
npm start
```

---

# 🔮 Future Improvements

* Live Video Classes
* Course Reviews & Ratings
* Certificates on Completion
* Wishlist Functionality
* AI-Based Course Recommendations
* Discussion Forum
* Real-Time Notifications

---
