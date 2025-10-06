import api from "@/lib/api";
import LeetcodeProblemMetadata from "./metadata";
import Block from "@/components/ui/block";

export type LeetcodeProblemProps = {
  params: Promise<{ id: string; difficulty: string }>;
};

export const generateStaticParams = async (
  props: LeetcodeProblemProps,
) => {
  const { params } = props;
  const { difficulty } = await params;
  const problems = await api.leetcode.listProblems({
    difficulty,
    pageSize: 1000,
  });
  return problems.problems.map((problem) => ({
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
  const description = `Solution and thought process for Leetcode problem ${problem.name}`;
  return {
    title: `Leetcode - ${problem.name}`,
    description,
    openGraph: {
      type: "website",
      title: `Leetcode - ${problem.name}`,
      description,
      siteName: "ammarahmed.ca",
      url: `https://ammarahmed.ca/leetcode/${id}`,
      images: [
        `api/og?title=${encodeURIComponent("Leetcode - " + problem.name)}&description=${encodeURIComponent(description)}`,
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
        {problem.blocks.map((block) => {
          return <Block key={block.id} block={block} />;
        })}
      </div>
    </div>
  );
}
