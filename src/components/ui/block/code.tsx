"use client";
import React, { useState } from "react";
import { CodeBlock } from "@/types/api/blocks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useThemeValue } from "@/hooks/theme";
import RichText from "@/components/ui/rich-text";
import { Button } from "@/components/ui/button";
import { ClipboardIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Code: React.FC<CodeBlock> = (block) => {
  const style = useThemeValue(oneLight, oneDark);
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(block.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex flex-col gap-2 relative [&_button]:hover:block [&_button]:hidden">
      <Button
        size="icon"
        className={cn("absolute top-4 right-4", {
          "!block": copied,
        })}
        variant="ghost"
        onClick={handleCopy}
      >
        {copied ? (
          <CheckIcon className="text-green-500" />
        ) : (
          <ClipboardIcon />
        )}
      </Button>
      <SyntaxHighlighter
        showLineNumbers
        customStyle={{
          width: "100%",
          borderRadius: "0.5rem",
          margin: 0,
          fontSize: "0.875rem",
        }}
        language={block.language}
        lineProps={{ style: { backgroundColor: "transparent" } }}
        style={style}
        PreTag="div"
      >
        {block.content}
      </SyntaxHighlighter>
      {block.caption.length > 0 && (
        <RichText
          as="span"
          className="text-center text-xs"
          data={block.caption}
        />
      )}
    </div>
  );
};

export default Code;
