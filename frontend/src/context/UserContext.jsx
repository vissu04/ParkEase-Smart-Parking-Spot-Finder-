// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import {
  getUserProfile,
  getBookingHistory,
  getPaymentHistory,
} from "@/api/userApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      const [profileData, bookingData, paymentData] =
        await Promise.all([
          getUserProfile(),
          getBookingHistory(),
          getPaymentHistory(),
        ]);

      setProfile(profileData);
      setBookings(bookingData);
      setPayments(paymentData);

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        profile,
        bookings,
        payments,
        loading,
        error,
        refresh: fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};