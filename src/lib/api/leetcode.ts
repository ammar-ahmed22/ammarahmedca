import yaml from "yaml";
import type {
  LeetcodeProblem,
  YamlProblem,
} from "@/types/api/leetcode";
import { markdownToBlocks } from "@tryfabric/martian";
import { parseBlocks } from "../notion/utils";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { v4 as uuid } from "uuid";
import { Block } from "@/types/api/blocks";

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
  async list(): Promise<LeetcodeProblem[]> {
    const problemsYaml = await this.readGitHubFile("problems.yaml");
    const problems = yaml.parse(problemsYaml) as Record<
      string,
      YamlProblem
    >;

    const publishedProblems = Object.entries(problems).filter(
      (entry) => {
        return entry[1].published;
      },
    );

    const leetcodeProblems: LeetcodeProblem[] = await Promise.all(
      publishedProblems.map(async ([id, problem]) => {
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
        };
      }),
    );
    return leetcodeProblems;
  }
}

export const leetcode = new Leetcode();
