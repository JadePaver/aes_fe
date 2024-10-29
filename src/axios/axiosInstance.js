// src/axiosInstance.js
import axios from "axios";

// Create an Axios instance with default configurations
const apiClient = axios.create({
  baseURL: `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_API_PORT}`, // Ensure this is correct
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for request/response handling
apiClient.interceptors.request.use(
  (config) => {
    return config; // Modify the request config if necessary
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response; // Handle response globally
  },
  (error) => {
    return Promise.reject(error); // Handle errors globally
  }
);

export default apiClient;
