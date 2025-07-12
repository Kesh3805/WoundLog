'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Mood = "neutral" | "sadness" | "anger" | "calm" | "nostalgia";

const moodColors: Record<Mood, { bg: string; accent: string; text: string }> = {
  neutral:   { bg: "#18141a", accent: "#8A8A8A", text: "#E0E0E0" },
  sadness:   { bg: "#1D1F2A", accent: "#4B5974", text: "#C9CFE2" },
  anger:     { bg: "#231014", accent: "#7a2a3a", text: "#f5e6e6" },
  calm:      { bg: "#181a1d", accent: "#3a5a5a", text: "#dbe6e6" },
  nostalgia: { bg: "#1a1414", accent: "#a68a6a", text: "#eae2d0" },
};

interface MoodContextType {
  mood: Mood;
  setMood: (mood: Mood) => void;
  colors: typeof moodColors[Mood];
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<Mood>("neutral");
  const colors = moodColors[mood];

  useEffect(() => {
    // Set CSS variables for theming
    const root = document.documentElement;
    root.style.setProperty("--mood-bg", colors.bg);
    root.style.setProperty("--mood-accent", colors.accent);
    root.style.setProperty("--mood-text", colors.text);
  }, [mood, colors]);

  return (
    <MoodContext.Provider value={{ mood, setMood, colors }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMood must be used within a MoodProvider");
  return ctx;
} 