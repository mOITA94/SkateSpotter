import { api } from './api';
import { LoginCredentials, LoginResponse, User } from '../types/types';

export const authService = {
  async login(data: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post('auth/login', data);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return response.data;
  },

async register(data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }): Promise<void> {
    await api.post('register', data); 
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  logout(): void {
    localStorage.removeItem('token');
  },
};
