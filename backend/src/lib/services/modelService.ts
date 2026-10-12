import { apiRequest } from './apiClient.ts';
import type { BodyProfile } from '../types.ts';

export const modelService = {
  async getBodyProfile(): Promise<BodyProfile> {
    const res = await apiRequest<{ bodyProfile: BodyProfile }>('/api/model');
    return res.bodyProfile;
  },

  async updateBodyProfile(data: Partial<BodyProfile>): Promise<BodyProfile> {
    const res = await apiRequest<{ bodyProfile: BodyProfile; message: string }>('/api/model', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.bodyProfile;
  },
};
