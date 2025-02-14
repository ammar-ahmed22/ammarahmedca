"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TextGenerateWord =
  | string
  | {
      word: string;
      className?: string;
      leftContent?: React.ReactNode;
    };

export type TextGenerateProps = {
  className?: string;
  id?: string;
  filter?: boolean;
  duration?: number;
  stagger?: number;
  words: TextGenerateWord[];
};

export default function TextGenerate({
  words,
  className,
  id,
  filter = true,
  stagger = 0.2,
  duration = 0.5,
}: TextGenerateProps) {
  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        {words.map((word, idx) => {
          let renderedWord: string;
          let wordClassName: string | undefined;
          let leftContent: React.ReactNode | undefined;
          if (typeof word === "string") {
            renderedWord = word;
          } else {
            renderedWord = word.word;
            wordClassName = word.className;
            leftContent = word.leftContent;
          }
          return (
            <motion.span
              key={`${id}-word-${renderedWord}-${idx}`}
              animate={{
                opacity: 1,
                filter: filter ? "blur(0px)" : "none",
                transition: {
                  duration: duration ?? 1,
                  delay: idx * stagger,
                },
              }}
              className={cn("opacity-0", wordClassName, {
                "inline-flex items-center gap-2 align-middle":
                  leftContent,
              })}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}>
              {leftContent && <span>{leftContent}</span>}
              <span>{renderedWord} </span>
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
