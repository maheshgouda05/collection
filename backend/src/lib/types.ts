export type ClothingCategory =
  | 'dresses'
  | 'tops'
  | 'bottoms'
  | 'outerwear'
  | 'shoes'
  | 'accessories'
  | 'bags';

export type BodyType = 'athletic' | 'slim' | 'regular' | 'curvy' | 'muscular';
export type FaceStructure = 'oval' | 'round' | 'square' | 'heart' | 'diamond';

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  token?: string;
}

export interface Profile {
  id: string;
  fullName: string;
  username: string;
  avatarUrl?: string;
  preferences: {
    theme?: 'light' | 'dark' | 'system';
    favoriteStyles?: string[];
    defaultOccasion?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface WardrobeItem {
  id: string;
  userId: string;
  itemCode: string;
  name: string;
  category: ClothingCategory;
  colour: string;
  colourFamily?: string;
  size: string;
  fabric?: string;
  brand?: string;
  imageUrl: string;
  storagePath?: string;
  price?: number;
  season: string[];
  occasion: string[];
  tags: string[];
  notes?: string;
  isFavourite: boolean;
  timesWorn: number;
  lastWornAt?: string;
  purchaseDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BodyProfile {
  id: string;
  userId: string;
  heightCm: number;
  weightKg: number;
  chestCm: number;
  bicepsCm: number;
  wristCm: number;
  shoulderCm: number;
  waistCm: number;
  hipsCm: number;
  inseamCm: number;
  bodyType: BodyType;
  skinTone: string;
  faceStructure: FaceStructure;
  hairstyle: string;
  hairColor: string;
  selfDescription?: string;
  modelPreset: string;
  modelParameters: Record<string, unknown>;
  updatedAt: string;
}

export interface SavedOutfit {
  id: string;
  userId: string;
  name: string;
  occasion: string;
  itemIds: string[];
  items?: WardrobeItem[];
  matchScore: number;
  explanation: string;
  weatherContext?: {
    tempC: number;
    condition: string;
    city: string;
  };
  stylePreference?: string;
  createdAt: string;
}

export interface ScanRecord {
  id: string;
  userId: string;
  scannedCode: string;
  matchedItemId?: string;
  matchedItem?: WardrobeItem;
  createdAt: string;
}

export interface StylingMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: {
    suggestedItemIds?: string[];
    missingCategories?: string[];
    occasion?: string;
    weatherAdvice?: string;
    suggestedOutfit?: {
      name: string;
      items: WardrobeItem[];
      reason: string;
    };
  };
  createdAt: string;
}

export interface StylingConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages?: StylingMessage[];
}

export interface WeatherInfo {
  city: string;
  tempC: number;
  condition: string;
  humidity: number;
  windKph: number;
  icon: string;
  advice: string;
  forecast: Array<{
    day: string;
    tempC: number;
    condition: string;
  }>;
}

export interface ShoppingCheckResult {
  candidate: {
    name: string;
    category: ClothingCategory;
    colour: string;
    brand?: string;
    fabric?: string;
    price?: number;
    imageUrl?: string;
  };
  verdict: 'Buy with confidence' | 'Consider alternative' | 'Skip - Redundant item';
  score: number;
  similarOwnedItems: WardrobeItem[];
  colourCompatibility: string;
  wardrobeGapFilled: boolean;
  gapAnalysis: string;
  recommendationReason: string;
  stylingTipsWithWardrobe: string[];
}

export interface TryOnResult {
  garmentId?: string;
  garmentName: string;
  category: ClothingCategory;
  fitVerdict: 'Flattering fit' | 'Slightly tight' | 'Relaxed fit' | 'Tailoring suggested';
  fitScore: number;
  chestFit: string;
  waistFit: string;
  shoulderFit: string;
  overallAdvice: string;
  disclaimer: string;
}

export interface CollectionStats {
  totalItems: number;
  totalValue: number;
  categoryCounts: Record<ClothingCategory, number>;
  favouriteCount: number;
  mostWornItem?: WardrobeItem;
  recentlyAdded: WardrobeItem[];
}
