import { api } from '../services/api';

export const ratingService = {
  async rateSpot(spotId: number, value: number): Promise<void> {
    if (value < 1 || value > 5) {
      throw new Error('Rating must be between 1 and 5.');
    }

    await api.post(`/ratings/${spotId}?value=${value}`);
  }
};