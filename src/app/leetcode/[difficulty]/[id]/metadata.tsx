import Link from "next/link";
import { capitalize } from "@/lib/utils";
import { LeetcodeProblem } from "@/types/api/leetcode";
import { format } from "date-fns";

export type LeetcodeProblemMetadataProps = {
  problem: LeetcodeProblem;
};

const difficultyMark: Record<string, string> = {
  easy: "○",
  medium: "◐",
  hard: "●",
};

export default function LeetcodeProblemMetadata({
  problem,
}: LeetcodeProblemMetadataProps) {
  const diff = problem.difficulty.toLowerCase();
  return (
    <header className="flex flex-col gap-3">
      <div className="font-mono text-xs text-muted flex gap-2 flex-wrap">
        <Link href="/leetcode" className="hover:text-foreground">
          ~/leetcode
        </Link>
        <span>/</span>
        <Link
          href={`/leetcode/${diff}`}
          className="hover:text-foreground"
        >
          {diff}
        </Link>
        <span>/</span>
        <span className="truncate">{problem.id}</span>
      </div>
      <div className="font-mono text-2xs uppercase tracking-wider text-muted flex flex-wrap gap-3">
        <span className="flex items-center gap-1.5">
          <span aria-hidden>{difficultyMark[diff]}</span>
          {capitalize(problem.difficulty)}
        </span>
        <span>·</span>
        <span className="tabular-nums">
          [{format(problem.datetime, "yyyy-MM-dd")}]
        </span>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl leading-tight">
        {problem.title}
      </h1>
      {problem.tags && problem.tags.length > 0 && (
        <div className="font-mono text-xs text-muted">
          [
          {problem.tags.map((t, i) => (
            <span key={t}>
              {i > 0 && ", "}#{t}
            </span>
          ))}
          ]
        </div>
      )}
    </header>
  );
}
