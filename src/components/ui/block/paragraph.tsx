import React from "react";
import RichText from "@/components/ui/rich-text";
import { ParagraphBlock } from "@/types/api/blocks";

const Paragraph: React.FC<ParagraphBlock> = (block) => {
  return (
    <RichText as="p" className="text-neutral" data={block.content} />
  );
};

export default Paragraph;
