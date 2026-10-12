import { Outfit, WardrobeItem, Occasion } from '../types';
import { apiFetch } from './apiClient';

const SAVED_OUTFITS_KEY = 'collection_it_all_outfits_v2';

// Modular Color Harmony Matrix
const COLOR_HARMONY_RULES: Record<string, string[]> = {
  white: ['black', 'navy', 'blue', 'beige', 'grey', 'cream', 'brown', 'green', 'red'],
  black: ['white', 'grey', 'beige', 'cream', 'blue', 'red'],
  navy: ['white', 'beige', 'cream', 'brown', 'grey'],
  blue: ['white', 'black', 'beige', 'grey', 'navy'],
  beige: ['white', 'black', 'navy', 'brown', 'cream', 'green'],
  cream: ['white', 'black', 'navy', 'brown', 'beige'],
  brown: ['white', 'cream', 'beige', 'navy', 'blue'],
  grey: ['white', 'black', 'navy', 'blue'],
  green: ['white', 'black', 'beige', 'cream', 'brown'],
  red: ['white', 'black', 'grey', 'navy'],
  other: ['white', 'black', 'beige'],
};

export interface MatchOptions {
  anchorItem?: WardrobeItem;
  occasion?: Occasion;
  weatherFilter?: string;
  stylePreference?: string;
  footwearPref?: string;
}

/**
 * matcherService provides modular outfit composition logic based on color theory,
 * category pairings, and occasion appropriateness.
 * Keeps rules swappable for future AI model integration.
 */
