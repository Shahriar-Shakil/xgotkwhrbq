"use client";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/src/lib/firebase";
import { useAuth } from "../providers/AuthContext";

export default function LoginButton() {
  const { user } = useAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Hi, {user.displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="text-xs bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
    >
      Sign in with Google
    </button>
  );
}
