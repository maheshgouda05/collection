import { apiRequest } from './apiClient.ts';
import type { ShoppingCheckResult, ClothingCategory } from '../types.ts';

export const shoppingService = {
  async checkGarment(candidate: {
    name: string;
    category: ClothingCategory;
    colour: string;
    brand?: string;
    fabric?: string;
    price?: number;
    imageUrl?: string;
  }): Promise<ShoppingCheckResult> {
    return apiRequest<ShoppingCheckResult>('/api/shopping/check', {
      method: 'POST',
      body: JSON.stringify(candidate),
    });
  },
};
