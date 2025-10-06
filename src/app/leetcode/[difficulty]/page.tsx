import api from "@/lib/api";
import { capitalize, cn, parsePositiveInt } from "@/lib/utils";
import { LeetcodeDifficulty } from "@/types/api/leetcode";
import Problems from "../problems";
import { Metadata } from "next";
import LinkBreadcrumb from "@/components/ui/link-breadcrumb";

export type DifficultyProps = {
  params: Promise<{ difficulty: LeetcodeDifficulty }>;
  searchParams: Promise<{ page?: string }>;
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
  const { params, searchParams } = props;
  const { difficulty } = await params;
  const { page } = await searchParams;
  const parsedPage = parsePositiveInt(page, 0);
  const { problems, totalPages } = await api.leetcode.listProblems({
    difficulty,
    page: parsedPage,
  });
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full px-6">
        <LinkBreadcrumb
          items={[
            { content: "Leetcode", href: "/leetcode" },
            { content: capitalize(difficulty) },
          ]}
        />
        <h1
          className={cn(
            "text-4xl font-bold font-display",
            colors[difficulty],
          )}
        >
          {capitalize(difficulty)}
        </h1>
        <p className="text-lg text-neutral">
          Solutions and thought process for {difficulty} difficulty
          Leetcode problems.
        </p>
      </div>
      <Problems
        problems={problems}
        difficulty={difficulty}
        totalPages={totalPages}
        page={parsedPage}
      />
    </div>
  );
}
