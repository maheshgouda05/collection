# Collection It All (Ward Room) — Complete Full-Stack Backend & Frontend Architecture

**Collection It All** (also known as **Ward Room**) is an intelligent digital wardrobe management system featuring interactive 3D humanoid anatomical modeling, smart anchor-based outfit recommendations, real-time meteorological styling advice, check-before-you-buy purchasing evaluation, and an AI fashion stylist powered by Google's Gemini API (`gemini-3.8-flash`).

---

## 1. System Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Frontend (React 19 + Vite)                     │
│  - Dashboard & Analytics              - 3D Body Model (Three.js)       │
│  - Wardrobe Catalog & Filters        - Smart Outfit Matcher           │
│  - Add Dress & Garment Flow           - Gemini AI Stylist Chat         │
│  - Scan & Find Item Codes             - Check Before You Buy           │
│  - Live Weather Dressing Guidance     - Profile & Aesthetic Personas   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ Bearer Auth / REST APIs
┌──────────────────────────────────▼─────────────────────────────────────┐
│                 Full-Stack Backend (Node.js Express + TSX)             │
│  - /api/auth/*     (Registration, Email/Username Login, Sessions)     │
│  - /api/wardrobe/* (CRUD, Category Stats, Wear Tracker, Favourites)    │
│  - /api/model      (Parametric 3D/2D Body Dimensions Persistence)      │
│  - /api/outfits/*  (Smart Combination Engine & Saved Lookbooks)        │
│  - /api/ai/*       (Server-Side Gemini 3.8 Flash Stylist Integration)   │
│  - /api/weather    (Live Open-Meteo Geocoding & Forecast API)          │
│  - /api/scan/*     (Item-Code Generation & Garment Lookup)             │
│  - /api/shopping/* (Closet Gap Analysis & Redundancy Prevention)       │
│  - /api/upload     (MIME & Size Validated Image Storage)               │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │                                 │
┌──────────────────▼──────────────────┐   ┌──────────▼───────────────────┐
│       Database & Storage Layer      │   │     External Integrations    │
│ - Supabase PostgreSQL + RLS         │   │ - Google Gemini API          │
│ - SQL Migrations (001_initial_schema│   │   (gemini-3.8-flash)         │
│ - Supabase Storage bucket           │   │ - Open-Meteo Real Weather    │
│ - Persistent fallback data store    │   │ - Three.js WebGL Engine      │
└─────────────────────────────────────┘   └──────────────────────────────┘
```

---

## 2. Database Schema & Supabase SQL Migrations

The complete, version-controlled PostgreSQL schema migration is located in `supabase/migrations/001_initial_schema.sql`.

### Relational Tables
1. **`profiles`**: Links to `auth.users(id)`. Stores `full_name`, `username` (unique), `avatar_url`, and `preferences` JSONB (favorite styles, default occasion).
2. **`wardrobe_items`**: User-owned garments with `item_code` (`CIA-XXXXX`), `name`, `category` (dresses, tops, bottoms, outerwear, shoes, accessories, bags), `colour`, `colour_family`, `size`, `fabric`, `brand`, `image_url`, `storage_path`, `price`, `season`, `occasion`, `tags`, `notes`, `is_favourite`, `times_worn`, and timestamps.
3. **`body_profiles`**: Proportional anatomy measurements: `height_cm`, `weight_kg`, `chest_cm`, `biceps_cm`, `wrist_cm`, `shoulder_cm`, `waist_cm`, `hips_cm`, `inseam_cm`, `body_type`, `skin_tone`, `face_structure`, `hairstyle`, `hair_color`, and model presets.
4. **`saved_outfits`**: Curated combinations linking `item_ids`, `match_score`, `explanation`, `weather_context`, and `occasion`.
5. **`scan_records`**: Tracking tags scanned by users and verified against their closet.
6. **`styling_conversations`** & **`styling_messages`**: Multi-turn chat history for the AI Stylist Assistant.

### Applying Migrations to Supabase
1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Create or select your project.
3. Open the **SQL Editor** in the left sidebar.
4. Copy the entire contents of `supabase/migrations/001_initial_schema.sql` and run it.
5. In **Storage**, verify that a bucket named `wardrobe-images` is created.

---

## 3. Environment Variables Configuration

Copy `.env.example` to `.env` (or configure in your deployment platform):

```bash
# GEMINI_API_KEY: Required for AI Stylist interactions (gemini-3.8-flash)
# Configured via Settings > Secrets panel or environment variable
GEMINI_API_KEY="your-gemini-api-key"

# APP_URL: Host address
APP_URL="http://localhost:3000"

# SUPABASE_URL: Project REST URL from Supabase Dashboard > Project Settings > API
SUPABASE_URL="https://your-project.supabase.co"

# SUPABASE_ANON_KEY: Client-safe API key
SUPABASE_ANON_KEY="your-anon-key"

# SUPABASE_SERVICE_ROLE_KEY: Server-side secret key (never expose to browser)
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# WEATHER_API_PROVIDER: Provider selection ('open-meteo' is free, zero-config)
WEATHER_API_PROVIDER="open-meteo"
```

---

## 4. API Endpoints Specification

### Authentication & Profiles
- `POST /api/auth/register`: Register with `{ email, username, password, fullName }`. Returns user and session token.
- `POST /api/auth/login`: Authenticate with `{ identifier, password }` (accepts email or username).
- `POST /api/auth/logout`: Invalidate session.
- `GET /api/auth/me`: Validate token and retrieve user session.
- `POST /api/auth/forgot-password`: Dispatch password reset email.
- `GET /api/profile`: Retrieve user profile and styling aesthetic preferences.
- `PUT /api/profile`: Update profile fields and preferences.

### Wardrobe Collection
- `GET /api/wardrobe`: List garments with filters: `?category=...&search=...&season=...&occasion=...&favourite=true&sort=...`.
- `GET /api/wardrobe/stats`: Aggregated summary (total garments, closet valuation, category counts, favourites).
- `GET /api/wardrobe/:id`: Fetch single garment details.
- `POST /api/wardrobe`: Create new garment with auto-assigned `item_code`.
- `PUT /api/wardrobe/:id`: Update garment metadata.
- `DELETE /api/wardrobe/:id`: Remove item from closet.
- `POST /api/wardrobe/:id/toggle-favourite`: Toggle favorite flag.
- `POST /api/wardrobe/:id/wear`: Increment `timesWorn` count and update `lastWornAt`.
- `POST /api/upload`: Upload image (JPEG, PNG, WebP) with 8MB size check.

### 3D Body Profile
- `GET /api/model`: Retrieve current user's anatomical parameters.
- `PUT /api/model`: Persist updated measurements (height, weight, chest, waist, shoulders, skin tone, hair, etc.).

### Outfits & Smart Matcher
- `POST /api/outfits/generate`: Generate outfit combinations using user's real wardrobe items based on `{ anchorItemId, occasion, weatherTemp }`.
- `GET /api/outfits`: Retrieve saved lookbook outfits.
- `POST /api/outfits`: Save outfit to lookbook.
- `DELETE /api/outfits/:id`: Remove outfit from lookbook.

### Gemini AI Stylist Assistant
- `POST /api/ai/assistant`: Multi-turn conversational styling grounded in the user's wardrobe items, body profile, occasion, and current weather.
- `GET /api/ai/conversations`: List user styling sessions.
- `GET /api/ai/conversations/:id`: Retrieve conversation message history.

### Real Weather
- `GET /api/weather?city=...`: Live weather condition, temperature in Celsius, humidity, wind, 3-day forecast, and clothing advice.

### Scan & Find
- `GET /api/scan/:code`: Look up garment by `item_code` or ID with ownership verification.

### Check Before You Buy
- `POST /api/shopping/check`: Evaluate prospective purchase for closet duplicates, color harmony, and gap analysis with Gemini commentary.

---

## 5. Automated Testing & Verification

Run the automated backend test suite:
```bash
npm test
```
The test suite verifies:
- Password hashing & token generation
- Username and email login resolution
- Row Level Security (RLS) cross-tenant isolation
- Wardrobe CRUD operations and filtering
- Item-code search and ownership validation
- Body profile dimension persistence
- Outfit lookbook saving and deletion
- AI stylist multi-turn message storage

To build for production:
```bash
npm run build
```

To run TypeScript verification:
```bash
npm run lint
```
