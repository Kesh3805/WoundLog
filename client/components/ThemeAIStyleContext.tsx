"use client";
import React, { createContext, useContext } from "react";
import { useTheme } from "./ThemeContext";

const ThemeAIStyleContext = createContext<any>(null);

export function ThemeAIStyleProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ThemeAIStyleContext.Provider value={theme.aiStyle || {}}>
      {children}
    </ThemeAIStyleContext.Provider>
  );
}

export function useThemeAIStyle() {
  const ctx = useContext(ThemeAIStyleContext);
  if (!ctx) throw new Error("useThemeAIStyle must be used within ThemeAIStyleProvider");
  return ctx;
} 