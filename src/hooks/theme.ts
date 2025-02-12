import { useContext } from "react";
import { ThemeContext } from "@/context/theme";

export const useToggleTheme = () => {
  const { setTheme } = useContext(ThemeContext);
  return () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
};

export function useThemeValue<T>(light: T, dark: T): T {
  const { theme } = useContext(ThemeContext);
  return theme === "light" ? light : dark;
}
