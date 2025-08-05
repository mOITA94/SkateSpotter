import { api } from './api';

export interface ReportDTO {
  id?: number;
  spotId: number;
  reason: string;
  reporterUsername?: string;
  createdAt?: string;
}

const API = api;

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;   
  }
  return config;
});

export const reportService = {
  async createReport(data: ReportDTO): Promise<void> {
    await API.post('/reports', data);
  },

  async getAllReports(): Promise<ReportDTO[]> {
    const response = await api.get('/reports');
    return response.data;
  },

  async deleteReport(id: number): Promise<void> {
    await api.delete(`/reports/${id}`);
  }
};
