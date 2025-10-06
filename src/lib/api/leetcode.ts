import yaml from "yaml";
import type {
  LeetcodeMetadata,
  LeetcodeProblem,
  LeetcodeProblemMetadata,
} from "@/types/api/leetcode";
import { markdownToBlocks } from "@tryfabric/martian";
import { parseBlocks } from "../notion/utils";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { v4 as uuid } from "uuid";
import { Block } from "@/types/api/blocks";
import { paginate } from "../utils";
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
      `https://api.github.com/repos/ammar-ahmed22/lcgo/contents/${path}`,
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

  async problemMetadata(
    opts?: ProblemMetadataOptions,
  ): Promise<LeetcodeProblemMetadata[]> {
    const problemsYaml = await this.readGitHubFile("problems.yaml");
    const parsedYaml = yaml.parse(problemsYaml) as Record<
      string,
      Omit<LeetcodeProblemMetadata, "id">
    >;
    let problems: LeetcodeProblemMetadata[] = Object.entries(
      parsedYaml,
    ).map(([id, metadata]) => {
      return {
        id,
        ...metadata,
      };
    });

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
      (problem) => problem.difficulty === "easy",
    ).length;
    const medium = publishedProblems.filter(
      (problem) => problem.difficulty === "medium",
    ).length;
    const hard = publishedProblems.filter(
      (problem) => problem.difficulty === "hard",
    ).length;

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

  async listProblems(
    opts?: ProblemListOptions,
  ): Promise<ProblemListResponse> {
    const problemsYaml = await this.readGitHubFile("problems.yaml");
    const problems = yaml.parse(problemsYaml) as Record<
      string,
      LeetcodeProblemMetadata
    >;

    const publishedProblems = Object.entries(problems).filter(
      (entry) => {
        return entry[1].published;
      },
    );

    let filteredProblems = publishedProblems;
    if (opts?.difficulty) {
      filteredProblems = publishedProblems.filter((entry) => {
        return entry[1].difficulty === opts.difficulty;
      });
    }
    const paginated = paginate(
      filteredProblems,
      opts?.pageSize ?? 10,
    );

    if (opts?.page && opts.page >= paginated.totalPages) {
      throw new Error(`Page ${opts.page} does not exist`);
    }

    const leetcodeProblems: LeetcodeProblem[] = await Promise.all(
      paginated.pages[opts?.page ?? 0].map(async ([id, problem]) => {
        const path = `${encodeURIComponent(problem.directory)}/docs.md`;
        const content = await this.readGitHubFile(path);
        const blocks = markdownToBlocks(content);
        const parsed = (
          await parseBlocks(blocks as BlockObjectResponse[])
        ).map((block) => {
          return {
            ...block,
            id: block.id ?? uuid(),
          };
        });
        // Find the first block that is not a heading
        const description = parsed.find((block) => {
          return block.type !== "heading";
        });
        return {
          id,
          difficulty: problem.difficulty,
          name: problem.directory.split("-")[1].trim(),
          raw: content,
          blocks: parsed,
          description: description as Block | undefined,
          date: parseISO(problem.date),
          tags: problem.tags,
        };
      }),
    );

    leetcodeProblems.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });

    return {
      problems: leetcodeProblems,
      page: opts?.page ?? 0,
      totalPages: paginated.totalPages,
    };
  }

  async getProblem(id: string): Promise<LeetcodeProblem> {
    const problemsYaml = await this.readGitHubFile("problems.yaml");
    const problems = yaml.parse(problemsYaml) as Record<
      string,
      LeetcodeProblemMetadata
    >;

    const problem = problems[id];
    if (!problem) {
      throw new Error(`Problem with id ${id} not found`);
    }

    if (!problem.published) {
      throw new Error(`Problem with id ${id} is not found`);
    }

    const path = `${encodeURIComponent(problem.directory)}/docs.md`;
    const content = await this.readGitHubFile(path);
    const blocks = markdownToBlocks(content);
    const parsed = (
      await parseBlocks(blocks as BlockObjectResponse[])
    ).map((block) => {
      return {
        ...block,
        id: block.id ?? uuid(),
      };
    });
    // Find the first block that is not a heading
    const description = parsed.find((block) => {
      return block.type !== "heading";
    });
    return {
      id,
      difficulty: problem.difficulty,
      name: problem.directory.split("-")[1].trim(),
      raw: content,
      blocks: parsed,
      description: description as Block | undefined,
      date: parseISO(problem.date),
      tags: problem.tags,
    };
  }
}

export const leetcode = new Leetcode();
