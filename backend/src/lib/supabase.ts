import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for Supabase
const supabaseUrl = typeof process !== 'undefined' && process.env?.SUPABASE_URL 
  ? process.env.SUPABASE_URL 
  : (import.meta as any).env?.VITE_SUPABASE_URL || '';

const supabaseAnonKey = typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY 
  ? process.env.SUPABASE_ANON_KEY 
  : (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

const supabaseServiceRoleKey = typeof process !== 'undefined' && process.env?.SUPABASE_SERVICE_ROLE_KEY 
  ? process.env.SUPABASE_SERVICE_ROLE_KEY 
  : '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project'));
};

let clientInstance: SupabaseClient | null = null;
let adminInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return clientInstance;
};

export const getSupabaseAdmin = (): SupabaseClient | null => {
  if (!isSupabaseConfigured() || !supabaseServiceRoleKey) {
    return null;
  }
  if (!adminInstance) {
    adminInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return adminInstance;
};
