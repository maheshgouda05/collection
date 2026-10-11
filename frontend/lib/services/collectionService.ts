import { WardrobeItem, Category } from '../types';
import { INITIAL_WARDROBE_ITEMS } from '../mockData';

const COLLECTION_STORAGE_KEY = 'collection_it_all_items_v2';

/**
 * collectionService provides CRUD and query operations for user wardrobe items.
 */
export const collectionService = {
  /**
   * Retrieves list of wardrobe items with optional filters.
   * // TODO: connect backend (e.g., GET /api/wardrobe/items?category=...&search=...)
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

      // Sorting
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
   * Retrieves single item by ID.
   * // TODO: connect backend (e.g., GET /api/wardrobe/items/:id)
   */
  get: async (id: string): Promise<WardrobeItem | null> => {
    const items = await collectionService.list();
    return items.find((i) => i.id === id) || null;
  },

  /**
   * Creates a new wardrobe item.
   * CRITICAL: only photo OR item name is required; all other fields are optional.
   * // TODO: connect backend (e.g., POST /api/wardrobe/items)
   */
  create: async (
    itemData: Partial<WardrobeItem> & { name?: string; imageUrl?: string }
  ): Promise<WardrobeItem> => {
    // Validation: at least photo OR name must be present
    const hasPhoto = Boolean(itemData.imageUrl && itemData.imageUrl.trim());
    const hasName = Boolean(itemData.name && itemData.name.trim());

    if (!hasPhoto && !hasName) {
      throw new Error('Please provide at least an item name or upload a photo.');
    }

    const category = itemData.category || 'Tops';
    const prefix = typeof category === 'string' ? category.slice(0, 3).toUpperCase() : 'ITM';
    const uniqueNum = Math.floor(100 + Math.random() * 900);
    const newId = `CIA-${prefix}-${uniqueNum}`;

    const fallbackName = itemData.name?.trim() || `${category} (Unlabeled item)`;
    const fallbackImage =
      itemData.imageUrl?.trim() ||
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80';

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
   * Updates an existing item.
   * // TODO: connect backend (e.g., PUT /api/wardrobe/items/:id)
   */
  update: async (id: string, updates: Partial<WardrobeItem>): Promise<WardrobeItem> => {
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
   * Deletes an item by ID.
   * // TODO: connect backend (e.g., DELETE /api/wardrobe/items/:id)
   */
  delete: async (id: string): Promise<boolean> => {
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
};
