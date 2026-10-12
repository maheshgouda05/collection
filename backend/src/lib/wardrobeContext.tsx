import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, RegisterPayload, LoginPayload } from './services/authService.ts';
import { collectionService, WardrobeFilterParams } from './services/collectionService.ts';
import { modelService } from './services/modelService.ts';
import { matcherService } from './services/matcherService.ts';
import { weatherService } from './services/weatherService.ts';
import type { 
  User, 
  Profile, 
  BodyProfile, 
  WardrobeItem, 
  CollectionStats, 
  SavedOutfit, 
  WeatherInfo 
} from './types.ts';

interface WardrobeContextType {
  user: User | null;
  profile: Profile | null;
  bodyProfile: BodyProfile | null;
  items: WardrobeItem[];
  stats: CollectionStats | null;
  savedOutfits: SavedOutfit[];
  weather: WeatherInfo | null;
  isLoading: boolean;
  error: string | null;

  // Auth
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;

  // Collection
  refreshItems: (params?: WardrobeFilterParams) => Promise<void>;
  addItem: (data: Partial<WardrobeItem>) => Promise<WardrobeItem>;
  updateItem: (id: string, data: Partial<WardrobeItem>) => Promise<WardrobeItem>;
  deleteItem: (id: string) => Promise<void>;
  toggleFavourite: (id: string) => Promise<void>;
  recordWorn: (id: string) => Promise<void>;

  // Model
  updateBodyProfile: (data: Partial<BodyProfile>) => Promise<void>;

  // Outfits
  saveOutfit: (data: Parameters<typeof matcherService.saveOutfit>[0]) => Promise<SavedOutfit>;
  deleteOutfit: (id: string) => Promise<void>;

  // Weather
  fetchWeather: (city?: string) => Promise<void>;
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

export const WardrobeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bodyProfile, setBodyProfile] = useState<BodyProfile | null>(null);
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [stats, setStats] = useState<CollectionStats | null>(null);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string = 'New York') => {
    try {
      const data = await weatherService.getWeather(city);
      setWeather(data);
    } catch (err) {
      console.warn('Weather fetch warning:', err);
    }
  }, []);

  const refreshItems = useCallback(async (params?: WardrobeFilterParams) => {
    try {
      const [itemList, statsData, outfits] = await Promise.all([
        collectionService.getItems(params),
        collectionService.getStats().catch(() => null),
        matcherService.getSavedOutfits().catch(() => []),
      ]);
      setItems(itemList);
      if (statsData) setStats(statsData);
      setSavedOutfits(outfits);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch wardrobe data');
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        const [prof, bp] = await Promise.all([
          authService.getProfile(),
          modelService.getBodyProfile(),
        ]);
        setProfile(prof);
        setBodyProfile(bp);
        await refreshItems();
      } else {
        setProfile(null);
        setBodyProfile(null);
        setItems([]);
        setStats(null);
        setSavedOutfits([]);
      }
    } catch (err: any) {
      console.error('Session restoration error:', err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [refreshItems]);

  useEffect(() => {
    refreshUser();
    fetchWeather();
  }, [refreshUser, fetchWeather]);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login(payload);
      setUser(res.user);
      await refreshUser();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.register(payload);
      setUser(res.user);
      await refreshUser();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setProfile(null);
      setBodyProfile(null);
      setItems([]);
      setStats(null);
      setSavedOutfits([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    const updated = await authService.updateProfile(data);
    setProfile(updated);
  };

  const addItem = async (data: Partial<WardrobeItem>): Promise<WardrobeItem> => {
    const newItem = await collectionService.addItem(data);
    await refreshItems();
    return newItem;
  };

  const updateItem = async (id: string, data: Partial<WardrobeItem>): Promise<WardrobeItem> => {
    const updated = await collectionService.updateItem(id, data);
    await refreshItems();
    return updated;
  };

  const deleteItem = async (id: string): Promise<void> => {
    await collectionService.deleteItem(id);
    await refreshItems();
  };

  const toggleFavourite = async (id: string): Promise<void> => {
    await collectionService.toggleFavourite(id);
    await refreshItems();
  };

  const recordWorn = async (id: string): Promise<void> => {
    await collectionService.recordWorn(id);
    await refreshItems();
  };

  const updateBodyProfile = async (data: Partial<BodyProfile>): Promise<void> => {
    const updated = await modelService.updateBodyProfile(data);
    setBodyProfile(updated);
  };

  const saveOutfit = async (data: Parameters<typeof matcherService.saveOutfit>[0]): Promise<SavedOutfit> => {
    const saved = await matcherService.saveOutfit(data);
    const outfits = await matcherService.getSavedOutfits();
    setSavedOutfits(outfits);
    return saved;
  };

  const deleteOutfit = async (id: string): Promise<void> => {
    await matcherService.deleteOutfit(id);
    const outfits = await matcherService.getSavedOutfits();
    setSavedOutfits(outfits);
  };

  return (
    <WardrobeContext.Provider
      value={{
        user,
        profile,
        bodyProfile,
        items,
        stats,
        savedOutfits,
        weather,
        isLoading,
        error,
        login,
        register,
        logout,
        refreshUser,
        updateProfile,
        refreshItems,
        addItem,
        updateItem,
        deleteItem,
        toggleFavourite,
        recordWorn,
        updateBodyProfile,
        saveOutfit,
        deleteOutfit,
        fetchWeather,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = (): WardrobeContextType => {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
};
