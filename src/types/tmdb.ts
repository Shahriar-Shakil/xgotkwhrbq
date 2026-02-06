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
