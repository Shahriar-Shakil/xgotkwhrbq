import { Calendar, Clock, Globe, Star } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CastList } from "@/src/components/CastList";
import { MovieCarouselSection } from "@/src/components/MovieCarouselSection";
import RecentlyViewedTracker from "@/src/components/RecentlyViewedTracker";
import { tmdb } from "@/src/lib/tmdb";

interface MovieDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const movieId = parseInt((await params).id);

  // Fetch movie details
  const movie = await tmdb.movies.details({ movie_id: movieId });

  if (!movie) {
    notFound();
  }

  // Fetch similar movies
  const similarMovies = await tmdb.movies.similar({ movie_id: movieId });

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-400";
    if (rating >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  // Get backdrop and poster URLs
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";
  const mobileBackdropUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : "";
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "";
  console.log("mobileBackdropUrl", mobileBackdropUrl);
  const result = await tmdb.movies.credits({ movie_id: movieId });

  const cast = result?.cast || [];
  return (
    <>
      <RecentlyViewedTracker
        movie={{
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
        }}
      />

      <div className="min-h-screen">
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            {backdropUrl && (
              <Image
                src={backdropUrl}
                alt={movie.title}
                fill
                className="object-cover object-center hidden md:block transition-opacity duration-700 ease-in-out"
                priority
                quality={90}
              />
            )}
            {mobileBackdropUrl && (
              <Image
                src={mobileBackdropUrl}
                alt={movie.title}
                fill
                className={
                  "object-cover object-center block md:hidden transition-opacity duration-700 ease-in-out "
                }
                priority
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 h-full flex items-end pb-12 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl w-full mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-end">
                <div className="flex-shrink-0">
                  <div className="relative hidden md:block w-48 h-48 md:w-64 md:h-96 rounded-xl overflow-hidden glass border-2 border-primary/30 shadow-2xl">
                    {posterUrl && (
                      <Image
                        src={posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 192px, 256px"
                      />
                    )}
                  </div>
                </div>

                <div className="flex-1 space-y-4 pb-4">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2 glass-subtle px-3 py-1.5 rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 glass-subtle px-3 py-1.5 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {formatRuntime(movie.runtime)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 glass-subtle px-3 py-1.5 rounded-full">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-medium uppercase">
                        {movie.original_language || "N/A"}
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-2 glass-subtle px-3 py-1.5 rounded-full ${getRatingColor(
                        movie.vote_average || 0,
                      )}`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2">
                    {movie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 rounded-full glass-subtle text-sm text-white/90 border border-white/20"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-4 py-12 md:px-8 lg:px-12 md:py-16">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Overview
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                {movie.overview || "No overview available."}
              </p>
            </section>

            {/* Cast */}
            <CastList cast={cast} initialCount={12} />

            {/* Additional Info */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Status
                </h3>
                <p className="text-lg font-bold">{movie.status || "N/A"}</p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Release Date
                </h3>
                <p className="text-lg font-bold">
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Budget
                </h3>
                <p className="text-lg font-bold">
                  {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Revenue
                </h3>
                <p className="text-lg font-bold">
                  {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
                </p>
              </div>
            </section>

            {/* Similar Movies */}
            {similarMovies.results.length > 0 && (
              <section className="pt-8">
                <MovieCarouselSection
                  listType="similar"
                  title="Similar Movies"
                  initialMovies={similarMovies.results.sort(
                    (a, b) => b.popularity - a.popularity,
                  )}
                  initialPage={1}
                />
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata(
  { params }: MovieDetailsPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const movieId = await parseInt((await params).id);
  const movie = await tmdb.movies.details({ movie_id: movieId });
  if (!movie) {
    return {
      title: "Movie Not Found",
    };
  }

  return {
    title: `${movie.title} (${movie.release_date ? new Date(movie.release_date).getFullYear() : ""}) | MovieDB`,
    description: movie.overview || `Watch ${movie.title} on MovieDB`,
    openGraph: {
      title: movie.title,
      description: movie.overview || undefined,
      images: movie.backdrop_path
        ? [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`]
        : [],
    },
  };
}
