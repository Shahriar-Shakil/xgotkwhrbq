import { Search } from "lucide-react";
import Link from "next/link";

interface SearchEmptyProps {
  query: string;
}

export function SearchEmpty({ query }: SearchEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="glass rounded-full p-8 mb-6">
        <Search className="w-16 h-16 text-muted-foreground" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        No Results Found
      </h2>

      <p className="text-muted-foreground max-w-md mb-6">
        We couldn't find any movies matching "{query}". Try adjusting your
        search terms or browse our popular movies.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Browse Movies
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center glass hover:glass-strong px-6 py-3 rounded-lg font-medium transition-all"
        >
          Go Back
        </button>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        <p className="mb-2">Search tips:</p>
        <ul className="space-y-1">
          <li>• Check your spelling</li>
          <li>• Try different keywords</li>
          <li>• Use more general terms</li>
        </ul>
      </div>
    </div>
  );
}