export const matcherService = {
  /**
   * Generates coordinated outfits from items currently in the user's wardrobe.
   * // TODO: connect backend (e.g., POST /api/stylist/match-outfits AI service)
   */
  generateOutfits: (items: WardrobeItem[], options: MatchOptions): Outfit[] => {
    if (!items || items.length === 0) return [];

    const { anchorItem, occasion = 'Office', weatherFilter, stylePreference } = options;

    const tops = items.filter((i) => i.category.toLowerCase().includes('top') || i.category.toLowerCase().includes('shirt'));
    const bottoms = items.filter((i) => i.category.toLowerCase().includes('bottom') || i.category.toLowerCase().includes('trouser') || i.category.toLowerCase().includes('jean'));
    const dresses = items.filter((i) => i.category.toLowerCase().includes('dress'));
    const outerwear = items.filter((i) => i.category.toLowerCase().includes('outer') || i.category.toLowerCase().includes('jacket') || i.category.toLowerCase().includes('coat'));
    const footwear = items.filter((i) => i.category.toLowerCase().includes('footwear') || i.category.toLowerCase().includes('shoe') || i.category.toLowerCase().includes('boot'));
    const bags = items.filter((i) => i.category.toLowerCase().includes('bag'));
    const accessories = items.filter((i) => i.category.toLowerCase().includes('accessor') || i.category.toLowerCase().includes('jewel'));

    const outfits: Outfit[] = [];

    // Helper: evaluate color match
    const colorsMatch = (fam1: string, fam2: string) => {
      if (fam1 === fam2) return true; // Monochrome elegance
      const allowed = COLOR_HARMONY_RULES[fam1] || ['white', 'black'];
      return allowed.includes(fam2);
    };

    // Case 1: If user provided an anchor item, build outfits centering that piece
    if (anchorItem) {
      const cat = anchorItem.category.toLowerCase();

      if (cat.includes('top') || cat.includes('shirt')) {
        bottoms.forEach((bot, idx) => {
          if (outfits.length >= 4) return;
          const harmonizes = colorsMatch(anchorItem.colorFamily, bot.colorFamily);
          const outer = outerwear[idx % (outerwear.length || 1)];
          const shoe = footwear[idx % (footwear.length || 1)];

          outfits.push({
            id: `matched-${anchorItem.id}-${bot.id}-${idx}`,
            name: `${anchorItem.name} + ${bot.name}`,
            occasion,
            stylePersona: stylePreference || 'Curated Synergy',
            topItem: anchorItem,
            bottomItem: bot,
            outerwearItem: outer,
            footwearItem: shoe,
            bagItem: bags[0],
            accessoryItem: accessories[0],
            matchScore: harmonizes ? 96 : 88,
            matchReason: harmonizes
              ? `Harmonious color contrast between ${anchorItem.colour} and ${bot.colour}. Balanced silhouette appropriate for ${occasion}.`
              : `Modern eclectic balance styling ${anchorItem.colour} against neutral ${bot.colour}.`,
            occasionSuitability: `Highly suitable for ${occasion}. Pairs effortlessly with neat footwear.`,
            weatherFit: weatherFilter || 'Mild Autumn (16°C – 20°C)',
            missingItems: !shoe ? ['Formal or casual footwear needed to complete outfit'] : [],
            createdAt: new Date().toISOString(),
          });
        });
      } else if (cat.includes('bottom') || cat.includes('jean') || cat.includes('trouser')) {
        tops.forEach((top, idx) => {
          if (outfits.length >= 4) return;
          const harmonizes = colorsMatch(top.colorFamily, anchorItem.colorFamily);
          const outer = outerwear[idx % (outerwear.length || 1)];
          const shoe = footwear[idx % (footwear.length || 1)];

          outfits.push({
            id: `matched-${top.id}-${anchorItem.id}-${idx}`,
            name: `${top.name} + ${anchorItem.name}`,
            occasion,
            stylePersona: stylePreference || 'Tailored Coordination',
            topItem: top,
            bottomItem: anchorItem,
            outerwearItem: outer,
            footwearItem: shoe,
            bagItem: bags[0],
            accessoryItem: accessories[0],
            matchScore: harmonizes ? 95 : 85,
            matchReason: `Highlights ${anchorItem.name} as the grounding lower-half silhouette, elevated by ${top.name}.`,
            occasionSuitability: `Ideal foundation look for ${occasion}.`,
            weatherFit: weatherFilter || 'Mild Autumn (16°C – 20°C)',
            missingItems: !shoe ? ['Footwear required to finalize pairing'] : [],
            createdAt: new Date().toISOString(),
          });
        });
      } else if (cat.includes('dress')) {
        const outer = outerwear[0];
        const shoe = footwear[0];
        const bag = bags[0];
        const acc = accessories[0];

        outfits.push({
          id: `matched-dress-${anchorItem.id}`,
          name: `${anchorItem.name} Ensemble`,
          occasion,
          stylePersona: stylePreference || 'One-Piece Statement',
          dressItem: anchorItem,
          outerwearItem: outer,
          footwearItem: shoe,
          bagItem: bag,
          accessoryItem: acc,
          matchScore: 98,
          matchReason: `Complete standalone statement in ${anchorItem.colour}. Layered with structured accents.`,
          occasionSuitability: `Sophisticated choice for ${occasion}.`,
          weatherFit: weatherFilter || 'Evening Ambient (18°C – 22°C)',
          missingItems: !shoe ? ['Heels or elegant flats needed to complete look'] : [],
          createdAt: new Date().toISOString(),
        });
      }
    }

    // Case 2: General Occasion-based combinations
    if (outfits.length === 0) {
      // Create Two-Piece Looks (Top + Bottom)
      for (let i = 0; i < tops.length; i++) {
        for (let j = 0; j < bottoms.length; j++) {
          if (outfits.length >= 4) break;
          const t = tops[i];
          const b = bottoms[j];
          const harmonizes = colorsMatch(t.colorFamily, b.colorFamily);

          if (harmonizes || outfits.length < 2) {
            const outer = outerwear[outfits.length % (outerwear.length || 1)];
            const shoe = footwear[outfits.length % (footwear.length || 1)];
            const bag = bags[outfits.length % (bags.length || 1)];
            const acc = accessories[outfits.length % (accessories.length || 1)];

            outfits.push({
              id: `gen-look-${t.id}-${b.id}`,
              name: `${t.name} & ${b.name}`,
              occasion,
              stylePersona: stylePreference || 'Contemporary Minimalist',
              topItem: t,
              bottomItem: b,
              outerwearItem: outer,
              footwearItem: shoe,
              bagItem: bag,
              accessoryItem: acc,
              matchScore: harmonizes ? 94 : 86,
              matchReason: `Clean color synergy between ${t.colour} and ${b.colour}. Tailored proportions flatter your silhouette.`,
              occasionSuitability: `Naturally transitions through a typical ${occasion} schedule.`,
              weatherFit: weatherFilter || 'Mild (18°C)',
              missingItems: !shoe ? ['Footwear'] : !outer ? ['Light outerwear for cooler weather'] : [],
              createdAt: new Date().toISOString(),
            });
          }
        }
      }

      // Add Dress looks if available
      dresses.forEach((d, idx) => {
        if (outfits.length >= 6) return;
        outfits.push({
          id: `gen-dress-${d.id}-${idx}`,
          name: `${d.name} Statement`,
          occasion,
          stylePersona: stylePreference || 'Effortless Elegance',
          dressItem: d,
          outerwearItem: outerwear[0],
          footwearItem: footwear[0],
          bagItem: bags[0],
          accessoryItem: accessories[0],
          matchScore: 92,
          matchReason: `Standout one-piece dressing. Neutral outerwear keeps focus on ${d.name}.`,
          occasionSuitability: `Perfect for ${occasion}.`,
          weatherFit: weatherFilter || 'All Season',
          createdAt: new Date().toISOString(),
        });
      });
    }

    return outfits;
  },

  /**
   * Retrieves saved favourite outfits from backend /api/outfits with local caching.
   */
  listFavourites: async (): Promise<Outfit[]> => {
    try {
      interface RawBackendOutfit {
        id: string;
        name: string;
        occasion?: string;
        matchScore?: number;
        explanation?: string;
        createdAt?: string;
        weatherContext?: string;
      }
      const res = await apiFetch<{ outfits: RawBackendOutfit[] }>('/api/outfits');
      if (res.ok && res.data?.outfits && Array.isArray(res.data.outfits)) {
        const outfits: Outfit[] = res.data.outfits.map((o) => ({
          id: o.id,
          name: o.name,
          occasion: (o.occasion || 'Office') as Occasion,
          stylePersona: 'Curated Look',
          matchScore: o.matchScore || 85,
          matchReason: o.explanation || 'Curated wardrobe combination.',
          createdAt: o.createdAt || new Date().toISOString(),
          weatherFit: o.weatherContext,
        }));
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(SAVED_OUTFITS_KEY, JSON.stringify(outfits));
          } catch (e) {
            console.warn('Error saving outfits to localStorage:', e);
          }
        }
        return outfits;
      }
    } catch (e) {
      console.warn('Backend /api/outfits call failed, using localStorage:', e);
    }

    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(SAVED_OUTFITS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading favourites from storage:', e);
    }
    return [];
  },

  /**
   * Saves an outfit to backend /api/outfits and local favourites.
   */
  saveFavourite: async (outfit: Outfit): Promise<Outfit[]> => {
    try {
      const itemIds = [
        outfit.topItem?.id,
        outfit.bottomItem?.id,
        outfit.dressItem?.id,
        outfit.outerwearItem?.id,
        outfit.footwearItem?.id,
        outfit.bagItem?.id,
        outfit.accessoryItem?.id,
      ].filter(Boolean) as string[];

      await apiFetch('/api/outfits', {
        method: 'POST',
        body: JSON.stringify({
          name: outfit.name,
          occasion: outfit.occasion,
          itemIds,
          matchScore: outfit.matchScore,
          explanation: outfit.matchReason,
          weatherContext: outfit.weatherFit,
        }),
      });
    } catch (e) {
      console.warn('Backend /api/outfits save call failed:', e);
    }

    const favourites = await matcherService.listFavourites();
    const exists = favourites.some((o) => o.id === outfit.id);
    const updated = exists ? favourites : [outfit, ...favourites];

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SAVED_OUTFITS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Error saving favourite outfit to storage:', e);
      }
    }
    return updated;
  },

  /**
   * Removes an outfit from backend /api/outfits/:id and local favourites.
   */
  removeFavourite: async (id: string): Promise<Outfit[]> => {
    try {
      await apiFetch(`/api/outfits/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Backend /api/outfits delete call failed:', e);
    }

    const favourites = await matcherService.listFavourites();
    const updated = favourites.filter((o) => o.id !== id);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SAVED_OUTFITS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Error removing favourite outfit from storage:', e);
      }
    }
    return updated;
  },
};
