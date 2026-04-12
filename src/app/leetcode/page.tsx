import api from "@/lib/api";
import { Metadata } from "next";
import { LeetcodeGraph } from "./graph";
import ProblemsGrid from "./problems-grid";

const description =
  "Showcasing my solutions to Leetcode problems in Python alongside my thought process and approach to solving them.";

export const metadata: Metadata = {
  title: "~/leetcode",
  description,
  openGraph: {
    title: "leetcode",
    description,
    type: "website",
    siteName: "ammarahmed.ca",
    images: [
      `/api/og?title=Leetcode&description=${encodeURIComponent(description)}`,
    ],
  },
};

export const revalidate = 60;

export default async function Leetcode() {
  const metadata = await api.leetcode.metadata();
  const problems = [
    ...metadata.easy,
    ...metadata.medium,
    ...metadata.hard,
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="font-mono text-xs text-muted">
          ~/leetcode $ stat solved
        </div>
        <h1 className="font-display text-5xl sm:text-6xl leading-none">
          leetcode.
        </h1>
        <p className="font-mono text-base text-muted max-w-[68ch]">
          {description}
        </p>
      </div>
      <span className="ascii-rule" />
      <LeetcodeGraph
        easy={metadata.easy.length}
        medium={metadata.medium.length}
        hard={metadata.hard.length}
      />
      <span className="ascii-rule mt-4" />
      <ProblemsGrid problems={problems} allTags={metadata.allTags} />
    </div>
  );
}
