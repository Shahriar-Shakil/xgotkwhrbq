export default function MovieDetailsLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-muted/30">
        {/* Backdrop Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        {/* Content Skeleton */}
        <div className="relative z-10 h-full flex items-end pb-12 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl w-full mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              {/* Poster Skeleton */}
              <div className="flex-shrink-0">
                <div className="w-48 h-72 md:w-64 md:h-96 rounded-xl glass border-2 border-border/30 bg-muted/50" />
              </div>

              {/* Info Skeleton */}
              <div className="flex-1 space-y-4 pb-4">
                {/* Title */}
                <div className="h-12 md:h-16 bg-muted/50 rounded-lg w-3/4 max-w-2xl" />

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4">
                  <div className="h-8 w-24 bg-muted/50 rounded-full" />
                  <div className="h-8 w-24 bg-muted/50 rounded-full" />
                  <div className="h-8 w-20 bg-muted/50 rounded-full" />
                  <div className="h-8 w-20 bg-muted/50 rounded-full" />
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  <div className="h-7 w-20 bg-muted/50 rounded-full" />
                  <div className="h-7 w-24 bg-muted/50 rounded-full" />
                  <div className="h-7 w-28 bg-muted/50 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section Skeleton */}
      <div className="px-4 py-12 md:px-8 lg:px-12 md:py-16">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Overview Skeleton */}
          <section>
            <div className="h-8 w-32 bg-muted/50 rounded-lg mb-4" />
            <div className="space-y-3 max-w-4xl">
              <div className="h-5 bg-muted/50 rounded w-full" />
              <div className="h-5 bg-muted/50 rounded w-full" />
              <div className="h-5 bg-muted/50 rounded w-4/5" />
              <div className="h-5 bg-muted/50 rounded w-3/4" />
            </div>
          </section>

          {/* Cast Skeleton */}
          <section>
            <div className="h-8 w-24 bg-muted/50 rounded-lg mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="glass rounded-xl p-4">
                  {/* Profile Image Skeleton */}
                  <div className="w-full aspect-square rounded-lg bg-muted/50 mb-3" />
                  {/* Name Skeleton */}
                  <div className="h-4 bg-muted/50 rounded w-3/4 mb-2" />
                  {/* Character Skeleton */}
                  <div className="h-3 bg-muted/50 rounded w-1/2" />
                </div>
              ))}
            </div>
          </section>

          {/* Additional Info Cards Skeleton */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass rounded-xl p-6">
                <div className="h-4 w-20 bg-muted/50 rounded mb-2" />
                <div className="h-6 w-32 bg-muted/50 rounded" />
              </div>
            ))}
          </section>

          {/* Similar Movies Skeleton */}
          <section className="pt-8">
            <div className="h-8 w-48 bg-muted/50 rounded-lg mb-6" />
            <div className="flex gap-4 md:gap-6 overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[160px] md:w-[200px] lg:w-[240px]"
                >
                  {/* Movie Card Skeleton */}
                  <div className="glass rounded-xl overflow-hidden">
                    <div className="aspect-[2/3] bg-muted/50" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Shimmer Animation Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"
          style={{
            animation: "shimmer 2s infinite",
          }}
        />
      </div>
    </div>
  );
}
