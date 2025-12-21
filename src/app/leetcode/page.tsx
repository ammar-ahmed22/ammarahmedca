import api from "@/lib/api";
import { Metadata } from "next";
import { LeetcodeGraph } from "./graph";
import ProblemsGrid from "./problems-grid";

const description =
  "Showcasing my solutions to Leetcode problems in Python alongside my thought process and approach to solving them.";

export const metadata: Metadata = {
  title: "Leetcode",
  description,
  openGraph: {
    title: "Leetcode",
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
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-3 flex flex-col justify-center">
          <h1 className="text-4xl font-display font-bold md:text-start text-center">
            Leetcode
          </h1>
          <p className="text-neutral md:text-start text-center">
            {description}
          </p>
        </div>
        <div>
          <LeetcodeGraph
            easy={metadata.easy.length}
            medium={metadata.medium.length}
            hard={metadata.hard.length}
          />
        </div>
      </div>
      <ProblemsGrid problems={problems} allTags={metadata.allTags} />
    </div>
  );
}
