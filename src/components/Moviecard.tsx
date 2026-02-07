"use client";

import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  Star,
  X as XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { addToWatchlist, removeFromWatchlist } from "@/src/lib/watchlist"; // Client-side import
import { Movie } from "@/src/types/tmdb";
import { useAuth } from "../providers/AuthContext";
import { useWatchlist } from "../providers/Watchlistprovider";
import Toast from "./Toast";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/200x400";

  const { user } = useAuth();
  const { isInWatchlist, addToWatchlistCache, removeFromWatchlistCache } =
    useWatchlist();

  const [isPending, startTransition] = useTransition();
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const inWatchlist = isInWatchlist(movie.id);

  const showNotification = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "success",
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      showNotification("Please login to manage your watchlist", "warning");
      return;
    }

    if (inWatchlist) {
      removeFromWatchlistCache(movie.id);
    } else {
      addToWatchlistCache(movie.id);
    }

    startTransition(async () => {
      try {
        if (inWatchlist) {
          const result = await removeFromWatchlist(user.uid, movie.id);
          if (result.success) {
            showNotification("Removed from watchlist", "info");
          } else {
            addToWatchlistCache(movie.id);
            showNotification("Failed to remove from watchlist", "error");
          }
        } else {
          const result = await addToWatchlist(user.uid, movie);
          if (result.success) {
            showNotification("Added to watchlist! ✓", "success");
          } else {
            removeFromWatchlistCache(movie.id);
            showNotification("Failed to add to watchlist", "error");
          }
        }
      } catch (error) {
        console.error("Watchlist error:", error);
        if (inWatchlist) {
          addToWatchlistCache(movie.id);
        } else {
          removeFromWatchlistCache(movie.id);
        }
        showNotification("Something went wrong", "error");
      }
    });
  };

  return (
    <>
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Movie Card */}
      <div className="group relative overflow-hidden rounded-xl glass hover:glass-strong transition-all duration-300  hover:-translate-y-2">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <Link href={`/movie/${movie.id}`}>
            <Image
              src={imageUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </Link>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-10">
            {/* Rating Badge */}
            <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-semibold text-white">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>

            {/* Watchlist Icon Button */}
            <button
              onClick={handleWatchlistToggle}
              disabled={isPending}
              className={`
                p-2.5 rounded-full backdrop-blur-md transition-all duration-300
                ${
                  inWatchlist
                    ? "bg-primary text-primary-foreground"
                    : "bg-black/60 text-white hover:bg-black/80"
                }
                ${isPending ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
                group/btn relative
              `}
              title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              {isPending ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : inWatchlist ? (
                <>
                  <BookmarkCheck className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
                  {/* Small X indicator on hover */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity flex items-center justify-center">
                    <XIcon className="w-6 h-6 text-white" />
                  </div>
                </>
              ) : (
                <Bookmark className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
              )}
            </button>
          </div>

          {/* Hover Content */}
          <div className="absolute inset-x-0 bottom-0 p-4 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
              {movie.title}
            </h3>

            <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
              <Calendar className="w-4 h-4" />
              <span>
                {movie?.release_date
                  ? new Date(movie?.release_date).getFullYear()
                  : "Unknown Year"}
              </span>
            </div>

            <Link
              href={`/movie/${movie.id}`}
              className="w-full inline-block text-center bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-lg font-medium transition-all hover:scale-105"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
