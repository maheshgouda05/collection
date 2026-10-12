import { BodyProfile, BodyShape, ModelPresetType, SkinToneKey, FaceShape, HairStyle } from '../types';
import {
  INITIAL_BODY_PROFILE,
  DEFAULT_BODY_3D_PARAMS,
  DEFAULT_APPEARANCE_3D_PARAMS,
} from '../mock/bodyProfile';
import { apiFetch } from './apiClient';

const MODEL_PROFILE_STORAGE_KEY = 'collection_it_all_body_model_v2';

interface RawBackendBodyProfile {
  id?: string;
  userId?: string;
  heightCm?: number;
  height?: number;
  weightKg?: number;
  weight?: number;
  chestCm?: number;
  bicepsCm?: number;
  wristCm?: number;
  shoulderCm?: number;
  shouldersCm?: number;
  waistCm?: number;
  hipsCm?: number;
  inseamCm?: number;
  bodyType?: string;
  skinTone?: string;
  faceStructure?: string;
  hairstyle?: string;
  modelPreset?: string;
  modelParameters?: Partial<BodyProfile>;
  updatedAt?: string;
}

function mapBackendToFrontendModel(bp: RawBackendBodyProfile): BodyProfile {
  const extra = bp.modelParameters || {};
  return {
    ...INITIAL_BODY_PROFILE,
    ...extra,
    height: bp.heightCm || bp.height || INITIAL_BODY_PROFILE.height,
    weight: bp.weightKg || bp.weight || INITIAL_BODY_PROFILE.weight,
    bodyType: (bp.bodyType as BodyShape) || INITIAL_BODY_PROFILE.bodyType,
    shouldersCm: bp.shoulderCm || bp.shouldersCm || INITIAL_BODY_PROFILE.shouldersCm,
    chestCm: bp.chestCm || INITIAL_BODY_PROFILE.chestCm,
    bicepsCm: bp.bicepsCm || INITIAL_BODY_PROFILE.bicepsCm,
    wristCm: bp.wristCm || INITIAL_BODY_PROFILE.wristCm,
    waistCm: bp.waistCm || INITIAL_BODY_PROFILE.waistCm,
    hipsCm: bp.hipsCm || INITIAL_BODY_PROFILE.hipsCm,
    inseamCm: bp.inseamCm || INITIAL_BODY_PROFILE.inseamCm,
    modelPreset: (bp.modelPreset as ModelPresetType) || INITIAL_BODY_PROFILE.modelPreset,
    appearance: {
      ...INITIAL_BODY_PROFILE.appearance,
      ...(extra.appearance || {}),
      skinTone: (bp.skinTone as SkinToneKey) || INITIAL_BODY_PROFILE.appearance.skinTone,
      faceShape: (bp.faceStructure as FaceShape) || INITIAL_BODY_PROFILE.appearance.faceShape,
      hairstyle: (bp.hairstyle as HairStyle) || INITIAL_BODY_PROFILE.appearance.hairstyle,
    },
    body3D: {
      ...DEFAULT_BODY_3D_PARAMS,
      ...(extra.body3D || {}),
      heightCm: bp.heightCm || DEFAULT_BODY_3D_PARAMS.heightCm,
      weightKg: bp.weightKg || DEFAULT_BODY_3D_PARAMS.weightKg,
      modelPreset: (bp.modelPreset as ModelPresetType) || DEFAULT_BODY_3D_PARAMS.modelPreset,
    },
    appearance3D: {
      ...DEFAULT_APPEARANCE_3D_PARAMS,
      ...(extra.appearance3D || {}),
      skinTone: (bp.skinTone as SkinToneKey) || DEFAULT_APPEARANCE_3D_PARAMS.skinTone,
      hairstyle: (bp.hairstyle as HairStyle) || DEFAULT_APPEARANCE_3D_PARAMS.hairstyle,
    },
    usualSizes: {
      ...INITIAL_BODY_PROFILE.usualSizes,
      ...(extra.usualSizes || {}),
    },
    updatedAt: bp.updatedAt ? bp.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0],
  };
}

/**
 * modelService manages personal body profile, proportions, and visual appearance options,
 * connected directly to the backend /api/model endpoint.
 */
export const modelService = {
  /**
   * Retrieves the user's current 3D/2D body model profile from backend /api/model.
   */
  getBodyProfile: async (): Promise<BodyProfile> => {
    try {
      const res = await apiFetch<{ bodyProfile: RawBackendBodyProfile }>('/api/model');
      if (res.ok && res.data?.bodyProfile) {
        const mapped = mapBackendToFrontendModel(res.data.bodyProfile);
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(MODEL_PROFILE_STORAGE_KEY, JSON.stringify(mapped));
          } catch (e) {
            console.warn('Error saving model profile to storage:', e);
          }
        }
        return mapped;
      }
    } catch (e) {
      console.warn('Backend /api/model get failed, using local fallback:', e);
    }

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
   * Saves or updates the body profile on backend /api/model.
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

    try {
      await apiFetch('/api/model', {
        method: 'PUT',
        body: JSON.stringify({
          heightCm: updated.height,
          weightKg: updated.weight,
          chestCm: updated.chestCm,
          bicepsCm: updated.bicepsCm,
          wristCm: updated.wristCm,
          shoulderCm: updated.shouldersCm,
          waistCm: updated.waistCm,
          hipsCm: updated.hipsCm,
          inseamCm: updated.inseamCm,
          bodyType: updated.bodyType,
          skinTone: updated.appearance?.skinTone,
          faceStructure: updated.appearance?.faceShape,
          hairstyle: updated.appearance?.hairstyle,
          modelPreset: updated.modelPreset,
          modelParameters: {
            gender: updated.gender,
            unitSystem: updated.unitSystem,
            underbustCm: updated.underbustCm,
            thighCm: updated.thighCm,
            armLengthCm: updated.armLengthCm,
            neckCm: updated.neckCm,
            usualSizes: updated.usualSizes,
            appearance: updated.appearance,
            appearance3D: updated.appearance3D,
            body3D: updated.body3D,
          },
        }),
      });
    } catch (e) {
      console.warn('Backend /api/model update failed, saved locally:', e);
    }

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
