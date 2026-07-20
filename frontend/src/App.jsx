import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BookParking from "./pages/BookParking";
import ParkingStatus from "./pages/ParkingStatus";
import MyBooking from "./pages/MyBooking";
import BookingConfirm from "./pages/BookingConfirm";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import WhyChoose from "./pages/WhyChoose";
import FAQ from "./pages/FAQ";
import ForgotPassword from "./pages/ForgotPassword";
import Features from "./pages/Features";
import About from "./pages/About";
import Payment from "./pages/Payment";
import PaymentHistory from "./pages/PaymentHistory";
import ParkingRates from "./pages/ParkingRates";
import Services from "./pages/Services";
import TopReviews from "./pages/TopReviews";
import Contact from "./pages/Contact";

import AdminProfile from "./Admin/profile/AdminProfile";
import Dashboard from "./Admin/Dashboard/Dashboard";
import ManageParking from "./Admin/ManageParking/ManageParking";
import ManageUsers from "./Admin/ManageUser/MangeUser";
import ManageBookings from "./Admin/ManageBooking/ManageBooking";
import Reports from "./Admin/Report/Repots";
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/parking" element={<ManageParking />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* PROTECTED */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/book-parking" element={<BookParking />} />
          <Route path="/parking-status" element={<ParkingStatus />} />
          <Route path="/my-booking" element={<MyBooking />} />
          <Route path="/booking-confirm" element={<BookingConfirm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/why-choose" element={<WhyChoose />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/parking-rates" element={<ParkingRates />} />
          <Route path="/services" element={<Services />} />
          <Route path="/top-reviews" element={<TopReviews />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;