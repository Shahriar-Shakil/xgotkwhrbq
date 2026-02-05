"use client";

import Image from "next/image";
import { useState } from "react";
import { Cast } from "../types/tmdb";

interface CastListProps {
  cast: Cast[];
  initialCount?: number;
}

export function CastList({ cast, initialCount = 10 }: CastListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedCast = showAll ? cast : cast.slice(0, initialCount);

  if (cast.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Cast
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {displayedCast.map((person) => (
          <div
            key={person.id}
            className="glass rounded-xl p-4 hover:glass-strong transition-all group"
          >
            {/* Profile Image */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-muted">
              {person.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl text-muted-foreground/30">👤</span>
                </div>
              )}
            </div>

            {/* Name & Character */}
            <div className="space-y-1">
              <p className="font-semibold text-sm line-clamp-1">
                {person.name}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {person.character}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {cast.length > initialCount && !showAll && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 glass rounded-lg hover:glass-strong transition-all font-medium"
          >
            Load More ({cast.length - initialCount} more)
          </button>
        </div>
      )}
    </section>
  );
}
