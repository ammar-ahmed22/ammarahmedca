"use client";
import React, { createContext, useState, useEffect } from "react";
import type { Theme, UIContextType } from "@/types/context/ui";

export const UIContext = createContext<UIContextType>({
  theme: "light",
  setTheme: () => {},
  isNavbarVisible: true,
  setIsNavbarVisible: () => {},
});

export type UIContextProviderProps = {
  children: React.ReactNode;
  rootSelector?: string;
  defaultTheme?: Theme;
  defaultClasses?: string;
};

export const UIContextProvider: React.FC<UIContextProviderProps> = ({
  children,
  rootSelector = ":root",
  defaultTheme = "light",
  defaultClasses = "",
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

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
    <UIContext.Provider
      value={{
        theme,
        setTheme,
        isNavbarVisible,
        setIsNavbarVisible,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
