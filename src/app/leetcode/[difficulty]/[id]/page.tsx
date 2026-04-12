import api from "@/lib/api";
import { notFound } from "next/navigation";
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
    difficulty: problem.difficulty.toLowerCase(),
  }));
};

export const revalidate = 60;
export const dynamicParams = true;

export const generateMetadata = async (
  props: LeetcodeProblemProps,
) => {
  const { params } = props;
  const { id } = await params;
  let problem;
  try {
    problem = await api.leetcode.getProblem(id);
  } catch {
    return { title: "leetcode/not-found" };
  }
  const description = `Solution and thought process for Leetcode problem ${problem.title}`;
  return {
    title: `~/leetcode/${problem.difficulty}/${problem.id}`,
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-base text-muted mt-4">
      ## {children}
    </h2>
  );
}

export default async function LeetcodeProblem(
  props: LeetcodeProblemProps,
) {
  const { params } = props;
  const { id } = await params;
  let problem;
  try {
    problem = await api.leetcode.getProblem(id);
  } catch {
    notFound();
  }
  return (
    <article className="flex flex-col gap-6">
      <LeetcodeProblemMetadata problem={problem} />
      <span className="ascii-rule" />
      <div className="prose-mono flex flex-col gap-4">
        <SectionLabel>description</SectionLabel>
        {problem.description.map((block) => (
          <Block key={block.id} block={block} />
        ))}
        <SectionLabel>notes</SectionLabel>
        {problem.notes.map((block) => (
          <Block key={block.id} block={block} />
        ))}
        <SectionLabel>solution</SectionLabel>
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
      <div className="mt-8">
        <span className="ascii-rule" />
        <div className="text-center font-mono text-xs text-muted mt-4 select-none">
          --EOF--
        </div>
      </div>
    </article>
  );
}
