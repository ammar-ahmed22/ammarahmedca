"use client";
import React, { useEffect, useMemo, useState } from "react";
import type { PostMetadata } from "@/types/api";
import PostRow from "@/components/ui/post-row";
import { cn } from "@/lib/utils";

export type PostsProps = {
  posts: PostMetadata[];
  allTags: string[];
  allCategories: string[];
};

function applyQuery(posts: PostMetadata[], query: string) {
  if (query.trim() === "") return posts;
  const q = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.name.toLowerCase().includes(q) ||
      post.category?.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
}

export default function Posts({
  posts,
  allTags,
  allCategories,
}: PostsProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set(),
  );
  const [selectedCategories, setSelectedCategories] = useState<
    Set<string>
  >(new Set());
  const [tagPickerOpen, setTagPickerOpen] = useState(false);
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const queryFiltered = useMemo(
    () => applyQuery(posts, query),
    [posts, query],
  );

  const availableTags = useMemo(() => {
    let base = queryFiltered;
    if (selectedCategories.size > 0) {
      base = base.filter(
        (p) => p.category && selectedCategories.has(p.category),
      );
    }
    return new Set(base.flatMap((p) => p.tags));
  }, [queryFiltered, selectedCategories]);

  const availableCategories = useMemo(() => {
    let base = queryFiltered;
    if (selectedTags.size > 0) {
      base = base.filter((p) =>
        p.tags.some((t) => selectedTags.has(t)),
      );
    }
    return new Set(
      base.map((p) => p.category).filter(Boolean) as string[],
    );
  }, [queryFiltered, selectedTags]);

  useEffect(() => {
    const pruned = new Set(
      [...selectedTags].filter((t) => availableTags.has(t)),
    );
    if (pruned.size !== selectedTags.size) setSelectedTags(pruned);
  }, [availableTags, selectedTags]);

  useEffect(() => {
    const pruned = new Set(
      [...selectedCategories].filter((c) =>
        availableCategories.has(c),
      ),
    );
    if (pruned.size !== selectedCategories.size)
      setSelectedCategories(pruned);
  }, [availableCategories, selectedCategories]);

  const filteredPosts = useMemo(() => {
    let filtered = queryFiltered;
    if (selectedTags.size > 0) {
      filtered = filtered.filter((p) =>
        p.tags.some((t) => selectedTags.has(t)),
      );
    }
    if (selectedCategories.size > 0) {
      filtered = filtered.filter(
        (p) => p.category && selectedCategories.has(p.category),
      );
    }
    return filtered;
  }, [queryFiltered, selectedTags, selectedCategories]);

  const hasActiveFilters =
    selectedTags.size > 0 || selectedCategories.size > 0;

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
            aria-label="Search posts"
          />
        </div>
        <button
          onClick={() => setTagPickerOpen((v) => !v)}
          className="font-mono text-base border border-border px-3 py-1.5 hover:bg-foreground hover:text-background"
        >
          [tags: {selectedTags.size}]
        </button>
        <button
          onClick={() => setCategoryPickerOpen((v) => !v)}
          className="font-mono text-base border border-border px-3 py-1.5 hover:bg-foreground hover:text-background"
        >
          [categories: {selectedCategories.size}]
        </button>
      </div>

      {tagPickerOpen && (
        <div className="border border-border p-3 flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const sel = selectedTags.has(tag);
            const available = availableTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => available && toggleTag(tag)}
                disabled={!available}
                className={cn(
                  "font-mono text-xs px-2 py-0.5 border border-border",
                  !available
                    ? "opacity-30 cursor-not-allowed"
                    : sel
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

      {categoryPickerOpen && (
        <div className="border border-border p-3 flex flex-wrap gap-2">
          {allCategories.map((cat) => {
            const sel = selectedCategories.has(cat);
            const available = availableCategories.has(cat);
            return (
              <button
                key={cat}
                onClick={() => available && toggleCategory(cat)}
                disabled={!available}
                className={cn(
                  "font-mono text-xs px-2 py-0.5 border border-border",
                  !available
                    ? "opacity-30 cursor-not-allowed"
                    : sel
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground",
                )}
              >
                {sel ? "[x]" : "[ ]"} {cat}
              </button>
            );
          })}
        </div>
      )}

      {hasActiveFilters && (
        <div className="font-mono text-xs text-muted">
          active filters: [
          {[
            ...Array.from(selectedCategories),
            ...Array.from(selectedTags),
          ].map((item, i) => (
            <span key={item}>
              {i > 0 && ", "}
              <button
                onClick={() =>
                  selectedCategories.has(item)
                    ? toggleCategory(item)
                    : toggleTag(item)
                }
                className="text-foreground hover:line-through"
              >
                {item}
              </button>
            </span>
          ))}
          ]
        </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="font-mono text-base text-muted py-12 text-center">
          0 results.
        </div>
      )}

      <ul className="flex flex-col">
        {filteredPosts.map((post) => (
          <PostRow
            key={post.id}
            post={post}
            href={`/blog/${post.slug}`}
          />
        ))}
      </ul>
    </div>
  );
}
