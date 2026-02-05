"use client";

import { Grid3x3, List } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 glass rounded-lg p-1">
      <button
        onClick={() => onViewChange("grid")}
        className={`p-2 rounded-md transition-all ${
          view === "grid"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Grid view"
      >
        <Grid3x3 className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={`p-2 rounded-md transition-all ${
          view === "list"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="List view"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
}
