"use client";
import Link from "next/link";
import { useMemo } from "react";

export type LeetcodeGraphProps = {
  easy?: number;
  medium?: number;
  hard?: number;
  active?: "easy" | "medium" | "hard";
};

const BAR_WIDTH = 24;

function bar(value: number, max: number) {
  if (max === 0) return "░".repeat(BAR_WIDTH);
  const filled = Math.round((value / max) * BAR_WIDTH);
  return "█".repeat(filled) + "░".repeat(BAR_WIDTH - filled);
}

export function LeetcodeGraph({
  easy = 0,
  medium = 0,
  hard = 0,
  active,
}: LeetcodeGraphProps) {
  const total = easy + medium + hard;
  const max = useMemo(
    () => Math.max(easy, medium, hard, 1),
    [easy, medium, hard],
  );

  const rows: Array<{
    label: "easy" | "medium" | "hard";
    value: number;
  }> = [
    { label: "easy", value: easy },
    { label: "medium", value: medium },
    { label: "hard", value: hard },
  ];

  return (
    <div className="border border-border p-4 sm:p-6">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-xs text-muted uppercase tracking-wider">
          difficulty distribution
        </span>
        <span className="font-mono text-xs text-muted tabular-nums">
          total: {total}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 font-mono text-base">
        {rows.map(({ label, value }) => {
          const isActive = active === label;
          return (
            <Link
              key={label}
              href={`/leetcode/${label}`}
              className="grid grid-cols-[5rem_1fr_auto] items-baseline gap-3 hover:bg-foreground hover:text-background px-1 py-2 transition-colors"
            >
              <span
                className={
                  isActive
                    ? "text-foreground font-bold"
                    : "text-muted"
                }
              >
                {label}
              </span>
              <span className="tracking-tight overflow-hidden whitespace-nowrap">
                {bar(value, max)}
              </span>
              <span className="tabular-nums text-foreground">
                {value}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
