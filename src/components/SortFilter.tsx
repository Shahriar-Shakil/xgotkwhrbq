"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { SortOption } from "../types/tmdb";

interface SortFilterProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popularity.desc", label: "Popularity (High to Low)" },
  { value: "popularity.asc", label: "Popularity (Low to High)" },
  { value: "release_date.desc", label: "Release Date (Newest)" },
  { value: "release_date.asc", label: "Release Date (Oldest)" },
  { value: "vote_average.desc", label: "Rating (High to Low)" },
  { value: "vote_average.asc", label: "Rating (Low to High)" },
  { value: "title.asc", label: "Title (A-Z)" },
  { value: "title.desc", label: "Title (Z-A)" },
];

export default function SortFilter({
  currentSort,
  onSortChange,
}: SortFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label ||
    "Sort Movies";

  return (
    <div className="relative">
      {/* Sort Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 rounded-xl glass-strong hover:glass border border-border transition-all min-w-[240px]"
      >
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <span className="flex-1 text-left font-medium text-sm">
          {currentLabel}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-full mt-2 left-0 right-0 glass-strong border border-border rounded-xl overflow-hidden shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                    currentSort === option.value
                      ? "bg-primary/20 text-primary font-semibold"
                      : "hover:bg-muted/30 text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
