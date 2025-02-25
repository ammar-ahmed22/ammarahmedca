"use client";
import { PostMetadata } from "@/types/api";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import ImageWithLoading from "@/components/ui/loading-image";

export type MetadataProps = {
  metadata: PostMetadata;
};

export default function Metadata({ metadata }: MetadataProps) {
  return (
    <div className="flex flex-col gap-4">
      <Button asChild variant="ghost" className="w-fit">
        <Link href="/blog">
          <ArrowLeftIcon /> Back
        </Link>
      </Button>
      <span className="font-bold uppercase">{metadata.category}</span>
      {metadata.image && (
        <ImageWithLoading
          src={metadata.image}
          alt={metadata.name + " cover image"}
          className="w-full h-[40vh] object-cover rounded-lg"
        />
      )}
      {metadata.date && (
        <span className="text-neutral">
          {format(metadata.date, "MMM dd, yyyy")}
        </span>
      )}
      <h1 className="text-4xl font-semibold">{metadata.name}</h1>
      <div className="flex flex-wrap gap-2">
        {metadata.tags.map((tag) => {
          return (
            <Badge
              key={`post-${metadata.id}-tag-${tag}`}
              variant="outline"
              className="border-foreground/30">
              #{tag}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
