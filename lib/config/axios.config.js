import axios from "axios";

const isDev = process.env.NODE_ENV === "development";
const baseURL = isDev
  ? process.env.LOCAL_API_URL
  : process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  console.warn("Base API URL is not defined in environment variables.");
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 90000, // 90 second timeout
});

// Add request interceptor to handle auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Only try to access document in browser environment
    if (typeof window !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (error.code === "ERR_NETWORK") {
      console.error("Network error:", error);

      return Promise.reject({
        message:
          "Unable to connect to the server. Please check your internet connection.",
        originalError: error,
      });
    }

    // Handle timeouts
    if (error.code === "ECONNABORTED") {
      console.log("Request timeout:", error);
      return Promise.reject({
        message: "Request timed out. Please try again.",
        originalError: error,
      });
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Only redirect in browser environment
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    }

    // Add retry logic for failed requests
    if (!originalRequest._retry && error.response?.status >= 500) {
      originalRequest._retry = true;
      try {
        // Wait for 1 second before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return axiosInstance(originalRequest);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
