import Link from "next/link";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import LoginButton from "./LoginButton";
import MovieSearch from "./MovieSearch";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Sidebar Trigger */}
            <SidebarTrigger className="shrink-0" />

            {/* Logo - Hidden on small mobile */}
            <Link href="/" className="hidden sm:block shrink-0">
              <h1 className="text-lg md:text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                CINEPHILE
              </h1>
            </Link>

            {/* Search - Takes remaining space */}
            <div className="flex-1 min-w-0">
              <MovieSearch />
            </div>

            {/* Login Button - Compact on mobile */}
            <div className="shrink-0">
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-18.25" aria-hidden="true" />
    </>
  );
}
