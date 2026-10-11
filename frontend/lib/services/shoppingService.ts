import { ShopItem, Category, WardrobeItem } from '../types';
import { SAMPLE_SHOPPING_ITEMS } from '../mock/shopItems';

export interface ShoppingFilterOptions {
  category?: Category | 'All';
  colour?: string;
  maxBudget?: number;
  style?: string;
}

/**
 * shoppingService handles curated sample recommendation items that fill detected
 * wardrobe gaps, helping users avoid redundant purchases and buy only what pairs
 * with their existing wardrobe.
 */
export const shoppingService = {
  /**
   * Retrieves sample products that complete the user's existing wardrobe.
   * // TODO: connect backend (e.g., GET /api/affiliate/shop-matching?category=...)
   */
  getMatchingItemsForGap: async (
    gapCategory?: string,
    existingItems: WardrobeItem[] = [],
    filters?: ShoppingFilterOptions
  ): Promise<ShopItem[]> => {
    // Artificial latency simulation
    await new Promise((res) => setTimeout(res, 200));

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

    // Enhance match reasons dynamically based on user's actual items if available
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

    return missing.length > 0 ? missing : ['Footwear', 'Accessories']; // sensible defaults if capsule is full
  },
};
