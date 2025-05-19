import type { SetState } from "@/types";

export type Theme = "light" | "dark";

export type UIContextType = {
  theme: Theme;
  setTheme: SetState<Theme>;
  isNavbarVisible: boolean;
  setIsNavbarVisible: SetState<boolean>;
};
