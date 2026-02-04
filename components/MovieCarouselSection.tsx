"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { MovieCard } from "@/components/Moviecard";
import { Button } from "@/components/ui/button";
import { useTmdb } from "@/src/providers/tmdb-provider";
import { Movie } from "@/src/types/tmdb";

type ListType = "top-rated" | "popular" | "upcoming";

interface MovieCarouselSectionProps {
  title: string;
  listType: ListType;
  initialMovies: Movie[];
  initialPage: number;
}

export function MovieCarouselSection({
  title,
  listType,
  initialMovies,
  initialPage,
}: MovieCarouselSectionProps) {
  const tmdb = useTmdb();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [movies, setMovies] = React.useState<Movie[]>(initialMovies);
  const [page, setPage] = React.useState(initialPage);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const fetchNextPage = React.useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const nextPage = page + 1;
    if (listType === "top-rated") {
      const response = await tmdb.movie_lists.top_rated({
        page: nextPage,
      });
      if (!response?.results || response.results.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...response.results]);
        setPage(nextPage);
      }

      setLoading(false);
    } else if (listType === "popular") {
      const response = await tmdb.movie_lists.popular({
        page: nextPage,
      });
      if (!response?.results || response.results.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...response.results]);
        setPage(nextPage);
      }
      setLoading(false);
    } else if (listType === "upcoming") {
      const response = await tmdb.movie_lists.upcoming({
        page: nextPage,
      });
      if (!response?.results || response.results.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...response.results]);
        setPage(nextPage);
      }
      setLoading(false);
    }
  }, [tmdb, listType, page, loading, hasMore]);

  //  Trigger fetch when carousel reaches the end
  React.useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      if (!emblaApi.canScrollNext()) {
        fetchNextPage();
      }
    };

    emblaApi.on("scroll", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, fetchNextPage]);
  return (
    <section className=" w-full space-y-4 py-10">
      <div className=" mx-auto px-4 md:px-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between ">
          <h2 className="text-lg font-semibold md:text-2xl">{title}</h2>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-x-hidden ">
          <div className="flex gap-4 ">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_15%]"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
            {loading && (
              <div className="flex items-center justify-center px-6 text-sm text-muted-foreground">
                Loading…
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
