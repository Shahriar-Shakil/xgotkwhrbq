export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export type Cast = {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};
export type SortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "release_date.desc"
  | "release_date.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "title.asc"
  | "title.desc";
export interface FilterState {
  sortBy: SortOption;
  yearFrom: string;
  yearTo: string;
  ratingFrom: number;
  ratingTo: number;
}
export interface DiscoverMovieParams {
  sort_by?:
    | "popularity.asc"
    | "popularity.desc"
    | "release_date.asc"
    | "release_date.desc"
    | "vote_average.asc"
    | "vote_average.desc"
    | "title.asc"
    | "title.desc";
  page?: number;
  language?: string;
  with_genres?: string;
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  [key: string]: any;
}

export interface WatchlistResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface AccountStatesResponse {
  id: number;
  favorite: boolean;
  rated: boolean | { value: number };
  watchlist: boolean;
}

export interface WatchlistMoviesResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

export interface AccountDetailsResponse {
  id: number;
  username: string;
  name: string;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  avatar?: {
    gravatar?: { hash: string };
    tmdb?: { avatar_path: string | null };
  };
}
