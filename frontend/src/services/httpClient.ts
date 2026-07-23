import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://adventurer-backend.onrender.com";

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
