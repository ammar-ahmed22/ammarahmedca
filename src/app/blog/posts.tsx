"use client";
import React, { useEffect, useState } from "react";
import type { PostMetadata } from "@/types/api";
import RichText from "@/components/ui/rich-text";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SearchIcon, FrownIcon } from "lucide-react";

export type PostsProps = {
  posts: PostMetadata[];
};

export default function Posts({ posts }: PostsProps) {
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) => {
        const lowerCaseQuery = query.toLowerCase();
        return (
          post.name.toLowerCase().includes(lowerCaseQuery) ||
          post.category?.toLowerCase().includes(lowerCaseQuery) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(lowerCaseQuery),
          )
        );
      }),
    );
  }, [posts, query]);

  return (
    <div className="flex flex-col gap-8 w-full">
      <Input
        className="w-full"
        startIcon={SearchIcon}
        placeholder="Search by title, category or tag"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center h-96">
          <FrownIcon className="size-10" />
          <p className="font-bold text-xl">Nothing found</p>
        </div>
      )}
      {filteredPosts.map((post, idx, all) => {
        const isLast = idx === all.length - 1;
        return (
          <React.Fragment key={post.id}>
            <Card
              key={post.id}
              className="w-full flex-grow border-none hover:bg-neutral-600/50 [&_img]:hover:blur-sm cursor-pointer transition-all ease-in-out duration-200 relative">
              {post.image && post.category && (
                <Badge
                  className="absolute top-4 left-4 z-20 rounded-full border-foreground/30 bg-background/60"
                  variant="outline">
                  {post.category}
                </Badge>
              )}
              {post.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.image}
                  alt={post.name + " cover image"}
                  className="w-full h-96 object-cover rounded-t-xl mb-4"
                />
              )}
              <CardContent>
                {!post.image && post.category && (
                  <div className="my-4">
                    <Badge
                      className="rounded-full border-foreground/30 bg-background/60"
                      variant="outline">
                      {post.category}
                    </Badge>
                  </div>
                )}
                <span className="text-neutral">
                  {post.date && format(post.date, "MMM dd, yyyy")}
                  {/* TODO (potential): Add read time */}
                  {/* • 10 min read */}
                </span>
                <h4 className="text-xl font-bold mt-2">
                  {post.name}
                </h4>
                <RichText
                  as="p"
                  data={post.description}
                  className="mb-4"
                />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIdx) => {
                    return (
                      <Badge
                        key={`post-${post.id}-tag-${tagIdx}`}
                        variant="outline"
                        className="border-foreground/30">
                        #{tag}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            {!isLast && (
              <hr className="w-full border-neutral-500/30" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
