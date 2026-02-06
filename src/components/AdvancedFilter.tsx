"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
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
import { FilterState, SortOption } from "../types/tmdb";

interface AdvancedFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const currentYear = new Date().getFullYear();

export default function AdvancedFilter({
  filters,
  onFilterChange,
}: AdvancedFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
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
  };

  const hasActiveFilters =
    filters.yearFrom !== "" ||
    filters.yearTo !== "" ||
    filters.ratingFrom !== 0 ||
    filters.ratingTo !== 10;

  return (
    <div className="flex flex-wrap items-center gap-4">
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
            value={filters.yearFrom}
            onChange={(e) =>
              onFilterChange({ ...filters, yearFrom: e.target.value })
            }
            className="w-24 glass-strong border-border"
            min="1900"
            max={currentYear}
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="To"
            value={filters.yearTo}
            onChange={(e) =>
              onFilterChange({ ...filters, yearTo: e.target.value })
            }
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
                {filters.ratingFrom} - {filters.ratingTo}
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
                      onValueChange={([value]) =>
                        setLocalFilters({ ...localFilters, ratingFrom: value })
                      }
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
                      onValueChange={([value]) =>
                        setLocalFilters({ ...localFilters, ratingTo: value })
                      }
                      max={10}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <Button
                onClick={() => {
                  onFilterChange(localFilters);
                }}
                className="w-full"
              >
                Apply
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Advanced Filters Button */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        <Label className="text-xs text-muted-foreground mb-2 block opacity-0">
          Actions
        </Label>
        <div className="flex gap-2">
          {/* Reset Button */}
          {hasActiveFilters && (
            <Button
              onClick={handleReset}
              variant="ghost"
              size="icon"
              className="glass-strong border border-border"
              title="Reset filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Count Badge */}
      {hasActiveFilters && (
        <div className="flex-shrink-0">
          <Label className="text-xs text-muted-foreground mb-2 block opacity-0">
            Badge
          </Label>
          <div className="px-3 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-semibold">
            {
              [
                filters.yearFrom && "Year",
                filters.ratingFrom !== 0 && "Min Rating",
                filters.ratingTo !== 10 && "Max Rating",
              ].filter(Boolean).length
            }{" "}
            active
          </div>
        </div>
      )}
    </div>
  );
}
