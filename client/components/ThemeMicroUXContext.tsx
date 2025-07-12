"use client";
import React, { createContext, useContext } from "react";
import { useTheme } from "./ThemeContext";

const ThemeMicroUXContext = createContext<any>(null);

export function ThemeMicroUXProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ThemeMicroUXContext.Provider value={theme.microUX || {}}>
      {children}
    </ThemeMicroUXContext.Provider>
  );
}

export function useThemeMicroUX() {
  const ctx = useContext(ThemeMicroUXContext);
  if (!ctx) throw new Error("useThemeMicroUX must be used within ThemeMicroUXProvider");
  return ctx;
} 