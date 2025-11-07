// axiosInstance.js
import axios from "axios";
import { getToken } from "../store/userStore"; // path حسب مشروعك
import { Navigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://back.zayamrock.com/api/v1/",
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

// Request interceptor: نقرأ التوكن ديناميكياً من الستور
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosInstance;
