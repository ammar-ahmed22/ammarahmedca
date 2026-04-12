"use client";

import Link from "next/link";
import { format } from "date-fns";
import { LeetcodeProblemMetadata } from "@/types/api/leetcode";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function toLowerDifficulty(d: string): "easy" | "medium" | "hard" {
  switch (d) {
    case "Easy":
      return "easy";
    case "Medium":
      return "medium";
    case "Hard":
      return "hard";
    default:
      return "easy";
  }
}

const difficultyMark: Record<"easy" | "medium" | "hard", string> = {
  easy: "○",
  medium: "◐",
  hard: "●",
};

export type ProblemsGridProps = {
  problems: LeetcodeProblemMetadata[];
  allTags: string[];
};

export default function ProblemsGrid({
  problems,
  allTags,
}: ProblemsGridProps) {
  const [filteredProblems, setFilteredProblems] = useState(problems);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set(),
  );
  const [tagPickerOpen, setTagPickerOpen] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  useEffect(() => {
    let filtered = problems;
    if (query.trim() !== "") {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(q) || p.id.includes(q),
      );
    }
    if (selectedTags.size > 0) {
      filtered = filtered.filter((p) =>
        p.tags?.some((t) => selectedTags.has(t)),
      );
    }
    setFilteredProblems(filtered);
  }, [query, problems, selectedTags]);

  const sorted = [...filteredProblems].sort(
    (a, b) =>
      new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex items-center gap-2 flex-1 font-mono text-base border border-border px-2 py-1.5 focus-within:border-foreground">
          <span className="text-muted shrink-0 select-none">
            $ grep
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="_"
            className="bg-transparent flex-1 outline-none font-mono text-base placeholder:text-muted"
            aria-label="Search problems"
          />
        </div>
        <button
          onClick={() => setTagPickerOpen((v) => !v)}
          className="font-mono text-base border border-border px-3 py-1.5 hover:bg-foreground hover:text-background"
        >
          [tags: {selectedTags.size}]
        </button>
      </div>

      {tagPickerOpen && (
        <div className="border border-border p-3 flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const sel = selectedTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "font-mono text-xs px-2 py-0.5 border border-border",
                  sel
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground",
                )}
              >
                {sel ? "[x]" : "[ ]"} {tag}
              </button>
            );
          })}
        </div>
      )}

      {selectedTags.size > 0 && (
        <div className="font-mono text-xs text-muted">
          active filters: [
          {Array.from(selectedTags).map((t, i) => (
            <span key={t}>
              {i > 0 && ", "}
              <button
                onClick={() => toggleTag(t)}
                className="text-foreground hover:line-through"
              >
                {t}
              </button>
            </span>
          ))}
          ]
        </div>
      )}

      <div className="flex flex-col">
        <div className="hidden sm:grid grid-cols-[4rem_1fr_8rem] gap-3 px-1 py-2 border-b border-border font-mono text-2xs uppercase tracking-wider text-muted">
          <span>diff</span>
          <span>title</span>
          <span className="text-right">date</span>
        </div>
        {sorted.length === 0 && (
          <div className="font-mono text-base text-muted py-8 text-center">
            0 results.
          </div>
        )}
        {sorted.map((problem) => {
          const lower = toLowerDifficulty(problem.difficulty);
          const dateObj = new Date(problem.datetime);
          return (
            <Link
              key={problem.id}
              href={`/leetcode/${lower}/${problem.id}`}
              className="grid grid-cols-[4rem_1fr] sm:grid-cols-[4rem_1fr_8rem] gap-3 items-baseline px-1 py-2.5 border-b border-border font-mono text-base hover:bg-foreground hover:text-background transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <span aria-hidden>{difficultyMark[lower]}</span>
                <span className="text-xs uppercase tracking-wider">
                  {lower}
                </span>
              </span>
              <span className="truncate">{problem.title}</span>
              <span className="hidden sm:inline text-right text-muted text-xs tabular-nums">
                {format(dateObj, "yyyy-MM-dd")}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
