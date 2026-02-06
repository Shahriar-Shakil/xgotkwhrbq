"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Movie } from "../types/tmdb";
import { FilterState, SortOption } from "./AdvancedFilter";
import { MovieCard } from "./Moviecard";
import SortFilter from "./SortFilter";

interface GenreDetailClientProps {
  genreName: string;
  genreId: string;
  initialMovies: Movie[];
  initialPage: number;
  initialTotalPages: number;
  initialFilters: FilterState;
}

export default function GenreDetailClient({
  genreName,
  genreId,
  initialMovies,
  initialPage,
  initialTotalPages,
  initialFilters,
}: GenreDetailClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const movies = initialMovies;
  const currentPage = initialPage;
  const totalPages = initialTotalPages;
  const sortBy = initialFilters.sortBy;

  // Helper function to update URL params
  const updateSearchParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    return params.toString();
  };

  const handleSortChange = (newSort: SortOption) => {
    startTransition(() => {
      const params = updateSearchParams({
        sort_by: newSort,
        page: "1", // Reset to page 1 when sorting changes
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
      {/* Sort Filter */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
        </div>
        <SortFilter currentSort={sortBy} onSortChange={handleSortChange} />
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

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 flex-wrap pt-8">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isPending}
            className="p-2 rounded-lg glass-strong hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Showing {movies.length} movies • Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
}
