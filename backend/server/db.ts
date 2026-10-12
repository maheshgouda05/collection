import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getSupabaseAdmin, isSupabaseConfigured } from '../src/lib/supabase.ts';
import type { 
  WardrobeItem, 
  BodyProfile, 
  SavedOutfit, 
  ScanRecord, 
  StylingConversation, 
  StylingMessage,
  Profile
} from '../src/lib/types.ts';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// In-memory / persistent file database schema
interface LocalDatabase {
  users: Array<{
    id: string;
    email: string;
    username: string;
    passwordHash: string;
    fullName: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
  }>;
  profiles: Array<Profile>;
  wardrobe_items: Array<WardrobeItem>;
  body_profiles: Array<BodyProfile>;
  saved_outfits: Array<SavedOutfit>;
  scan_records: Array<ScanRecord>;
  styling_conversations: Array<StylingConversation>;
  styling_messages: Array<StylingMessage>;
  sessions: Record<string, { userId: string; expiresAt: number }>;
}

import { 
  SEED_USER, 
  SEED_PROFILE, 
  SEED_BODY_PROFILE, 
  SEED_WARDROBE_ITEMS, 
  DEMO_SESSION_TOKEN, 
  DEMO_USER_ID 
} from './seed.ts';

const defaultDb: LocalDatabase = {
  users: [SEED_USER],
  profiles: [SEED_PROFILE],
  wardrobe_items: [...SEED_WARDROBE_ITEMS],
  body_profiles: [SEED_BODY_PROFILE],
  saved_outfits: [],
  scan_records: [],
  styling_conversations: [],
  styling_messages: [],
  sessions: {
    [DEMO_SESSION_TOKEN]: {
      userId: DEMO_USER_ID,
      expiresAt: 253402300799000,
    },
  },
};

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const uploadsDir = path.join(DATA_DIR, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
}

export function loadDb(): LocalDatabase {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    saveDb(defaultDb);
    return defaultDb;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw);
    const users = Array.isArray(data.users) && data.users.length > 0 ? data.users : defaultDb.users;
    const wardrobe_items = Array.isArray(data.wardrobe_items) && data.wardrobe_items.length > 0 ? data.wardrobe_items : defaultDb.wardrobe_items;
    const profiles = Array.isArray(data.profiles) && data.profiles.length > 0 ? data.profiles : defaultDb.profiles;
    const body_profiles = Array.isArray(data.body_profiles) && data.body_profiles.length > 0 ? data.body_profiles : defaultDb.body_profiles;

    return {
      ...defaultDb,
      ...data,
      users,
      wardrobe_items,
      profiles,
      body_profiles,
      sessions: {
        ...defaultDb.sessions,
        ...(data.sessions || {}),
      },
    };
  } catch (err) {
    console.error('Error reading database file, resetting to default:', err);
    saveDb(defaultDb);
    return defaultDb;
  }
}

