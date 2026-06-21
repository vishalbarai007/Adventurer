import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default httpClient;
