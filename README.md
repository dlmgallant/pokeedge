# PokeEdge — TCG Trade Advisor

AI-powered Pokémon TCG trade advisor and collection tracker.

**Features**
- Collection tracker with Have/Want status, focus filters (Charizard, Pikachu, Mimikyu, etc.)
- Show Mode — quick card lookup at card shows
- Trade Advisor with AI speculation scoring across price history, reprint risk, grading upside, collector demand, and meta relevance
- Trade rate adjustment (vendor 80% credit, etc.) with live math
- Want list feeds directly into trade analysis

---

## Setup

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/pokeedge.git
cd pokeedge
npm install
```

### 2. Add your Anthropic API key

The app calls the Anthropic API directly from the browser. You need to either:

**Option A — Vite env variable (recommended for local dev)**

Create a `.env` file in the project root:
```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Then in `src/App.jsx`, find the fetch call and update the headers:
```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
},
```

**Option B — Hardcode for personal use only**

Replace the fetch headers in `src/App.jsx` directly. Never commit a real key to a public repo.

> ⚠️ For a public deployment, you should proxy API calls through a backend (Cloudflare Worker, Vercel Edge Function, etc.) so your key is never exposed.

### 3. Run locally

```bash
npm run dev
```

---

## Deploy to GitHub Pages

### First-time setup

1. Create a new repo on GitHub named `pokeedge` (or whatever you want)
2. In `vite.config.js`, make sure `base` matches your repo name:
   ```js
   base: '/pokeedge/',
   ```
3. In `package.json`, the deploy script uses `gh-pages`. Make sure it's installed (it is via `npm install`).

### Push and deploy

```bash
# Initialize git and push your code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pokeedge.git
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

This builds the app and pushes the `dist/` folder to a `gh-pages` branch automatically.

### Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Set source to **Deploy from a branch**
3. Select branch: `gh-pages`, folder: `/ (root)`
4. Save — your app will be live at:
   `https://YOUR_USERNAME.github.io/pokeedge/`

---

## Project Structure

```
pokeedge/
├── index.html          # HTML entry point
├── vite.config.js      # Vite config (set base = your repo name)
├── package.json
├── .gitignore
└── src/
    ├── main.jsx        # React root
    └── App.jsx         # Full app (Collection Tracker + Trade Advisor)
```

---

## Tech Stack

- React 18 + Vite
- Anthropic Claude API (claude-sonnet-4)
- Zero external UI dependencies — all styles inline
