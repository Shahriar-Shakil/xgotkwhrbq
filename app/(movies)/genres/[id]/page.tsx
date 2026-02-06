import { Film } from "lucide-react";
import { notFound } from "next/navigation";
import { FilterState } from "@/src/components/AdvancedFilter";
import GenreDetailClient from "@/src/components/GenreDetailsClient";
import { tmdb } from "@/src/lib/tmdb";

interface GenreDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sort_by?: string;
    year_from?: string;
    year_to?: string;
    rating_from?: string;
    rating_to?: string;
  }>;
}

export default async function GenreDetailPage({
  params,
  searchParams,
}: GenreDetailPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const genreId = parseInt(resolvedParams.id);
  const page = parseInt(resolvedSearchParams.page || "1");

  const filters: FilterState = {
    sortBy: (resolvedSearchParams.sort_by as any) || "popularity.desc",
    yearFrom: resolvedSearchParams.year_from || "",
    yearTo: resolvedSearchParams.year_to || "",
    ratingFrom: parseFloat(resolvedSearchParams.rating_from || "0"),
    ratingTo: parseFloat(resolvedSearchParams.rating_to || "10"),
  };

  // Fetch genre list to get genre name
  const genresData = await tmdb.genres.movie_list();
  const genre = genresData.genres?.find((g) => g.id === genreId);

  if (!genre) {
    notFound();
  }

  // Build discover params
  const discoverParams: any = {
    with_genres: genreId,
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

  // Fetch movies for this genre with filters
  const moviesData = await tmdb.discoverMovieFull(discoverParams);

  const movies = moviesData.results || [];
  const totalPages = Math.min(moviesData.total_pages || 1, 500); // TMDB limits to 500 pages

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Film className="w-8 h-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {genre.name} Movies
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Explore the best {genre.name.toLowerCase()} movies
        </p>
      </div>

      <GenreDetailClient
        genreName={genre.name}
        genreId={genreId.toString()}
        initialMovies={movies}
        initialPage={page}
        initialTotalPages={totalPages}
        initialFilters={filters}
      />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: GenreDetailPageProps) {
  const resolvedParams = await params;
  const genreId = parseInt(resolvedParams.id);
  const genresData = await tmdb.genres.movie_list();
  const genre = genresData.genres?.find((g) => g.id === genreId);

  if (!genre) {
    return {
      title: "Genre Not Found",
    };
  }

  return {
    title: `${genre.name} Movies | MovieDB`,
    description: `Browse and discover the best ${genre.name.toLowerCase()} movies. Sort by popularity, rating, release date, or title. Filter by year and rating.`,
  };
}
