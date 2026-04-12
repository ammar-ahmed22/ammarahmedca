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
    <div className="flex flex-col gap-2 my-2">
      <div className="border border-border bg-surface relative group">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 font-mono text-2xs text-muted">
          <span className="uppercase tracking-wider">
            {block.language || "text"}
          </span>
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1 hover:text-foreground transition-colors",
            )}
            aria-label="Copy"
          >
            {copied ? (
              <>
                <CheckIcon className="size-3" />
                <span>copied</span>
              </>
            ) : (
              <>
                <ClipboardIcon className="size-3" />
                <span>copy</span>
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          showLineNumbers
          customStyle={{
            margin: 0,
            fontSize: "0.8125rem",
          }}
          lineNumberStyle={{
            color: "oklch(var(--muted))",
            opacity: 0.5,
            paddingRight: "1em",
            minWidth: "2em",
          }}
          language={block.language}
          style={style}
          PreTag="div"
        >
          {block.content}
        </SyntaxHighlighter>
      </div>
      {block.caption.length > 0 && (
        <RichText
          as="span"
          className="text-center text-xs text-muted font-mono"
          data={block.caption}
        />
      )}
    </div>
  );
};

export default Code;
