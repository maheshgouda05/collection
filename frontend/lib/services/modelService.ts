import { BodyProfile } from '../types';
import {
  INITIAL_BODY_PROFILE,
  DEFAULT_BODY_3D_PARAMS,
  DEFAULT_APPEARANCE_3D_PARAMS,
} from '../mock/bodyProfile';

const MODEL_PROFILE_STORAGE_KEY = 'collection_it_all_body_model_v2';

/**
 * modelService manages personal body profile, proportions, and visual appearance options.
 */
export const modelService = {
  /**
   * Retrieves the user's current 3D/2D body model profile.
   * // TODO: connect backend (e.g., GET /api/user/model-profile)
   */
  getBodyProfile: async (): Promise<BodyProfile> => {
    if (typeof window === 'undefined') {
      return INITIAL_BODY_PROFILE;
    }
    try {
      const stored = localStorage.getItem(MODEL_PROFILE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading model profile from storage:', e);
    }
    return INITIAL_BODY_PROFILE;
  },

  /**
   * Saves or updates the body profile.
   * // TODO: connect backend (e.g., PUT /api/user/model-profile)
   */
  saveBodyProfile: async (profile: Partial<BodyProfile>): Promise<BodyProfile> => {
    const current = await modelService.getBodyProfile();
    const updated: BodyProfile = {
      ...current,
      ...profile,
      modelPreset: profile.modelPreset || profile.body3D?.modelPreset || current.modelPreset || 'procedural-female',
      customModelUrl: profile.customModelUrl !== undefined ? profile.customModelUrl : (profile.body3D?.customModelUrl !== undefined ? profile.body3D.customModelUrl : current.customModelUrl),
      customModelName: profile.customModelName !== undefined ? profile.customModelName : (profile.body3D?.customModelName !== undefined ? profile.body3D.customModelName : current.customModelName),
      body3D: {
        ...(current.body3D || DEFAULT_BODY_3D_PARAMS),
        ...(profile.body3D || {}),
        modelPreset: profile.modelPreset || profile.body3D?.modelPreset || current.body3D?.modelPreset || 'procedural-female',
      },
      appearance: {
        ...current.appearance,
        ...(profile.appearance || {}),
      },
      appearance3D: {
        ...(current.appearance3D || DEFAULT_APPEARANCE_3D_PARAMS),
        ...(profile.appearance3D || {}),
      },
      usualSizes: {
        ...current.usualSizes,
        ...(profile.usualSizes || {}),
      },
      updatedAt: new Date().toISOString().split('T')[0],
    };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(MODEL_PROFILE_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Error saving model profile to storage:', e);
      }
    }

    return updated;
  },
};
