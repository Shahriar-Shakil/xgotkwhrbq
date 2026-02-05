"use client";

import { Clock, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MovieCard } from "@/components/Moviecard";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

export default function RecentlyViewedPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecentlyViewed();

    // Listen for updates
    const handleUpdate = () => loadRecentlyViewed();
    window.addEventListener("recentlyViewedUpdated", handleUpdate);

    return () => {
      window.removeEventListener("recentlyViewedUpdated", handleUpdate);
    };
  }, []);

  const loadRecentlyViewed = () => {
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) {
      setMovies(JSON.parse(stored));
    }
    setIsLoading(false);
  };

  const clearAll = () => {
    if (confirm("Clear all recently viewed movies?")) {
      localStorage.removeItem("recentlyViewed");
      setMovies([]);
      window.dispatchEvent(new Event("recentlyViewedUpdated"));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Recently Viewed
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your movie viewing history
          </p>
        </div>

        {movies.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass-strong hover:bg-destructive/20 text-destructive transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        )}
      </div>

      {/* Movies Grid */}
      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 glass rounded-3xl">
          <Clock className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Recently Viewed Movies</h2>
          <p className="text-muted-foreground mb-6">
            Start exploring movies to see them here
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:scale-105"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {movies.length} {movies.length === 1 ? "movie" : "movies"}
          </div>
        </>
      )}
    </div>
  );
}
