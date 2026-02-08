# Cinephile 🎬

A modern movie discovery platform built with Next.js 16, featuring real-time data from TMDB API and Firebase authentication for personalized watchlists.

**Live Demo:** [https://cinephile-shahriar.vercel.app/](https://cinephile-shahriar.vercel.app/)

## Features

### 🏠 Home Page
- Top Rated Movies showcase
- Popular movies by genre (5 per genre)
- Complete genre navigation

### 🎭 Genre Page
- Browse movies by specific genre
- Sort by: popularity, release date, rating, or title
- Infinite scroll for all movies

### 📽️ Movie Details
- Full movie information (poster, title, overview, release date, rating, runtime)
- Complete cast list
- Similar movies by genre
- Auto-saves to recently viewed

### 🕒 Recently Viewed
- Track your browsing history
- Stored locally (no login required)

### ⭐ Watch Later
- Personal watchlist with Firebase sync
- Add/remove movies instantly
- Requires authentication

### 🔍 Search
- Real-time movie search
- Responsive grid layout

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI, Lucide React
- **API:** TMDB (@lorenzopant/tmdb)
- **Database:** Firebase (Authentication & Firestore)
- **Deployment:** Vercel

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cinephile

# Install dependencies
npm install

# Set up environment variables (see below)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# TMDB API (Get from https://www.themoviedb.org/settings/api)
TMDB_API_KEY=your_tmdb_api_key_here

# Firebase Config (Get from Firebase Console > Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Site URL (for production)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Getting API Keys

**TMDB API:**
1. Create account at [themoviedb.org](https://www.themoviedb.org/)
2. Go to Settings → API → Create API Key
3. Copy the API Read Access Token (v4 auth)

**Firebase:**
1. Create project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password or Google Sign-in)
3. Create Firestore Database
4. Copy config from Project Settings → General

## Data Storage

- **Recently Viewed:** Saved in browser localStorage (persists locally, no login needed)
- **Watch Later:** Synced to Firebase Firestore (requires authentication, accessible across devices)

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
cinephile/
├── src/
│   ├── app/              # Next.js app routes
│   ├── components/       # React components
│   ├── lib/             # Utilities (TMDB, Firebase)
│   └── hooks/           # Custom React hooks
├── public/              # Static assets
└── .env.local          # Environment variables
```

## License

MIT

---

Built with ❤️ using Next.js and TMDB
