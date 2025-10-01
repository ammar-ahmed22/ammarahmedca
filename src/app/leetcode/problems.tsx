"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LeetcodeProblem } from "@/types/api/leetcode";
import Link from "next/link";
import React from "react";
import Block from "@/components/ui/block";
import { capitalize, cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";

export type ProblemsProps = {
  problems: LeetcodeProblem[];
  totalPages: number;
  difficulty?: string;
  page: number;
};

export default function Problems({
  problems,
  totalPages,
  difficulty,
  page,
}: ProblemsProps) {
  const baseUrl = difficulty
    ? `/leetcode/${difficulty}`
    : "/leetcode";
  return (
    <div className="flex flex-col gap-4">
      {problems.map((problem, idx, all) => {
        const isLast = idx === all.length - 1;
        return (
          <React.Fragment key={problem.id}>
            <Link
              href={`/leetcode/${problem.difficulty}/${problem.id}`}
            >
              <Card className="w-full shadow-none flex-grow border-none hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 [&_img]:hover:scale-125 [&_img]:scale-100 cursor-pointer transition-all ease-in-out duration-200 relative">
                <CardContent>
                  <div className="py-4">
                    <Badge variant={`lc-${problem.difficulty}`}>
                      {capitalize(problem.difficulty)}
                    </Badge>
                  </div>
                  <span className="text-sm text-neutral-500">
                    {format(problem.date, "MMM dd, yyyy")}
                  </span>
                  <h4 className="text-xl font-bold mt-2">
                    {problem.name}
                  </h4>
                  {problem.description && (
                    <Block block={problem.description} />
                  )}
                  {problem.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {problem.tags.map((tag) => {
                        return (
                          <Badge
                            key={problem.id + tag}
                            variant="outline"
                            className="border-foreground/30"
                          >
                            #{tag}
                          </Badge>
                        );
                      })}
                    </div>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`${baseUrl}?page=${page - 1}`}
              className={cn(
                page === 0 && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
          {totalPages < 4 ? (
            Array.from({ length: totalPages }, (_, i) => i).map(
              (i) => {
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`${baseUrl}?page=${i}`}
                      isActive={page === i}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              },
            )
          ) : (
            <>
              <PaginationItem>
                <PaginationLink
                  href={`${baseUrl}?page=0`}
                  isActive={page === 0}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={`${baseUrl}?page=1`}
                  isActive={page === 1}
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={`${baseUrl}?page=${totalPages - 1}`}
                  isActive={page === totalPages - 1}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              href={`${baseUrl}?page=${page + 1}`}
              className={cn(
                page === totalPages - 1 &&
                  "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
