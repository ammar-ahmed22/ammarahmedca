export type LeetcodeDifficulty = "easy" | "medium" | "hard";

export type LeetcodeProblem = {
  id: string;
  difficulty: LeetcodeDifficulty;
  name: string;
  content: string;
};

export type YamlProblem = {
  published: boolean;
  difficulty: LeetcodeDifficulty;
  directory: string;
};
