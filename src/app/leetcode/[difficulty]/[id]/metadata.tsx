import { Badge } from "@/components/ui/badge";
import LinkBreadcrumb from "@/components/ui/link-breadcrumb";
import { capitalize } from "@/lib/utils";
import { LeetcodeProblem } from "@/types/api/leetcode";
import { format } from "date-fns";

export type LeetcodeProblemMetadataProps = {
  problem: LeetcodeProblem;
};

export default function LeetcodeProblemMetadata(
  props: LeetcodeProblemMetadataProps,
) {
  const { problem } = props;
  return (
    <div className="flex flex-col gap-4">
      <LinkBreadcrumb
        items={[
          {
            href: "/leetcode",
            content: "Leetcode",
          },
          {
            href: `/leetcode/${problem.difficulty}`,
            content: capitalize(problem.difficulty),
          },
          {
            content: problem.name,
          },
        ]}
      />
      <Badge variant={`lc-${problem.difficulty}`} className="w-fit">
        {capitalize(problem.difficulty)}
      </Badge>
      <span className="text-neutral">
        {format(problem.date, "MMM dd, yyyy")}
      </span>
      {problem.tags && (
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag) => {
            return (
              <Badge
                key={`${problem.id}-${tag}`}
                className="border-foreground/30"
                variant="outline">
                #{tag}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
