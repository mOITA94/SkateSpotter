import axios from 'axios';
import { authService } from './authService';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  // Debugging the token retrieval
  console.log('[Interceptor] JWT Token:', token); // Debug
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
