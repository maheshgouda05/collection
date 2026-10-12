'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  WardrobeItem,
  Outfit,
  UserProfile,
  ShoppingComparisonResult,
  Category,
  Occasion,
  ScanRecord,
  BodyProfile,
  AuthSession,
} from './types';
import { INITIAL_WARDROBE_ITEMS, INITIAL_USER_PROFILE } from './mockData';
import { INITIAL_BODY_PROFILE, INITIAL_AUTH_SESSION } from './mock/bodyProfile';
import { authService } from './services/authService';
import { modelService } from './services/modelService';
import { matcherService } from './services/matcherService';
import { collectionService } from './services/collectionService';
import { profileService } from './services/profileService';

interface WardrobeContextType {
  items: WardrobeItem[];
  savedOutfits: Outfit[];
  userProfile: UserProfile;
  bodyProfile: BodyProfile;
  authSession: AuthSession;
  recentScans: ScanRecord[];
  isLoaded: boolean;
  activeToast: string | null;
  showToast: (msg: string) => void;
  // Auth operations
  login: (emailOrUsername: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  // Body Profile
  updateBodyProfile: (profile: Partial<BodyProfile>) => Promise<void>;
  // Collection operations
  addItem: (item: Partial<WardrobeItem> & { name?: string; imageUrl?: string; category?: Category }) => WardrobeItem;
  updateItem: (item: WardrobeItem) => void;
  deleteItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  // Outfits
  saveOutfit: (outfit: Outfit) => void;
  deleteOutfit: (id: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<{ success: boolean; profile?: UserProfile; message?: string; error?: string } | void>;
  addScanRecord: (record: Omit<ScanRecord, 'id' | 'timestamp'>) => ScanRecord;
  checkShoppingItem: (candidate: {
    name: string;
    category: Category;
    colour: string;
    brand?: string;
    price?: number;
    fabric?: string;
    imageUrl?: string;
    storeName?: string;
  }) => ShoppingComparisonResult;
  generateOutfitsForOccasion: (occasion: Occasion, weatherFilter?: string, stylePreference?: string) => Outfit[];
  resetToDefaultData: () => void;
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

const LOCAL_STORAGE_ITEMS_KEY = 'collection_it_all_items_v2';
const LOCAL_STORAGE_OUTFITS_KEY = 'collection_it_all_outfits_v2';
const LOCAL_STORAGE_PROFILE_KEY = 'collection_it_all_profile_v2';
const LOCAL_STORAGE_BODY_KEY = 'collection_it_all_body_model_v2';
const LOCAL_STORAGE_AUTH_KEY = 'collection_it_all_auth_session_v2';
const LOCAL_STORAGE_SCANS_KEY = 'collection_it_all_scans_v2';

export function WardrobeProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WardrobeItem[]>(INITIAL_WARDROBE_ITEMS);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [bodyProfile, setBodyProfile] = useState<BodyProfile>(INITIAL_BODY_PROFILE);
  const [authSession, setAuthSession] = useState<AuthSession>(INITIAL_AUTH_SESSION);
  const [recentScans, setRecentScans] = useState<ScanRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Hydrate from localStorage once on client mount to prevent SSR hydration mismatches
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY);
      if (storedItems) setItems(JSON.parse(storedItems));

      const storedOutfits = localStorage.getItem(LOCAL_STORAGE_OUTFITS_KEY);
      if (storedOutfits) setSavedOutfits(JSON.parse(storedOutfits));

      const storedProfile = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
      if (storedProfile) setUserProfile(JSON.parse(storedProfile));

      const storedBody = localStorage.getItem(LOCAL_STORAGE_BODY_KEY);
      if (storedBody) setBodyProfile(JSON.parse(storedBody));

      const storedAuth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
      if (storedAuth) setAuthSession(JSON.parse(storedAuth));

      const storedScans = localStorage.getItem(LOCAL_STORAGE_SCANS_KEY);
      if (storedScans) setRecentScans(JSON.parse(storedScans));
    } catch (e) {
      console.warn('LocalStorage hydration error:', e);
    } finally {
      setIsLoaded(true);
    }