export function saveDb(db: LocalDatabase): void {
  ensureDataDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'salt_cia_wardroom').digest('hex');
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generateItemCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const prefix = 'CIA';
  const randomLetters = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomLetters}${randomDigits}`;
}

export const dbService = {
  // Session & Auth
  createSession(userId: string): string {
    const token = generateToken();
    const db = loadDb();
    // 30 days expiration
    db.sessions[token] = {
      userId,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };
    saveDb(db);
    return token;
  },

  getUserByToken(token?: string): { id: string; email: string; username: string; fullName: string; avatarUrl?: string } | null {
    if (!token) return null;
    const db = loadDb();
    const session = db.sessions[token];
    if (!session) return null;
    if (session.expiresAt < Date.now()) {
      delete db.sessions[token];
      saveDb(db);
      return null;
    }
    const user = db.users.find(u => u.id === session.userId);
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
    };
  },

  deleteSession(token: string): void {
    const db = loadDb();
    if (db.sessions[token]) {
      delete db.sessions[token];
      saveDb(db);
    }
  },

  // Profiles
  getProfile(userId: string): Profile | null {
    const db = loadDb();
    const profile = db.profiles.find(p => p.id === userId);
    if (profile) return profile;
    const user = db.users.find(u => u.id === userId);
    if (user) {
      const newProfile: Profile = {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        avatarUrl: user.avatarUrl,
        preferences: { theme: 'system', favoriteStyles: ['casual'], defaultOccasion: 'casual' },
        createdAt: user.createdAt,
        updatedAt: new Date().toISOString(),
      };
      db.profiles.push(newProfile);
      saveDb(db);
      return newProfile;
    }
    return null;
  },

  updateProfile(userId: string, data: Partial<Profile>): Profile | null {
    const db = loadDb();
    let index = db.profiles.findIndex(p => p.id === userId || (p as unknown as { userId: string }).userId === userId);
    if (index === -1) {
      const ensured = this.getProfile(userId);
      if (!ensured) return null;
      const reloadedDb = loadDb();
      index = reloadedDb.profiles.findIndex(p => p.id === userId || (p as unknown as { userId: string }).userId === userId);
      if (index === -1) return null;
    }
    const targetDb = loadDb();
    const updated: Profile = {
      ...targetDb.profiles[index],
      ...data,
      id: userId,
      updatedAt: new Date().toISOString(),
    };
    targetDb.profiles[index] = updated;
    // sync user table
    const uIndex = targetDb.users.findIndex(u => u.id === userId);
    if (uIndex !== -1) {
      if (data.fullName) targetDb.users[uIndex].fullName = data.fullName;
      if (data.username) targetDb.users[uIndex].username = data.username;
      if (data.avatarUrl !== undefined) targetDb.users[uIndex].avatarUrl = data.avatarUrl;
    }
    saveDb(targetDb);
    return updated;
  },

  // Body Profile
  getBodyProfile(userId: string): BodyProfile {
    const db = loadDb();
    let bp = db.body_profiles.find(b => b.userId === userId);
    if (!bp) {
      bp = {
        id: crypto.randomUUID(),
        userId,
        heightCm: 170,
        weightKg: 65,
        chestCm: 92,
        bicepsCm: 30,
        wristCm: 16.5,
        shoulderCm: 44,
        waistCm: 78,
        hipsCm: 96,
        inseamCm: 76,
        bodyType: 'regular',
        skinTone: '#f5c6a5',
        faceStructure: 'oval',
        hairstyle: 'short_wavy',
        hairColor: '#2d1d13',
        selfDescription: 'Contemporary versatile style',
        modelPreset: 'default',
        modelParameters: {},
        updatedAt: new Date().toISOString(),
      };
      db.body_profiles.push(bp);
      saveDb(db);
    }
    return bp;
  },

  updateBodyProfile(userId: string, data: Partial<BodyProfile>): BodyProfile {
    const db = loadDb();
    const index = db.body_profiles.findIndex(b => b.userId === userId);
    const now = new Date().toISOString();
    if (index === -1) {
      const newBp: BodyProfile = {
        id: crypto.randomUUID(),
        userId,
        heightCm: data.heightCm ?? 170,
        weightKg: data.weightKg ?? 65,
        chestCm: data.chestCm ?? 92,
        bicepsCm: data.bicepsCm ?? 30,
        wristCm: data.wristCm ?? 16.5,
        shoulderCm: data.shoulderCm ?? 44,
        waistCm: data.waistCm ?? 78,
        hipsCm: data.hipsCm ?? 96,
        inseamCm: data.inseamCm ?? 76,
        bodyType: data.bodyType ?? 'regular',
        skinTone: data.skinTone ?? '#f5c6a5',
        faceStructure: data.faceStructure ?? 'oval',
        hairstyle: data.hairstyle ?? 'short_wavy',
        hairColor: data.hairColor ?? '#2d1d13',
        selfDescription: data.selfDescription ?? '',
        modelPreset: data.modelPreset ?? 'default',
        modelParameters: data.modelParameters ?? {},
        updatedAt: now,
      };
      db.body_profiles.push(newBp);
      saveDb(db);
      return newBp;
    }
    const updated: BodyProfile = {
      ...db.body_profiles[index],
      ...data,
      userId,
      updatedAt: now,
    };
    db.body_profiles[index] = updated;
    saveDb(db);
    return updated;
  },

  // Wardrobe Items (RLS strictly enforced: only returns items owned by userId)
  getWardrobeItems(userId: string): WardrobeItem[] {
    const db = loadDb();
    return db.wardrobe_items.filter(item => item.userId === userId);
  },

  getWardrobeItemById(userId: string, itemId: string): WardrobeItem | null {
    const db = loadDb();
    const item = db.wardrobe_items.find(i => i.id === itemId && i.userId === userId);
    return item || null;
  },

  findItemByCode(userId: string, code: string): WardrobeItem | null {
    const db = loadDb();
    const normalized = code.trim().toUpperCase();
    const item = db.wardrobe_items.find(
      i => i.userId === userId && (i.itemCode.toUpperCase() === normalized || i.id === code.trim())
    );
    return item || null;
  },

  addWardrobeItem(userId: string, data: Partial<WardrobeItem> & { name: string; category: WardrobeItem['category']; colour: string; size: string; imageUrl: string; itemCode?: string; id?: string }): WardrobeItem {
    const db = loadDb();
    const now = new Date().toISOString();
    const newItem: WardrobeItem = {
      id: data.id || crypto.randomUUID(),
      userId,
      itemCode: data.itemCode || generateItemCode(),
      name: data.name,
      category: data.category,
      colour: data.colour,
      colourFamily: data.colourFamily || data.colour,
      size: data.size,
      fabric: data.fabric || '',
      brand: data.brand || '',
      imageUrl: data.imageUrl,
      storagePath: data.storagePath,
      price: data.price ? Number(data.price) : undefined,
      season: data.season && data.season.length ? data.season : ['all-season'],
      occasion: data.occasion && data.occasion.length ? data.occasion : ['casual'],
      tags: data.tags || [],
      notes: data.notes || '',
      isFavourite: Boolean(data.isFavourite),
      timesWorn: data.timesWorn ? Number(data.timesWorn) : 0,
      lastWornAt: data.lastWornAt,
      purchaseDate: data.purchaseDate,
      createdAt: now,
      updatedAt: now,
    };
    db.wardrobe_items.push(newItem);
    saveDb(db);
    return newItem;
  },

  updateWardrobeItem(userId: string, itemId: string, data: Partial<WardrobeItem>): WardrobeItem | null {
    const db = loadDb();
    const index = db.wardrobe_items.findIndex(i => (i.id === itemId || i.itemCode === itemId) && i.userId === userId);
    if (index === -1) return null;
    const existing = db.wardrobe_items[index];
    const updated: WardrobeItem = {
      ...existing,
      ...data,
      id: existing.id,
      userId,
      updatedAt: new Date().toISOString(),
    };
    db.wardrobe_items[index] = updated;
    saveDb(db);
    return updated;
  },

  deleteWardrobeItem(userId: string, itemId: string): boolean {
    const db = loadDb();
    const initialLen = db.wardrobe_items.length;
    db.wardrobe_items = db.wardrobe_items.filter(i => !((i.id === itemId || i.itemCode === itemId) && i.userId === userId));
    if (db.wardrobe_items.length < initialLen) {
      saveDb(db);
      return true;
    }
    return false;
  },

  toggleFavourite(userId: string, itemId: string): WardrobeItem | null {
    const db = loadDb();
    const item = db.wardrobe_items.find(i => (i.id === itemId || i.itemCode === itemId) && i.userId === userId);
    if (!item) return null;
    item.isFavourite = !item.isFavourite;
    item.updatedAt = new Date().toISOString();
    saveDb(db);
    return item;
  },

  recordItemWorn(userId: string, itemId: string): WardrobeItem | null {
    const db = loadDb();
    const item = db.wardrobe_items.find(i => (i.id === itemId || i.itemCode === itemId) && i.userId === userId);
    if (!item) return null;
    item.timesWorn = (item.timesWorn || 0) + 1;
    item.lastWornAt = new Date().toISOString();
    item.updatedAt = new Date().toISOString();
    saveDb(db);
    return item;
  },

  // Saved Outfits
  getSavedOutfits(userId: string): SavedOutfit[] {
    const db = loadDb();
    const outfits = db.saved_outfits.filter(o => o.userId === userId);
    // Enrich with item details
    return outfits.map(o => ({
      ...o,
      items: db.wardrobe_items.filter(i => o.itemIds.includes(i.id) && i.userId === userId),
    }));
  },

  saveOutfit(userId: string, data: Omit<SavedOutfit, 'id' | 'userId' | 'createdAt'>): SavedOutfit {
    const db = loadDb();
    const newOutfit: SavedOutfit = {
      id: crypto.randomUUID(),
      userId,
      name: data.name,
      occasion: data.occasion,
      itemIds: data.itemIds,
      matchScore: data.matchScore || 85,
      explanation: data.explanation || '',
      weatherContext: data.weatherContext,
      stylePreference: data.stylePreference,
      createdAt: new Date().toISOString(),
    };
    db.saved_outfits.push(newOutfit);
    saveDb(db);
    return {
      ...newOutfit,
      items: db.wardrobe_items.filter(i => newOutfit.itemIds.includes(i.id) && i.userId === userId),
    };
  },

  deleteSavedOutfit(userId: string, outfitId: string): boolean {
    const db = loadDb();
    const initialLen = db.saved_outfits.length;
    db.saved_outfits = db.saved_outfits.filter(o => !(o.id === outfitId && o.userId === userId));
    if (db.saved_outfits.length < initialLen) {
      saveDb(db);
      return true;
    }
    return false;
  },

  // Scan Records
  recordScan(userId: string, scannedCode: string, matchedItemId?: string): ScanRecord {
    const db = loadDb();
    const rec: ScanRecord = {
      id: crypto.randomUUID(),
      userId,
      scannedCode,
      matchedItemId,
      createdAt: new Date().toISOString(),
    };
    db.scan_records.push(rec);
    saveDb(db);
    return rec;
  },

  // AI Styling Conversations & Messages
  getConversations(userId: string): StylingConversation[] {
    const db = loadDb();
    return db.styling_conversations.filter(c => c.userId === userId);
  },

  getConversationWithMessages(userId: string, conversationId: string): StylingConversation | null {
    const db = loadDb();
    const conv = db.styling_conversations.find(c => c.id === conversationId && c.userId === userId);
    if (!conv) return null;
    const messages = db.styling_messages.filter(m => m.conversationId === conversationId);
    return {
      ...conv,
      messages,
    };
  },

  createConversation(userId: string, title?: string): StylingConversation {
    const db = loadDb();
    const now = new Date().toISOString();
    const conv: StylingConversation = {
      id: crypto.randomUUID(),
      userId,
      title: title || 'Wardrobe Stylist Chat',
      createdAt: now,
      updatedAt: now,
      messages: [],
    };
    db.styling_conversations.push(conv);
    saveDb(db);
    return conv;
  },

  addMessage(conversationId: string, role: 'user' | 'assistant' | 'system', content: string, metadata?: Record<string, unknown>): StylingMessage {
    const db = loadDb();
    const msg: StylingMessage = {
      id: crypto.randomUUID(),
      conversationId,
      role,
      content,
      metadata,
      createdAt: new Date().toISOString(),
    };
    db.styling_messages.push(msg);
    const conv = db.styling_conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.updatedAt = new Date().toISOString();
    }
    saveDb(db);
    return msg;
  },
};
