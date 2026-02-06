import { TMDB } from "@lorenzopant/tmdb";
import {
  AccountDetailsResponse,
  AccountStatesResponse,
  DiscoverMovieParams,
  WatchlistMoviesResponse,
  WatchlistResponse,
} from "../types/tmdb";

const apiKey = process.env.TMDB_API_KEY!;

class ExtendedTMDB extends TMDB {
  async discoverMovieFull(params: DiscoverMovieParams) {
    const baseUrl = "https://api.themoviedb.org/3/discover/movie";
    const queryParams = new URLSearchParams();

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

  async getAccountDetails(sessionId: string): Promise<AccountDetailsResponse> {
    const url = `https://api.themoviedb.org/3/account?session_id=${sessionId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch account details: ${response.statusText}`,
      );
    }

    return response.json();
  }

  async toggleWatchlist(
    accountId: string,
    sessionId: string,
    movieId: number,
    addToWatchlist: boolean,
  ): Promise<WatchlistResponse> {
    const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        watchlist: addToWatchlist,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update watchlist: ${response.statusText}`);
    }

    return response.json();
  }

  async getWatchlistMovies(
    accountId: string,
    sessionId: string,
    page: number = 1,
  ): Promise<WatchlistMoviesResponse> {
    const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?session_id=${sessionId}&page=${page}&sort_by=created_at.desc`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch watchlist: ${response.statusText}`);
    }

    return response.json();
  }

  async getMovieAccountStates(
    movieId: number,
    sessionId: string,
  ): Promise<AccountStatesResponse> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/account_states?session_id=${sessionId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch account states: ${response.statusText}`);
    }

    return response.json();
  }

  async checkMovieInWatchlist(
    movieId: number,
    sessionId: string,
  ): Promise<boolean> {
    try {
      const states = await this.getMovieAccountStates(movieId, sessionId);
      return states.watchlist === true;
    } catch (error) {
      console.error("Error checking watchlist status:", error);
      return false;
    }
  }
}

export const tmdb = new ExtendedTMDB(apiKey) as ExtendedTMDB & TMDB;

export type {
  DiscoverMovieParams,
  WatchlistResponse,
  AccountStatesResponse,
  WatchlistMoviesResponse,
  AccountDetailsResponse,
};
