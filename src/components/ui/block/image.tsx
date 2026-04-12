"use client";
import React from "react";
import { ImageBlock } from "@/types/api/blocks";
import RichText from "@/components/ui/rich-text";
import ImageWithLoading from "@/components/ui/loading-image";
import { toPlainText } from "@/lib/notion/utils";

const Image: React.FC<ImageBlock> = (block) => {
  return (
    <figure className="flex flex-col gap-2 my-4">
      <div className="border border-border p-1">
        <ImageWithLoading
          src={block.url}
          alt={toPlainText(block.caption)}
          className="w-full"
          loadingClassName="h-[40vh]"
        />
      </div>
      {block.caption.length > 0 && (
        <RichText
          data={block.caption}
          as="figcaption"
          className="font-mono text-xs text-muted text-center"
        />
      )}
    </figure>
  );
};

export default Image;
