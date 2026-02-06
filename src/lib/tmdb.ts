import { TMDB } from "@lorenzopant/tmdb";

const apiKey = process.env.TMDB_API_KEY!;

interface DiscoverMovieParams {
  sort_by?:
    | "popularity.asc"
    | "popularity.desc"
    | "release_date.asc"
    | "release_date.desc"
    | "vote_average.asc"
    | "vote_average.desc"
    | "title.asc"
    | "title.desc";

  // Pagination
  page?: number;
  language?: string;

  // Genres
  with_genres?: string;

  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;

  "vote_average.gte"?: number;
  "vote_average.lte"?: number;

  [key: string]: any;
}

class ExtendedTMDB extends TMDB {
  async discoverMovieFull(params: DiscoverMovieParams) {
    const baseUrl = "https://api.themoviedb.org/3/discover/movie";

    // Build query params
    const queryParams = new URLSearchParams();

    // Add all params to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });

    const url = `${baseUrl}?${queryParams.toString()}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching from TMDB discover:", error);
      throw error;
    }
  }
}

// Export extended instance
export const tmdb = new ExtendedTMDB(apiKey) as ExtendedTMDB & TMDB;

// Export types
export type { DiscoverMovieParams };
