"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { format } from "date-fns";
import { LeetcodeProblemMetadata } from "@/types/api/leetcode";
import { useEffect, useState } from "react";
import { ListFilterIcon, CheckIcon, XIcon } from "lucide-react";

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
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      next.delete(tag);
      return next;
    });
  };

  useEffect(() => {
    let filtered = problems;

    // Filter by search query
    if (query.trim() !== "") {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter((problem) => {
        return (
          problem.title.toLowerCase().includes(lowerQuery) ||
          problem.id.includes(lowerQuery)
        );
      });
    }

    // Filter by selected tags (OR logic)
    if (selectedTags.size > 0) {
      filtered = filtered.filter((problem) => {
        return problem.tags?.some((tag) => selectedTags.has(tag));
      });
    }

    setFilteredProblems(filtered);
  }, [query, problems, selectedTags]);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2">
        <Input
          placeholder="Search for a problem"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="shrink-0 border-input text-muted-foreground"
            >
              <ListFilterIcon className="size-4" />
              Tags
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                  {allTags.map((tag) => (
                    <CommandItem
                      key={tag}
                      onSelect={() => toggleTag(tag)}
                    >
                      {selectedTags.has(tag) && (
                        <CheckIcon className="size-4 mr-2" />
                      )}
                      {tag}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {selectedTags.size > 0 && (
        <div className="flex flex-wrap gap-2">
          {Array.from(selectedTags).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => removeTag(tag)}
            >
              {tag}
              <XIcon className="size-3" />
            </Badge>
          ))}
        </div>
      )}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems
          .sort(
            (a, b) =>
              new Date(b.datetime).getTime() -
              new Date(a.datetime).getTime(),
          )
          .map((problem) => {
            const lower = toLowerDifficulty(problem.difficulty);
            const dateObj = new Date(problem.datetime);
            return (
              <Link
                key={problem.id}
                href={`/leetcode/${lower}/${problem.id}`}
                className="contents"
              >
                <Card className="shadow-none hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 cursor-pointer transition-all ease-in-out duration-200">
                  <CardContent>
                    <div className="py-4">
                      <Badge variant={`lc-${lower}`}>
                        {problem.difficulty}
                      </Badge>
                    </div>
                    <span className="text-sm text-neutral-500">
                      {format(dateObj, "MMM dd, yyyy")}
                    </span>
                    <h4 className="text-lg font-bold mt-2">
                      {problem.title}
                    </h4>
                    {problem.tags && problem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {problem.tags.map((tag) => (
                          <Badge
                            key={`${problem.id}-${tag}`}
                            variant="outline"
                            className="border-foreground/30"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
