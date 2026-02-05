"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Calendar, ChevronLeft, ChevronRight, Globe, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_language: string;
}

interface HeroSectionProps {
  movies: Movie[];
}

export function HeroSection({ movies }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    slidesToScroll: 1,
  });

  const currentMovie = movies[currentIndex];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();

    // Trigger transition effect
    if (newIndex !== currentIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setIsTransitioning(false);
      }, 150);
    }
  }, [emblaApi, currentIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const backdropUrl = currentMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : "";

  return (
    <div className="relative w-full h-full md:h-[80vh] lg:h-[85vh] overflow-hidden">
      <div className="absolute inset-0 -top-1/2 md:top-0">
        <Image
          key={currentIndex}
          src={backdropUrl}
          alt={currentMovie?.title || "Movie backdrop"}
          fill
          className={cn(
            "object-contain md:object-cover object-center transition-opacity duration-700 ease-in-out",
            isTransitioning ? "opacity-0" : "opacity-100",
          )}
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end py-20 md:pb-16 lg:pb-20 px-4 md:px-8 lg:px-12">
        <div className="container w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 glass-strong px-4 py-2 rounded-full w-fit">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white font-semibold text-sm uppercase tracking-wide">
                  Now Playing in Theaters
                </span>
              </div>

              {/* Title */}
              <h1
                className={cn(
                  "text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight drop-shadow-2xl transition-opacity duration-300",
                  isTransitioning ? "opacity-0" : "opacity-100",
                )}
              >
                {currentMovie?.title}
              </h1>

              {/* Meta Information */}
              <div
                className={cn(
                  "flex flex-wrap items-center gap-2 md:gap-4 text-white/90 transition-opacity duration-300",
                  isTransitioning ? "opacity-0" : "opacity-100",
                )}
              >
                <div className="flex items-center gap-2 glass-subtle px-3 py-1.5 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {currentMovie?.release_date
                      ? new Date(currentMovie.release_date).getFullYear()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-2 glass-subtle px-3 py-1.5 rounded-full">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase">
                    {currentMovie?.original_language || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-2 glass-subtle px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-bold">
                    {currentMovie?.vote_average
                      ? currentMovie.vote_average.toFixed(1)
                      : "N/A"}
                  </span>
                </div>
              </div>

              <p
                className={cn(
                  "text-white/80 text-sm md:text-base lg:text-lg leading-relaxed line-clamp-2 md:line-clamp-3 max-w-2xl drop-shadow-lg transition-opacity duration-300",
                  isTransitioning ? "opacity-0" : "opacity-100",
                )}
              >
                {currentMovie?.overview}
              </p>

              <div>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-xl shadow-primary/30">
                  Know More
                </button>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 glass-strong hover:bg-primary/80 p-3 rounded-full transition-all hover:scale-110"
                aria-label="Previous movie"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 glass-strong hover:bg-primary/80 p-3 rounded-full transition-all hover:scale-110"
                aria-label="Next movie"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 items-center">
                  {movies.map((movie, index) => {
                    const isActive = index === currentIndex;
                    const posterUrl = movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "";

                    return (
                      <div
                        key={movie.id}
                        className={cn(
                          "flex-shrink-0 relative overflow-hidden rounded-lg transition-all duration-500 cursor-pointer group",
                          isActive
                            ? "w-32 h-48 md:w-40 md:h-60 lg:w-44 lg:h-64 scale-100 opacity-100"
                            : "w-32 h-48 md:w-40 md:h-60 lg:w-44 lg:h-64 scale-90 opacity-60 hover:opacity-70",
                        )}
                        onClick={() => emblaApi?.scrollTo(index)}
                      >
                        <Image
                          src={posterUrl}
                          alt={movie.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 40vw, 20vw"
                        />

                        {isActive && (
                          <div className="absolute inset-0 ring-4 ring-primary rounded-lg pointer-events-none" />
                        )}

                        {!isActive && (
                          <div className="absolute inset-0 bg-black/60 transition-opacity group-hover:bg-black/40" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {movies
                  .slice(0, Math.min(movies.length, 10))
                  .map((_, index) => (
                    <button
                      key={index}
                      onClick={() => emblaApi?.scrollTo(index)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        index === currentIndex
                          ? "w-8 bg-primary"
                          : "w-1.5 bg-white/40 hover:bg-white/60",
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                {movies.length > 10 && (
                  <span className="text-white/60 text-xs self-center ml-2">
                    +{movies.length - 10} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
