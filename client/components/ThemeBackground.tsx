"use client";
import { useTheme } from "./ThemeContext";

function ThemeBackground() {
  const { theme } = useTheme();
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

export default ThemeBackground; 