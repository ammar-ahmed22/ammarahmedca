import api from "@/lib/api";
import LeetcodeProblemMetadata from "./metadata";
import Block from "@/components/ui/block";
import { Block as BlockType } from "@/types/api/blocks";
import { RichText } from "@/types/api";

export type LeetcodeProblemProps = {
  params: Promise<{ id: string; difficulty: string }>;
};

export const generateStaticParams = async () => {
  const metadata = await api.leetcode.metadata();
  const problems = [
    ...metadata.easy,
    ...metadata.medium,
    ...metadata.hard,
  ];
  return problems.map((problem) => ({
    id: problem.id,
    difficulty: problem.difficulty,
  }));
};

export const revalidate = 60;
export const dynamicParams = true;

export const generateMetadata = async (
  props: LeetcodeProblemProps,
) => {
  const { params } = props;
  const { id } = await params;
  const problem = await api.leetcode.getProblem(id);
  const description = `Solution and thought process for Leetcode problem ${problem.title}`;
  return {
    title: `Leetcode - ${problem.title}`,
    description,
    openGraph: {
      type: "website",
      title: `Leetcode - ${problem.title}`,
      description,
      siteName: "ammarahmed.ca",
      url: `https://ammarahmed.ca/leetcode/${problem.difficulty.toLowerCase()}/${id}`,
      images: [
        `api/og?title=${encodeURIComponent("Leetcode - " + problem.title)}&description=${encodeURIComponent(description)}`,
      ],
    },
  };
};

export default async function LeetcodeProblem(
  props: LeetcodeProblemProps,
) {
  const { params } = props;
  const { id } = await params;
  const problem = await api.leetcode.getProblem(id);
  return (
    <div className="flex flex-col gap-4">
      <LeetcodeProblemMetadata problem={problem} />
      <div className="flex flex-col gap-4">
        {problem.description.map((block) => {
          return <Block key={block.id} block={block} />;
        })}
        <h2 className="text-foreground font-bold text-xl">Notes</h2>
        {problem.notes.map((block) => {
          return <Block key={block.id} block={block} />;
        })}
        <h2 className="text-foreground font-bold text-xl">
          Solution
        </h2>
        <Block
          block={
            {
              type: "code",
              language: "python",
              content: problem.solution,
              caption: [] as RichText[],
            } as BlockType
          }
        />
      </div>
    </div>
  );
}
