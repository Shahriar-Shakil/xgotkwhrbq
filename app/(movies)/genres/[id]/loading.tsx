export default function GenreDetailLoading() {
  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-muted/50 rounded" />
          <div className="h-12 w-80 bg-muted/50 rounded-lg" />
        </div>
        <div className="h-6 w-96 bg-muted/50 rounded-lg" />
      </div>

      {/* Sort & Page Info Skeleton */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="h-5 w-32 bg-muted/50 rounded" />
        <div className="h-12 w-60 bg-muted/50 rounded-xl" />
      </div>

      {/* Movies Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="glass rounded-xl overflow-hidden">
            {/* Poster Skeleton */}
            <div className="aspect-[2/3] bg-muted/40" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center gap-2 flex-wrap pt-8">
        <div className="w-10 h-10 bg-muted/50 rounded-lg" />
        <div className="w-10 h-10 bg-muted/50 rounded-lg" />
        <div className="w-10 h-10 bg-muted/50 rounded-lg" />
        <div className="w-10 h-10 bg-muted/50 rounded-lg" />
        <div className="w-10 h-10 bg-muted/50 rounded-lg" />
      </div>

      {/* Results Info Skeleton */}
      <div className="text-center pt-4">
        <div className="h-4 w-64 bg-muted/50 rounded mx-auto" />
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          style={{
            animation: "shimmer 2s infinite",
          }}
        />
      </div>
    </div>
  );
}
