import { GenreSection } from "@/src/components/GenreSection";
import { HeroSection } from "@/src/components/HeroSection";
import { MovieCarouselSection } from "@/src/components/MovieCarouselSection";
import { tmdb } from "@/src/lib/tmdb";

export const revalidate = 3600; // Revalidate every 1 hour (ISR)

export default async function Home() {
  const [movies, topRated, popular, genres] = await Promise.all([
    tmdb.movie_lists.now_playing(),
    tmdb.movie_lists.top_rated({ page: 1 }),
    tmdb.movie_lists.popular({ page: 1 }),
    tmdb.genres.movie_list(),
  ]);

  const genreMoviesPromises = genres.genres.map(async (genre) => {
    const genreMovies = await tmdb.discoverMovieFull({
      with_genres: genre.id.toString(),
      sort_by: "vote_average.desc",
      "vote_count.gte": 1000,
      page: 1,
    });
    return {
      genre,
      movies: genreMovies.results.slice(0, 10),
    };
  });

  const genreMovies = await Promise.all(genreMoviesPromises);

  return (
    <div className="min-h-screen top-0">
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

      {/* Top 5 Movies per Genre */}
      {genreMovies.map(({ genre, movies }) => (
        <MovieCarouselSection
          key={genre.id}
          title={`Top ${genre.name} Movies`}
          listType="genre"
          initialMovies={movies}
          initialPage={1}
        />
      ))}
    </div>
  );
}
