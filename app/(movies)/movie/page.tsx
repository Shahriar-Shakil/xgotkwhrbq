import { Film, Sparkles } from "lucide-react";
import { FilterState } from "@/src/components/AdvancedFilter";
import MoviesClient from "@/src/components/MoviesClient";
import { tmdb } from "@/src/lib/tmdb";

interface MoviesPageProps {
  searchParams: Promise<{
    page?: string;
    sort_by?: string;
    year_from?: string;
    year_to?: string;
    rating_from?: string;
    rating_to?: string;
  }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const resolvedSearchParams = await searchParams;

  const page = parseInt(resolvedSearchParams.page || "1");

  const filters: FilterState = {
    sortBy: (resolvedSearchParams.sort_by as any) || "popularity.desc",
    yearFrom: resolvedSearchParams.year_from || "",
    yearTo: resolvedSearchParams.year_to || "",
    ratingFrom: parseFloat(resolvedSearchParams.rating_from || "0"),
    ratingTo: parseFloat(resolvedSearchParams.rating_to || "10"),
  };

  // Build discover params
  const discoverParams: any = {
    sort_by: filters.sortBy,
    page: page,
  };

  // Add year filters
  if (filters.yearFrom) {
    discoverParams["primary_release_date.gte"] = `${filters.yearFrom}-01-01`;
  }
  if (filters.yearTo) {
    discoverParams["primary_release_date.lte"] = `${filters.yearTo}-12-31`;
  }

  // Add rating filters
  if (filters.ratingFrom > 0) {
    discoverParams["vote_average.gte"] = filters.ratingFrom;
  }
  if (filters.ratingTo < 10) {
    discoverParams["vote_average.lte"] = filters.ratingTo;
  }

  // Fetch movies with filters
  const moviesData = await tmdb.discoverMovieFull(discoverParams);

  const movies = moviesData.results || [];
  const totalPages = Math.min(moviesData.total_pages || 1, 500); // TMDB limits to 500 pages

  // Determine page title based on filters
  const getPageTitle = () => {
    if (filters.yearFrom && filters.yearTo) {
      return `Movies from ${filters.yearFrom} to ${filters.yearTo}`;
    }
    if (filters.yearFrom) {
      return `Movies from ${filters.yearFrom} onwards`;
    }
    if (filters.yearTo) {
      return `Movies up to ${filters.yearTo}`;
    }
    return "Discover Movies";
  };

  const getPageDescription = () => {
    const parts = [];

    if (filters.yearFrom || filters.yearTo) {
      parts.push("filtered by year");
    }
    if (filters.ratingFrom > 0 || filters.ratingTo < 10) {
      parts.push(`ratings ${filters.ratingFrom}–${filters.ratingTo}`);
    }

    if (parts.length > 0) {
      return `Explore curated movies ${parts.join(" and ")}`;
    }

    return "Explore thousands of movies with advanced filtering and sorting";
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <Film className="w-8 h-8 text-primary" />
            <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {getPageTitle()}
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">{getPageDescription()}</p>
      </div>

      {/* Client Component with Filters */}
      <MoviesClient
        initialMovies={movies}
        initialPage={page}
        initialTotalPages={totalPages}
        initialFilters={filters}
      />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }: MoviesPageProps) {
  const resolvedSearchParams = await searchParams;

  const hasFilters =
    resolvedSearchParams.year_from ||
    resolvedSearchParams.year_to ||
    resolvedSearchParams.rating_from ||
    resolvedSearchParams.rating_to;

  const title = hasFilters
    ? "Filtered Movies | MovieDB"
    : "Discover Movies | MovieDB";
  const description = hasFilters
    ? "Browse movies with custom filters - year range, ratings, and sorting options"
    : "Discover and explore thousands of movies. Filter by year, rating, and sort by popularity, release date, or title.";

  return {
    title,
    description,
  };
}
