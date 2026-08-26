# Apex OS — Personal Productivity Command Center

A unified, modern web app replacing 4 Excel workbooks with a real-time, cross-device productivity dashboard. Built for Prakhar Singh.

## Features

- **🏠 Unified Home Dashboard** — Daily score, schedule, tasks, habits, finances at a glance
- **📅 Timetable & Planner** — Weekly timetable, daily execution log, habit tracker, placement/academic/brand trackers
- **💰 Finance Tracker** — Transactions, budgets, recurring expenses, splits, net worth with charts
- **🏋️ Fitness Command Center** — Workouts, nutrition, habits, body measurements, sleep, cardio
- **📚 CFA Level I 2027** — 10-module syllabus tracker, revision planner, progress rings
- **✅ Task Manager** — Unified to-do list with list/kanban views, CFA topic linking
- **⚡ Command Palette** — Cmd+K for instant navigation and quick-add
- **📱 PWA** — Installable on iPhone, Android, and desktop
- **🔄 Real-time Sync** — Edits sync across all devices instantly
- **🌙 Dark Theme** — Beautiful fintech-inspired dark UI

## Tech Stack

- React 18 + Vite + TypeScript
- TailwindCSS + shadcn/ui + Framer Motion
- Recharts for data visualization
- TanStack Query + Zustand
- Supabase (Postgres + Auth + Realtime)
- Cloudflare Pages (hosting)
- PWA with offline support

## Quick Start (Local Development)

1. Clone this repo
2. Copy `.env.example` to `.env` and fill in your Supabase credentials
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173

## Deployment Guide

### Step 1: Create Supabase Project (Free Tier)

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Choose a name (e.g., "apex-os"), set a database password (save it!), pick the closest region (Mumbai for India)
4. Wait for the project to be created (~2 minutes)

### Step 2: Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Open the file `supabase/migrations/001_schema.sql` from this repo
4. Copy the ENTIRE contents and paste it into the SQL editor
5. Click "Run" — you should see "Success" with no errors
6. (Optional) If you want the CFA topics pre-populated, also run `supabase/migrations/002_seed_cfa.sql`

### Step 3: Create Your Auth User

1. In Supabase dashboard, go to **Authentication** > **Users**
2. Click "Add User" > "Create New User"
3. Enter your email and a strong password
4. Click "Create User"
5. **IMPORTANT**: To disable public sign-ups:
   - Go to **Authentication** > **Providers** > **Email**
   - Toggle OFF "Enable Sign Up" (or set "Confirm email" to ON and don't verify any future sign-ups)
   - This ensures only YOUR account can log in

### Step 4: Get Supabase Credentials

1. Go to **Settings** > **API** in your Supabase dashboard
2. Copy the **Project URL** (looks like `https://xxxxx.supabase.co`)
3. Copy the **anon/public** key (a long JWT string)
4. These are safe to expose in frontend code — RLS policies protect your data

### Step 5: Deploy to Cloudflare Pages (Free Tier)

1. Push this repo to a GitHub repository
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com) and sign up/log in
3. Click "Create a project" > "Connect to Git"
4. Select your GitHub repo
5. Configure the build:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: 18 (or latest LTS)
6. Add environment variables:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
7. Click "Save and Deploy"
8. Wait for the build to complete (~2-3 minutes)
9. Your app is now live at `your-project.pages.dev`!

### Step 6: Install as PWA

**iPhone/iPad:**
1. Open your deployed URL in Safari
2. Tap the Share button (box with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

**Android:**
1. Open your deployed URL in Chrome
2. Tap the three-dot menu
3. Tap "Add to Home screen" or "Install app"
4. Tap "Install"

**Desktop (Chrome/Edge):**
1. Open your deployed URL
2. Click the install icon in the address bar (or three-dot menu > "Install Apex OS")

## How Data Sync Works

- All data is stored in Supabase Postgres (cloud), not in your browser
- When you edit anything, it saves to the database immediately
- Other logged-in devices receive the update via Supabase Realtime (WebSocket)
- If you're offline, changes queue locally and sync when you reconnect
- The status indicator in the sidebar/header shows: 🟢 Synced | 🟡 Syncing | 🔴 Offline

**If something looks out of sync**: Refresh the page. If the issue persists, log out and log back in.

## Security Model

- Only one user account exists (yours, created manually in Supabase)
- Public sign-up is disabled
- Every database table has Row Level Security (RLS) policies
- All read/write operations are restricted to `auth.uid() = owner_id`
- The Supabase anon key in the frontend is safe by design — it can only access data that RLS allows
- No secrets are stored in frontend code

## Extending the App

### Adding a new field to an existing table
1. Run an `ALTER TABLE` in Supabase SQL Editor to add the column
2. Update the type in `src/api/types.ts`
3. Update the API functions in the relevant `src/api/*.ts` file
4. Update the UI components that display/edit that field

### Adding a new table/module
1. Create the table SQL with RLS (use `001_schema.sql` as reference)
2. Add types in `src/api/types.ts`
3. Create `src/api/newmodule.ts` with CRUD functions
4. Create UI components in `src/modules/newmodule/`
5. Add route in `src/router.tsx`
6. Add nav item in `src/components/layout/sidebar.tsx`

### Backup & Restore
- **Backup**: Go to Settings > Data Management > "Export All Data (JSON)"
- **Restore**: Use the JSON import feature, or run SQL INSERT statements from the JSON data

## Project Structure

```
apex-os/
├── src/
│   ├── api/          # Centralized Supabase calls (one file per domain)
│   ├── components/   # Shared UI components (shadcn-based)
│   │   ├── ui/       # Primitives (Button, Card, Dialog, etc.)
│   │   ├── layout/   # App shell (Sidebar, Header, Auth, etc.)
│   │   └── shared/   # Reusable composed components
│   ├── modules/      # Feature modules
│   │   ├── home/     # Unified dashboard
│   │   ├── timetable/# Timetable & planner
│   │   ├── finance/  # Finance tracker
│   │   ├── fitness/  # Fitness command center
│   │   ├── cfa/      # CFA study tracker
│   │   ├── tasks/    # Task manager
│   │   └── settings/ # App settings
│   ├── lib/          # Utilities, Supabase client, offline queue
│   ├── store/        # Zustand stores (UI state only)
│   ├── hooks/        # Custom React hooks
│   └── styles/       # Global CSS
├── supabase/
│   └── migrations/   # SQL schema + seed data
├── public/           # PWA icons, manifest
└── Configuration files (vite, tailwind, typescript, etc.)
```

## License

Private — built for personal use by Prakhar Singh.
