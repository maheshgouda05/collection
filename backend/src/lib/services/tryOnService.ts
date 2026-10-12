import { apiRequest } from './apiClient.ts';
import type { TryOnResult, ClothingCategory } from '../types.ts';

export const tryOnService = {
  async estimateFit(payload: {
    garmentId?: string;
    garmentName: string;
    category: ClothingCategory;
    size: string;
    fabric?: string;
  }): Promise<TryOnResult> {
    return apiRequest<TryOnResult>('/api/tryon/estimate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
