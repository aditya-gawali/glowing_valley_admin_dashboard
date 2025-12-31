import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://glowing-valley-2-0.onrender.com",
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Exclude auth routes
    if (config.url && !config.url.startsWith("/auth")) {
      const token = localStorage.getItem("token");

      if (token) {
        // Axios v1 headers are always defined
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
