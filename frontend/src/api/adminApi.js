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

export const getDashboardStats = async () => {
  try {
    const res = await api.get("/admin/dashboardStats");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch stats" };
  }
};

export const getDashboard = async () => {
  try {
    const res = await api.get("/admin/getDashboard");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch dashboard" };
  }
};

export const createParking = async (data) => {
  try {
    const res = await api.post("/admin/parking", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create parking" };
  }
};

export const updateParking = async (id, data) => {
  try {
    const res = await api.put(`/admin/parking/${id}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update parking" };
  }
};

export const deleteParking = async (id) => {
  try {
    await api.delete(`/admin/parking/${id}`);
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete parking" };
  }
};

export const getAllParkings = async () => {
  try {
    const res = await api.get("/admin/parkings");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch parkings" };
  }
};

export const getParkingById = async (id) => {
  try {
    const res = await api.get(`/admin/parking/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch parking" };
  }
};

export const getAllUsers = async () => {
  try {
    const res = await api.get("/admin/allUserDetails");
    
    console.log(res.data)
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch users" };
  }
};

export const getUserDetails = async (customId) => {
  try {
    const res = await api.get(`/admin/user/${customId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user" };
  }
};

export const getTodayBookings = async () => {
  try {
    const res = await api.get("/admin/bookings/today");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch bookings" };
  }
};
export const getAdminProfile = async () => {
  try {
    const res = await api.get("/admin/profile");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};
export const makeAdmin = async (email) => {
  try {
    const res = await api.post("/admin/registerNewAdmin", email); 
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to register admin" };
  }
};