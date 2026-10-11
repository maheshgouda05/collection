import { WardrobeItem, BodyProfile, TryOnResult } from '../types';

/**
 * tryOnService provides virtual outfit preview coordination and fitting analysis placeholders.
 * Clear disclaimer is always provided: static 2D previews do not claim real mechanical 3D drape accuracy.
 */
export const tryOnService = {
  /**
   * Generates a preview analysis and drape simulation placeholder for the chosen wardrobe piece.
   * // TODO: connect backend (e.g., POST /api/virtual-tryon/render with 3D mesh reconstruction or diffusion inpainting)
   */
  simulateTryOn: async (
    profile: BodyProfile,
    item: WardrobeItem,
    selectedSize?: string
  ): Promise<TryOnResult> => {
    // Artificial latency simulation
    await new Promise((res) => setTimeout(res, 250));

    const itemSize = selectedSize || item.size || 'M';
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
