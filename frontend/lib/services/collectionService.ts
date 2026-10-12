import { WardrobeItem, Category, Season } from '../types';
import { INITIAL_WARDROBE_ITEMS } from '../mockData';
import { apiFetch } from './apiClient';

const COLLECTION_STORAGE_KEY = 'collection_it_all_items_v2';

interface RawBackendItem {
  id: string;
  name: string;
  category?: string;
  subCategory?: string;
  colour?: string;
  colourFamily?: string;
  colorFamily?: string;
  size?: string;
  fabric?: string;
  brand?: string;
  price?: number;
  purchaseDate?: string;
  imageUrl?: string;
  notes?: string;
  isFavorite?: boolean;
  isFavourite?: boolean;
  tags?: string[];
  timesWorn?: number;
  lastWorn?: string;
  lastWornAt?: string;
  season?: string[];
  seasons?: Season[];
  condition?: 'New' | 'Like New' | 'Good' | 'Vintage';
}

function normalizeBackendItem(i: RawBackendItem): WardrobeItem {
  const cat = i.category
    ? (i.category === 'dresses' ? 'Dresses' :
       i.category === 'tops' ? 'Tops' :
       i.category === 'bottoms' ? 'Bottoms' :
       i.category === 'outerwear' ? 'Outerwear' :
       i.category === 'shoes' ? 'Footwear' :
       i.category === 'bags' ? 'Bags' :
       i.category === 'accessories' ? 'Accessories' :
       i.category)
    : 'Tops';

  return {
    id: i.id,
    name: i.name,
    category: cat,
    subCategory: i.subCategory || '',
    colour: i.colour || 'Neutral',
    colorFamily: i.colorFamily || i.colourFamily || 'other',
    size: i.size || 'M',
    fabric: i.fabric || 'Unknown / Not specified',
    brand: i.brand,
    price: i.price,
    purchaseDate: i.purchaseDate,
    imageUrl: i.imageUrl || 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
    notes: i.notes || '',
    isFavorite: !!(i.isFavorite ?? i.isFavourite),
    tags: Array.isArray(i.tags) ? i.tags : [],
    timesWorn: i.timesWorn || 0,
    lastWorn: i.lastWorn || i.lastWornAt,
    seasons: Array.isArray(i.seasons) ? i.seasons : Array.isArray(i.season) ? (i.season as Season[]) : ['All Season'],
    condition: i.condition || 'New',
  };
}

function mapToBackendCategory(cat: string): string {
  const c = (cat || '').toLowerCase();
  if (c.includes('footwear') || c.includes('shoe')) return 'shoes';
  if (c.includes('dress')) return 'dresses';
  if (c.includes('top')) return 'tops';
  if (c.includes('bottom') || c.includes('pant') || c.includes('skirt') || c.includes('trouser')) return 'bottoms';
  if (c.includes('outer') || c.includes('coat') || c.includes('jacket') || c.includes('blazer')) return 'outerwear';
  if (c.includes('bag')) return 'bags';
  return 'accessories';
}

/**
 * collectionService provides CRUD and query operations for user wardrobe items,
 * connected directly to the backend API with seamless local caching and offline fallback.
 */
