"use client";

import React from "react";
import type { RichText } from "@/types/api";
import { cn } from "@/lib/utils";
import Mathjax from "react-mathjax";

export type RichTextProps = {
  data: RichText[];
  as: React.ElementType;
  className?: string;
  prefix?: React.ReactNode;
};

export default function RichText({
  data,
  as = "p",
  className,
  prefix,
}: RichTextProps) {
  const Component = as;

  return (
    <Component className={cn("whitespace-pre-line", className)}>
      {prefix}
      <Mathjax.Provider>
        {data.map((richText, index) => {
          const { annotations, plainText } = richText;
          const innerClassName = cn({
            "font-bold": annotations.bold,
            italic: annotations.italic,
            "line-through": annotations.strikethrough,
            underline: annotations.underline,
            "border border-border px-1 text-foreground":
              annotations.code,
            "text-foreground link-underline": annotations.href,
          });
          const key = `richtext-${index}`;
          if (annotations.href) {
            return (
              <a
                key={key}
                className={innerClassName}
                href={annotations.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {plainText}
              </a>
            );
          }

          if (annotations.equation) {
            return (
              <Mathjax.Node
                key={key}
                inline
                formula={richText.plainText}
              />
            );
          }
          return (
            <span key={key} className={innerClassName}>
              {plainText}
            </span>
          );
        })}
      </Mathjax.Provider>
    </Component>
  );
}
