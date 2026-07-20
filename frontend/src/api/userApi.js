// src/api/userApi.js

import axios from "axios";
import BASE_URL from "@/config/Api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Get Profile
export const getUserProfile = async () => {
  try {
    const res = await api.get("/user/profile");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

// ✅ Booking History
export const getBookingHistory = async () => {
  try {
    const res = await api.get("/user/booking-history");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch bookings" };
  }
};

// ✅ Payment History
export const getPaymentHistory = async () => {
  try {
    const res = await api.get("/user/payments-history");
    console.log(res);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch payments" };
  }
};

// 🔥 ✅ NEW: Get QR Code
export const getQrCode = async (bookingId) => {
  try {
    const res = await api.get(`/booking/${bookingId}/qr`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch QR Code" };
  }
};