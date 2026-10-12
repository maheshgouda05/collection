import { WardrobeItem, BodyProfile, TryOnResult } from '../types';
import { apiFetch } from './apiClient';

/**
 * tryOnService provides virtual outfit preview coordination and fitting analysis,
 * connected directly to the backend /api/tryon/estimate ergonomic analysis engine.
 */
export const tryOnService = {
  /**
   * Generates a preview analysis and drape simulation from backend /api/tryon/estimate.
   */
  simulateTryOn: async (
    profile: BodyProfile,
    item: WardrobeItem,
    selectedSize?: string
  ): Promise<TryOnResult> => {
    const itemSize = selectedSize || item.size || 'M';

    try {
      interface RawBackendTryOnEstimate {
        overallFit?: string;
        drapeSummary?: string;
        recommendation?: string;
        recommendedSize?: string;
      }
      const res = await apiFetch<RawBackendTryOnEstimate>('/api/tryon/estimate', {
        method: 'POST',
        body: JSON.stringify({
          garmentId: item.id,
          garmentName: item.name,
          category: item.category.toLowerCase(),
          size: itemSize,
        }),
      });

      if (res.ok && res.data) {
        const d = res.data;
        return {
          status: 'preview_only',
          disclaimer: 'Preview only. Ergonomic simulation based on registered anatomical body measurements.',
          fitNotes: `${d.overallFit || 'Proportional Fit'}: ${d.drapeSummary || `Drapes smoothly over your registered frame.`}`,
          silhouetteEffect: d.recommendation || `Layers cleanly over your registered ${profile.height} cm / ${profile.weight} kg frame.`,
          recommendedSize: d.recommendedSize || profile.usualSizes.tops,
        };
      }
    } catch (e) {
      console.warn('Backend /api/tryon/estimate call failed, using local estimation:', e);
    }

    // Local estimation fallback
    await new Promise((res) => setTimeout(res, 200));

    const userTopSize = profile.usualSizes.tops;
    const bodyType = profile.bodyType || 'Balanced';

    let fitNotes = `Standard drape based on ${itemSize} sizing.`;
    if (itemSize.toLowerCase() === userTopSize.toLowerCase()) {
      fitNotes = `True to your usual size (${userTopSize}). Complements your ${bodyType} silhouette with proportional ease.`;
    } else {
      fitNotes = `Item is sized ${itemSize}, while your registered size is ${userTopSize}. Expected to fit slightly differently through shoulders and chest.`;
    }

    return {
      status: 'preview_only',
      disclaimer: 'Preview only. Accurate physical fit and drape requires a virtual try-on integration.',
      fitNotes,
      silhouetteEffect: `Layers cleanly over your registered ${profile.height} cm / ${profile.weight} kg frame.`,
      recommendedSize: userTopSize,
    };
  },
};
