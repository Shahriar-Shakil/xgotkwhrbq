"use client";

import { Bookmark, BookmarkCheck, X as XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { addToWatchlist, removeFromWatchlist } from "@/src/lib/watchlist";
import { Movie } from "@/src/types/tmdb";
import { useAuth } from "../providers/AuthContext";
import { useWatchlist } from "../providers/Watchlistprovider";
import Toast from "./Toast";

interface WatchlistButtonProps {
  movie: Movie | any;
  variant?: "icon" | "button" | "large";
  className?: string;
  showLabel?: boolean;
}

export default function WatchlistButton({
  movie,
  variant = "icon",
  className = "",
  showLabel = false,
}: WatchlistButtonProps) {
  const { user } = useAuth();
  const { isInWatchlist, addToWatchlistCache, removeFromWatchlistCache } =
    useWatchlist();
  const [isPending, startTransition] = useTransition();

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
        // Revert on error
        if (inWatchlist) {
          addToWatchlistCache(movie.id);
        } else {
          removeFromWatchlistCache(movie.id);
        }
        showNotification("Something went wrong", "error");
      }
    });
  };

  if (variant === "icon") {
    return (
      <>
        <Toast
          message={toastMessage}
          type={toastType}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
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
            ${className}
          `}
          title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        >
          {isPending ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : inWatchlist ? (
            <>
              <BookmarkCheck className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity flex items-center justify-center">
                <XIcon className="w-2 h-2 text-white" />
              </div>
            </>
          ) : (
            <Bookmark className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
          )}
        </button>
      </>
    );
  }

  if (variant === "button") {
    return (
      <>
        <Toast
          message={toastMessage}
          type={toastType}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
        <button
          onClick={handleWatchlistToggle}
          disabled={isPending}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all
            ${
              inWatchlist
                ? "bg-primary/20 text-primary border-2 border-primary hover:bg-primary/30"
                : "glass-strong border border-border hover:glass"
            }
            ${isPending ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
            ${className}
          `}
        >
          {isPending ? (
            <>
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : inWatchlist ? (
            <>
              <BookmarkCheck className="w-5 h-5" />
              {showLabel && <span>In Watchlist</span>}
            </>
          ) : (
            <>
              <Bookmark className="w-5 h-5" />
              {showLabel && <span>Add to Watchlist</span>}
            </>
          )}
        </button>
      </>
    );
  }

  if (variant === "large") {
    return (
      <>
        <Toast
          message={toastMessage}
          type={toastType}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
        <button
          onClick={handleWatchlistToggle}
          disabled={isPending}
          className={`
            flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-lg transition-all
            ${
              inWatchlist
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "glass-strong border-2 border-border hover:glass"
            }
            ${isPending ? "opacity-50 cursor-not-allowed" : "hover:scale-105 shadow-xl"}
            ${className}
          `}
        >
          {isPending ? (
            <>
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : inWatchlist ? (
            <>
              <BookmarkCheck className="w-6 h-6" />
              <span>Remove from Watchlist</span>
            </>
          ) : (
            <>
              <Bookmark className="w-6 h-6" />
              <span>Add to Watchlist</span>
            </>
          )}
        </button>
      </>
    );
  }

  return null;
}
