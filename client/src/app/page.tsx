'use client';

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="w-screen h-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18141a] via-[#0a0a0a] to-[#1a0d13] relative overflow-hidden">
        {/* CSS Grain overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-soft-light grain-bg" />
        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-10" style={{background: 'radial-gradient(ellipse at center, transparent 60%, #0a0a0a 100%)'}} />
        <div className="max-w-lg w-full mx-auto p-10 rounded-3xl shadow-2xl bg-[#18141a]/90 dark:bg-[#18141a]/95 backdrop-blur-md border border-[#3a1a2c] flex flex-col items-center gap-6 relative z-20">
          <h1 className="font-poetic text-5xl md:text-6xl text-center mb-2 text-[#f5f3f7] drop-shadow-lg tracking-tight">WoundLog</h1>
          <p className="font-poetic text-2xl md:text-3xl text-center mb-6 italic opacity-90 text-[#e0d6e6]">Write it. Feel it. Bleed it. Heal it.</p>
          <p className="font-poetic text-lg text-center mb-8 opacity-80 text-[#bfaec9]">To feel is to survive.</p>
          <Link href="/bleed-wall" className="px-8 py-4 rounded-full bg-gradient-to-r from-[#6b1839] via-[#2c0b0e] to-[#3a1a2c] text-white font-inter text-xl shadow-lg hover:from-[#a8325e] hover:to-[#2c0b0e] transition-all duration-300 hover:scale-105 border border-[#3a1a2c]">Start Bleeding</Link>
        </div>
        <style jsx global>{`
          .grain-bg {
            background-image: repeating-conic-gradient(rgba(255,255,255,0.02) 0.5deg, transparent 1deg),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 2px);
            background-size: 200% 200%, 100% 100%;
            filter: contrast(1.2) brightness(1.1);
          }
        `}</style>
      </div>
    </main>
  );
}
