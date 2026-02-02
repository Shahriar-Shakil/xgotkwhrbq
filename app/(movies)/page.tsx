import Image from "next/image";
import { MovieCard } from "@/components/Moviecard";
import { tmdb } from "@/src/lib/tmdb";

export const revalidate = 3600; // Revalidate every 1 hour (ISR)

export default async function Home() {
  const movies = await tmdb.movie_lists.now_playing();

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Now Playing
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover the latest movies in theaters
        </p>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Results Count */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Showing {movies.results.length} of {movies.total_results} movies
        </p>
      </div>
    </div>
  );
}
