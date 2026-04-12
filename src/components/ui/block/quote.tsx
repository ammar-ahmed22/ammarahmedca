import { QuoteBlock } from "@/types/api/blocks";
import React from "react";
import RichText from "@/components/ui/rich-text";

const Quote: React.FC<QuoteBlock> = (block) => {
  return (
    <blockquote className="border-l border-border pl-4 my-2">
      <RichText
        data={block.content}
        className="font-mono text-base italic text-muted"
        as="p"
      />
    </blockquote>
  );
};

export default Quote;
