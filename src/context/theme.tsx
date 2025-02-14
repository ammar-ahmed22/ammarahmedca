"use client";
import React, { createContext, useState, useEffect } from "react";
import type { Theme, ThemeContextType } from "@/types/context/theme";

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export type ThemeProviderProps = {
  children: React.ReactNode;
  rootSelector?: string;
  defaultTheme?: Theme;
  defaultClasses?: string;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  rootSelector = ":root",
  defaultTheme = "light",
  defaultClasses = "",
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = document.querySelector(rootSelector) as HTMLElement;
    if (root) {
      root.classList.remove(theme === "dark" ? "light" : "dark");
      root.classList.add(theme);
    }
  }, [rootSelector, theme]);

  useEffect(() => {
    const root = document.querySelector(rootSelector) as HTMLElement;
    if (root && defaultClasses !== "") {
      root.classList.add(
        ...defaultClasses.split(" ").map((s) => s.trim()),
      );
    }
  }, [defaultClasses, rootSelector]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
