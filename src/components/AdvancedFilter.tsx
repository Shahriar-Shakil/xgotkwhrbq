"use client";

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Slider } from "@/src/components/ui/slider";

export type SortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "release_date.desc"
  | "release_date.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "title.asc"
  | "title.desc";

export interface FilterState {
  sortBy: SortOption;
  yearFrom: string;
  yearTo: string;
  ratingFrom: number;
  ratingTo: number;
}

interface AdvancedFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const currentYear = new Date().getFullYear();

export default function AdvancedFilter({
  filters,
  onFilterChange,
}: AdvancedFilterProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [hasLocalChanges, setHasLocalChanges] = useState(false);

  // Sync local filters when props change (e.g., from URL navigation)
  useState(() => {
    setLocalFilters(filters);
  });

  const handleApply = () => {
    onFilterChange(localFilters);
    setHasLocalChanges(false);
  };

  const handleReset = () => {
    const defaultFilters: FilterState = {
      sortBy: "popularity.desc",
      yearFrom: "",
      yearTo: "",
      ratingFrom: 0,
      ratingTo: 10,
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
    setHasLocalChanges(false);
  };

  const updateLocalFilter = (update: Partial<FilterState>) => {
    setLocalFilters((prev) => ({ ...prev, ...update }));
    setHasLocalChanges(true);
  };

  const hasActiveFilters =
    filters.yearFrom !== "" ||
    filters.yearTo !== "" ||
    filters.ratingFrom !== 0 ||
    filters.ratingTo !== 10;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        {/* Sort By Dropdown */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <Label
            htmlFor="sort"
            className="text-xs text-muted-foreground mb-2 block"
          >
            Sort By
          </Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) =>
              onFilterChange({ ...filters, sortBy: value as SortOption })
            }
          >
            <SelectTrigger className="w-full sm:w-[240px] glass-strong border-border">
              <SelectValue placeholder="Sort movies" />
            </SelectTrigger>
            <SelectContent className="glass-strong border-border">
              <SelectItem value="popularity.desc">Popularity ↓</SelectItem>
              <SelectItem value="popularity.asc">Popularity ↑</SelectItem>
              <SelectItem value="release_date.desc">Release Date ↓</SelectItem>
              <SelectItem value="release_date.asc">Release Date ↑</SelectItem>
              <SelectItem value="vote_average.desc">Rating ↓</SelectItem>
              <SelectItem value="vote_average.asc">Rating ↑</SelectItem>
              <SelectItem value="title.asc">Title A-Z</SelectItem>
              <SelectItem value="title.desc">Title Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Year Range */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <Label className="text-xs text-muted-foreground mb-2 block">
            Release Year
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="From"
              value={localFilters.yearFrom}
              onChange={(e) => {
                updateLocalFilter({ yearFrom: e.target.value });
              }}
              className="w-24 glass-strong border-border"
              min="1900"
              max={currentYear}
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="To"
              value={localFilters.yearTo}
              onChange={(e) => {
                updateLocalFilter({ yearTo: e.target.value });
              }}
              className="w-24 glass-strong border-border"
              min="1900"
              max={currentYear}
            />
          </div>
        </div>

        {/* Rating Range - Popover */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <Label className="text-xs text-muted-foreground mb-2 block">
            Rating
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-[180px] justify-between glass-strong border-border"
              >
                <span className="text-sm">
                  {localFilters.ratingFrom} - {localFilters.ratingTo}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 glass-strong border-border">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-3 block">
                    Rating Range
                  </Label>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          Minimum
                        </span>
                        <span className="text-sm font-semibold">
                          {localFilters.ratingFrom}
                        </span>
                      </div>
                      <Slider
                        value={[localFilters.ratingFrom]}
                        onValueChange={([value]) => {
                          updateLocalFilter({ ratingFrom: value });
                        }}
                        max={10}
                        step={0.5}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          Maximum
                        </span>
                        <span className="text-sm font-semibold">
                          {localFilters.ratingTo}
                        </span>
                      </div>
                      <Slider
                        value={[localFilters.ratingTo]}
                        onValueChange={([value]) => {
                          updateLocalFilter({ ratingTo: value });
                        }}
                        max={10}
                        step={0.5}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Apply Button (only show when there are local changes) */}
        {hasLocalChanges && (
          <div className="flex-shrink-0 w-full sm:w-auto">
            <Label className="text-xs text-muted-foreground mb-2 block opacity-0">
              Apply
            </Label>
            <Button
              onClick={handleApply}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            >
              Apply Filters
            </Button>
          </div>
        )}

        {/* Reset Button */}
        {hasActiveFilters && (
          <div className="flex-shrink-0 w-full sm:w-auto">
            <Label className="text-xs text-muted-foreground mb-2 block opacity-0">
              Reset
            </Label>
            <Button
              onClick={handleReset}
              variant="ghost"
              className="glass-strong border border-border"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.yearFrom && (
            <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-semibold flex items-center gap-2">
              <span>From: {filters.yearFrom}</span>
              <button
                onClick={() => onFilterChange({ ...filters, yearFrom: "" })}
                className="hover:bg-primary/30 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.yearTo && (
            <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-semibold flex items-center gap-2">
              <span>To: {filters.yearTo}</span>
              <button
                onClick={() => onFilterChange({ ...filters, yearTo: "" })}
                className="hover:bg-primary/30 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.ratingFrom > 0 && (
            <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold flex items-center gap-2">
              <span>Min Rating: {filters.ratingFrom}</span>
              <button
                onClick={() => onFilterChange({ ...filters, ratingFrom: 0 })}
                className="hover:bg-accent/30 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.ratingTo < 10 && (
            <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold flex items-center gap-2">
              <span>Max Rating: {filters.ratingTo}</span>
              <button
                onClick={() => onFilterChange({ ...filters, ratingTo: 10 })}
                className="hover:bg-accent/30 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
