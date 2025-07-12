"use client";
import React, { createContext, useContext } from "react";
import { useTheme } from "./ThemeContext";

const ThemeSoundContext = createContext<any>(null);

export function ThemeSoundProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  // TODO: Implement sound playback logic
  return (
    <ThemeSoundContext.Provider value={theme.sounds || {}}>
      {children}
    </ThemeSoundContext.Provider>
  );
}

export function useThemeSound() {
  const ctx = useContext(ThemeSoundContext);
  if (!ctx) throw new Error("useThemeSound must be used within ThemeSoundProvider");
  return ctx;
} 