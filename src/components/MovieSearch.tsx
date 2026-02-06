"use client";

import { Calendar, Search, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useDebounce } from "react-use";
import { useTmdb } from "../providers/tmdb-provider";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export default function MovieSearch() {
  const tmdb = useTmdb();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const searchRef = React.useRef<HTMLDivElement>(null);

  useDebounce(
    () => {
      setDebouncedQuery(query);
    },
    400,
    [query],
  );

  React.useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setOpen(false);
      return;
    }

    async function fetchMovies() {
      const res = await tmdb.search.movies({ query: debouncedQuery });
      setResults(res.results || []);
      setOpen(true);
    }

    fetchMovies();
  }, [debouncedQuery, tmdb]);

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-400 fill-green-400";
    if (rating >= 6) return "text-yellow-400 fill-yellow-400";
    return "text-red-400 fill-red-400";
  };

  return (
    <>
      {/* Backdrop when search is open */}

      {/* Search Container */}
      <div className="relative w-full">
        <div ref={searchRef} className="relative">
          {/* Search Input */}
          <div
            className={`relative transition-all duration-300 ${
              isSearchFocused || open ? "scale-[1.02]" : ""
            }`}
          >
            {/* Glow effect when focused */}
            {(isSearchFocused || open) && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl animate-in fade-in duration-300" />
            )}

            <div
              className={`relative flex items-center gap-3 rounded-2xl px-5 py-3 transition-all duration-300 border ${
                isSearchFocused || open
                  ? "glass-strong border-primary/50 shadow-2xl shadow-primary/20"
                  : "glass-subtle border-border/50 hover:glass hover:border-border"
              }`}
            >
              <Search
                className={`h-5 w-5 transition-colors duration-200 flex-shrink-0 ${
                  isSearchFocused || open
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              />
              <Input
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="border-0 bg-transparent shadow-none outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground font-medium h-auto px-0"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="p-1.5 hover:bg-muted/50 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Dropdown Results */}
          {open && results.length > 0 && (
            <Card className="absolute mt-3 w-full overflow-hidden rounded-2xl  z-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-2">
                {/* Results header */}
                <div className="px-3 py-2 border-b border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Search Results ({results.length})
                  </p>
                </div>

                {/* Results list */}
                <ul className="max-h-[28rem] overflow-y-auto custom-scrollbar py-2">
                  {results.slice(0, 8).map((movie, index) => (
                    <li key={movie.id}>
                      <Link
                        href={`/movie/${movie.id}`}
                        className="flex items-center gap-4 px-3 py-3 hover:bg-muted/30 rounded-xl transition-all duration-200 group"
                        onClick={() => {
                          setOpen(false);
                          setIsSearchFocused(false);
                        }}
                        style={{
                          animation: `slide-in-from-left 0.3s ease-out ${index * 0.05}s backwards`,
                        }}
                      >
                        {/* Poster */}
                        <div className="relative flex-shrink-0 w-12 h-16 rounded-lg overflow-hidden bg-muted border border-border group-hover:border-primary/50 transition-colors">
                          {movie.poster_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                              alt={movie.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Search className="w-6 h-6 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>

                        {/* Movie Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {movie.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {movie.release_date && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>{movie.release_date.slice(0, 4)}</span>
                              </div>
                            )}
                            {movie.vote_average > 0 && (
                              <div
                                className={`flex items-center gap-1 text-xs ${getRatingColor(
                                  movie.vote_average,
                                )}`}
                              >
                                <Star className="w-3 h-3" />
                                <span className="font-semibold">
                                  {movie.vote_average.toFixed(1)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Arrow indicator */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* View all results footer */}
                {results.length > 8 && (
                  <div className="px-3 py-2 border-t border-border/50">
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}`}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 rounded-xl font-semibold text-primary-foreground text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
                      onClick={() => {
                        setOpen(false);
                        setIsSearchFocused(false);
                      }}
                    >
                      <span>View All {results.length} Results</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* No results message */}
          {open && query && results.length === 0 && (
            <Card className="absolute mt-3 w-full overflow-hidden rounded-2xl glass-strong shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-foreground/80 font-medium">
                  No movies found for "{query}"
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Try adjusting your search terms
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-from-left {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--foreground), 0.1);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--foreground), 0.2);
        }
      `}</style>
    </>
  );
}
