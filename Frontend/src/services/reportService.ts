import { api } from './api';
import { Report } from '@/types';

export const reportService = {
  async getReports(): Promise<Report[]> {
    const response = await api.get('/reports');
    return response.data;
  },

  async deleteReport(id: number): Promise<void> {
    await api.delete(`/reports/${id}`);
  },

  async createReport(spotId: number, reason: string): Promise<Report> {
    const response = await api.post('/reports', { spotId, reason });
    return response.data;
  },
};