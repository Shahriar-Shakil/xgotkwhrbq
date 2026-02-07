import { Bookmark } from "lucide-react";

export default function WatchlistLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="w-8 h-8 text-red-500 animate-pulse" />
        <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] bg-white/10 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
