"use client";

import { useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

interface RecentlyViewedTrackerProps {
  movie: Movie;
}

const MAX_RECENT_MOVIES = 20;

export default function RecentlyViewedTracker({
  movie,
}: RecentlyViewedTrackerProps) {
  useEffect(() => {
    const storedMovies = localStorage.getItem("recentlyViewed");
    let recentMovies: Movie[] = storedMovies ? JSON.parse(storedMovies) : [];

    // Remove duplicate if exists (by ID)
    recentMovies = recentMovies.filter((m) => m.id !== movie.id);

    // Add current movie to the beginning
    recentMovies.unshift(movie);

    // Keep only the latest MAX_RECENT_MOVIES
    recentMovies = recentMovies.slice(0, MAX_RECENT_MOVIES);

    // Save back to localStorage
    localStorage.setItem("recentlyViewed", JSON.stringify(recentMovies));

    window.dispatchEvent(new Event("recentlyViewedUpdated"));
  }, [movie]);

  return null;
}
