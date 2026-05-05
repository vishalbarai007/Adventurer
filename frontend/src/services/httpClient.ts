import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;
