import yaml from "yaml";
import type {
  LeetcodeProblem,
  YamlProblem,
} from "@/types/api/leetcode";

class Leetcode {
  private async readGitHubFile(path: string): Promise<string> {
    const res = await fetch(
      `https://api.github.com/repos/ammar-ahmed22/lcgo/contents/${path}`,
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
      publishedProblems.map(async (entry) => {
        const path = `${encodeURIComponent(entry[1].directory)}/docs.md`;
        const content = await this.readGitHubFile(path);
        return {
          id: entry[0],
          difficulty: entry[1].difficulty,
          name: entry[1].directory.split("-")[1].trim(),
          content,
        };
      }),
    );
    return leetcodeProblems;
  }
}

export const leetcode = new Leetcode();
