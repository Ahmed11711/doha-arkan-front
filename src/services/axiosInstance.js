// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://f1d9d884a140.ngrok-free.app/api/",
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("Auth_Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
