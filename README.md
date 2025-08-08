<div align="center">
  <details>
    <summary style="cursor: pointer; font-weight: bold; color: #0366d6;">📷 Click to View Screenshot</summary>
    <div style="margin-top: 10px;">
      <img src="https://i.ibb.co/xqGhBN32/Screenshot-2025-06-25-163056.jpg" alt="Life Insurance Management Platform Screenshot" ;">
    </div>
  </details>
</div>
# 🛡️ Life Insurance Management Platform
Live URL: [https://life-insurance-management.web.app](https://life-insurance-management.web.app)  
Client Repo: [b11a12-client-side-sifathasan2430](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-sifathasan2430)  

> A modern, secure, role-based MERN Stack application for managing life insurance policies, applications, quotes, claims, and transactions. Built with Firebase Authentication, JWT Authorization, Stripe Payments, and rich dashboards for Admins, Agents, and Customers.



---
## 🧑‍💼 Admin Login Credentials
Email: admin@gmail.com
Password: admiN243028
## 🧑‍💼 Agent Login Credentials
Email: agent@gmail.com
Password: agenT1234
---
## 🚀 Features
- ✅ **Role-Based Dashboards**: Separate dashboards for Admin, Agent, and Customer.
- 🔒 **JWT-Secured APIs**: Auth-protected routes with role validation using JWT stored in HttpOnly cookies.
- 📊 **Stripe Payment Integration**: Premium payments with live status tracking and transaction management.
- 📄 **Get Quote & Apply**: Dynamic quote calculator and multi-step application form.
- ✍ **Blog Management**: Create, edit, and manage insurance-related articles with visit counts.
- 👥 **Agent Assignment & Application Review**: Admin assigns agents, reviews applications with feedback modals.
- 📈 **Admin Insights**: View transactions, users, blogs, and policies in organized tables.
- 📩 **Newsletter Subscription**: Submits user info to DB for future engagement.
- ⭐ **Policy Reviews**: Users can submit star-rated reviews for purchased policies.
- 📁 **Claim Requests**: Claim system with approval tracking and PDF uploads.
- 👨‍⚕️ **Health Disclosure Section**: Part of the application form for underwriting logic.
- 📄 **PDF Download**: Download approved policies as PDF (for future implementation).
- 🌐 **React Query**: All data fetched using `@tanstack/react-query`.
- ⚡ **Dynamic Helmet Titles**: Page-specific SEO titles using `react-helmet-async`.
- 📱 **Responsive UI**: Optimized for mobile, tablet, and desktop.
- 🎨 **Tailwind CSS + SweetAlert**: Styled using Tailwind with modern alert modals for better UX.
- 🔍 **Search and Filter**: Search by keyword (case-insensitive) and category filter on policies.
- 📅 **Pagination**: Server-side pagination implemented on All Policies page.
---
## 📌 Pages Overview
### 🌐 Public Pages
- `/` Home — Hero, Featured Policies, Blogs, Testimonials, Agents, Subscription
- `/all-policies` — All Policies with category filter, search & pagination
- `/blog` — Blogs overview with modal & visit tracking
- `/policy/:id` — Full policy details page
- `/login`, `/register` — Firebase-auth powered login/register with validation & Google login
---
### 🔐 Private Pages
#### 🔧 Admin Dashboard (`/dashboard/admin`)
- Manage Applications (Assign Agent, Approve/Reject with feedback)
- Manage Users (Role promotion/demotion)
- Manage Policies (Create, Edit, Delete)
- Manage Transactions (View all payments)
#### 🧑‍💼 Agent Dashboard (`/dashboard/agent`)
- Assigned Customers (Approve/Reject, update application status)
- Manage Blogs (CRUD for their own blogs)
- Policy Clearance (View & approve claims)
#### 👤 Customer Dashboard (`/dashboard`)
- My Policies (Track status, review)
- Payment Status (Stripe pay button for due policies)
- Claim Request (File insurance claims with status)
- Profile (Update name, photo, view last login)
---
## 🔧 Tech Stack
| Frontend | Backend (optional setup) |
|----------|--------------------------|
| React + Vite | Express.js |
| Firebase Auth | MongoDB Atlas |
| React Router | Mongoose |
| TanStack React Query | CORS, JWT |
| React Hook Form | Stripe SDK |
| SweetAlert2 | dotenv |
| Tailwind CSS | Firebase Admin SDK |
---
## ⚙️ Environment Variables (Client)
```env
VITE_FIREBASE_API_KEY=AIzaSyAiuI88xPk8MVh6WXQwO1vjzvbKcQm45Z8
VITE_FIREBASE_AUTH_DOMAIN=life-insurance-management.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=life-insurance-management
VITE_FIREBASE_STORAGE_BUCKET=life-insurance-management.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=78146085846
VITE_FIREBASE_APP_ID=1:78146085846:web:02c5ac3239580162673a77
