"use client";

import { Search, Star } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useDebounce } from "react-use";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export default function FloatingMovieSearch() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [debouncedQuery, setDebouncedQuery] = React.useState("");

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
      return;
    }

    async function fetchMovies() {
      const res = await fetch(`/api/search?query=${debouncedQuery}`);
      const data = await res.json();
      setResults(data.results || []);
    }

    fetchMovies();
  }, [debouncedQuery]);

  return (
    <div className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto max-w-4xl px-4 py-3">
        <div className="relative">
          {/* Search Input */}
          <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 shadow-lg transition-all duration-300 focus-within:bg-white/10">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              className="border-0 bg-transparent focus-visible:ring-0 text-base"
            />
          </div>

          {/* Dropdown Results */}
          {open && results.length > 0 && (
            <Card className="absolute mt-3 w-full overflow-hidden rounded-2xl border border-white/10 bg-background/95 shadow-2xl animate-in fade-in slide-in-from-top-2">
              <ul className="max-h-80 overflow-y-auto">
                {results.slice(0, 6).map((movie) => (
                  <li key={movie.id}>
                    <Link
                      href={`/movie/${movie.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {/* Poster Icon */}
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="h-12 w-10 rounded-lg object-cover"
                      />

                      {/* Movie Info */}
                      <div className="flex-1">
                        <p className="font-medium text-sm leading-tight">
                          {movie.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {movie.release_date?.slice(0, 4)}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-xs text-yellow-400">
                        <Star className="h-4 w-4 fill-yellow-400" />
                        {movie.vote_average?.toFixed(1)}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
