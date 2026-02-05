export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        {/* Animated Film Reel */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div
            className="absolute inset-2 border-4 border-accent/30 border-t-accent rounded-full animate-spin animation-delay-150"
            style={{ animationDirection: "reverse" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-primary animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Loading Movies...
          </h2>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200" />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-400" />
          </div>
        </div>

        <p className="text-sm text-muted-foreground italic animate-pulse">
          "Preparing the popcorn..." 🍿
        </p>
      </div>
    </div>
  );
}
