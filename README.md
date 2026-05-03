# WeeKidz

Starter implementation for a wholesale clothing marketplace backend/frontend stack on **Node.js + MariaDB + EJS**.

## Quick Start

1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run app:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`

## Current Scope

- ✅ Phase 0 bootstrap completed:
  - Express server (`src/server.js`)
  - DB pool + health check (`src/config/db.js`)
  - EJS layout (`views/layouts/main.ejs`)
  - Home route/view with DB status (`src/routes/index.js`, `views/home.ejs`)
- 📝 Detailed roadmap:
  - `docs/WHOLESALE_MARKETPLACE_ROADMAP.md`
