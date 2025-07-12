'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { themes, ThemeId, ThemeConfig } from '../lib/themes';

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (id: ThemeId) => void;
  themeId: ThemeId;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always use the default theme for SSR and first client render
  const [themeId, setThemeId] = useState<ThemeId>("gothic-cathedral");

  // After hydration, update from localStorage if available
  useEffect(() => {
    const stored = localStorage.getItem("themeId");
    if (stored && stored !== themeId) setThemeId(stored as ThemeId);
  }, []);

  const setTheme = (id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem("themeId", id);
  };
  const theme = themes[themeId] || themes["gothic-cathedral"];

  // Dynamically update CSS variables for theme colors
  useEffect(() => {
    if (!theme) return;
    document.documentElement.style.setProperty('--mood-bg', theme.colors.bg);
    document.documentElement.style.setProperty('--mood-accent', theme.colors.accent);
    document.documentElement.style.setProperty('--mood-text', theme.colors.text);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

// Global helper to get high-contrast text color for any background
export function getContrastColor(bg: string) {
  if (!bg) return '#111';
  const hex = bg.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#111' : '#fff';
}

// Helper to determine if a color is light
export function isLightColor(bg: string) {
  if (!bg) return false;
  const hex = bg.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7;
} 