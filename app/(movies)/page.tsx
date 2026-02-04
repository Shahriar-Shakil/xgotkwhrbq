import { GenreSection } from "@/src/components/GenreSection";
import { HeroSection } from "@/src/components/HeroSection";
import { MovieCarouselSection } from "@/src/components/MovieCarouselSection";
import { tmdb } from "@/src/lib/tmdb";

export const revalidate = 3600; // Revalidate every 1 hour (ISR)

export default async function Home() {
  const movies = await tmdb.movie_lists.now_playing();
  const topRated = await tmdb.movie_lists.top_rated({ page: 1 });
  const popular = await tmdb.movie_lists.popular({ page: 1 });
  const upcoming = await tmdb.movie_lists.upcoming({ page: 1 });
  const genres = await tmdb.genres.movie_list();
  // console.log("Genres:", genres);
  return (
    <div className="min-h-screen">
      <HeroSection movies={movies.results} />
      <GenreSection genres={genres.genres} />
      <MovieCarouselSection
        title="Top Rated"
        listType="top-rated"
        initialMovies={topRated.results}
        initialPage={1}
      />
      <MovieCarouselSection
        title="Popular"
        listType="popular"
        initialMovies={popular.results}
        initialPage={1}
      />
      <MovieCarouselSection
        title="Upcoming"
        listType="upcoming"
        initialMovies={upcoming.results}
        initialPage={1}
      />
    </div>
  );
}
