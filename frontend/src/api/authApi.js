import BASE_URL from "@/config/Api";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const signup = async (data) => {
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};