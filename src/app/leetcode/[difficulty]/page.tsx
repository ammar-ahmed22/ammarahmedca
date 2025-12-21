import api from "@/lib/api";
import { capitalize } from "@/lib/utils";
import { LeetcodeDifficulty } from "@/types/api/leetcode";
import { Metadata } from "next";
import LinkBreadcrumb from "@/components/ui/link-breadcrumb";
import ProblemsGrid from "../problems-grid";
import { LeetcodeGraph } from "../graph";

export type DifficultyProps = {
  params: Promise<{ difficulty: LeetcodeDifficulty }>;
};

const colors: Record<LeetcodeDifficulty, string> = {
  easy: "text-green-500",
  medium: "text-yellow-500",
  hard: "text-red-500",
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
    title: `Leetcode - ${capitalize(difficulty)}`,
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
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full">
        <LinkBreadcrumb
          items={[
            { content: "Leetcode", href: "/leetcode" },
            { content: capitalize(difficulty) },
          ]}
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-3 flex flex-col justify-center">
          <h1 className="text-4xl font-display font-bold md:text-start text-center">
            Leetcode{" "}
            <span className={colors[difficulty]}>
              {capitalize(difficulty)}
            </span>
          </h1>
          <p className="text-neutral md:text-start text-center">
            Solutions and throught process for {difficulty} difficulty
            Leetcode problems.
          </p>
        </div>
        <div>
          <LeetcodeGraph
            easy={metadata.easy.length}
            medium={metadata.medium.length}
            hard={metadata.hard.length}
            active={difficulty}
          />
        </div>
      </div>
      <ProblemsGrid
        problems={metadata[difficulty]}
        allTags={metadata.allTags}
      />
    </div>
  );
}
