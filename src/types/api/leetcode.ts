import { Block } from "./blocks";

export type LeetcodeDifficulty = "easy" | "medium" | "hard";

export type LeetcodeProblem = {
  id: string;
  difficulty: LeetcodeDifficulty;
  name: string;
  raw: string;
  description?: Block;
  blocks: Block[];
  date: Date;
  tags?: string[];
};

export type YamlProblem = {
  published: boolean;
  difficulty: LeetcodeDifficulty;
  directory: string;
  date: string;
  tags?: string[];
};

export type LeetcodeMetadata = {
  easy: number;
  medium: number;
  hard: number;
  allTags: string[];
};
