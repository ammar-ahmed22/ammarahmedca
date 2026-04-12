import api from "@/lib/api";
import { capitalize } from "@/lib/utils";
import { LeetcodeDifficulty } from "@/types/api/leetcode";
import { Metadata } from "next";
import Link from "next/link";
import ProblemsGrid from "../problems-grid";
import { LeetcodeGraph } from "../graph";

export type DifficultyProps = {
  params: Promise<{ difficulty: LeetcodeDifficulty }>;
};

export const revalidate = 60;

export function generateStaticParams() {
  return [
    { difficulty: "easy" },
    { difficulty: "medium" },
    { difficulty: "hard" },
  ];
}

export async function generateMetadata(
  props: DifficultyProps,
): Promise<Metadata> {
  const { params } = props;
  const { difficulty } = await params;
  const description = `Solutions and thought process for ${difficulty} difficulty Leetcode problems.`;
  return {
    title: `~/leetcode/${difficulty}`,
    description,
    openGraph: {
      type: "website",
      title: `Leetcode ${capitalize(difficulty)} Problems`,
      description,
      siteName: "ammarahmed.ca",
      url: `https://ammarahmed.ca/leetcode/${difficulty}`,
      images: [
        `api/og?title=${encodeURIComponent("Leetcode - " + capitalize(difficulty))}&description=${encodeURIComponent(description)}`,
      ],
    },
  };
}

export default async function Difficulty(props: DifficultyProps) {
  const { params } = props;
  const { difficulty } = await params;
  const metadata = await api.leetcode.metadata();
  return (
    <div className="flex flex-col gap-6">
      <div className="font-mono text-xs text-muted flex gap-2">
        <Link href="/leetcode" className="hover:text-foreground">
          ~/leetcode
        </Link>
        <span>/</span>
        <span>{difficulty}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-mono text-xs text-muted">
          ~/leetcode/{difficulty} $ ls
        </div>
        <h1 className="font-display text-5xl sm:text-6xl leading-none">
          {difficulty}.
        </h1>
        <p className="font-mono text-base text-muted max-w-[68ch]">
          Solutions and thought process for {difficulty} difficulty
          Leetcode problems.
        </p>
      </div>
      <span className="ascii-rule" />
      <LeetcodeGraph
        easy={metadata.easy.length}
        medium={metadata.medium.length}
        hard={metadata.hard.length}
        active={difficulty}
      />
      <span className="ascii-rule mt-4" />
      <ProblemsGrid
        problems={metadata[difficulty]}
        allTags={metadata.allTags}
      />
    </div>
  );
}
