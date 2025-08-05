import { api } from './api';
import { SkateSpot } from '../types/types';
import { authService } from './authService';

interface FilterParams {
  difficulty?: string;
  surface?: string;
  location?: string;
}

const API = api;

// Interceptor to add the token to the request headers
// This assumes the token is stored in localStorage after login
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;   
  }
  return config;
});

// Service to fetch skate spots with optional filters
// If no filters are provided, it returns all spots sorted by name
export const spotService = {
  async getAll(params?: FilterParams): Promise<SkateSpot[]> {
    const response = await API.get<SkateSpot[]>('/spots', { params });
    if (!params || (!params.difficulty && !params.surface && !params.location)) {
      return response.data.sort((a, b) => a.name.localeCompare(b.name));
    }

    return response.data;
  },

  // Service to create a new skate spot
  // It accepts a data object with the necessary fields and an image file
  async createSpot(data: {
    username: string;
    name: string;
    description: string;
    location: string;
    surface: string;
    difficulty: string;
    image: File;
  }): Promise<void> {
    const token = authService.getToken(); 
  if (!token) throw new Error('Usuário não autenticado');
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('surface', data.surface);
    formData.append('difficulty', data.difficulty);
    formData.append('image', data.image);
    console.log('Token no createSpot:', localStorage.getItem('token'));

    await API.post('/spots', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Service to fetch a skate spot by its ID
  async getSpotById(id: number): Promise<SkateSpot> {
    const response = await API.get<SkateSpot>(`/spots/${id}`);
    return response.data;
  },

  // Service to fetch the average rating for a spot
  async getAverageRating(spotId: number): Promise<number> {
    const res = await api.get(`/ratings/${spotId}/average`);
    return res.data;
  }
};