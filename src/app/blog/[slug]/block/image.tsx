"use client";
import React from "react";
import { ImageBlock } from "@/types/api/blocks";
import RichText from "@/components/ui/rich-text";
import ImageWithLoading from "@/components/ui/loading-image";

const Image: React.FC<ImageBlock> = (block) => {
  return (
    <div className="flex flex-col gap-2 relative">
      <ImageWithLoading
        src={block.url}
        alt={block.caption.map((r) => r.plainText).join("")}
        className="w-full rounded-xl"
      />
      {block.caption.length > 0 && (
        <RichText
          data={block.caption}
          as="span"
          className="text-xs text-center"
        />
      )}
    </div>
  );
};

export default Image;
