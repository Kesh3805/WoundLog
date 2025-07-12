import React, { useState, useEffect } from "react";
import GlassCard from "./GlassCard";
import { createBleedPost, getBleedPrompt } from '../lib/bleedApi';

export default function BleedNewPostModal({ open, onClose, onPost, setPosts }: { open: boolean; onClose: () => void; onPost: (post: any) => void; setPosts?: (posts: any[]) => void }) {
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("");
  const [category, setCategory] = useState("Other");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [promptLoading, setPromptLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchPrompt();
    }
    // eslint-disable-next-line
  }, [open]);

  async function fetchPrompt() {
    setPromptLoading(true);
    try {
      const p = await getBleedPrompt(emotion);
      setPrompt(p);
    } catch {
      setPrompt("Could not fetch a prompt. Try again.");
    } finally {
      setPromptLoading(false);
    }
  }

  async function handlePost() {
    setLoading(true); setError(null);
    try {
      const post = await createBleedPost(content, [emotion], undefined, category);
      onPost(post);
      setContent(""); setEmotion(""); setCategory("Other"); onClose();
    } catch (e) {
      setError('Failed to post.');
    } finally {
      setLoading(false);
    }
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
      <GlassCard className="w-full max-w-lg p-8 rounded-3xl shadow-2xl bg-white/10 dark:bg-black/30 backdrop-blur-lg">
        <h2 className="text-2xl font-poetic font-bold mb-4 text-[#1a1a1a]">Bleed on the Wall</h2>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-poetic text-lg text-accent" style={{color:'#ea517e'}}>AI Prompt</span>
            <button onClick={fetchPrompt} disabled={promptLoading} className="px-3 py-1 rounded-lg font-inter text-xs bg-black/30 text-[#1a1a1a] border border-accent/40 hover:bg-accent/10 transition-all">
              {promptLoading ? 'Loading...' : 'New Prompt'}
            </button>
          </div>
          <div
            className="font-poetic italic text-[#1a1a1a] bg-white/60 rounded-xl p-4 mb-2 shadow-inner min-h-[48px] transition-all"
            style={{
              fontSize: '1.1rem',
              letterSpacing: 0.2,
              resize: 'vertical',
              overflow: 'auto',
              minHeight: '48px',
              maxWidth: '100%',
              display: 'block',
            }}
          >
            {promptLoading ? 'Fetching inspiration...' : prompt}
          </div>
        </div>
        <textarea
          className="w-full rounded-xl p-4 bg-white/60 text-[#1a1a1a] font-poetic mb-4"
          placeholder="Let it out..."
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{
            height: '48px',
            minHeight: '48px',
            maxHeight: '240px',
            resize: 'vertical',
            fontSize: '1.1rem',
            letterSpacing: 0.2,
            display: 'block',
          }}
        />
        <div className="flex gap-2 mb-4">
          {["Guilt", "Numb", "Longing", "Hope"].map(tag => (
            <button
              key={tag}
              className={`px-4 py-2 rounded-full font-inter text-sm font-semibold border transition-all duration-150 ${emotion === tag ? "bg-[#ea517e] text-white" : "bg-white/80 text-[#1a1a1a] border-[#ea517e]/40"}`}
              onClick={() => setEmotion(tag)}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:border-accent focus:outline-none"
            style={{ color: '#000000' }}
          >
            <option value="Other" style={{ color: '#000000', backgroundColor: '#ffffff' }}>📌 Other</option>
            <option value="Poetry" style={{ color: '#000000', backgroundColor: '#ffffff' }}>📜 Poetry</option>
            <option value="Rant" style={{ color: '#000000', backgroundColor: '#ffffff' }}>😤 Rant</option>
            <option value="Confession" style={{ color: '#000000', backgroundColor: '#ffffff' }}>🤐 Confession</option>
            <option value="Story" style={{ color: '#000000', backgroundColor: '#ffffff' }}>📖 Story</option>
            <option value="Thought" style={{ color: '#000000', backgroundColor: '#ffffff' }}>💭 Thought</option>
          </select>
        </div>
        <div className="flex gap-4 justify-end">
          <button onClick={onClose} className="px-6 py-2 rounded-xl font-inter bg-white/60 text-[#1a1a1a]">Cancel</button>
          <button onClick={handlePost} disabled={loading || !content.trim() || !emotion} className="px-6 py-2 rounded-xl font-poetic font-semibold bg-[#ea517e] text-white shadow-lg">{loading ? 'Posting...' : 'Post'}</button>
        </div>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </GlassCard>
    </div>
  );
} 