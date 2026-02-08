"use client";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Bookmark, Clock, LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { auth } from "@/src/lib/firebase";
import { useAuth } from "../providers/authContext";

export default function LoginButton() {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* User Avatar Button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 p-1.5 md:p-2 rounded-full glass-strong hover:bg-slate-200/70 dark:hover:bg-white/10 border border-border/50 transition-all duration-200"
          aria-label="User menu"
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          )}
          {/* Show name only on desktop */}
          <span className="hidden lg:block text-sm font-semibold text-black dark:text-white max-w-[100px] truncate">
            {user.displayName?.split(" ")[0] || "User"}
          </span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 glass-strong border border-border/50 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* User Info */}
            <div className="p-4 border-b border-border/50 bg-slate-50/50 dark:bg-white/5">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center shadow-md">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground dark:text-white truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/watchlist"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white transition-colors"
              >
                <Bookmark className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium">Watch List</span>
              </Link>

              <Link
                href="/recently-viewed"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white transition-colors"
              >
                <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium">Recently Viewed</span>
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-border/50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white px-3 md:px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-red-500/30 dark:shadow-red-500/20"
    >
      <LogIn className="w-4 h-4" />
      <span className="hidden sm:inline">Sign In</span>
    </button>
  );
}
