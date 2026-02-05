"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MovieCardHorizontal } from "@/src/components/MovieCardHorizontal";
import { ViewToggle } from "@/src/components/ViewToggle";
import { Movie } from "@/src/types/tmdb";
import { MovieCard } from "./Moviecard";

interface SearchResultsProps {
  movies: Movie[];
  query: string;
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export function SearchResults({
  movies,
  query,
  currentPage,
  totalPages,
  totalResults,
}: SearchResultsProps) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div>
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Search Results
          </h1>
          <p className="text-muted-foreground mt-2">
            Found {totalResults.toLocaleString()} result
            {totalResults !== 1 ? "s" : ""} for "{query}"
          </p>
        </div>
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      {/* Results Grid/List */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {movies.map((movie) => (
            <MovieCardHorizontal key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="glass hover:glass-strong disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {/* First page */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="glass hover:glass-strong min-w-10 h-10 rounded-lg transition-all"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="text-muted-foreground">...</span>
                )}
              </>
            )}

            {/* Pages around current */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === currentPage ||
                  page === currentPage - 1 ||
                  page === currentPage + 1 ||
                  (page === currentPage - 2 && currentPage <= 3) ||
                  (page === currentPage + 2 && currentPage >= totalPages - 2)
                );
              })
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`min-w-10 h-10 rounded-lg transition-all ${
                    page === currentPage
                      ? "bg-primary text-primary-foreground"
                      : "glass hover:glass-strong"
                  }`}
                >
                  {page}
                </button>
              ))}

            {/* Last page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="text-muted-foreground">...</span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="glass hover:glass-strong min-w-10 h-10 rounded-lg transition-all"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="glass hover:glass-strong disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg transition-all"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
