import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Normalize error shape so every caller can just read err.message and err.code
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || 'Something went wrong';
    const code = error.response?.data?.error?.code || 'UNKNOWN_ERROR';
    const status = error.response?.status;
    return Promise.reject({ message, code, status });
  }
);

export default axiosInstance;