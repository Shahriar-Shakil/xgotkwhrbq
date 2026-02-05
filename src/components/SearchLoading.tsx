export function SearchLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-10 w-64 bg-muted/50 rounded-lg animate-pulse" />
          <div className="h-5 w-48 bg-muted/30 rounded-lg animate-pulse" />
        </div>
        <div className="h-12 w-24 bg-muted/50 rounded-lg animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[2/3] bg-muted/50 rounded-xl animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-muted/30 rounded animate-pulse" />
              <div className="h-3 w-2/3 bg-muted/20 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
