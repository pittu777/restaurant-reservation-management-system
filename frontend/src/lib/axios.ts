import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true,
});
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 && error.config?.url === "/auth/me") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      console.warn("Authentication required");
    }

    return Promise.reject(error);
  }
);

export default api;
