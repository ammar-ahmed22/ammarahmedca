import React from "react";
import RichText from "@/components/ui/rich-text";
import { HeadingBlock } from "@/types/api/blocks";
import { cn } from "@/lib/utils";

const Heading: React.FC<HeadingBlock> = (block) => {
  const tag = `h${block.level + 1}` as React.ElementType;
  const prefix =
    block.level === 1 ? "## " : block.level === 2 ? "### " : "#### ";
  return (
    <RichText
      as={tag}
      data={block.content}
      className={cn(
        "font-mono text-foreground font-bold mt-6 mb-1 leading-tight",
        {
          "text-2xl": block.level === 1,
          "text-xl": block.level === 2,
          "text-lg": block.level === 3,
        },
      )}
      prefix={
        <span className="text-muted select-none">{prefix}</span>
      }
    />
  );
};

export default Heading;
