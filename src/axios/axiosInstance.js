// src/axiosInstance.js
import axios from "axios";
import { serverIP } from "../const/var";

//getApiClient
export const apiClient = axios.create({
  baseURL: "http://placeholder", // Temporary placeholder
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
