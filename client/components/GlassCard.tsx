import React, { ReactNode, HTMLAttributes } from "react";
import { useTheme } from "./ThemeContext";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  const { themeId, theme } = useTheme();
  // Brooding Castle: match landing page glass style
  const isBroodingCastle = themeId === 'brooding-castle';
  return (
    <div
      className={
        isBroodingCastle
          ? `rounded-3xl bg-[#18141a]/90 dark:bg-[#18141a]/95 backdrop-blur-md border border-[#3a1a2c] shadow-2xl ${className}`
          : `rounded-2xl bg-white/10 border border-white/10 shadow-2xl backdrop-blur-lg p-6 ${className}`
      }
      style={
        isBroodingCastle
          ? {
              background: '#18141aE6', // 90% opacity
              backdropFilter: 'blur(16px)',
              border: '1.5px solid #3a1a2c',
              boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
              borderRadius: '1.5rem',
            }
          : {
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
              borderRadius: "1rem",
            }
      }
      {...props}
    >
      {children}
    </div>
  );
}

// Reusable empty state component
export function EmptyState({ illustration, message }: { illustration: React.ReactNode; message: string }) {
  // Helper to check if element is an SVG
  function isSVGElement(el: any): el is React.ReactElement<React.SVGProps<SVGSVGElement>> {
    return el && el.type === 'svg';
  }
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in-slow">
      <div className="mb-6 flex items-center justify-center w-full" style={{ minHeight: 96 }}>
        {isSVGElement(illustration)
          ? React.cloneElement(illustration, {
              className: 'mx-auto block',
              'aria-hidden': true,
              role: 'img',
              focusable: false,
            })
          : illustration}
      </div>
      <div className="text-lg md:text-xl text-white/80 font-poetic text-center max-w-md mx-auto mb-2">{message}</div>
    </div>
  );
} 