import type { SetState } from "@/types";

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  setTheme: SetState<Theme>;
};
