import { Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { SearchEmpty } from "@/src/components/SearchEmpty";
import { SearchLoading } from "@/src/components/SearchLoading";
import { SearchResults } from "@/src/components/SearchResults";
import { tmdb } from "@/src/lib/tmdb";
import { Movie } from "@/src/types/tmdb";

async function searchMovies(
  query: string,
  page: number = 1,
): Promise<{ movies: Movie[]; totalPages: number; totalResults: number }> {
  if (!query) return { movies: [], totalPages: 0, totalResults: 0 };

  try {
    const response = await tmdb.search.movies({
      query,
      page,
      include_adult: false,
    });

    return {
      movies: response.results || [],
      totalPages: response.total_pages || 0,
      totalResults: response.total_results || 0,
    };
  } catch (error) {
    console.error("Search error:", error);
    return { movies: [], totalPages: 0, totalResults: 0 };
  }
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

async function SearchContent({ query, page }: { query: string; page: number }) {
  const { movies, totalPages, totalResults } = await searchMovies(query, page);

  if (movies.length === 0) {
    return <SearchEmpty query={query} />;
  }

  return (
    <SearchResults
      movies={movies}
      query={query}
      currentPage={page}
      totalPages={totalPages}
      totalResults={totalResults}
    />
  );
}

function NoQueryState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="glass rounded-full p-8 mb-6">
        <Search className="w-16 h-16 text-muted-foreground" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Search Movies
      </h1>

      <p className="text-muted-foreground max-w-md mb-8 text-lg">
        Type a movie title in the search bar above to discover your next
        favorite film
      </p>

      <div className="glass rounded-lg p-6 max-w-md">
        <h3 className="font-semibold mb-3">Popular searches:</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            "Inception",
            "The Matrix",
            "Interstellar",
            "The Dark Knight",
            "Pulp Fiction",
          ].map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="px-4 py-2 glass-strong hover:bg-primary hover:text-primary-foreground rounded-full text-sm transition-all"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const page = parseInt(params.page || "1", 10);

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <NoQueryState />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<SearchLoading />}>
        <SearchContent query={query} page={page} />
      </Suspense>
    </div>
  );
}

// Generate metadata
export async function generateMetadata({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  return {
    title: query
      ? `Search: ${query} | Movie Database`
      : "Search | Movie Database",
    description: query ? `Search results for "${query}"` : "Search for movies",
  };
}
