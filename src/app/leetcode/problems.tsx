import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LeetcodeProblem } from "@/types/api/leetcode";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import Block from "@/components/ui/block";
import { capitalize } from "@/lib/utils";

export type ProblemsProps = {
  problems: LeetcodeProblem[];
};

export default function Problems({ problems }: ProblemsProps) {
  return (
    <div className="flex flex-col gap-4">
      {problems.map((problem, idx, all) => {
        const isLast = idx === all.length - 1;
        return (
          <React.Fragment key={problem.id}>
            <Link
              href={`/leetcode/${problem.difficulty}/${problem.id}`}>
              <Card className="w-full shadow-none flex-grow border-none hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 [&_img]:hover:scale-125 [&_img]:scale-100 cursor-pointer transition-all ease-in-out duration-200 relative">
                <CardContent>
                  <div className="py-4">
                    <Badge variant={`lc-${problem.difficulty}`}>
                      {capitalize(problem.difficulty)}
                    </Badge>
                  </div>
                  <span className="text-neutral">
                    {format(new Date(), "MMM dd, yyyy")}
                  </span>
                  <h4 className="text-xl font-bold mt-2">
                    {problem.name}
                  </h4>
                  {problem.description && (
                    <Block block={problem.description} />
                  )}
                </CardContent>
              </Card>
            </Link>
            {!isLast && (
              <hr className="w-full border-neutral-500/30" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
