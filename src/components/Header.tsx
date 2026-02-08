import { Film } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import LoginButton from "./LoginButton";
import { ModeToggle } from "./ModeToggle";
import MovieSearch from "./MovieSearch";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 z-50 w-full glass-strong border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Sidebar Trigger */}
            <SidebarTrigger className="shrink-0 hover:bg-slate-200/70 dark:hover:bg-white/10 rounded-lg transition-colors" />

            {/* Logo with Icon - Hidden on small mobile */}
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 shrink-0 group transition-all duration-200"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-500 to-purple-500 rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 p-1.5 rounded-lg shadow-md">
                  <Film className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-base md:text-lg font-black tracking-tight text-foreground dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  CINEPHILE
                </h1>
                <p className="text-[8px] font-semibold text-red-600 dark:text-red-500 tracking-widest uppercase -mt-0.5">
                  Movie DB
                </p>
              </div>
            </Link>

            {/* Search - Takes remaining space */}
            <div className="flex-1 min-w-0">
              <MovieSearch />
            </div>

            {/* Theme Toggle */}
            <div className="shrink-0">
              <ModeToggle />
            </div>

            {/* Login Button - Compact on mobile */}
            <div className="shrink-0">
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[73px]" aria-hidden="true" />
    </>
  );
}
