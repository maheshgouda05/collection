import { apiRequest } from './apiClient.ts';
import type { SavedOutfit, WardrobeItem } from '../types.ts';

export interface GenerateOutfitsPayload {
  anchorItemId?: string;
  occasion?: string;
  weatherTemp?: number;
  stylePreference?: string;
}

export interface RecommendedOutfit {
  name: string;
  occasion: string;
  matchScore: number;
  items: WardrobeItem[];
  itemIds: string[];
  explanation: string;
  missingCategories: string[];
  weatherSuitability: string;
}

export const matcherService = {
  async getSavedOutfits(): Promise<SavedOutfit[]> {
    const res = await apiRequest<{ outfits: SavedOutfit[] }>('/api/outfits');
    return res.outfits || [];
  },

  async saveOutfit(data: {
    name: string;
    occasion: string;
    itemIds: string[];
    matchScore?: number;
    explanation?: string;
    weatherContext?: { tempC: number; condition: string; city: string };
    stylePreference?: string;
  }): Promise<SavedOutfit> {
    const res = await apiRequest<{ outfit: SavedOutfit; message: string }>('/api/outfits', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.outfit;
  },

  async deleteOutfit(outfitId: string): Promise<void> {
    await apiRequest(`/api/outfits/${outfitId}`, {
      method: 'DELETE',
    });
  },

  async generateRecommendations(params: GenerateOutfitsPayload = {}): Promise<{
    success: boolean;
    outfits: RecommendedOutfit[];
    message?: string;
    missingCategories?: string[];
  }> {
    return apiRequest('/api/outfits/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },
};
