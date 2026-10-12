-- ==============================================================================
-- Collection It All (Ward Room) - Complete Supabase PostgreSQL Schema Migration
-- Migration: 001_initial_schema.sql
-- ==============================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{"theme": "system", "favoriteStyles": ["smart casual", "minimalist"], "defaultOccasion": "casual"}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. WARDROBE ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.wardrobe_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_code TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('dresses', 'tops', 'bottoms', 'outerwear', 'shoes', 'accessories', 'bags')),
  colour TEXT NOT NULL,
  colour_family TEXT,
  size TEXT NOT NULL,
  fabric TEXT,
  brand TEXT,
  image_url TEXT NOT NULL,
  storage_path TEXT,
  price NUMERIC(10, 2),
  season TEXT[] DEFAULT ARRAY['all-season']::TEXT[],
  occasion TEXT[] DEFAULT ARRAY['casual']::TEXT[],
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  notes TEXT,
  is_favourite BOOLEAN DEFAULT FALSE NOT NULL,
  times_worn INTEGER DEFAULT 0 NOT NULL,
  last_worn_at TIMESTAMPTZ,
  purchase_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. BODY PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.body_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  height_cm NUMERIC(5, 1) DEFAULT 170.0 NOT NULL,
  weight_kg NUMERIC(5, 1) DEFAULT 65.0 NOT NULL,
  chest_cm NUMERIC(5, 1) DEFAULT 92.0 NOT NULL,
  biceps_cm NUMERIC(5, 1) DEFAULT 30.0 NOT NULL,
  wrist_cm NUMERIC(5, 1) DEFAULT 16.5 NOT NULL,
  shoulder_cm NUMERIC(5, 1) DEFAULT 44.0 NOT NULL,
  waist_cm NUMERIC(5, 1) DEFAULT 78.0 NOT NULL,
  hips_cm NUMERIC(5, 1) DEFAULT 96.0 NOT NULL,
  inseam_cm NUMERIC(5, 1) DEFAULT 76.0 NOT NULL,
  body_type TEXT DEFAULT 'regular' NOT NULL CHECK (body_type IN ('athletic', 'slim', 'regular', 'curvy', 'muscular')),
  skin_tone TEXT DEFAULT '#f5c6a5' NOT NULL,
  face_structure TEXT DEFAULT 'oval' NOT NULL CHECK (face_structure IN ('oval', 'round', 'square', 'heart', 'diamond')),
  hairstyle TEXT DEFAULT 'short_wavy' NOT NULL,
  hair_color TEXT DEFAULT '#2d1d13' NOT NULL,
  self_description TEXT,
  model_preset TEXT DEFAULT 'default' NOT NULL,
  model_parameters JSONB DEFAULT '{}'::jsonb NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. SAVED OUTFITS TABLE
CREATE TABLE IF NOT EXISTS public.saved_outfits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  occasion TEXT NOT NULL,
  item_ids UUID[] NOT NULL,
  match_score INTEGER DEFAULT 85 NOT NULL,
  explanation TEXT,
  weather_context JSONB,
  style_preference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. SCAN RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.scan_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  scanned_code TEXT NOT NULL,
  matched_item_id UUID REFERENCES public.wardrobe_items(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. STYLING CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.styling_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Wardrobe Consultation' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. STYLING MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.styling_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.styling_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_wardrobe_user_id ON public.wardrobe_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wardrobe_category ON public.wardrobe_items(category);
CREATE INDEX IF NOT EXISTS idx_wardrobe_item_code ON public.wardrobe_items(item_code);
CREATE INDEX IF NOT EXISTS idx_wardrobe_favourite ON public.wardrobe_items(user_id, is_favourite);
CREATE INDEX IF NOT EXISTS idx_saved_outfits_user_id ON public.saved_outfits(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_records_user_id ON public.scan_records(user_id);
CREATE INDEX IF NOT EXISTS idx_styling_conv_user_id ON public.styling_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_styling_msg_conv_id ON public.styling_messages(conversation_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict user-scoped isolation prevents cross-tenant access.
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.styling_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.styling_messages ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Wardrobe Items Policies
DROP POLICY IF EXISTS "Users can manage own wardrobe items" ON public.wardrobe_items;
CREATE POLICY "Users can manage own wardrobe items" ON public.wardrobe_items
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Body Profiles Policies
DROP POLICY IF EXISTS "Users can manage own body profile" ON public.body_profiles;
CREATE POLICY "Users can manage own body profile" ON public.body_profiles
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Saved Outfits Policies
DROP POLICY IF EXISTS "Users can manage own saved outfits" ON public.saved_outfits;
CREATE POLICY "Users can manage own saved outfits" ON public.saved_outfits
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Scan Records Policies
DROP POLICY IF EXISTS "Users can manage own scan records" ON public.scan_records;
CREATE POLICY "Users can manage own scan records" ON public.scan_records
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Styling Conversations Policies
DROP POLICY IF EXISTS "Users can manage own conversations" ON public.styling_conversations;
CREATE POLICY "Users can manage own conversations" ON public.styling_conversations
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Styling Messages Policies
DROP POLICY IF EXISTS "Users can manage messages in own conversations" ON public.styling_messages;
CREATE POLICY "Users can manage messages in own conversations" ON public.styling_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.styling_conversations
      WHERE public.styling_conversations.id = conversation_id
      AND public.styling_conversations.user_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.styling_conversations
      WHERE public.styling_conversations.id = conversation_id
      AND public.styling_conversations.user_id = auth.uid()
    )
  );

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH.SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Fashion Explorer'),
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || SUBSTRING(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  );

  INSERT INTO public.body_profiles (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
