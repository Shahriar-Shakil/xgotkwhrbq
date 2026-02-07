"use client";

import { Calendar, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/src/types/tmdb";
import WatchlistButton from "./Watchlistbutton";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/200x400";

  return (
    <div className="group relative overflow-hidden rounded-xl glass hover:glass-strong transition-all duration-300  hover:-translate-y-2">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <Link href={`/movie/${movie.id}`}>
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Right - Rating & Watchlist */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-10">
          {/* Rating Badge */}
          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold text-white">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Watchlist Button */}
          <WatchlistButton movie={movie} variant="icon" />
        </div>

        {/* Hover Content */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
            {movie.title}
          </h3>

          <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
            <Calendar className="w-4 h-4" />
            <span>
              {movie?.release_date
                ? new Date(movie?.release_date).getFullYear()
                : "Unknown Year"}
            </span>
          </div>

          <Link
            href={`/movie/${movie.id}`}
            className="w-full inline-block text-center bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-lg font-medium transition-all hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
