import React, { useEffect, useState } from 'react';
import GlassCard from '../../../components/GlassCard';
import BleedPostCard from '../../../components/BleedPostCard';
import { useAuth } from '../../../hooks/useAuth';
import { getLikedPosts } from '../../../lib/bleedApi';

interface BleedPost {
  _id: string;
  content: string;
  emotionTags: string[];
  createdAt: string;
  heartCount: number;
}

export default function LikedPostsPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<BleedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    getLikedPosts(token)
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#190a14] via-[#0c0c10] to-black relative overflow-x-hidden">
      <main className="relative z-10 max-w-3xl mx-auto py-12 px-2 md:px-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-poetic text-3xl font-bold text-accent">Your Liked Posts</h1>
          <a href="/bleed-wall" className="rounded-lg px-4 py-2 bg-accent/20 text-accent font-inter shadow hover:bg-accent/40 transition">← Back to Wall</a>
        </div>
        {loading ? (
          <div className="text-center text-white/60 italic py-8">Loading liked posts...</div>
        ) : error ? (
          <div className="text-center text-red-400 italic py-8">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-white/60 italic py-8">You haven't liked any posts yet.</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post: any) => (
              <BleedPostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 