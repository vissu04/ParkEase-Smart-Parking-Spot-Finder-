
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

export const getAllParkingsPublic = async () => {
  try {
    const res = await api.get("/parking/all-parking");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch parkings" };
  }
};

export const getParkingByIdPublic = async (id) => {
  try {
    const res = await api.get(`/parking/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch parking" };
  }
};