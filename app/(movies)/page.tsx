import { HeroSection } from "@/components/HeroSection";
import { tmdb } from "@/src/lib/tmdb";

export const revalidate = 3600; // Revalidate every 1 hour (ISR)

export default async function Home() {
  const movies = await tmdb.movie_lists.now_playing();

  return (
    <div className="min-h-screen">
      <HeroSection movies={movies.results} />
    </div>
  );
}
