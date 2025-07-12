"use client";
import React, { createContext, useContext } from "react";
import { useTheme } from "./ThemeContext";

const ThemeAnimationContext = createContext<any>(null);

export function ThemeAnimationProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ThemeAnimationContext.Provider value={theme.animations || {}}>
      {children}
    </ThemeAnimationContext.Provider>
  );
}

export function useThemeAnimation() {
  const ctx = useContext(ThemeAnimationContext);
  if (!ctx) throw new Error("useThemeAnimation must be used within ThemeAnimationProvider");
  return ctx;
} 