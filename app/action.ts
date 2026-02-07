"use server";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";

// Add to watchlist
export async function addToWatchlist(userId: string, movie: any) {
  try {
    const movieRef = doc(db, "users", userId, "watchlist", movie.id.toString());

    await setDoc(movieRef, {
      movieId: movie.id,
      title: movie.title || movie.name,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date,
      addedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error: any) {
    console.error("Firestore Error:", error);
    return { success: false, error: error.message };
  }
}

// Remove from watchlist
export async function removeFromWatchlist(userId: string, movieId: number) {
  try {
    const movieRef = doc(db, "users", userId, "watchlist", movieId.toString());
    await deleteDoc(movieRef);

    return { success: true };
  } catch (error: any) {
    console.error("Firestore Error:", error);
    return { success: false, error: error.message };
  }
}

// Check if single movie is in watchlist
export async function isMovieInWatchlist(
  userId: string,
  movieId: number,
): Promise<boolean> {
  try {
    const movieRef = doc(db, "users", userId, "watchlist", movieId.toString());
    const movieDoc = await getDoc(movieRef);
    return movieDoc.exists();
  } catch (error) {
    console.error("Firestore Error:", error);
    return false;
  }
}

//  Get all watchlist movie IDs at o
export async function getUserWatchlistIds(userId: string): Promise<number[]> {
  try {
    const watchlistRef = collection(db, "users", userId, "watchlist");
    const snapshot = await getDocs(watchlistRef);

    return snapshot.docs.map((doc) => parseInt(doc.id));
  } catch (error) {
    console.error("Firestore Error:", error);
    return [];
  }
}

// Get full watchlist for display
export async function getUserWatchlist(userId: string) {
  try {
    const watchlistRef = collection(db, "users", userId, "watchlist");
    const snapshot = await getDocs(watchlistRef);

    return snapshot.docs.map((doc) => ({
      id: parseInt(doc.id),
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Firestore Error:", error);
    return [];
  }
}
