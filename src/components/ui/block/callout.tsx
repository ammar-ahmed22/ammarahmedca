import React from "react";
import { CalloutBlock } from "@/types/api/blocks";
import RichText from "@/components/ui/rich-text";

const Callout: React.FC<CalloutBlock> = (block) => {
  return (
    <div className="flex gap-4 p-4 dark:bg-foreground/10 bg-foreground/5 rounded-xl">
      {block.icon && <span className="text-xl">{block.icon}</span>}
      <RichText data={block.content} as="span" />
    </div>
  );
};

export default Callout;
