"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserWatchlistIds } from "@/src/lib/watchlist";
import { useAuth } from "./authContext";

interface WatchlistContextType {
  watchlistIds: Set<number>;
  isInWatchlist: (movieId: number) => boolean;
  addToWatchlistCache: (movieId: number) => void;
  removeFromWatchlistCache: (movieId: number) => void;
  refreshWatchlist: () => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [watchlistIds, setWatchlistIds] = useState<Set<number>>(new Set());

  // Load watchlist on mount/user change
  useEffect(() => {
    if (user) {
      refreshWatchlist();
    } else {
      setWatchlistIds(new Set());
    }
  }, [user]);

  const refreshWatchlist = async () => {
    if (!user) return;
    const ids = await getUserWatchlistIds(user.uid);
    setWatchlistIds(new Set(ids));
  };

  const isInWatchlist = (movieId: number) => {
    return watchlistIds.has(movieId);
  };

  const addToWatchlistCache = (movieId: number) => {
    setWatchlistIds((prev) => new Set(prev).add(movieId));
  };

  const removeFromWatchlistCache = (movieId: number) => {
    setWatchlistIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(movieId);
      return newSet;
    });
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlistIds,
        isInWatchlist,
        addToWatchlistCache,
        removeFromWatchlistCache,
        refreshWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }
  return context;
}
