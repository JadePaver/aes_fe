// src/axiosInstance.js
import axios from "axios";
import { serverIP } from "../const/var";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

//getApiClient
export const apiClient = axios.create({
  baseURL: "http://localhost:5001", // Temporary placeholder
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the correct baseURL dynamically
export const setApiClientBaseURL = () => {
  if (serverIP.value) {
    apiClient.defaults.baseURL = `http://${serverIP.value}:${process.env.REACT_APP_API_PORT}`;
    console.log("Updated baseURL to:", apiClient.defaults.baseURL);
  } else {
    console.error("serverIP is not set. Cannot update baseURL.");
  }
};

// Request interceptor to add the token to requests
apiClient.interceptors.request.use(
  (config) => {
    if (config.url !== "/users/login") { // Exclude login request
      const token = localStorage.getItem("token");
      if (token && typeof token === "string") { // Ensure token is a string
        config.headers.Authorization = `Bearer ${token}`;
        
        try {
          // Check if the token is expired before sending the request
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            // Token is expired; clear it and reject the request
            localStorage.removeItem("token");
            return Promise.reject(new Error("Token expired"));
          }
        } catch (error) {
          console.error("Token decoding error:", error);
          localStorage.removeItem("token");
          return Promise.reject(new Error("Invalid token"));
        }
      }
    }
    console.log("without token")
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
