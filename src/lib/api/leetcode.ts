import type {
  LeetcodeDifficulty,
  LeetcodeMetadata,
  LeetcodeProblem,
  LeetcodeProblemMetadata,
} from "@/types/api/leetcode";
import { markdownToBlocks } from "@tryfabric/martian";
import { parseBlocks } from "../notion/utils";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { v4 as uuid } from "uuid";
import { Block } from "@/types/api/blocks";
import { parseISO } from "date-fns";

export type ProblemListOptions = {
  difficulty?: string;
  pageSize?: number;
  page?: number;
};

export type ProblemListResponse = {
  problems: LeetcodeProblem[];
  page: number;
  totalPages: number;
};

export type ProblemMetadataOptions = {
  query?: string;
  difficulty?: string;
};

class Leetcode {
  private async readGitHubFile(path: string): Promise<string> {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GITHUB_TOKEN is not set");
    }
    const res = await fetch(
      `https://api.github.com/repos/ammar-ahmed22/lcnotes/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch ${path}`);
    }
    const data = await res.json();
    const base64 = data.content;
    return Buffer.from(base64, "base64").toString("utf-8");
  }

  private async problemsJSON(): Promise<
    Record<string, LeetcodeProblemMetadata>
  > {
    const problemsContent =
      await this.readGitHubFile("problems.json");
    const parsed = JSON.parse(problemsContent) as Record<
      string,
      LeetcodeProblemMetadata
    >;
    return parsed;
  }

  async problemMetadata(
    opts?: ProblemMetadataOptions,
  ): Promise<LeetcodeProblemMetadata[]> {
    const problemsJSON = await this.problemsJSON();
    let problems: LeetcodeProblemMetadata[] =
      Object.values(problemsJSON);

    if (opts?.difficulty) {
      problems = problems.filter((problem) => {
        return problem.difficulty === opts.difficulty;
      });
    }

    if (opts?.query) {
      const normalizedQuery = opts.query.trim().toLowerCase();
      problems = problems.filter((problem) => {
        let match = false;

        if (
          problem.directory.toLowerCase().includes(normalizedQuery)
        ) {
          match = true;
        }

        if (problem.tags && problem.tags.length > 0) {
          for (const tag of problem.tags) {
            if (tag.toLowerCase().includes(normalizedQuery)) {
              match = true;
            }
          }
        }

        return match;
      });
    }
    return problems;
  }

  async metadata(): Promise<LeetcodeMetadata> {
    const problems = await this.problemMetadata();
    const publishedProblems = problems.filter(
      (problem) => problem.published,
    );

    const easy = publishedProblems.filter(
      (problem) => problem.difficulty === "Easy",
    );
    const medium = publishedProblems.filter(
      (problem) => problem.difficulty === "Medium",
    );
    const hard = publishedProblems.filter(
      (problem) => problem.difficulty === "Hard",
    );

    const allTags = new Set<string>();
    for (const problem of publishedProblems) {
      if (problem.tags) {
        problem.tags.forEach((tag) => allTags.add(tag));
      }
    }

    return {
      easy,
      medium,
      hard,
      allTags: Array.from(allTags),
    };
  }

  private async markdownFileToBlocks(path: string): Promise<Block[]> {
    const content = await this.readGitHubFile(path);
    const blocks = markdownToBlocks(content);
    const parsed = await parseBlocks(blocks as BlockObjectResponse[]);
    return parsed.map((block) => {
      return {
        ...block,
        id: block.id ?? uuid(),
      };
    });
  }

  async getProblem(id: string): Promise<LeetcodeProblem> {
    const problemsJSON = await this.problemsJSON();
    const problem = problemsJSON[id];
    if (!problem) {
      throw new Error(`Problem with id ${id} not found`);
    }

    if (!problem.published) {
      throw new Error(`Problem with id ${id} is not found`);
    }

    const basePath = encodeURIComponent(problem.directory);

    const description = await this.markdownFileToBlocks(
      `${basePath}/docs.md`,
    );
    const notes = await this.markdownFileToBlocks(
      `${basePath}/notes.md`,
    );
    const solution = await this.readGitHubFile(
      `${basePath}/solution.py`,
    );
    return {
      id,
      difficulty:
        problem.difficulty.toLowerCase() as LeetcodeDifficulty,
      title: problem.title,
      description,
      notes,
      solution,
      datetime: parseISO(problem.datetime),
      tags: problem.tags,
    };
  }
}

export const leetcode = new Leetcode();
