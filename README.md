# 🅿️ ParkEasy — Smart Parking Management System

> A full-stack parking management web application developed as part of the **Infosys Springboard Internship – Team A**.  
> Built with **Spring Boot** (backend) and **React + Vite** (frontend), ParkEasy streamlines parking slot booking, real-time availability tracking, payments, and admin management.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Screenshots](#screenshots)
- [Team](#team)
- [License](#license)

---

## 📌 About the Project

**ParkEasy** is a smart parking spot finder and booking system that helps drivers locate, book, and pay for parking spots with ease. Admins can manage parking lots, monitor bookings, generate reports, and oversee users — all from a dedicated dashboard.

---

## ✨ Features

### 👤 User Features
- 🔐 **Authentication** — Register, Login, and JWT-based session management
- 🔑 **Forgot Password** — OTP-based password reset via email
- 🗺️ **Book Parking** — Interactive map (Leaflet) to locate and book parking spots
- 📄 **My Bookings** — View, manage, and cancel bookings
- 💳 **Payments** — Razorpay-integrated online payment with payment history
- 🧾 **QR Code** — Auto-generated QR code for confirmed bookings
- 🚗 **Vehicle Management** — Add and manage registered vehicles
- 📊 **Parking Status** — Real-time slot availability display
- 💬 **Feedback** — Submit feedback/reviews for parking lots
- 📬 **Contact Us** — Send inquiries directly via email
- 👤 **Profile Management** — Update personal info and password

### 🛡️ Admin Features
- 📊 **Dashboard** — Analytics overview with charts (ApexCharts / Recharts)
- 🏢 **Manage Parking** — Create and manage parking lots, floors, and slots
- 📅 **Manage Bookings** — View, approve, and cancel user bookings
- 👥 **Manage Users** — View, activate, or deactivate user accounts
- 📈 **Reports** — Generate & export PDF reports (jsPDF)
- 👤 **Admin Profile** — Manage admin account details

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Language |
| Spring Boot | 3.3.5 | Application framework |
| Spring Security | — | Authentication & authorization |
| Spring Data JPA | — | Database ORM |
| MySQL | — | Relational database |
| JWT (jjwt) | 0.12.6 | Token-based auth |
| Razorpay Java SDK | 1.4.4 | Payment gateway |
| Spring Mail | — | Email (SMTP / Gmail) |
| ZXing | 3.5.1 | QR code generation |
| Springdoc OpenAPI | 2.6.0 | Swagger API docs |
| Lombok | — | Boilerplate reduction |
| ModelMapper | 3.2.4 | DTO mapping |
| spring-dotenv | 3.0.0 | `.env` support |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 (beta) | Build tool & dev server |
| React Router DOM | 7 | Client-side routing |
| TailwindCSS | 4 | Styling |
| Axios | — | HTTP client |
| Leaflet / React-Leaflet | — | Interactive maps |
| ApexCharts / Recharts | — | Admin charts |
| Razorpay (frontend) | — | Payment checkout |
| jsPDF + AutoTable | — | PDF export |
| React QR Code | — | QR code display |
| Swiper | — | Carousel components |
| Lucide React / React Icons | — | Icon libraries |
| Radix UI | — | Accessible UI primitives |

---

## 📁 Project Structure

```
ParkEasy/
├── backend/                    # Spring Boot application
│   ├── src/main/java/com/infosys/ParkEasy/
│   │   ├── config/             # Security, CORS, Swagger config
│   │   ├── controller/         # REST API controllers
│   │   │   ├── AuthController
│   │   │   ├── UserController
│   │   │   ├── ParkingController
│   │   │   ├── PaymentController
│   │   │   ├── BookingController (via Admin)
│   │   │   ├── FeedbackController
│   │   │   ├── ContactController
│   │   │   ├── QRController
│   │   │   └── AdminController
│   │   ├── dto/                # Request/Response DTOs
│   │   ├── entity/             # JPA entities (User, Booking, Parking, Payment...)
│   │   ├── repository/         # Spring Data JPA repositories
│   │   ├── service/            # Business logic (interfaces + implementations)
│   │   ├── error/              # Global exception handling
│   │   └── Util/               # Utility classes
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/                   # React + Vite application
    ├── src/
    │   ├── Admin/              # Admin panel pages
    │   │   ├── Dashboard/
    │   │   ├── ManageBooking/
    │   │   ├── ManageParking/
    │   │   ├── ManageUser/
    │   │   ├── Report/
    │   │   └── profile/
    │   ├── pages/              # User-facing pages
    │   │   ├── Home, Login, Signup
    │   │   ├── BookParking, MyBooking
    │   │   ├── Payment, PaymentHistory
    │   │   ├── ParkingStatus, ParkingRates
    │   │   ├── Feedback, Contact, FAQ
    │   │   ├── Profile, ForgotPassword
    │   │   └── About, Features, Services
    │   ├── components/         # Reusable UI components
    │   ├── context/            # React context (Auth, etc.)
    │   ├── api/                # Axios API calls
    │   ├── routes/             # Route configuration
    │   └── layouts/            # Layout wrappers
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Maven** (or use the included `mvnw` wrapper)
- **Node.js** v18+ and **npm**
- **MySQL** database (local or remote)
- A **Gmail account** with an [App Password](https://support.google.com/accounts/answer/185833) for SMTP
- A **Razorpay** account (test keys are fine during development)

---

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ParkEasy.git
   cd ParkEasy/backend
   ```

2. **Create a `.env` file** in the `backend/` directory:
   ```env
   SPRING_APPLICATION_NAME=ParkEasy
   SERVER_PORT=8080
   SERVER_SERVLET_CONTEXT_PATH=/api

   DB_URL=jdbc:mysql://localhost:3306/parkeasy_db
   DB_USERNAME=root
   DB_PASSWORD=your_mysql_password
   DB_DRIVER=com.mysql.cj.jdbc.Driver

   JPA_DDL_AUTO=update
   JPA_SHOW_SQL=true
   HIBERNATE_DIALECT=org.hibernate.dialect.MySQLDialect

   JWT_SECRET_KEY=your_jwt_secret_key_here

   ALLOWED_ORIGINS=http://localhost:5173
   ```

3. **Create the MySQL database:**
   ```sql
   CREATE DATABASE parkeasy_db;
   ```

4. **Run the backend:**
   ```bash
   # Windows
   ./mvnw.cmd spring-boot:run

   # Linux / macOS
   ./mvnw spring-boot:run
   ```

   The backend starts at: `http://localhost:8080/api`  
   Swagger UI: `http://localhost:8080/api/swagger-ui/index.html`

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ParkEasy/frontend
   ```

2. **Create a `.env` file** in the `frontend/` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend runs at: `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `SPRING_APPLICATION_NAME` | Application name |
| `SERVER_PORT` | Server port (default: `8080`) |
| `SERVER_SERVLET_CONTEXT_PATH` | API base path (e.g., `/api`) |
| `DB_URL` | MySQL JDBC URL |
| `DB_USERNAME` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_DRIVER` | JDBC driver class |
| `JPA_DDL_AUTO` | Hibernate DDL mode (`update`, `create`, etc.) |
| `JPA_SHOW_SQL` | Log SQL queries (`true`/`false`) |
| `HIBERNATE_DIALECT` | Hibernate MySQL dialect |
| `JWT_SECRET_KEY` | Secret key for JWT signing |
| `ALLOWED_ORIGINS` | CORS allowed origins |


### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL |
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key |

---

## 📡 API Overview

| Module | Base Path | Description |
|---|---|---|
| Auth | `/api/auth` | Register, Login, Password Reset |
| User | `/api/user` | Profile, Vehicle management |
| Parking | `/api/parking` | Parking lots, slots, availability |
| Booking | `/api/booking` | Create and manage bookings |
| Payment | `/api/payment` | Create orders, verify payments |
| Feedback | `/api/feedback` | Submit and retrieve feedback |
| Contact | `/api/contact` | Send contact enquiries |
| QR Code | `/api/qr` | Generate booking QR codes |
| Admin | `/api/admin` | Admin-only management endpoints |
| Public | `/api/public` | Unauthenticated public routes |

> Full API documentation is available via Swagger UI at:  
> `http://localhost:8080/api/swagger-ui/index.html`

---

## 🗃️ Database Entities

| Entity | Description |
|---|---|
| `User` | User accounts with roles |
| `Parking` | Parking lot details |
| `Floor` | Floors within a parking lot |
| `ParkingSpot` | Individual parking spots |
| `NormalSlot` | Slot metadata |
| `Booking` | Parking reservations |
| `Vehicle` | Registered user vehicles |
| `PaymentOrder` | Razorpay payment orders |
| `PaymentTransaction` | Completed payment records |
| `Feedback` | User reviews and ratings |
| `Address` | Location/address records |

---

## 🤝 Team

This project was developed by **Team A** as part of the **Infosys Springboard Internship Program**.

| Role | Responsibility |
|---|---|
| Full-Stack Developer | Backend API + Frontend integration |
| Backend Developer | Spring Boot, Security, JPA |
| Frontend Developer | React, UI/UX, Admin Dashboard |
| Database Engineer | MySQL schema design |

---

---

## 📄 License

This project is developed for educational purposes as part of the **Infosys Springboard Internship Program**.  
All rights reserved © 2025 Team A.

---

<div align="center">
  <strong>⭐ If you found this helpful, please give the repository a star!</strong>
</div>
