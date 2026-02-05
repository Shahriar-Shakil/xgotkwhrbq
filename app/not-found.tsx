import { ArrowLeft, Film, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Film className="w-24 h-24 md:w-32 md:h-32 text-primary animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <div className="glass rounded-3xl p-8 md:p-12 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Oops! Movie Not Found
          </h2>

          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for seems to have left the theater. Let's
            get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-105 shadow-lg shadow-primary/30"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 glass-strong hover:glass border border-border px-6 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-105"
            >
              <Search className="w-5 h-5" />
              <span>Search Movies</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              Or explore these sections:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/now-playing"
                className="text-sm px-4 py-2 rounded-lg glass-subtle hover:glass transition-all"
              >
                Now Playing
              </Link>
              <Link
                href="/top-rated"
                className="text-sm px-4 py-2 rounded-lg glass-subtle hover:glass transition-all"
              >
                Top Rated
              </Link>
              <Link
                href="/trending"
                className="text-sm px-4 py-2 rounded-lg glass-subtle hover:glass transition-all"
              >
                Trending
              </Link>
              <Link
                href="/upcoming"
                className="text-sm px-4 py-2 rounded-lg glass-subtle hover:glass transition-all"
              >
                Upcoming
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Message */}
        <p className="mt-8 text-sm text-muted-foreground/60 italic">
          "Even the best directors have movies that never make it to theaters."
          🎬
        </p>
      </div>
    </div>
  );
}
