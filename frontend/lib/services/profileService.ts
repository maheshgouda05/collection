import { UserProfile } from '../types';
import { INITIAL_USER_PROFILE } from '../mockData';
import { apiFetch } from './apiClient';

interface RawBackendProfile {
  id?: string;
  fullName?: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  aesthetic?: string;
  preferences?: {
    theme?: string;
    favoriteStyles?: string[];
    defaultOccasion?: string;
    sizes?: {
      tops?: string;
      bottoms?: string;
      footwear?: string;
      outerwear?: string;
    };
    fitPreference?: 'Tailored' | 'Relaxed' | 'Oversized' | 'Regular';
    location?: string;
    favouriteColours?: string[];
    favouriteBrands?: string[];
  };
}

function mapBackendProfileToFrontend(raw: RawBackendProfile, fallbackEmail?: string): UserProfile {
  return {
    name: raw.fullName || INITIAL_USER_PROFILE.name,
    email: fallbackEmail || INITIAL_USER_PROFILE.email,
    avatarUrl: raw.avatarUrl || INITIAL_USER_PROFILE.avatarUrl,
    stylePersona: raw.aesthetic || raw.preferences?.favoriteStyles?.join(', ') || INITIAL_USER_PROFILE.stylePersona,
    favouriteColours: raw.preferences?.favouriteColours || INITIAL_USER_PROFILE.favouriteColours,
    favouriteBrands: raw.preferences?.favouriteBrands || INITIAL_USER_PROFILE.favouriteBrands,
    sizes: {
      tops: raw.preferences?.sizes?.tops || INITIAL_USER_PROFILE.sizes.tops,
      bottoms: raw.preferences?.sizes?.bottoms || INITIAL_USER_PROFILE.sizes.bottoms,
      footwear: raw.preferences?.sizes?.footwear || INITIAL_USER_PROFILE.sizes.footwear,
      outerwear: raw.preferences?.sizes?.outerwear || INITIAL_USER_PROFILE.sizes.outerwear,
    },
    fitPreference: raw.preferences?.fitPreference || INITIAL_USER_PROFILE.fitPreference,
    location: raw.preferences?.location || INITIAL_USER_PROFILE.location,
  };
}

export const profileService = {
  /**
   * Fetch current user profile from backend /api/profile
   */
  getProfile: async (userEmail?: string): Promise<UserProfile | null> => {
    try {
      const res = await apiFetch<{ profile: RawBackendProfile }>('/api/profile');
      if (res.ok && res.data?.profile) {
        return mapBackendProfileToFrontend(res.data.profile, userEmail);
      }
    } catch (err) {
      console.warn('Failed to load profile from backend:', err);
    }
    return null;
  },

  /**
   * Save user profile changes to backend /api/profile
   */
  updateProfile: async (
    profile: Partial<UserProfile>
  ): Promise<{ success: boolean; profile?: UserProfile; message?: string; error?: string }> => {
    try {
      const payload: RawBackendProfile = {
        fullName: profile.name,
        avatarUrl: profile.avatarUrl,
        aesthetic: profile.stylePersona,
        preferences: {
          sizes: profile.sizes,
          fitPreference: profile.fitPreference,
          location: profile.location,
          favouriteColours: profile.favouriteColours,
          favouriteBrands: profile.favouriteBrands,
        },
      };

      const res = await apiFetch<{ profile: RawBackendProfile; message?: string }>('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (res.ok && res.data) {
        const updated = mapBackendProfileToFrontend(res.data.profile, profile.email);
        return {
          success: true,
          profile: updated,
          message: res.data.message || 'Profile updated successfully',
        };
      }

      return {
        success: false,
        error: res.error || 'Failed to update profile',
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Network error saving profile';
      return {
        success: false,
        error: errorMsg,
      };
    }
  },
};
