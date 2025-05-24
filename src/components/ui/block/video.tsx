"use client";
import React from "react";
import { VideoBlock } from "@/types/api/blocks";
import RichText from "@/components/ui/rich-text";

const Video: React.FC<VideoBlock> = (block) => {
  return (
    <div className="flex flex-col gap-2 relative w-full">
      <video className="w-full" controls>
        <source src={block.url} />
        Your browser does not support videos.
      </video>
      {block.caption.length > 0 && (
        <RichText
          as="span"
          className="text-sm text-center"
          data={block.caption}
        />
      )}
    </div>
  );
};

export default Video;
