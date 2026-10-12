import { ShopItem, Category, WardrobeItem } from '../types';
import { SAMPLE_SHOPPING_ITEMS } from '../mock/shopItems';
import { apiFetch } from './apiClient';

export interface ShoppingFilterOptions {
  category?: Category | 'All';
  colour?: string;
  maxBudget?: number;
  style?: string;
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
 * shoppingService handles curated recommendation items and connects to the backend
 * /api/shopping/check endpoint for real closet redundancy checks and gap detection.
 */
export const shoppingService = {
  /**
   * Evaluates a potential purchase candidate against user's real wardrobe via /api/shopping/check.
   */
  checkCandidateItem: async (candidate: {
    name: string;
    category: string;
    colour: string;
    brand?: string;
    fabric?: string;
    price?: number;
    imageUrl?: string;
  }) => {
    try {
      const res = await apiFetch<Record<string, unknown>>('/api/shopping/check', {
        method: 'POST',
        body: JSON.stringify({
          name: candidate.name,
          category: mapToBackendCategory(candidate.category),
          colour: candidate.colour,
          brand: candidate.brand,
          fabric: candidate.fabric,
          price: candidate.price,
          imageUrl: candidate.imageUrl,
        }),
      });
      if (res.ok && res.data) {
        return res.data;
      }
    } catch (e) {
      console.warn('Backend /api/shopping/check call failed:', e);
    }
    return null;
  },

  /**
   * Retrieves sample products that complete the user's existing wardrobe.
   */
  getMatchingItemsForGap: async (
    gapCategory?: string,
    existingItems: WardrobeItem[] = [],
    filters?: ShoppingFilterOptions
  ): Promise<ShopItem[]> => {
    await new Promise((res) => setTimeout(res, 150));

    let items = [...SAMPLE_SHOPPING_ITEMS];

    if (gapCategory && gapCategory !== 'All') {
      items = items.filter(
        (i) =>
          i.category.toLowerCase().includes(gapCategory.toLowerCase()) ||
          i.gapCategory.toLowerCase().includes(gapCategory.toLowerCase())
      );
    }

    if (filters) {
      if (filters.category && filters.category !== 'All') {
        items = items.filter((i) => i.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters.colour && filters.colour !== 'All') {
        items = items.filter((i) => i.colour.toLowerCase().includes(filters.colour!.toLowerCase()));
      }
      if (filters.maxBudget) {
        items = items.filter((i) => i.price <= filters.maxBudget!);
      }
      if (filters.style && filters.style !== 'All') {
        items = items.filter((i) => i.style.toLowerCase().includes(filters.style!.toLowerCase()));
      }
    }

    return items.map((item) => {
      const matchingExisting = existingItems.find(
        (e) => e.category !== item.category && (e.colour.includes('White') || e.colour.includes('Black') || e.isFavorite)
      );
      return {
        ...item,
        matchReason: matchingExisting
          ? `Completes your ${matchingExisting.name} (${matchingExisting.colour}) without duplicating anything in your wardrobe.`
          : item.matchReason,
      };
    });
  },

  /**
   * Identifies categories currently under-represented in the user's collection.
   */
  detectWardrobeGaps: (items: WardrobeItem[]): string[] => {
    const categoriesPresent = new Set(items.map((i) => i.category.toLowerCase()));
    const desired = ['footwear', 'outerwear', 'accessories', 'bottoms', 'tops'];
    const missing: string[] = [];

    desired.forEach((d) => {
      const hasAny = Array.from(categoriesPresent).some((c) => c.includes(d));
      if (!hasAny) {
        missing.push(d.charAt(0).toUpperCase() + d.slice(1));
      }
    });

    return missing.length > 0 ? missing : ['Footwear', 'Accessories'];
  },
};
