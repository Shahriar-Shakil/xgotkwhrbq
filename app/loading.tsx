export default function Loading() {
  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="h-12 w-64 bg-muted/50 rounded-lg mb-3 animate-pulse" />
        <div className="h-6 w-96 bg-muted/30 rounded-lg animate-pulse" />
      </div>

      {/* Movie Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="relative overflow-hidden rounded-xl glass">
            {/* Poster Skeleton */}
            <div className="aspect-[2/3] bg-muted/40 animate-pulse" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}
