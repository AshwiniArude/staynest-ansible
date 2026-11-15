// src/services/apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8086/', // ✅ change if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("Token from localStorage:", token); // ✅ debug log

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("🚫 No token found in localStorage! Sending request without Authorization header.");
  }

  return config;
});

export default api;
