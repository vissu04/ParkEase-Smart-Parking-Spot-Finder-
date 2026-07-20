
import BASE_URL from "@/config/Api";
import axios from "axios";

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
export const createOrder = async (bookingData) => {
  try {
    const res = await api.post("/payment/create-order", bookingData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create order" };
  }
};

export const verifyPayment = async (orderId, paymentId) => {
  try {
    const res = await api.post("/payment/verify", null, {
      params: { orderId, paymentId },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to verify payment" };
  }
};