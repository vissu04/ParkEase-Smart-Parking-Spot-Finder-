# 🅿️ ParkEasy — Smart Parking Management System

A full-stack parking management web application developed as part of the **Infosys Springboard Internship – Team A**. 

Built with **Spring Boot** (backend) and **React + Vite** (frontend), ParkEasy streamlines parking slot booking, real-time availability tracking, payments, and admin management.

---

## 📋 Table of Contents
- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Overview](#-api-overview)
- [Database Entities](#%EF%B8%8F-database-entities)
- [Team](#-team)

---

## 📌 About the Project

**ParkEasy** is a smart parking spot finder and booking system that helps drivers locate, book, and pay for parking spots with ease. Admins can manage parking lots, monitor bookings, generate reports, and oversee users — all from a dedicated, comprehensive dashboard.

---

## ✨ Features

### 👤 User Features
* **🔐 Authentication** — Secure Register, Login, and JWT-based session management.
* **🔑 Forgot Password** — OTP-based password reset via automated email.
* **🗺️ Book Parking** — Interactive map (Leaflet) to physically locate and book parking spots.
* **📄 My Bookings** — View, manage, and cancel active or past bookings.
* **💳 Payments** — Razorpay-integrated online payment processing with complete payment history.
* **🧾 QR Code** — Auto-generated QR code for quick check-ins of confirmed bookings.
* **🚗 Vehicle Management** — Add, update, and manage multiple registered vehicles.
* **📊 Parking Status** — Real-time display of slot availability.
* **💬 Feedback** — Submit feedback/reviews for individual parking lots.
* **📬 Contact Us** — Send inquiries directly to the team via email.
* **👤 Profile Management** — Dynamically update personal info and account passwords.

### 🛡️ Admin Features
* **📊 Dashboard** — In-depth analytics overview built with rich charts (ApexCharts / Recharts).
* **🏢 Manage Parking** — Create, update, and manage parking lots, floors, and specific slots.
* **📅 Manage Bookings** — Monitor, approve, or cancel user bookings globally.
* **👥 Manage Users** — View, activate, or deactivate user accounts securely.
* **📈 Reports** — Generate & export comprehensive system PDF reports (jsPDF).
* **👤 Admin Profile** — View and manage admin account security details.

---

## 🛠. Tech Stack

### Backend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Java** | 17 | Core programming language |
| **Spring Boot** | 3.3.5 | Primary application framework |
| **Spring Security** | — | Authentication & authorization security layers |
| **Spring Data JPA** | — | Database ORM mapping |
| **MySQL** | — | Relational database management |
| **JWT (jjwt)** | 0.12.6 | Secure Token-based auth |
| **Razorpay Java SDK** | 1.4.4 | Payment gateway integration |
| **Spring Mail** | — | Automated Email handling (SMTP / Gmail) |
| **ZXing** | 3.5.1 | QR code generation utilities |
| **Springdoc OpenAPI**| 2.6.0 | Automated Swagger API interactive documentation |
| **Lombok** | — | Boilerplate code reduction |
| **ModelMapper** | 3.2.4 | Clean DTO object mapping |
| **spring-dotenv** | 3.0.0 | Environment `.env` configuration file support |

### Frontend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | 19 | Frontend UI component framework |
| **Vite** | 8 (beta) | High-speed build tool & development server |
| **React Router DOM** | 7 | Client-side routing management |
| **TailwindCSS** | 4 | Modern utility-first styling |
| **Axios** | — | Clean HTTP client requests |
| **Leaflet / React-Leaflet** | — | Interactive map generation |
| **ApexCharts / Recharts** | — | Dynamic Admin analytical charts |
| **Razorpay (frontend)** | — | Client-side payment checkout layer |
| **jsPDF + AutoTable** | — | Client-side PDF generation and export |
| **React QR Code** | — | Dynamic rendering of booking QR codes |
| **Swiper** | — | Carousel and slider layout UI components |
| **Lucide React / React Icons** | — | Extensive icon vector libraries |
| **Radix UI** | — | Accessible, unstyled UI component primitives |

---

## 📁 Project Structure

```text
ParkEasy/
├── backend/                    # Spring Boot application
│   ├── src/main/java/com/infosys/ParkEasy/
│   │   ├── config/             # Security, CORS, Swagger config
│   │   ├── controller/         # REST API controllers
│   │   │   ├── AuthController
│   │   │   ├── UserController
│   │   │   ├── ParkingController
│   │   │   ├── PaymentController
│   │   │   ├── BookingController
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
