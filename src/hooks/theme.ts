import { useContext } from "react";
import { UIContext } from "@/context/ui";

export const useToggleTheme = () => {
  const { setTheme } = useContext(UIContext);
  return () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
};

export function useThemeValue<T>(light: T, dark: T): T {
  const { theme } = useContext(UIContext);
  return theme === "light" ? light : dark;
}
