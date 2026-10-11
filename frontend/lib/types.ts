export type Category =
  | 'Tops'
  | 'Bottoms'
  | 'Dresses'
  | 'Outerwear'
  | 'Footwear'
  | 'Bags'
  | 'Accessories'
  | 'Jewellery'
  | string; // Support custom category

export type Occasion =
  | 'College'
  | 'Office'
  | 'Casual day'
  | 'Party'
  | 'Travel'
  | 'Wedding or special occasion'
  | 'Weekend brunch'
  | 'Other';

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'All Season';

export interface WardrobeItem {
  id: string;
  name: string;
  category: Category;
  subCategory?: string;
  colour: string;
  colorFamily: string; // 'white', 'black', 'blue', 'navy', 'cream', 'brown', 'green', 'beige', 'grey', 'red', 'other'
  size: string;
  fabric: string;
  brand?: string;
  price?: number;
  purchaseDate?: string;
  imageUrl: string;
  notes?: string;
  isFavorite: boolean;
  tags: string[];
  timesWorn: number;
  lastWorn?: string;
  seasons: Season[];
  condition?: 'New' | 'Like New' | 'Good' | 'Vintage';
}

export interface Outfit {
  id: string;
  name: string;
  occasion: Occasion;
  stylePersona: string;
  topItem?: WardrobeItem;
  bottomItem?: WardrobeItem;
  dressItem?: WardrobeItem;
  outerwearItem?: WardrobeItem;
  footwearItem?: WardrobeItem;
  bagItem?: WardrobeItem;
  accessoryItem?: WardrobeItem;
  matchScore: number;
  matchReason: string;
  createdAt: string;
  weatherFit?: string;
  occasionSuitability?: string;
  missingItems?: string[];
  suggestions?: string[];
}

export interface ShoppingComparisonResult {
  shoppingItem: {
    name: string;
    category: Category;
    colour: string;
    brand?: string;
    price?: number;
    fabric?: string;
    imageUrl?: string;
    storeName?: string;
  };
  exactDuplicate?: WardrobeItem;
  similarItems: WardrobeItem[];
  matchingPairItems: WardrobeItem[];
  potentialOutfitsCount: number;
  wardrobeGapFilled: boolean;
  verdict: 'Do Not Buy (High Duplication)' | 'Consider (Moderate Need)' | 'Great Investment (Fills Wardrobe Gap)';
  verdictScore: number; // 0 - 100
  verdictReason: string;
  shoppingAdvice: string;
  complementaryColours: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  stylePersona: string;
  favouriteColours: string[];
  favouriteBrands: string[];
  sizes: {
    tops: string;
    bottoms: string;
    footwear: string;
    outerwear: string;
  };
  fitPreference: 'Tailored' | 'Relaxed' | 'Oversized' | 'Regular';
  measurements?: {
    heightCm?: number;
    weightKg?: number;
    chestCm?: number;
    waistCm?: number;
    hipsCm?: number;
  };
  skinTone?: string;
  location: string;
}

export type BodyShape =
  | 'Hourglass'
  | 'Rectangle'
  | 'Inverted Triangle'
  | 'Pear'
  | 'Athletic'
  | 'Oval';

export type FaceShape = 'Oval' | 'Round' | 'Square' | 'Heart' | 'Diamond';
export type HairStyle = 'Short Textured' | 'Bob Cut' | 'Long Wavy' | 'Sleek Bun' | 'Curly Afro' | 'Buzz Cut';
export type HairColour = 'Espresso Black' | 'Chocolate Brown' | 'Honey Blonde' | 'Platinum' | 'Auburn Red' | 'Silver Grey';
export type SkinToneKey = 'Fair' | 'Light Warm' | 'Medium Golden' | 'Olive' | 'Rich Deep' | 'Ebony';

export type FacialHairOption = 'None' | 'Stubble' | 'Trimmed Beard' | 'Full Beard' | 'Mustache';
export type EyeColorOption = 'Dark Brown' | 'Hazel' | 'Green' | 'Blue' | 'Grey' | 'Amber';
export type PoseOption = 'apose' | 'stand' | 'relaxed';
export type ViewModeOption = 'front' | 'side' | 'back' | 'free' | 'reference_sheet';

export interface Body3DParams {
  heightCm: number;
  weightKg: number;
  unitSystem: 'metric' | 'imperial';
  genderBlend: number; // 0 = feminine, 50 = neutral, 100 = masculine
  build: number; // 0 to 100 (slim -> average -> heavy)
  muscle: number; // 0 to 100
  bodyFat: number; // 0 to 100
  shoulderWidth: number; // 0 to 100
  chestWidth: number; // 0 to 100
  waistWidth: number; // 0 to 100
  hipWidth: number; // 0 to 100
  neckLength: number; // 0 to 100
  armLength: number; // 0 to 100
  armThickness: number; // 0 to 100
  legLength: number; // 0 to 100
  legThickness: number; // 0 to 100
  // Real tape measurements (optional approximate)
  chestCm?: number;
  waistCm?: number;
  hipsCm?: number;
  shouldersCm?: number;
}

export interface Appearance3DParams {
  displayMode: 'mannequin' | 'coloured';
  skinTone: SkinToneKey;
  customSkinColor?: string;
  faceShape: FaceShape;
  hairstyle: HairStyle;
  hairColour: HairColour;
  customHairColor?: string;
  facialHair: FacialHairOption;
  eyeColor: EyeColorOption;
  facePhotoUrl?: string;
}

export interface BodyProfile {
  height: number; // in cm
  weight: number; // in kg
  unitSystem: 'metric' | 'imperial';
  bodyType: BodyShape | 'Unspecified';
  shouldersCm?: number;
  chestCm?: number;
  waistCm?: number;
  hipsCm?: number;
  usualSizes: {
    tops: string;
    bottoms: string;
    footwear: string;
    outerwear: string;
    dresses?: string;
  };
  appearance: {
    facePhotoUrl?: string;
    faceShape: FaceShape;
    hairstyle: HairStyle;
    hairColour: HairColour;
    skinTone: SkinToneKey;
  };
  body3D?: Body3DParams;
  appearance3D?: Appearance3DParams;
  updatedAt?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatarUrl: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  user: AuthUser | null;
  rememberMe: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  category: Category;
  colour: string;
  brand: string;
  price: number;
  style: string;
  imageUrl: string;
  matchReason: string;
  affiliateUrl: string;
  gapCategory: string;
  inStock?: boolean;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachedItem?: WardrobeItem;
  suggestedAction?: {
    type: 'view_collection' | 'open_matcher' | 'open_model' | 'check_shop';
    label: string;
    href: string;
  };
}

export interface TryOnResult {
  status: 'preview_only';
  disclaimer: string;
  fitNotes: string;
  silhouetteEffect: string;
  recommendedSize: string;
}

export interface ScanRecord {
  id: string;
  timestamp: string;
  imageUrl: string;
  matchedItemId?: string;
  matchedItemName?: string;
  status: 'Matched' | 'Unrecognized';
  confidence: number;
}
