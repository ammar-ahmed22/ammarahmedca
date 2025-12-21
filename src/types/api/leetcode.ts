import { Block } from "./blocks";

export type LeetcodeDifficulty = "easy" | "medium" | "hard";

export type LeetcodeProblem = {
  id: string;
  difficulty: LeetcodeDifficulty;
  title: string;
  description: Block[];
  notes: Block[];
  solution: string;
  datetime: Date;
  tags?: string[];
};

export type LeetcodeProblemMetadata = {
  id: string;
  title: string;
  directory: string;
  difficulty: string;
  tags?: string[];
  notes: string;
  published: boolean;
  datetime: string;
};

export type LeetcodeMetadata = {
  easy: LeetcodeProblemMetadata[];
  medium: LeetcodeProblemMetadata[];
  hard: LeetcodeProblemMetadata[];
  allTags: string[];
};
