import { Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { tmdb } from "@/src/lib/tmdb";

export const revalidate = 3600; // Revalidate every 1 hour (ISR)

export default async function GenresPage() {
  // Fetch all genres
  const genresData = await tmdb.genres.movie_list();
  const genres = genresData.genres || [];

  // Fetch a sample movie for each genre to use as backdrop
  const genresWithImages = await Promise.all(
    genres.map(async (genre) => {
      try {
        const movies = await tmdb.discoverMovieFull({
          with_genres: genre.id.toString(),
          sort_by: "popularity.desc",
          page: 1,
        });
        console.log(`Fetched movies for genre: ${genre.name}`);
        return {
          ...genre,
          backdrop: movies.results[0]?.backdrop_path || null,
        };
      } catch (error) {
        return {
          ...genre,
          backdrop: null,
        };
      }
    }),
  );

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Film className="w-8 h-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Browse by Genre
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Explore movies by your favorite genres
        </p>
      </div>
      {/* Genres Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {genresWithImages.map((genre) => (
          <Link
            key={genre.id}
            href={`/genres/${genre.id}`}
            className="group relative overflow-hidden rounded-2xl glass hover:glass-strong transition-all duration-300 hover:scale-105 h-48"
          >
            {/* Background Image */}
            {genre.backdrop ? (
              <div className="absolute inset-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w780${genre.backdrop}`}
                  alt={genre.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            )}

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {genre.name}
              </h2>
              <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">
                Explore {genre.name.toLowerCase()} movies
              </p>
            </div>

            {/* Hover Arrow */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
        ))}
      </div>

      {/* Total Count */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          {genres.length} genres available
        </p>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export const metadata = {
  title: "Browse Movies by Genre | MovieDB",
  description:
    "Explore movies by genre - Action, Comedy, Drama, Horror, and more",
};
