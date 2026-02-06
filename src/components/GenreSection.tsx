import Link from "next/link";

interface Genre {
  id: number;
  name: string;
}

interface GenreSectionProps {
  genres: Genre[];
}

export function GenreSection({ genres }: GenreSectionProps) {
  return (
    <section className="space-y-3 px-4 md:px-8 py-10">
      <h2 className="text-lg font-semibold md:text-2xl">Browse by Genre</h2>

      <div className="flex flex-wrap gap-3 ">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genres/${genre.id}`}
            className="
              whitespace-nowrap
              rounded-full
              border
              px-4
              py-2
              text-sm
              transition
              hover:bg-accent
            "
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
