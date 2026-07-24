import axios from "axios";

// Dynamically use live backend URL in production, fallback to localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default httpClient;