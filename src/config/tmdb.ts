import { TMDB } from "@lorenzopant/tmdb";

const apiKey = process.env.TMDB_API_KEY!;

export const tmdb = new TMDB(apiKey);
