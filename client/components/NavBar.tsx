"use client";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { useTheme, getContrastColor } from "./ThemeContext";
import React from "react";

export function MobileNavBar({ onNewPost }: { onNewPost: () => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 border-t border-white/10 flex justify-around items-center h-16 md:hidden backdrop-blur-lg">
      <a href="/bleed-wall" className="flex flex-col items-center text-white/80 hover:text-accent transition-colors">
        <span className="text-2xl">🏠</span>
        <span className="text-xs mt-1">Wall</span>
      </a>
      <a href="/bleed-wall/liked" className="flex flex-col items-center text-white/80 hover:text-accent transition-colors">
        <span className="text-2xl">❤️</span>
        <span className="text-xs mt-1">Liked</span>
      </a>
      <button
        onClick={onNewPost}
        className="flex flex-col items-center text-accent hover:text-white transition-colors focus:outline-none"
        aria-label="New Post"
      >
        <span className="text-3xl">✍️</span>
        <span className="text-xs mt-1">New</span>
      </button>
    </nav>
  );
}

export default function NavBar() {
  const { user, logout, token } = useAuth();
  const { themeId, setTheme, theme } = useTheme();

  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        borderBottom: `2px solid ${theme.colors.accent}`,
        background: theme.textures?.bg || theme.colors.bg,
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
        position: "sticky",
        top: 0,
        zIndex: 20,
        boxShadow: "0 2px 8px 0 #0002",
      }}
    >
      <Link href="/" style={{ fontFamily: theme.fonts.header, fontSize: 28, color: theme.colors.accent, textShadow: "0 2px 8px #0008", letterSpacing: 1 }}>WoundLog</Link>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {/* Theme Picker Dropdown */}
        <div style={{ marginRight: 16 }}>
          <select
            value={themeId}
            onChange={e => setTheme(e.target.value as import('../lib/themes').ThemeId)}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              fontFamily: theme.fonts.body,
              background: theme.colors.bg,
              color: theme.colors.text,
              border: `2px solid ${theme.colors.accent}`,
              boxShadow: "0 2px 8px 0 #0002",
            }}
          >
            {Object.values(require('../lib/themes').themes).map((t: any) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <Link href="/journal" style={{ fontFamily: theme.fonts.body, fontSize: 18, color: getContrastColor(theme.colors.accent + "22"), padding: "8px 20px", borderRadius: 8, textDecoration: "none", background: theme.colors.accent + "22" }}>Journal</Link>
        <Link href="/bleed-wall" style={{ fontFamily: theme.fonts.body, fontSize: 18, color: getContrastColor(theme.colors.accent + "22"), padding: "8px 20px", borderRadius: 8, textDecoration: "none", background: theme.colors.accent + "22" }}>Bleed Wall</Link>
        {/* Auth links */}
        {token ? (
          <button onClick={logout} style={{ borderRadius: 24, padding: "8px 24px", background: theme.colors.accent, color: getContrastColor(theme.colors.accent), fontFamily: theme.fonts.header, fontWeight: 600, boxShadow: "0 2px 8px 0 #0002", border: "none", cursor: "pointer" }}>Logout</button>
        ) : (
          <>
            <Link href="/login" style={{ fontFamily: theme.fonts.body, fontSize: 18, color: getContrastColor(theme.colors.bg), padding: "8px 20px", borderRadius: 8, textDecoration: "none", border: `2px solid ${theme.colors.accent}` }}>Login</Link>
            <Link href="/register" style={{ fontFamily: theme.fonts.body, fontSize: 18, color: getContrastColor(theme.colors.bg), padding: "8px 20px", borderRadius: 8, textDecoration: "none", border: `2px solid ${theme.colors.accent}` }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
} 