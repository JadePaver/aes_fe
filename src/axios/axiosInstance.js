// src/axiosInstance.js
import axios from "axios";
import { serverIP } from "../const/var";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

//getApiClient
export const apiClient = axios.create({
  baseURL: "http://localhost:5001", // Temporary placeholder
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Function to set the correct baseURL dynamically
export const setApiClientBaseURL = () => {
  if (serverIP.value) {
    apiClient.defaults.baseURL = `http://${serverIP.value}:${process.env.REACT_APP_API_PORT}`;
    apiClient.defaults.withCredentials = true;
    // console.log("Updated baseURL to:", apiClient.defaults.baseURL);
  } else {
    console.error("serverIP is not set. Cannot update baseURL.");
  }
};

// Request interceptor to add the token to requests
apiClient.interceptors.request.use(
  async (config) => {
    // Exclude login and refresh requests
    if (!["/users/login", "/token/refresh"].includes(config.url)) {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (token) {
        try {
          // Check if the token is expired
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            console.log("Access token expired. Attempting to refresh...");
            // Attempt to refresh the token
            const response = await apiClient.post("/token/refresh", {
              refreshToken: refreshToken,
            });
            const newToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;
            localStorage.setItem("token", newToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            config.headers.Authorization = `Bearer ${newToken}`;
          } else {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Token decoding or refresh error:", error);
          localStorage.removeItem("token");
          useNavigate("/aes/login"); // Redirect to login page
          return Promise.reject(error);
        }
      }
    }
    console.log("without token");
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response, // Handle successful responses
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // If unauthorized or forbidden, clear token and redirect to login
      if (status === 401 || status === 403) {
        localStorage.removeItem("token"); // Remove the token
        useNavigate("/aes/login"); // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
