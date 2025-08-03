import { api } from './api';
import { Spot, CreateSpotData, SpotFilters } from '@/types';

export const spotService = {
  async getSpots(filters?: SpotFilters): Promise<Spot[]> {
    const params = new URLSearchParams();
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.surface) params.append('surface', filters.surface);
    if (filters?.location) params.append('location', filters.location);
    
    const response = await api.get(`/spots?${params.toString()}`);
    return response.data;
  },

  async getSpotById(id: number): Promise<Spot> {
    const response = await api.get(`/spots/${id}`);
    return response.data;
  },

  async createSpot(data: CreateSpotData): Promise<Spot> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('location', data.location);
    if (data.locationUrl) formData.append('locationUrl', data.locationUrl);
    formData.append('surface', data.surface);
    formData.append('difficulty', data.difficulty);
    formData.append('image', data.image);

    const response = await api.post('/spots', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateSpot(id: number, data: Partial<CreateSpotData>): Promise<Spot> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as string | File);
      }
    });

    const response = await api.put(`/spots/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteSpot(id: number): Promise<void> {
    await api.delete(`/spots/${id}`);
  },
};