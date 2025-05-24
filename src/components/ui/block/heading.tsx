import React from "react";
import RichText from "@/components/ui/rich-text";
import { HeadingBlock } from "@/types/api/blocks";
import { cn } from "@/lib/utils";

const Heading: React.FC<HeadingBlock> = (block) => {
  const tag = `h${block.level + 1}` as React.ElementType;
  return (
    <RichText
      as={tag}
      data={block.content}
      className={cn("text-foreground font-bold", {
        "text-2xl": block.level === 1,
        "text-xl": block.level === 2,
        "text-lg": block.level === 3,
      })}
    />
  );
};

export default Heading;