    // Live backend synchronization
    collectionService.list().then((serverItems) => {
      if (serverItems && serverItems.length > 0) {
        setItems(serverItems);
      }
    }).catch((e) => console.warn('Server item sync error:', e));

    modelService.getBodyProfile().then((serverModel) => {
      if (serverModel) {
        setBodyProfile(serverModel);
      }
    }).catch((e) => console.warn('Server model sync error:', e));

    matcherService.listFavourites().then((serverLooks) => {
      if (serverLooks && serverLooks.length > 0) {
        setSavedOutfits(serverLooks);
      }
    }).catch((e) => console.warn('Server outfits sync error:', e));

    profileService.getProfile().then((serverProfile) => {
      if (serverProfile) {
        setUserProfile(serverProfile);
      }
    }).catch((e) => console.warn('Server profile sync error:', e));
  }, []);

  const showToast = useCallback((msg: string) => {
    setActiveToast(msg);
    setTimeout(() => {
      setActiveToast((current) => (current === msg ? null : current));
    }, 3500);
  }, []);

  // Save to LocalStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage item save error:', e);
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_OUTFITS_KEY, JSON.stringify(savedOutfits));
    } catch (e) {
      console.warn('LocalStorage outfit save error:', e);
    }
  }, [savedOutfits, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(userProfile));
    } catch (e) {
      console.warn('LocalStorage profile save error:', e);
    }
  }, [userProfile, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_BODY_KEY, JSON.stringify(bodyProfile));
    } catch (e) {
      console.warn('LocalStorage body profile save error:', e);
    }
  }, [bodyProfile, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(authSession));
    } catch (e) {
      console.warn('LocalStorage auth save error:', e);
    }
  }, [authSession, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_SCANS_KEY, JSON.stringify(recentScans));
    } catch (e) {
      console.warn('LocalStorage scans save error:', e);
    }
  }, [recentScans, isLoaded]);

  // Auth Operations
  const login = async (emailOrUsername: string, password: string, rememberMe: boolean = true) => {
    const res = await authService.login(emailOrUsername, password, rememberMe);
    if (res.success && res.session) {
      setAuthSession(res.session);
      setUserProfile((prev) => ({
        ...prev,
        name: res.session!.user?.name || prev.name,
        email: res.session!.user?.email || prev.email,
        avatarUrl: res.session!.user?.avatarUrl || prev.avatarUrl,
      }));
      showToast(`Welcome back, ${res.session.user?.name}!`);
      return { success: true };
    }
    return { success: false, error: res.error || 'Login failed.' };
  };

  const signup = async (fullName: string, email: string, username: string, password: string) => {
    const res = await authService.signup(fullName, email, username, password);
    if (res.success && res.session) {
      setAuthSession(res.session);
      setUserProfile((prev) => ({
        ...prev,
        name: res.session!.user?.name || fullName,
        email: res.session!.user?.email || email,
      }));
      showToast(`Account created! Welcome to Collection It All, ${fullName}.`);
      return { success: true };
    }
    return { success: false, error: res.error || 'Signup failed.' };
  };

  const logout = () => {
    authService.logout();
    setAuthSession({
      isAuthenticated: false,
      user: null,
      rememberMe: false,
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      localStorage.removeItem('collection_it_all_auth_session');
      localStorage.removeItem('collection_it_all_auth_session_v2');
    }
    showToast('You have been signed out.');
  };

  const requestPasswordReset = async (email: string) => {
    const res = await authService.requestPasswordReset(email);
    showToast(res.message);
    return res;
  };

  // Model Operations
  const updateBodyProfile = async (updates: Partial<BodyProfile>) => {
    const updated = await modelService.saveBodyProfile(updates);
    setBodyProfile(updated);
    showToast('Body profile and proportions updated successfully');
  };

  // Collection Operations
  const addItem = (data: Partial<WardrobeItem> & { name?: string; imageUrl?: string; category?: Category }) => {
    const hasPhoto = Boolean(data.imageUrl && data.imageUrl.trim());
    const hasName = Boolean(data.name && data.name.trim());

    if (!hasPhoto && !hasName) {
      throw new Error('Please enter at least an item name or upload a photo.');
    }

    const category = data.category || 'Tops';
    const prefix = typeof category === 'string' ? category.substring(0, 3).toUpperCase() : 'ITM';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const id = `CIA-${prefix}-${randomNum}`;

    const defaultImage =
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80';
    const defaultName = `${category} (Logged ${new Date().toLocaleDateString()})`;

    const colLower = (data.colour || 'Neutral').toLowerCase();
    let derivedColorFamily = data.colorFamily || 'other';
    if (!data.colorFamily) {
      if (colLower.includes('white')) derivedColorFamily = 'white';
      else if (colLower.includes('black')) derivedColorFamily = 'black';
      else if (colLower.includes('blue')) derivedColorFamily = 'blue';
      else if (colLower.includes('navy')) derivedColorFamily = 'navy';
      else if (colLower.includes('beige') || colLower.includes('camel')) derivedColorFamily = 'beige';
      else if (colLower.includes('grey') || colLower.includes('gray')) derivedColorFamily = 'grey';
      else if (colLower.includes('green')) derivedColorFamily = 'green';
      else if (colLower.includes('brown')) derivedColorFamily = 'brown';
    }

    const newItem: WardrobeItem = {
      id,
      name: data.name?.trim() || defaultName,
      category,
      subCategory: data.subCategory || '',
      colour: data.colour || 'Neutral',
      colorFamily: derivedColorFamily,
      size: data.size || 'M',
      fabric: data.fabric || 'Fabric not specified',
      brand: data.brand || undefined,
      price: data.price !== undefined ? data.price : undefined,
      purchaseDate: data.purchaseDate || new Date().toISOString().split('T')[0],
      imageUrl: data.imageUrl?.trim() || defaultImage,
      notes: data.notes || '',
      isFavorite: !!data.isFavorite,
      tags: data.tags && data.tags.length > 0 ? data.tags : ['capsule'],
      timesWorn: 0,
      seasons: data.seasons && data.seasons.length > 0 ? data.seasons : ['All Season'],
      condition: data.condition || 'New',
    };

    setItems((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.name}" to your collection!`);
    collectionService
      .create(newItem)
      .then((serverCreated) => {
        if (serverCreated) {
          setItems((prev) => prev.map((item) => (item.id === newItem.id ? serverCreated : item)));
        }
      })
      .catch((e) => console.warn('Backend item save error:', e));
    return newItem;
  };

  const updateItem = (updated: WardrobeItem) => {
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    showToast(`Updated "${updated.name}"`);
    collectionService.update(updated.id, updated).catch((e) => console.warn('Backend item update error:', e));
  };

  const deleteItem = (id: string) => {
    const itemToDelete = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed "${itemToDelete?.name || 'Item'}" from collection`);
    collectionService.delete(id).catch((e) => console.warn('Backend item delete error:', e));
  };

  const toggleFavorite = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newState = !item.isFavorite;
          showToast(newState ? `Added "${item.name}" to favourites` : `Removed from favourites`);
          return { ...item, isFavorite: newState };
        }
        return item;
      })
    );
    collectionService.toggleFavorite(id).catch((e) => console.warn('Backend toggle error:', e));
  };

  const saveOutfit = (outfit: Outfit) => {
    setSavedOutfits((prev) => {
      if (prev.some((o) => o.id === outfit.id)) {
        showToast('Outfit is already saved in your lookbook!');
        return prev;
      }
      showToast(`Outfit "${outfit.name}" saved to your lookbook!`);
      return [outfit, ...prev];
    });
    matcherService.saveFavourite(outfit).catch((e) => console.warn('Backend outfit save error:', e));
  };

  const deleteOutfit = (id: string) => {
    setSavedOutfits((prev) => prev.filter((o) => o.id !== id));
    showToast('Outfit removed from saved looks');
    matcherService.removeFavourite(id).catch((e) => console.warn('Backend outfit delete error:', e));
  };

  const updateProfile = async (profileUpdate: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profileUpdate }));
    try {
      const res = await profileService.updateProfile(profileUpdate);
      if (res.success && res.profile) {
        setUserProfile(res.profile);
      }
      return res;
    } catch (e) {
      console.warn('Backend updateProfile error:', e);
      return { success: false, error: 'Could not update profile' };
    }
  };

  const addScanRecord = (record: Omit<ScanRecord, 'id' | 'timestamp'>) => {
    const newRecord: ScanRecord = {
      ...record,
      id: `scan-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setRecentScans((prev) => [newRecord, ...prev.slice(0, 9)]);
    return newRecord;
  };

  const resetToDefaultData = () => {
    setItems(INITIAL_WARDROBE_ITEMS);
    setUserProfile(INITIAL_USER_PROFILE);
    setBodyProfile(INITIAL_BODY_PROFILE);
    setSavedOutfits([]);
    setRecentScans([]);
    localStorage.removeItem(LOCAL_STORAGE_ITEMS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_OUTFITS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_BODY_KEY);
    localStorage.removeItem(LOCAL_STORAGE_SCANS_KEY);
    showToast('Collection reset to curated luxury demo wardrobe');
  };

  // Flagship Shopping Match Algorithm
  const checkShoppingItem = (candidate: {
    name: string;
    category: Category;
    colour: string;
    brand?: string;
    price?: number;
    fabric?: string;
    imageUrl?: string;
    storeName?: string;
  }): ShoppingComparisonResult => {
    const nameLower = candidate.name.toLowerCase();
    const colLower = candidate.colour.toLowerCase();
    const cat = candidate.category;

    const sameCategoryItems = items.filter((item) => item.category === cat);

    const scoredSimilar = sameCategoryItems
      .map((item) => {
        let score = 25;
        const itemName = item.name.toLowerCase();
        const itemCol = item.colour.toLowerCase();
        const itemFamily = item.colorFamily.toLowerCase();

        const keywords = nameLower.split(/\s+/).filter((w) => w.length > 3);
        for (const kw of keywords) {
          if (itemName.includes(kw)) score += 30;
        }

        if (colLower.includes(itemFamily) || itemCol.includes(colLower) || colLower.includes(itemCol)) {
          score += 35;
        }

        if (item.subCategory && nameLower.includes(item.subCategory.toLowerCase())) {
          score += 25;
        }

        return { item, score: Math.min(score, 100) };
      })
      .filter((s) => s.score >= 50)
      .sort((a, b) => b.score - a.score);

    const exactDuplicate = scoredSimilar.find((s) => s.score >= 80)?.item;
    const similarItems = scoredSimilar.map((s) => s.item).slice(0, 4);

    let matchingPairItems: WardrobeItem[] = [];
    if (cat === 'Tops') {
      matchingPairItems = items.filter((i) => i.category === 'Bottoms' || i.category === 'Outerwear' || i.category === 'Footwear');
    } else if (cat === 'Bottoms') {
      matchingPairItems = items.filter((i) => i.category === 'Tops' || i.category === 'Footwear' || i.category === 'Outerwear');
    } else if (cat === 'Outerwear') {
      matchingPairItems = items.filter((i) => i.category === 'Tops' || i.category === 'Bottoms' || i.category === 'Footwear');
    } else if (cat === 'Footwear') {
      matchingPairItems = items.filter((i) => i.category === 'Bottoms' || i.category === 'Dresses' || i.category === 'Outerwear');
    } else if (cat === 'Dresses') {
      matchingPairItems = items.filter((i) => i.category === 'Outerwear' || i.category === 'Footwear' || i.category === 'Bags');
    } else {
      matchingPairItems = items.filter((i) => i.category === 'Tops' || i.category === 'Dresses' || i.category === 'Outerwear');
    }

    matchingPairItems = matchingPairItems
      .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0))
      .slice(0, 6);

    const totalInCat = sameCategoryItems.length;
    const isGap = totalInCat <= 1;

    let verdict: ShoppingComparisonResult['verdict'];
    let verdictScore: number;
    let verdictReason: string;
    let shoppingAdvice: string;

    if (exactDuplicate) {
      verdict = 'Do Not Buy (High Duplication)';
      verdictScore = 22;
      verdictReason = `You already own "${exactDuplicate.name}" in ${exactDuplicate.colour} by ${exactDuplicate.brand || 'your collection'}. Buying this would be ~90% duplicate.`;
      shoppingAdvice = `You already have this aesthetic covered in your closet! Instead of spending ${candidate.price ? `$${candidate.price}` : 'money'} on a duplicate, pair your existing ${exactDuplicate.name} with your ${matchingPairItems[0]?.name || 'wardrobe staples'}.`;
    } else if (similarItems.length >= 2) {
      verdict = 'Consider (Moderate Need)';
      verdictScore = 58;
      verdictReason = `You already own ${similarItems.length} items in this category (${similarItems.map((i) => i.name).slice(0, 2).join(' & ')}).`;
      shoppingAdvice = `Only purchase this if the cut, fabric, or weather use-case is significantly different from your existing ${similarItems[0]?.name}.`;
    } else {
      verdict = 'Great Investment (Fills Wardrobe Gap)';
      verdictScore = 92;
      verdictReason = isGap
        ? `Wardrobe Gap Identified: You have very few ${cat} in this style. This piece significantly increases your styling options.`
        : `High Synergy: This item naturally pairs with ${matchingPairItems.length} core pieces you already own.`;
      shoppingAdvice = `Excellent choice! This item immediately unlocks at least ${Math.max(3, matchingPairItems.length - 1)} new complete outfits with items already hanging in your closet.`;
    }

    const complementaryColours = getComplementaryColours(candidate.colour);

    return {
      shoppingItem: candidate,
      exactDuplicate,
      similarItems,
      matchingPairItems,
      potentialOutfitsCount: exactDuplicate ? 1 : Math.min(6, matchingPairItems.length),
      wardrobeGapFilled: isGap,
      verdict,
      verdictScore,
      verdictReason,
      shoppingAdvice,
      complementaryColours,
    };
  };

  // Generate Coordinated Outfits
  const generateOutfitsForOccasion = (
    occasion: Occasion,
    weatherFilter?: string,
    stylePreference?: string
  ): Outfit[] => {
    return matcherService.generateOutfits(items, {
      occasion,
      weatherFilter,
      stylePreference,
    });
  };

  return (
    <WardrobeContext.Provider
      value={{
        items,
        savedOutfits,
        userProfile,
        bodyProfile,
        authSession,
        recentScans,
        isLoaded,
        activeToast,
        showToast,
        login,
        signup,
        logout,
        requestPasswordReset,
        updateBodyProfile,
        addItem,
        updateItem,
        deleteItem,
        toggleFavorite,
        saveOutfit,
        deleteOutfit,
        updateProfile,
        addScanRecord,
        checkShoppingItem,
        generateOutfitsForOccasion,
        resetToDefaultData,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
}

function getComplementaryColours(colorStr: string): string[] {
  const c = colorStr.toLowerCase();
  if (c.includes('blue') || c.includes('navy')) {
    return ['Crisp White', 'Honey Camel', 'Cognac Tan', 'Warm Grey'];
  }
  if (c.includes('white') || c.includes('cream')) {
    return ['Midnight Navy', 'Deep Charcoal', 'Forest Green', 'Chocolate Brown'];
  }
  if (c.includes('black') || c.includes('charcoal')) {
    return ['Ecru White', 'Champagne', 'Camel', 'Emerald Green'];
  }
  if (c.includes('camel') || c.includes('beige') || c.includes('brown')) {
    return ['Midnight Navy', 'Crisp White', 'Light Denim Indigo', 'Black'];
  }
  if (c.includes('green') || c.includes('emerald')) {
    return ['Champagne Ivory', '18k Yellow Gold', 'Jet Black', 'Slate Grey'];
  }
  return ['Neutral Cream', 'Jet Black', 'Crisp White', 'Deep Navy'];
}