export const collectionService = {
  /**
   * Retrieves list of wardrobe items with optional filters from backend /api/wardrobe.
   */
  list: async (filters?: {
    category?: Category | 'All';
    search?: string;
    onlyFavorites?: boolean;
    color?: string;
    size?: string;
    tag?: string;
    sortBy?: 'recent' | 'price-desc' | 'price-asc' | 'times-worn' | 'name';
  }): Promise<WardrobeItem[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.category && filters.category !== 'All') {
        params.append('category', mapToBackendCategory(filters.category));
      }
      if (filters?.search) params.append('search', filters.search);
      if (filters?.onlyFavorites) params.append('favourite', 'true');
      if (filters?.color) params.append('colour', filters.color);
      if (filters?.size) params.append('size', filters.size);
      if (filters?.sortBy) {
        const sortMap: Record<string, string> = {
          'recent': 'newest',
          'price-desc': 'price_high',
          'price-asc': 'price_low',
          'times-worn': 'worn_most',
          'name': 'name_asc',
        };
        params.append('sort', sortMap[filters.sortBy] || 'newest');
      }

      const queryString = params.toString();
      const url = `/api/wardrobe${queryString ? `?${queryString}` : ''}`;
      const res = await apiFetch<{ items: RawBackendItem[]; total: number }>(url);

      if (res.ok && res.data?.items && Array.isArray(res.data.items)) {
        const items = res.data.items.map(normalizeBackendItem);
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(items));
          } catch (e) {
            console.warn('Error caching wardrobe items:', e);
          }
        }
        return items;
      }
    } catch (err) {
      console.warn('Backend /api/wardrobe call failed, falling back to local storage:', err);
    }

    // Local Storage Fallback
    let items = INITIAL_WARDROBE_ITEMS;
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(COLLECTION_STORAGE_KEY);
        if (stored) {
          items = JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Error reading wardrobe items from storage:', e);
      }
    }

    let result = [...items];

    if (filters) {
      if (filters.category && filters.category !== 'All') {
        result = result.filter((i) => i.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters.onlyFavorites) {
        result = result.filter((i) => i.isFavorite);
      }
      if (filters.color) {
        const c = filters.color.toLowerCase();
        result = result.filter((i) => i.colour.toLowerCase().includes(c) || i.colorFamily.toLowerCase().includes(c));
      }
      if (filters.size) {
        result = result.filter((i) => i.size.toLowerCase() === filters.size?.toLowerCase());
      }
      if (filters.tag) {
        result = result.filter((i) => i.tags.some((t) => t.toLowerCase() === filters.tag?.toLowerCase()));
      }
      if (filters.search && filters.search.trim()) {
        const q = filters.search.toLowerCase();
        result = result.filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            i.category.toLowerCase().includes(q) ||
            i.colour.toLowerCase().includes(q) ||
            (i.brand && i.brand.toLowerCase().includes(q)) ||
            (i.fabric && i.fabric.toLowerCase().includes(q)) ||
            (i.notes && i.notes.toLowerCase().includes(q)) ||
            i.tags.some((t) => t.toLowerCase().includes(q))
        );
      }

      if (filters.sortBy === 'price-desc') {
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (filters.sortBy === 'price-asc') {
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (filters.sortBy === 'times-worn') {
        result.sort((a, b) => b.timesWorn - a.timesWorn);
      } else if (filters.sortBy === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    return result;
  },

  /**
   * Retrieves single item by ID from backend /api/wardrobe/:id.
   */
  get: async (id: string): Promise<WardrobeItem | null> => {
    try {
      const res = await apiFetch<{ item: RawBackendItem }>(`/api/wardrobe/${id}`);
      if (res.ok && res.data?.item) {
        return normalizeBackendItem(res.data.item);
      }
    } catch (e) {
      console.warn(`Backend /api/wardrobe/${id} call failed:`, e);
    }
    const items = await collectionService.list();
    return items.find((i) => i.id === id) || null;
  },

  /**
   * Creates a new wardrobe item in backend /api/wardrobe.
   * Only photo OR item name is required.
   */
  create: async (
    itemData: Partial<WardrobeItem> & { name?: string; imageUrl?: string }
  ): Promise<WardrobeItem> => {
    const hasPhoto = Boolean(itemData.imageUrl && itemData.imageUrl.trim());
    const hasName = Boolean(itemData.name && itemData.name.trim());

    if (!hasPhoto && !hasName) {
      throw new Error('Please provide at least an item name or upload a photo.');
    }

    const category = itemData.category || 'Tops';
    const backendCat = mapToBackendCategory(category);
    const fallbackName = itemData.name?.trim() || `${category} (Unlabeled item)`;
    const fallbackImage =
      itemData.imageUrl?.trim() ||
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80';

    try {
      const res = await apiFetch<{ item: RawBackendItem }>('/api/wardrobe', {
        method: 'POST',
        body: JSON.stringify({
          id: itemData.id,
          itemCode: itemData.id,
          name: fallbackName,
          category: backendCat,
          colour: itemData.colour || 'Neutral',
          colourFamily: itemData.colorFamily || 'other',
          size: itemData.size || 'M',
          fabric: itemData.fabric || 'Unknown',
          brand: itemData.brand || undefined,
          imageUrl: fallbackImage,
          price: itemData.price !== undefined ? itemData.price : undefined,
          season: itemData.seasons || ['all-season'],
          occasion: ['casual'],
          tags: itemData.tags || ['personal'],
          notes: itemData.notes || '',
          isFavourite: !!itemData.isFavorite,
        }),
      });

      if (res.ok && res.data?.item) {
        const created = normalizeBackendItem(res.data.item);
        return created;
      }
    } catch (e) {
      console.warn('Backend item creation failed, falling back to local save:', e);
    }

    // Local fallback
    const prefix = typeof category === 'string' ? category.slice(0, 3).toUpperCase() : 'ITM';
    const uniqueNum = Math.floor(100 + Math.random() * 900);
    const newId = `CIA-${prefix}-${uniqueNum}`;

    const newItem: WardrobeItem = {
      id: newId,
      name: fallbackName,
      category,
      subCategory: itemData.subCategory || '',
      colour: itemData.colour || 'Neutral',
      colorFamily: itemData.colorFamily || 'other',
      size: itemData.size || 'M',
      fabric: itemData.fabric || 'Unknown / Not specified',
      brand: itemData.brand || undefined,
      price: itemData.price !== undefined ? itemData.price : undefined,
      purchaseDate: itemData.purchaseDate || new Date().toISOString().split('T')[0],
      imageUrl: fallbackImage,
      notes: itemData.notes || '',
      isFavorite: itemData.isFavorite || false,
      tags: itemData.tags || ['personal'],
      timesWorn: 0,
      seasons: itemData.seasons || ['All Season'],
      condition: itemData.condition || 'New',
    };

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(COLLECTION_STORAGE_KEY);
        const existing: WardrobeItem[] = stored ? JSON.parse(stored) : INITIAL_WARDROBE_ITEMS;
        const updated = [newItem, ...existing];
        localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Error saving new item to storage:', e);
      }
    }

    return newItem;
  },

  /**
   * Updates an existing item in backend /api/wardrobe/:id.
   */
  update: async (id: string, updates: Partial<WardrobeItem>): Promise<WardrobeItem> => {
    try {
      const payload: Record<string, unknown> = { ...updates };
      if (updates.category) payload.category = mapToBackendCategory(updates.category);
      if (updates.isFavorite !== undefined) payload.isFavourite = updates.isFavorite;

      const res = await apiFetch<{ item: RawBackendItem }>(`/api/wardrobe/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (res.ok && res.data?.item) {
        return normalizeBackendItem(res.data.item);
      }
    } catch (e) {
      console.warn(`Backend update for item ${id} failed:`, e);
    }

    const existing = await collectionService.list();
    const index = existing.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found.`);
    }

    const updatedItem = { ...existing[index], ...updates };
    existing[index] = updatedItem;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(existing));
      } catch (e) {
        console.warn('Error updating item in storage:', e);
      }
    }

    return updatedItem;
  },

  /**
   * Deletes an item by ID from backend /api/wardrobe/:id.
   */
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiFetch(`/api/wardrobe/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn(`Backend delete for item ${id} failed:`, e);
    }

    const existing = await collectionService.list();
    const updated = existing.filter((i) => i.id !== id);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Error deleting item from storage:', e);
      }
    }

    return true;
  },

  /**
   * Toggles favourite status on backend /api/wardrobe/:id/toggle-favourite.
   */
  toggleFavorite: async (id: string): Promise<boolean> => {
    try {
      const res = await apiFetch<{ item: RawBackendItem; isFavourite: boolean }>(`/api/wardrobe/${id}/toggle-favourite`, {
        method: 'POST',
      });
      if (res.ok && res.data) {
        return res.data.isFavourite;
      }
    } catch (e) {
      console.warn(`Backend toggle favourite failed for ${id}:`, e);
    }
    return false;
  },

  /**
   * Records wear event on backend /api/wardrobe/:id/wear.
   */
  recordWear: async (id: string): Promise<WardrobeItem | null> => {
    try {
      const res = await apiFetch<{ item: RawBackendItem }>(`/api/wardrobe/${id}/wear`, {
        method: 'POST',
      });
      if (res.ok && res.data?.item) {
        return normalizeBackendItem(res.data.item);
      }
    } catch (e) {
      console.warn(`Backend wear recording failed for ${id}:`, e);
    }
    return null;
  },
};
