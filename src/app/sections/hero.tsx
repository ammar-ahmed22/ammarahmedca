"use client";
import React from "react";
import Signature from "@/components/ui/signature";

type Line = string | { href: string; text: string };

const introductionLines: Line[][] = [
  [
    "I like to build software and write about my thoughts and experiences.",
  ],
  [
    "Graduated from the ",
    {
      href: "https://uwaterloo.ca/",
      text: "University of Waterloo",
    },
    " with a BASc in Engineering.",
  ],
  // [
  //   "Software Engineer at ",
  //   { href: "https://placeholder.com", text: "Placeholder" },
  //   ".",
  // ],
];

export default function Hero() {
  return (
    <section className="pt-8 pb-24 min-h-screen">
      <div className="font-mono text-base text-muted mb-4 select-none">
        ~ $ whoami
      </div>

      <h1 aria-label="Ammar Ahmed">
        <span
          className="block font-mono text-lg text-muted mt-2 mb-4"
          aria-hidden
        >
          Ammar Ahmed
        </span>
        <Signature
          className="w-[35ch] sm:w-[60ch] h-auto text-foreground"
          duration={1}
        />
      </h1>

      <div className="flex flex-col gap-3 mt-8">
        <p className="font-mono text-base text-muted leading-relaxed">
          ~ $ cat introduce.txt
        </p>
        {introductionLines.map((line, i) => (
          <p
            key={i}
            className="font-mono text-lg sm:text-xl leading-relaxed"
          >
            <span className="text-muted">&gt;</span>{" "}
            {line.map((part, j) => {
              if (typeof part === "string") {
                return part;
              } else {
                return (
                  <a
                    key={j}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-foreground"
                    href={part.href}
                  >
                    {part.text}
                  </a>
                );
              }
            })}
          </p>
        ))}
      </div>
    </section>
  );
}
