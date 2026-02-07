import { Calendar, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "../types/tmdb";
import WatchlistButton from "./Watchlistbutton";

interface MovieCardHorizontalProps {
  movie: Movie;
}

export function MovieCardHorizontal({ movie }: MovieCardHorizontalProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/200x400";

  return (
    <div className="group glass hover:glass-strong transition-all duration-300 rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Movie Poster */}
        <div className="relative w-full sm:w-48 aspect-[2/3] flex-shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 192px"
          />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold text-white">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Movie Info */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {movie.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              {movie.original_language && (
                <span className="text-xs px-2 py-0.5 rounded-full glass">
                  {movie.original_language.toUpperCase()}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({movie.vote_count} votes)
                </span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base line-clamp-3 md:line-clamp-4 mb-4">
              {movie.overview || "No overview available."}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              {movie.popularity && (
                <span>Popularity: {Math.round(movie.popularity)}</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <WatchlistButton movie={movie} variant="button" />
              <Link
                href={`/movie/${movie.id}`}
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
