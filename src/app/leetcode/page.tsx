import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";
import { Metadata } from "next";
import Link from "next/link";
import Problems from "./problems";
import { parsePositiveInt } from "@/lib/utils";

const description =
  "Showcasing my solutions to Leetcode problems in Go alongside my thought process and approach to solving them.";

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

export type LeetcodeProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Leetcode(props: LeetcodeProps) {
  const { searchParams } = props;
  const { page } = await searchParams;
  const parsedPage = parsePositiveInt(page, 0);
  const { problems, totalPages } = await api.leetcode.list({
    page: parsedPage,
  });
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="md:w-4/5 w-full mb-8">
        <h1 className="text-4xl font-display font-bold text-center">
          Leetcode
        </h1>
        <p className="text-lg text-neutral text-center">
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex gap-2 items-center px-6">
          <Link href="/leetcode/easy">
            <Badge variant="lc-easy">Easy</Badge>
          </Link>
          <Link href="/leetcode/medium">
            <Badge variant="lc-medium">Medium</Badge>
          </Link>
          <Link href="/leetcode/hard">
            <Badge variant="lc-hard">Hard</Badge>
          </Link>
        </div>
      </div>
      <Problems
        problems={problems}
        totalPages={totalPages}
        page={parsedPage}
      />
    </div>
  );
}
