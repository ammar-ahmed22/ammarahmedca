"use client";

import React from "react";
import type { RichText } from "@/types/api";
import { cn } from "@/lib/utils";

export type RichTextProps = {
  data: RichText[];
  as: React.ElementType;
  className?: string;
};

export default function RichText({
  data,
  as = "p",
  className,
}: RichTextProps) {
  const Component = as;

  return (
    <Component className={cn("text-neutral", className)}>
      {data.map((richText, index) => {
        const { annotations, plainText } = richText;
        const className = cn({
          "font-bold": annotations.bold,
          italic: annotations.italic,
          "line-through": annotations.strikethrough,
          underline: annotations.underline,
          "bg-foreground/20 font-mono text-neutral-800 dark:text-neutral-300 py-0.5 px-2 rounded-sm":
            annotations.code,
          "text-foreground  hover:underline cursor-pointer":
            annotations.href,
        });
        const key = `richtext-block-${index}`;
        if (annotations.href) {
          return (
            <a
              key={key}
              className={className}
              href={annotations.href}
              target="_blank"
              rel="noopener noreferrer">
              {plainText}
            </a>
          );
        }
        return (
          <span key={key} className={className}>
            {plainText}
          </span>
        );
      })}
    </Component>
  );
}
