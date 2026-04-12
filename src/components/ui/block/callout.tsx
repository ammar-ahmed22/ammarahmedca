import React from "react";
import { CalloutBlock } from "@/types/api/blocks";
import RichText from "@/components/ui/rich-text";

const Callout: React.FC<CalloutBlock> = (block) => {
  return (
    <div className="flex gap-3 p-4 border border-border my-2">
      {block.icon && (
        <span className="font-mono text-base shrink-0 select-none">
          {block.icon}
        </span>
      )}
      <RichText
        data={block.content}
        as="p"
        className="font-mono text-base text-foreground"
      />
    </div>
  );
};

export default Callout;
