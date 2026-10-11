import { BodyProfile, AuthSession } from '../types';

export const DEFAULT_BODY_3D_PARAMS = {
  heightCm: 174,
  weightKg: 64,
  unitSystem: 'metric' as const,
  genderBlend: 50,
  build: 45,
  muscle: 40,
  bodyFat: 30,
  shoulderWidth: 50,
  chestWidth: 48,
  waistWidth: 38,
  hipWidth: 52,
  neckLength: 50,
  armLength: 50,
  armThickness: 45,
  legLength: 52,
  legThickness: 48,
  shouldersCm: 42,
  chestCm: 90,
  waistCm: 68,
  hipsCm: 96,
};

export const DEFAULT_APPEARANCE_3D_PARAMS = {
  displayMode: 'mannequin' as const,
  skinTone: 'Medium Golden' as const,
  customSkinColor: '#D7A787',
  faceShape: 'Oval' as const,
  hairstyle: 'Long Wavy' as const,
  hairColour: 'Espresso Black' as const,
  customHairColor: '#1C1917',
  facialHair: 'None' as const,
  eyeColor: 'Dark Brown' as const,
  facePhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
};

export const INITIAL_BODY_PROFILE: BodyProfile = {
  height: 174, // cm
  weight: 64, // kg
  unitSystem: 'metric',
  bodyType: 'Hourglass',
  shouldersCm: 42,
  chestCm: 90,
  waistCm: 68,
  hipsCm: 96,
  usualSizes: {
    tops: 'M',
    bottoms: '28 / S-M',
    footwear: '39 EU (8.5 US)',
    outerwear: 'M',
    dresses: 'M',
  },
  appearance: {
    facePhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    faceShape: 'Oval',
    hairstyle: 'Long Wavy',
    hairColour: 'Espresso Black',
    skinTone: 'Medium Golden',
  },
  body3D: DEFAULT_BODY_3D_PARAMS,
  appearance3D: DEFAULT_APPEARANCE_3D_PARAMS,
  updatedAt: '2026-10-10',
};

export const INITIAL_AUTH_SESSION: AuthSession = {
  isAuthenticated: true, // Default to demo session for instant exploration
  user: {
    id: 'usr_demo_01',
    name: 'Elena Rostova',
    email: 'elena@collectionitall.com',
    username: 'elena_style',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  },
  rememberMe: true,
};
