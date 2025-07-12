"use client";
import { useTheme } from "./ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeBackground() {
  const { theme } = useTheme();
  // Use theme.colors.bg or theme.textures.bg for background
  const bg = theme.textures?.bg || theme.colors.bg;
  return (
    <div
      key={theme.id}
      className="fixed inset-0 w-full h-full z-0"
      style={{ background: bg }}
      aria-hidden="true"
    />
  );
} 