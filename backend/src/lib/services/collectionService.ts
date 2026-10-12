import { apiRequest } from './apiClient.ts';
import type { WardrobeItem, CollectionStats, ClothingCategory } from '../types.ts';

export interface WardrobeFilterParams {
  category?: ClothingCategory | 'all';
  search?: string;
  colour?: string;
  size?: string;
  season?: string;
  occasion?: string;
  favourite?: boolean;
  sort?: 'newest' | 'name_asc' | 'name_desc' | 'price_high' | 'price_low' | 'worn_most';
}

export const collectionService = {
  async getItems(params: WardrobeFilterParams = {}): Promise<WardrobeItem[]> {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.set('category', params.category);
    if (params.search) query.set('search', params.search);
    if (params.colour && params.colour !== 'all') query.set('colour', params.colour);
    if (params.size && params.size !== 'all') query.set('size', params.size);
    if (params.season && params.season !== 'all') query.set('season', params.season);
    if (params.occasion && params.occasion !== 'all') query.set('occasion', params.occasion);
    if (params.favourite) query.set('favourite', 'true');
    if (params.sort) query.set('sort', params.sort);

    const queryString = query.toString();
    const endpoint = queryString ? `/api/wardrobe?${queryString}` : '/api/wardrobe';
    const res = await apiRequest<{ items: WardrobeItem[]; total: number }>(endpoint);
    return res.items || [];
  },

  async getItemById(id: string): Promise<WardrobeItem> {
    const res = await apiRequest<{ item: WardrobeItem }>(`/api/wardrobe/${id}`);
    return res.item;
  },

  async addItem(data: Partial<WardrobeItem>): Promise<WardrobeItem> {
    const res = await apiRequest<{ item: WardrobeItem }>('/api/wardrobe', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.item;
  },

  async updateItem(id: string, data: Partial<WardrobeItem>): Promise<WardrobeItem> {
    const res = await apiRequest<{ item: WardrobeItem }>(`/api/wardrobe/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.item;
  },

  async deleteItem(id: string): Promise<void> {
    await apiRequest(`/api/wardrobe/${id}`, {
      method: 'DELETE',
    });
  },

  async toggleFavourite(id: string): Promise<WardrobeItem> {
    const res = await apiRequest<{ item: WardrobeItem; isFavourite: boolean }>(`/api/wardrobe/${id}/toggle-favourite`, {
      method: 'POST',
    });
    return res.item;
  },

  async recordWorn(id: string): Promise<WardrobeItem> {
    const res = await apiRequest<{ item: WardrobeItem; timesWorn: number }>(`/api/wardrobe/${id}/wear`, {
      method: 'POST',
    });
    return res.item;
  },

  async getStats(): Promise<CollectionStats> {
    return apiRequest<CollectionStats>('/api/wardrobe/stats');
  },

  async uploadImage(imageBase64: string, mimeType: string = 'image/jpeg'): Promise<{ url: string; storagePath?: string }> {
    return apiRequest<{ url: string; storagePath?: string }>('/api/upload', {
      method: 'POST',
      body: JSON.stringify({ imageBase64, mimeType }),
    });
  },
};
