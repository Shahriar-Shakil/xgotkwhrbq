"use client";

import { Bookmark, LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MovieCard } from "@/src/components/Moviecard";
import { getUserWatchlist } from "@/src/lib/watchlist";
import { useAuth } from "@/src/providers/AuthContext";
import { useWatchlist } from "@/src/providers/Watchlistprovider";
import { Movie } from "@/src/types/tmdb";

export default function WatchlistPage() {
  const { user } = useAuth();
  const { watchlistIds } = useWatchlist();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWatchlist() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const watchlist = await getUserWatchlist(user.uid);
        const transformedMovies = watchlist.map((item: any) => ({
          id: item.id,
          title: item.title,
          poster_path: item.posterPath,
          vote_average: item.voteAverage,
          release_date: item.releaseDate,
          backdrop_path: "",
          overview: "",
          genre_ids: [],
          popularity: 0,
          adult: false,
          original_language: "",
          original_title: item.title,
          video: false,
          vote_count: 0,
        }));
        setMovies(transformedMovies);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlist();
  }, [user]);

  const displayedMovies = movies.filter((movie) => watchlistIds.has(movie.id));

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] bg-white/10 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // Not Logged In State
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
            <LogIn className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Sign in to view your watchlist
          </h1>
          <p className="text-white/60 mb-8">
            Create an account to save your favorite movies and build your
            personal watchlist.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (displayedMovies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
        </div>
        <div className="max-w-md mx-auto text-center mt-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
            <Bookmark className="w-10 h-10 text-white/40" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Your watchlist is empty
          </h2>
          <p className="text-white/60 mb-8">
            Start adding movies to your watchlist to keep track of what you want
            to watch!
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105"
          >
            Explore Movies
          </Link>
        </div>
      </div>
    );
  }

  // Watchlist with Movies
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
        </div>
        <p className="text-white/60">
          {displayedMovies.length}{" "}
          {displayedMovies.length === 1 ? "movie" : "movies"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
