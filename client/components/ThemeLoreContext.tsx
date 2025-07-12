"use client";
import React, { createContext, useContext } from "react";
import { useTheme } from "./ThemeContext";

const ThemeLoreContext = createContext<any>(null);

export function ThemeLoreProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ThemeLoreContext.Provider value={theme.lore || {}}>
      {children}
    </ThemeLoreContext.Provider>
  );
}

export function useThemeLore() {
  const ctx = useContext(ThemeLoreContext);
  if (!ctx) throw new Error("useThemeLore must be used within ThemeLoreProvider");
  return ctx;
} 