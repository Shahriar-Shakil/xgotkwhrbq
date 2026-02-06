"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Movie } from "../types/tmdb";
import AdvancedFilter, { FilterState, SortOption } from "./AdvancedFilter";
import { MovieCard } from "./Moviecard";

interface MoviesClientProps {
  initialMovies: Movie[];
  initialPage: number;
  initialTotalPages: number;
  initialFilters: FilterState;
}

export default function MoviesClient({
  initialMovies,
  initialPage,
  initialTotalPages,
  initialFilters,
}: MoviesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const movies = initialMovies;
  const currentPage = initialPage;
  const totalPages = initialTotalPages;
  const filters = initialFilters;

  // Helper function to update URL params
  const updateSearchParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        // Special handling for default values
        if (key === "rating_from" && value === 0) {
          params.delete(key);
        } else if (key === "rating_to" && value === 10) {
          params.delete(key);
        } else {
          params.set(key, value.toString());
        }
      } else {
        params.delete(key);
      }
    });

    return params.toString();
  };

  const handleFilterChange = (newFilters: FilterState) => {
    startTransition(() => {
      const params = updateSearchParams({
        sort_by: newFilters.sortBy,
        year_from: newFilters.yearFrom,
        year_to: newFilters.yearTo,
        rating_from: newFilters.ratingFrom,
        rating_to: newFilters.ratingTo,
        page: "1", // Reset to page 1 when filters change
      });
      router.push(`?${params}`, { scroll: false });
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      const params = updateSearchParams({
        page: newPage,
      });
      router.push(`?${params}`, { scroll: false });
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-8">
      {/* Advanced Filter Section */}
      <div className="glass-strong rounded-2xl p-6 border border-border/50 shadow-xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Filter & Sort
            </span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your movie discovery experience
          </p>
        </div>
        <AdvancedFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="glass-strong rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-lg font-semibold">Loading movies...</p>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {movies.length > 0 ? (
            <>
              Showing {movies.length} movie{movies.length !== 1 ? "s" : ""}
            </>
          ) : (
            "No movies found"
          )}
        </div>
      </div>

      {/* Movies Grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="glass-strong rounded-2xl p-12 max-w-md mx-auto">
            <p className="text-2xl font-semibold mb-2">No movies found</p>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more results
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && movies.length > 0 && (
        <div className="flex items-center justify-center gap-2 flex-wrap pt-8">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isPending}
            className="p-2 rounded-lg glass-strong hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-muted-foreground"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                disabled={isPending}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "glass-strong hover:bg-primary/20"
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ),
          )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isPending}
            className="p-2 rounded-lg glass-strong hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Bottom Results Info */}
      {movies.length > 0 && (
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            Showing {movies.length} movies • Page {currentPage} of {totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
