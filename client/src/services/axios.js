// src/services/axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 5000, 
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor (if needed to attach tokens)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken"); // Adjust token storage method if different
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor (optional for handling errors globally)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error, possibly log out user
            console.error("Unauthorized, logging out...");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
