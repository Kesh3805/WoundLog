"use client";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import GlassCard from "../../../components/GlassCard";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(email, password);
      router.push("/journal");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="w-screen h-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18141a] via-[#0a0a0a] to-[#1a0d13] relative overflow-hidden">
        {/* CSS Grain overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-soft-light grain-bg" />
        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-10" style={{background: 'radial-gradient(ellipse at center, transparent 60%, #0a0a0a 100%)'}} />
        <GlassCard className="max-w-lg w-full mx-auto p-10 rounded-3xl shadow-2xl bg-[#18141a]/90 dark:bg-[#18141a]/95 backdrop-blur-md border border-[#3a1a2c] flex flex-col items-center gap-6 relative z-20">
          <h1 className="font-poetic text-4xl md:text-5xl text-center mb-2 text-[#f5f3f7] drop-shadow-lg tracking-tight">Register</h1>
          <p className="font-poetic text-lg text-center mb-6 opacity-80 text-[#bfaec9]">Begin your healing journey.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs mx-auto">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
              className="border border-[#3a1a2c] bg-white/10 dark:bg-black/30 text-white p-3 rounded-lg font-inter placeholder-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-colors"
      />
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength={6}
              className="border border-[#3a1a2c] bg-white/10 dark:bg-black/30 text-white p-3 rounded-lg font-inter placeholder-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-colors"
      />
            {error && <div className="text-red-400 text-sm font-inter text-center">{error}</div>}
            <button type="submit" className="px-8 py-3 rounded-full bg-gradient-to-r from-[#6b1839] via-[#2c0b0e] to-[#3a1a2c] text-white font-inter text-lg shadow-lg hover:from-[#a8325e] hover:to-[#2c0b0e] transition-all duration-300 hover:scale-105 border border-[#3a1a2c] disabled:opacity-60" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
            <a href="/login" className="text-accent underline text-sm text-center font-poetic hover:text-accent/80 transition-all">Already have an account? Login</a>
    </form>
        </GlassCard>
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